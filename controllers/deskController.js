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
    let products = Object.values(desk.products.byIds);
    let deskProducts = [];

    for (let i = 0; i < products.length; i++) {
        let { product } = products[i];
        let deskProduct = {
            coordX: product.coords.x,
            coordY: product.coords.y,
            id: product.id,
            product: product.productId,
            pros: product.pros,
            cons: product.cons,
            saved: true,
            selected: false
        };

        let newDeskProduct = new DeskProduct(deskProduct);
        
        newDeskProduct.save((err, x) => {
            if (err) {
                console.log("FUCKED UP CREATING DESK PRODUCT");
                res.send(err);
                return;
            } else {
                deskProducts.push(x._id);
            }
        });
    }

    delete desk.products;
    desk.desk_products = deskProducts;
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