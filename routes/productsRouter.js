const express = require('express');
const router = express.Router();
const Product = require('../models/product-model');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        // Log the products to verify data is being returned
        console.log('Products:', products);
        res.render('shop', { products });
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
