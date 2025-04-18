// routes/productRoutes.js
const express = require('express');
const router = express.Router();

// Sample product routes
router.get('/addProduct', (req, res) => {
    res.send('THis is add product route');
});

router.get('/getProduct', (req, res) => {
    res.send('THis is get product route');
});

module.exports = router;






