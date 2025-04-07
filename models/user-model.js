const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        minlength: 3,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    cart: {
        type: Array,
        default: []
    },
    orders: {
        type: Array,
        default: []
    },
    contact: Number,
    picture: String,
});

module.exports = mongoose.model('user', userSchema);