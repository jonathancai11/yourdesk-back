// import mongoose from 'mongoose'; 
// import list from '../models/listModel.js';

// exports.getDesk = (req, res) => {
//     list.findById(req.params.listId, (err, list) => {
//         if (err) {
//             res.send(err);
//         }

//         res.json(list);
//     });
// };

exports.getAllDesks = (req, res) => {
    // list.find({}, (err, lists) => {
    //     if (err) {
    //         res.send(err);
    //     }

    //     res.json(lists);
    // });
    console.log("Getting all desks!");
};

exports.createDesk = (req, res) => {
    console.log("Creating new desk!")
    console.log("Received body:");
    console.log(req.body);
    // const newDesk = new list(req.body);
    // newDesk.save((err, list) => {
    //     if (err) {
    //         res.send(err);
    //     }

    //     res.json(list);
    // });
};