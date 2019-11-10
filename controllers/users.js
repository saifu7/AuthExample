const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const userObj = {

    showSignup : (req, res, next) => {
        res.render("users/register");
    },

    userSignUp : (req, res) => {
        console.log(req.body.email)
        console.log(req.body.password)
        User.findOne({ email: req.body.email })
            .exec()
            .then(user => {
                console.log(user)
                if (user) {
                    res.status(409).json({ message: 'Mail exists' });
                }
                else {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            res.status(500).json({ "error": err });
                        }
                        else {
                            const user = new User({
                                _id: new mongoose.Types.ObjectId(),
                                email: req.body.email,
                                password: hash
                            });
                            console.log('eee')
                            user.save()
                                .then(result => {
                                    console.log(result);
                                    res.status(201).redirect('/users/login')
                                    // res.status(201).render("users/login")
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(500).json({ error: err });
                                })
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });
    },

    showLogin : (req, res, next) => {
        console.log('fuck')
        res.render("users/login");
    },

    userLogin: (req, res, next) => {
        console.log(req.body.email);
        console.log(req.body);
        User.find({ email: req.body.email }).exec()
        .then(user => {
            console.log(user.length);
                if (user.length < 1) {
                    res.status(401).json({
                        message: 'Auth failed!!!!'
                    });
                }
                // password match
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        res.status(401).json({ message: 'Auth failed#' });
                    }
                    if (result) {
                        // generate token
                        const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                        },
                         "jwt_key",
                        {
                            expiresIn: "1h"
                        });
                        // console.log(token)
                        // return token
                        res.status(200).redirect('/users/dashboard')
                        // res.status(200).json({
                        //     message: 'Auth Successful',
                        //     token: token
                        // });

                    }
                    // Auth failed
                    // res.status(404).jso({ message: 'Auth failed' });
                });
            })
            .catch(err => {
                res.status(500).json({ error: err });
            });
    },
    showDashboard : (req, res, next) => {
        res.render("users/dashboard")
    },

    userLogout : (req, res, next) => {
        console.log(req)
    },

    deleteUser: (req, res, next) => {

        id = req.params.userId;
        // console.log(req.userData.userId);
        // console.log(id);
        if (req.userData.userId === id){

            User.remove({ _id: id })
                .exec()
                .then(result => {
                res.status(200).json({
                        message: 'User deleted',
                        status: result,
                        request: {
                            type: 'POST',
                            url: 'http://localhost:3000/users/'
                        },
                        body: {
                            email: 'String',
                            password: 'String'
                        }
                    });
                })
                .catch(err => {
                    res.status(500).json({ error: err });
                });
        }
        else{
            res.status(404).status({
                message : "Auth failed!"
            });
            console.log('No Auth');
            // next();
        }
    }
}

module.exports = userObj;

