exports.uploadImage = (req, res) => {
    var { image } = req.body;
    console.log(image);
    res.json({
        success: true
    })
}