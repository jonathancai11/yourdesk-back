import mongoose from 'mongoose'; 
import Desk from '../models/deskModel.js';
import DeskProduct from '../models/deskProductModel.js';
import axios from "axios";
var desks = [];
var request = require("request");

const AUTH0_API_TOKEN="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlZuR1RveGNTaHVVSXRTSjg3amlPTCJ9.eyJpc3MiOiJodHRwczovL215LWRlc2stdG91ci5hdXRoMC5jb20vIiwic3ViIjoiNzRVRmI1V2Y1bzRMS0pkMjF1YXdIRVBJWGxWY20yQ1lAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vbXktZGVzay10b3VyLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNTkwMTExMDgzLCJleHAiOjE1OTAxOTc0ODMsImF6cCI6Ijc0VUZiNVdmNW80TEtKZDIxdWF3SEVQSVhsVmNtMkNZIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSByZWFkOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl9jdXN0b21fYmxvY2tzIGRlbGV0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmhvb2tzIHVwZGF0ZTpob29rcyBkZWxldGU6aG9va3MgY3JlYXRlOmhvb2tzIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyB1cGRhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyByZWFkOmFub21hbHlfYmxvY2tzIGRlbGV0ZTphbm9tYWx5X2Jsb2NrcyB1cGRhdGU6dHJpZ2dlcnMgcmVhZDp0cmlnZ2VycyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIGNyZWF0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIGRlbGV0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIHJlYWQ6Y3VzdG9tX2RvbWFpbnMgZGVsZXRlOmN1c3RvbV9kb21haW5zIGNyZWF0ZTpjdXN0b21fZG9tYWlucyB1cGRhdGU6Y3VzdG9tX2RvbWFpbnMgcmVhZDplbWFpbF90ZW1wbGF0ZXMgY3JlYXRlOmVtYWlsX3RlbXBsYXRlcyB1cGRhdGU6ZW1haWxfdGVtcGxhdGVzIHJlYWQ6bWZhX3BvbGljaWVzIHVwZGF0ZTptZmFfcG9saWNpZXMgcmVhZDpyb2xlcyBjcmVhdGU6cm9sZXMgZGVsZXRlOnJvbGVzIHVwZGF0ZTpyb2xlcyByZWFkOnByb21wdHMgdXBkYXRlOnByb21wdHMgcmVhZDpicmFuZGluZyB1cGRhdGU6YnJhbmRpbmcgZGVsZXRlOmJyYW5kaW5nIHJlYWQ6bG9nX3N0cmVhbXMgY3JlYXRlOmxvZ19zdHJlYW1zIGRlbGV0ZTpsb2dfc3RyZWFtcyB1cGRhdGU6bG9nX3N0cmVhbXMgY3JlYXRlOnNpZ25pbmdfa2V5cyByZWFkOnNpZ25pbmdfa2V5cyB1cGRhdGU6c2lnbmluZ19rZXlzIHJlYWQ6bGltaXRzIHVwZGF0ZTpsaW1pdHMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.H3-XSFiVSbgd7E9Jhsswpjv1LNFqkX4_mlTwQEoenb9FCbom5ATrIbbSyNwOKaU2KSD9ZjKnoIr8JT4mIuYbHiPHMq0vgxb2zJ7xA5sWFsCjH_08SGbMdWRD6L_2En9U2yoq6StOf7bemo3WWLOQp4NuNeNkUmoGTbaan4ybfAFGqPb4ps3p58l3TI-HzjTG0ipkN6vXPJtmyrhwVBmNm8eIZLwLLAI9p-dif6DfUASS6rotmz2sjFsXme0cZ-qU7f2eSoNKdeZM_hAt0FfakVYf5lUO6SZ4tmL-0rOPiZslbRh4xA7rlJ0yBCKf-0Pn1XtrLCF4jnGwV2mWOS6NlA"
axios.defaults.headers.common['authorization'] = 'Bearer ' + AUTH0_API_TOKEN;

var latestId = 0;

// kill -9 $(lsof -ti tcp:5000) 

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

    desk.user_id = desk.user.sub;

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

    // Delete all desks
    Desk.deleteMany({}, (err) => {
        if (err) {
            res.send(err);
        }
    });

    // Delete all desk products
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