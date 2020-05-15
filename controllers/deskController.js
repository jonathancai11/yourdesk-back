// import mongoose from 'mongoose'; 
// import list from '../models/listModel.js';
var desks = [];

exports.getAllDesks = (req, res) => {
    console.log("Getting all " + desks.length.toString() + " desks!");
    res.json({
        desks: desks
    });
};

exports.createDesk = (req, res) => {
    console.log("Creating new desk!")
    var { desk } = req.body;
    desks.push(desk);
    res.json({
        good: true
    })
};

exports.deleteAllDesks = (req, res) => {
    console.log("Deleting all desks!")
    desks = [];
    res.json({
        good: true
    })
};