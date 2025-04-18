const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');

router.get('/', (req, res) => {
    res.send('Owners Route');
});

router.post('/create', async (req, res) => {
    let owner = await ownerModel.find();
    if (owner.length > 0) {
        return res
            .status(504)
            .send('You do not have permission to perform this action');
    }
    
    let { fullname, email, password } = req.body;
    let createdOwner = await ownerModel.create({
        fullname,
        email,
        password,
    });
    res.status(201).send(createdOwner);
});

module.exports = router;