import deskbook from '../controllers/deskController';

export default (app) => {
    app.route('/desks')
        .get(deskbook.getAllDesks)
        // .post(deskbook.createDesk)
        // .delete(deskbook.deleteAllDesks);

    app.route('/desks/new')
        .put(deskbook.createDesk)
        // .get(deskbook.getDesk)
        // .delete(deskbook.deleteDesk);
};
