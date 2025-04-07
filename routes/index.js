const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');

router.get('/', function (req, res) {
    const error = new Error('This is an error');
    res.render('index', { error });
});

router.get('/shop', isLoggedIn, function (req, res) {
    res.render('shop');
});

module.exports = router;
