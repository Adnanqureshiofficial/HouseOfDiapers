// routes/productRoutes.js
const express = require('express');
const router = express.Router();

// Sample product routes
router.get('/getCart', (req, res) => {
  res.send('THis is get cart route');
});

router.get('/updateCart', (req, res) => {
    res.send('THis is update Cart route');
});

module.exports = router;
