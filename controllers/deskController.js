import mongoose from 'mongoose'; 
import Desk from '../models/deskModel.js';
import DeskProduct from '../models/deskProductModel.js';

var desks = [];

var latestId = 0;

exports.getAllDesks = (req, res) => {
    console.log("Getting all desks!");
    Desk.find({}, (err, desks) => {
        if (err) {
            res.send(err);
        } else {
            res.json({
                succes: true,
                desks: desks
            });
        }
    })
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

    // desk.date_created = Date.parse(desk.date_created); 
    desk.date_created = new Date(); // CHANGE LATER
    let deskProducts = Object.values(desk.deskProducts.byIds);
    let newDeskProducts = [];

    let failedDesk = 0;

    for (let i = 0; i < deskProducts.length; i++) {
        let { deskProduct } = deskProducts[i];
        let createDeskProduct = {
            coordX: deskProduct.coords.x,
            coordY: deskProduct.coords.y,
            id: deskProduct.id,
            product: deskProduct.product._id,
            pros: deskProduct.pros,
            cons: deskProduct.cons,
            saved: true,
            selected: false
        };
        let newDeskProduct = new DeskProduct(createDeskProduct);
        newDeskProduct.save((err, x) => {
            if (err) {
                console.log("Bad desk product");
                console.log(createDeskProduct);
                res.send(err);
                failedDesk = 1;

                return;
            } else {
                newDeskProducts.push(x._id);
            }
        });
    }

    if (failedDesk == 1) {
        console.log("Not creating desk cus bad shit");
        return;
    }

    delete desk.deskProducts;
    desk.desk_roducts = newDeskProducts;
    let newDesk = new Desk(desk);

    newDesk.save((err, x) => {
        if (err) {
            console.log(err);
            res.send(err);
            return;
        } else {
            console.log("Successfully created desk!");
            res.json({
                success: true
            });
        }
    });
};

exports.deleteAllDesks = (req, res) => {
    console.log("Deleting all desks!")
    desks = [];

    Desk.deleteMany({}, (err) => {
        if (err) {
            res.send(err);
        }
    });

    DeskProduct.deleteMany({}, (err) => {
        if (err) {
            res.send(err);
        } else {
            res.json({
                success: true
            })
        }
    })
};

exports.getFeaturedDesks = (req, res) => {
    console.log("Getting all featured desks!");
    Desk.find({}, (err, desks) => {
        if (err) {
            res.send(err);
        } else {
            res.json({
                succes: true,
                desks: desks
            });
        }
    })
}