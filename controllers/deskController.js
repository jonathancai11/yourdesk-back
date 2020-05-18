// import mongoose from 'mongoose'; 
// import list from '../models/listModel.js';
var desks = [];

var latestId = 0;

exports.getAllDesks = (req, res) => {
    console.log("Getting all " + desks.length.toString() + " desks!");
    res.json({
        desks: desks
    });
};

exports.getDesk = (req, res) => {
    console.log("Getting desk!");
    var { username, deskId } = req.query;
    var deskInt = parseInt(deskId);

    for (let i = 0; i < desks.length; i++) {
        if (desks[i].id === deskInt) {
            res.json({
                success: true,
                desk: desks[i],
            })
            return;
        }
    }

    res.json({
        success: false
    })
};

exports.createDesk = (req, res) => {
    console.log("Creating new desk!")
    var { desk } = req.body;
    desk.id = ++latestId;
    desks.push(desk);
    res.json({
        success: true
    })
};

exports.deleteAllDesks = (req, res) => {
    console.log("Deleting all desks!")
    desks = [];
    res.json({
        success: true
    })
};

exports.getFeaturedDesks = (req, res) => {
    console.log("Getting all " + desks.length.toString() + " desks!");
    res.json({
        desks: desks.slice(0, 5)
    });
}