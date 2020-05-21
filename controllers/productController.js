import sampleData from './sample.json';
import Product from '../models/productModel';

var products = sampleData.products;

exports.getAllProducts = (req, res) => {
    console.log("Getting all products!");
    Product.find({}, (err, products) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json({
                products: products,
                success: true
            });
        }
    })
};


exports.getProduct = (req, res) => {
    console.log("Getting single product!");
    res.json({
        success: false
    });
};


exports.createProduct = (req, res) => {
    console.log("Creating single product!");
    let {product} = req.body;
    let newProduct = new Product(product);
    newProduct.save((err, x) => {
        if (err) {
            res.send(err);
        } else {
            res.json({
                success: true
            });
        }
    });
};

exports.getFeaturedProducts = (req, res) => {
    console.log("Getting all featured products!");
    Product.find({}, (err, products) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json({
                products: products,
                success: true
            });
        }
    });
}