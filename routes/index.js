import deskbook from '../controllers/deskController';

export default (app) => {
    app.route('/desk/all')
        .get(deskbook.getAllDesks)
        .delete(deskbook.deleteAllDesks);

    app.route('/desk')
        .get(deskbook.getDesk)
        .post(deskbook.createDesk)
};
