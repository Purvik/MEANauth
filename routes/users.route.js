const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

require('../config/passport')(passport);

//register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'failed to register' });
        } else {
            res.json({ success: true, msg: 'User register' });
        }
    });
});

//authenticate
router.post('/authenticate', (req, res, next) => {

    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: "User Not Found" });
        }

        // console.log("User: " + JSON.stringify(user));

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;

            console.log("isMatch : " + isMatch);

            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: '1h'
                });

                res.json({
                    success: true,
                    token: token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({ success: false, msg: "Wrong Password" });
            }
        });

    });
});

//profile
router.get('/profile', passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        res.json(
            {
                id: req.user._id,
                name: req.user.name,
                username: req.user.username,
                email: req.user.email

            });
    }
);

module.exports = router;