import deskbook from '../controllers/deskController';
import productbook from '../controllers/productController';

export default (app) => {

    app.route('/desk/all/featured')
        .get(deskbook.getFeaturedDesks);

    app.route('/desk/all')
        .get(deskbook.getAllDesks)
        .delete(deskbook.deleteAllDesks);

    app.route('/desk')
        .get(deskbook.getDesk)
        .post(deskbook.createDesk)

    app.route('/product')
        .get(productbook.getProduct)
        .post(productbook.createProduct)

    app.route('/product/all')
        .get(productbook.getAllProducts)

    app.route('/product/all/featured')
        .get(productbook.getFeaturedProducts)

};
