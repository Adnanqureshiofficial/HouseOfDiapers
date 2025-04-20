// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const dbase = require('../database')

router.get('/getorders/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const query = `
        SELECT 
          orders.order_id, 
          orders.total_price, 
          orders.status, 
          orders.created_at, 
          order_items.product_id, 
          order_items.quantity, 
          order_items.price,
          products.product_name,
          products.image
        FROM orders
        LEFT JOIN order_items ON orders.order_id = order_items.order_id
        LEFT JOIN products ON order_items.product_id = products.id
        WHERE orders.user_id = ? AND orders.is_deleted = FALSE
        ORDER BY orders.created_at DESC;
      `;
  
      const [rows] = await dbase.promise().query(query, [userId]);
  
      if (rows.length === 0) {
        return res.status(404).json({ message: 'No orders found for this user.' });
      }
  
      const ordersMap = new Map();
  
      rows.forEach(row => {
        const {
          order_id,
          total_price,
          status,
          created_at,
          product_id,
          quantity,
          price,
          product_name,
          image
        } = row;
  
        if (!ordersMap.has(order_id)) {
          ordersMap.set(order_id, {
            order_id,
            total_price,
            status,
            created_at,
            items: []
          });
        }
  
        if (product_id) {
          ordersMap.get(order_id).items.push({
            product_id,
            product_name,
            image,
            quantity,
            price
          });
        }
      });
  
      const orders = Array.from(ordersMap.values());
  
      res.json(orders);
  
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
// Route to cancel an order by orderId
router.patch('/cancelorder/:orderId', async (req, res) => {
    const { orderId } = req.params;
  
    try {
      // Update the order to mark it as deleted
      const updateQuery = 'UPDATE orders SET is_deleted = TRUE WHERE order_id = ?';
      const [result] = await dbase.promise().query(updateQuery, [orderId]);
  
      if (result.affectedRows === 0) {
        // If no order was found with the given orderId
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Successfully cancelled the order
      res.json({ message: 'Order cancelled successfully' });
    } catch (error) {
      console.error('Error cancelling order:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  //place order
  router.post('/place/:userId', (req, res) => {
    const userId = req.params.userId;
    const { cartItems, total_price } = req.body;
  console.log(cartItems)
    if (!cartItems || cartItems.length === 0 || !total_price) {
      return res.status(400).json({ error: 'Cart items or total price missing' });
    }
  
    // Step 1: Insert into orders
    const orderQuery = `INSERT INTO orders (user_id, total_price, status, is_deleted) VALUES (?, ?, 'confirmed', 0)`;
    dbase.query(orderQuery, [userId, total_price], (orderErr, orderResult) => {
      if (orderErr) {
        console.error('Error inserting into orders:', orderErr);
        return res.status(500).json({ error: 'Failed to place order' });
      }
  
      const orderId = orderResult.insertId;
  
      // Step 2: Prepare order_items insert
      const itemValues = cartItems.map(item => [orderId, item.item_id, item.quantity, item.price]);
      const itemQuery = `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?`;
  
      dbase.query(itemQuery, [itemValues], (itemErr) => {
        if (itemErr) {
          console.error('Error inserting into order_items:', itemErr);
          return res.status(500).json({ error: 'Failed to save order items' });
        }
  
        return res.status(201).json({ message: 'Order placed successfully', order_id: orderId });
      });
    });
  });

  router.get('/admin/orders', async (req, res) => {
    try {
      const query = `
        SELECT 
          o.order_id, o.total_price, o.status, o.created_at AS order_created_at, o.is_deleted,
          u.id AS user_id, u.name, u.username, u.email, u.phone, u.role, u.createdAt AS user_created_at,
          ua.address, ua.created_at AS address_created_at, ua.updated_at AS address_updated_at,
          oi.product_id, oi.quantity, oi.price
        FROM orders o
        JOIN users u ON o.user_id = u.id
        LEFT JOIN user_addresses ua ON u.id = ua.user_id
        JOIN order_items oi ON o.order_id = oi.order_id
        WHERE o.is_deleted = FALSE
        ORDER BY o.created_at DESC;
      `;
  
      const [rows] = await dbase.promise().query(query);
  
      const ordersMap = new Map();
  
      rows.forEach(row => {
        const {
          order_id, total_price, status, order_created_at, is_deleted,
          user_id, name, username, email, phone, role, user_created_at,
          address, address_created_at, address_updated_at,
          product_id, quantity, price
        } = row;
  
        if (!ordersMap.has(order_id)) {
          ordersMap.set(order_id, {
            order_id,
            total_price,
            status,
            created_at: order_created_at,
            is_deleted,
            user: {
              user_id,
              name,
              username,
              email,
              phone,
              role,
              createdAt: user_created_at
            },
            address: {
              address,
              created_at: address_created_at,
              updated_at: address_updated_at
            },
            items: []
          });
        }
  
        ordersMap.get(order_id).items.push({ product_id, quantity, price });
      });
  
      res.json(Array.from(ordersMap.values()));
    } catch (err) {
      console.error('Admin orders fetch error:', err);
      res.status(500).json({ message: 'Failed to fetch orders' });
    }
  });
  
  router.patch('/update-status/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
  
    if (!status) {
      return res.status(400).json({ message: 'Order status is required.' });
    }
  
    try {
      const updateQuery = `
        UPDATE orders 
        SET status = ?
        WHERE order_id = ? AND is_deleted = FALSE
      `;
  
      const [result] = await dbase.promise().query(updateQuery, [status, orderId]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Order not found or already deleted.' });
      }
  
      res.status(200).json({ message: 'Order status updated successfully.' });
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
module.exports = router;
