import deskbook from '../controllers/deskController';

export default (app) => {
    app.route('/desks')
        .get(deskbook.getAllDesks)
        .delete(deskbook.deleteAllDesks);
        // .post(deskbook.createDesk)

    app.route('/desks/new')
        .post(deskbook.createDesk)
        // .get(deskbook.getDesk)
        // .delete(deskbook.deleteDesk);
};
