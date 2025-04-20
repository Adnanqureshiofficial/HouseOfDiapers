// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const dbase = require("../database")

router.get('/fetch-cart/:userId', (req, res) => {
  const userId = req.params.userId;

  // Step 1: Get cart_id for the given order_id (assuming order_id is used here)
  const getCartIdQuery = 'SELECT cart_id FROM carts WHERE user_id = ?';

  dbase.query(getCartIdQuery, [userId], (err, cartResult) => {
    if (err) {
      console.error('Error fetching cart ID:', err);
      return res.status(500).json({ message: 'Server error. Could not fetch cart ID.' });
    }
console.log(cartResult)
    if (cartResult.length === 0) {
      
      return res.status(404).json({ message: 'Cart not found for this order.' });
    }

    const cartId = cartResult[0].cart_id;

    // Step 2: Get all items from cart_items using cart_id and retrieve product details
    const getItemsQuery = `
      SELECT 
        ci.product_id AS id,
        ci.quantity,
        p.product_name,
        p.price,
        p.size,
        p.image,
        p.description
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.cart_id = ?
    `;

    dbase.query(getItemsQuery, [cartId], (itemsErr, itemsResult) => {
      if (itemsErr) {
        console.error('Error fetching cart items:', itemsErr);
        return res.status(500).json({ message: 'Failed to fetch cart items.' });
      }

      if (itemsResult.length === 0) {
        
        return res.status(404).json({ message: 'No items found in this cart.' });
      }

      // Step 3: Return structured data with the full image URL
      const items = itemsResult.map(item => ({
        item_id: item.id,
        name: item.product_name,
        price: item.price,
        size: item.size,
        image: `${req.protocol}://${req.get('host')}${item.image}`, // Full image URL using BASE_URL environment variable
        quantity: item.quantity,
       
      }));

      res.status(200).json({
        cartId,
        items
      });
    });
  });
});

router.post('/update-cart/:userId', async (req, res) => {
const userId = req.params.userId;// Assumes user is authenticated
  const cartItems = req.body.cartItems;
console.log(cartItems)
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    console.log("is not array")
    return res.status(400).json({ message: 'Cart items are missing or invalid.' });
  }

  try {
    // Step 1: Get the cart_id for the user
    const getCartIdQuery = 'SELECT cart_id FROM carts WHERE user_id = ?';
    dbase.query(getCartIdQuery, [userId], (err, cartResult) => {
      if (err || cartResult.length === 0) {
        console.error('Error fetching cart ID:', err);
        return res.status(500).json({ message: 'Failed to find user cart.' });
      }

      const cartId = cartResult[0].cart_id;

      // Step 2: Delete existing items
      const deleteQuery = 'DELETE FROM cart_items WHERE cart_id = ?';
      dbase.query(deleteQuery, [cartId], (delErr) => {
        if (delErr) {
          console.error('Error deleting cart items:', delErr);
          return res.status(500).json({ message: 'Failed to clear existing cart items.' });
        }

        // Step 3: Prepare values for bulk insert
        const values = cartItems.map(item => [cartId, userId, item.item_id, item.quantity]);
        console.log(values);
        
        // Step 4: Insert updated cart items (add user_id to the query)
        const insertQuery = `
          INSERT INTO cart_items (cart_id, user_id, product_id, quantity) VALUES ?
        `;
        
        dbase.query(insertQuery, [values], (insertErr) => {
          if (insertErr) {
            console.error('Error inserting cart items:', insertErr);
            return res.status(500).json({ message: 'Failed to update cart items.' });
          }
        
          res.status(200).json({ message: 'Cart updated successfully.' });
        });
      });
    });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
