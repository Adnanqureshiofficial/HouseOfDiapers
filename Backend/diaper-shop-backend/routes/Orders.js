// routes/productRoutes.js
const express = require('express');
const router = express.Router();

// Sample product routes
router.get('/placeOrder', (req, res) => {
    res.send('THis is place product route');
});

router.get('/FetchOrder', (req, res) => {
    res.send('THis is get order route');
});

module.exports = router;
