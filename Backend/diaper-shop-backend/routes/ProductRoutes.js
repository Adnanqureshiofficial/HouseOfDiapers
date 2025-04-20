
const express = require('express');
const router = express.Router();
const upload = require('../utils/imageUpload');
const dbase = require('../database'); // adjust if your DB connection file is elsewhere

// POST route to add product with category
router.post('/addproduct', upload.single('image'), (req, res) => {
    const { productName, price, size, inStock, description, category } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
  
    // Validation: Check if all required fields are present
    if (!productName || !price || !size || !description || !category || !imagePath) {
      return res.status(400).json({ message: 'All fields including category and image are required.' });
    }
  
    const insertQuery = `
      INSERT INTO products (product_name, price, size, in_stock, image, description, category)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
  
    dbase.query(
      insertQuery,
      [productName, price, size, inStock === 'true' ? 1 : 0, imagePath, description, category],
      (err, result) => {
        if (err) {
          console.error('Error inserting product:', err);
          return res.status(500).json({ message: 'Server error. Failed to add product.' });
        }
        res.status(200).json({ message: 'Product added successfully' });
      }
    );
  });
  
// send all products to frontend 


router.get('/fetchproducts', (req, res) => {
  const sqlquery = 'SELECT * FROM products';

  dbase.query(sqlquery, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ error: 'Failed to fetch products' });
    }

    // Add full URL to image path
    const updatedResults = results.map((product) => ({
      ...product,
      image: `${req.protocol}://${req.get('host')}${product.image}`,
      
    }));
   

    res.json(updatedResults);
  });
});

  

//   update stock status of product 

router.patch('/updateStockStatus/:id', (req, res) => {
    const productId = req.params.id;
    const { inStock } = req.body;
  
    // Ensure inStock is either 1 or 0
    if (inStock !== 1 && inStock !== 0) {
        console.log('Invalid stock value:', inStock);
        return res.status(400).json({ error: 'Invalid inStock value. Must be 1 or 0.' });
      }

    const query = 'UPDATE products SET in_stock = ? WHERE id = ?';
  
    dbase.query(query, [inStock ? 1 : 0, productId], (err, result) => {
      if (err) {
        console.error('Error updating stock status:', err);
        return res.status(500).json({ error: 'Database error' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({ message: 'Stock status updated successfully' });
    });
  });

//delete products
router.delete('/deleteproduct/:id', (req, res) => {
    const productId = req.params.id;
  
    const sqlquery = 'DELETE FROM products WHERE id = ?';
  
    dbase.query(sqlquery, [productId], (err, result) => {
      if (err) {
        console.error('Error deleting product:', err);
        return res.status(500).json({ error: 'Database error' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({ message: 'Product deleted successfully' });
    });
  });
  


module.exports = router;






