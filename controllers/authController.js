const bcrypt = require("bcrypt");
const userModel = require("../models/user-model");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async function (req, res) {
    try {
        let { fullname, email, password } = req.body;

        // Check if the email already exists
        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).send("You already have an account, please login");
        }

        // Generate salt and hash password
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return res.status(500).send(err);

            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.status(500).send(err);

                // Create new user
                let user = await userModel.create({
                    fullname,
                    email,
                    password: hash,
                });

                // Generate token and set cookie
                const token = generateToken(user);
                res.cookie('token', token, { httpOnly: true });
                res.status(201).send("User created successfully");
            });
        });
    } catch (error) {
        res.status(500).send(error);
    }
};
module.exports.loginUser = async function (req, res) {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email });
        if (!user) return res.status(400).send("Invalid email or password");

        bcrypt.compare(password, user.password, function (err, result) {
            if (err) return res.status(500).send(err);
            if (result) {
                const token = generateToken(user);
                res.cookie('token', token, { httpOnly: true });
                return res.status(200).redirect('/shop');
            } else {
                return res.status(400).send("Invalid email or password");
            }
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
}
module.exports.logoutUser = function (req, res) {
    res.clearCookie('token');
    res.status(200).send("Logged out successfully");
}
