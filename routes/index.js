import deskbook from '../controllers/deskController';
import productbook from '../controllers/productController';
import image from '../controllers/imageController';
import userbook from '../controllers/userController';

export default (app) => {

    app.route('/api/desk/all/featured')
        .get(deskbook.getFeaturedDesks);

    app.route('/api/desk/all')
        .get(deskbook.getAllDesks)
        .delete(deskbook.deleteAllDesks);

    app.route('/api/desk')
        .get(deskbook.getDesk)
        .post(deskbook.createDesk)

    app.route('/api/product')
        .get(productbook.getProduct)
        .post(productbook.createProduct)

    app.route('/api/product/all')
        .get(productbook.getAllProducts)

    app.route('/api/product/featured')
        .get(productbook.getFeaturedProducts)

    app.route('/api/image/upload')
        .post(image.uploadImage)

    app.route('/api/user')
        .get(userbook.getUser)

};
