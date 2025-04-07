const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports = async function (req, res, next) { // Ensure correct export
    if (!req.cookies.token) {
        req.flash('error', 'You need to login first');
        return res.redirect('/');
    }

    try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        req.user = await userModel
            .findOne({ email: decoded.email })
            .select('-password');
        next();
    } catch (error) {
        req.flash('error', 'You need to login first');
        return res.redirect('/');
    }
};
