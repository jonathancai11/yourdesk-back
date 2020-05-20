import mongoose from 'mongoose'; 
import Desk from '../models/deskModel.js';

var desks = [];

var latestId = 0;

exports.getAllDesks = (req, res) => {
    console.log("Getting all " + desks.length.toString() + " desks!");
    console.log(desks);
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

    console.log(desk);
    desk.date_created = Date.parse(desk.date_created);
    let products = Object.values(desk.products.byIds);

    for (let i = 0; i < products.length; i++) {
        console.log(products[i].brand);
    }
    
    // let newDesk = new Desk(desk);

    // newDesk.save((err, x) => {
    //     if (err) {
    //         console.log(err);
    //         // res.send(err);
    //     } else {
    //         // res.json({
    //         //     success: true
    //         // });
    //     }
    // });

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