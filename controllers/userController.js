import mongoose from 'mongoose'; 
import User from '../models/userModel.js';

exports.createUser = (req, res) => {
    console.log("Creating user");
    let { user } = req.body;
    console.log(user);
    let newUser = new User(user);
    newUser.save((err, x) => {
        if (err) {
            res.send(err);
        } else {
            res.json({
                success: true
            });
        }
    });
};

exports.getUser = (req, res) => {
    let { email } = req.query;
    console.log("Getting user " + email);
    User.find({'email': email}, (err, x) => {
        if (err) {
            res.send(err);
        } else {
            res.json({
                user: x[0],
                success: x.length > 0
            });
        }
    });
};
