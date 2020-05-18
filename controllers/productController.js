import sampleData from './sample.json';

var products = sampleData.products;

exports.getAllProducts = (req, res) => {
    console.log("Getting all " + products.length.toString() + " products!");
    res.json({
        products: products,
        success: true
    });
};


exports.getProduct = (req, res) => {
    console.log("Getting single product!");
    res.json({
        success: true
    });
};


exports.createProduct = (req, res) => {
    console.log("Creating single product!");
    res.json({
        success: true
    });
};

exports.getFeaturedProducts = (req, res) => {
    console.log("Getting all featured products!");
    res.json({
        products: products.slice(0, 5),
        success: true
    });
}