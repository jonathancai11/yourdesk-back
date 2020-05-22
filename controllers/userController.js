import axios from "axios";

exports.getUser = (req, res) => {
    let { user_id } = req.query;
    console.log("getting user " + user_id);
    axios({
        method: "GET",
        url: "https://my-desk-tour.auth0.com/api/v2/users/" + user_id,
    }).then(resp => {
        let user = resp.data;
        res.json({
            user: user,
            sucess: true
        })
    }).catch(err => {
        res.json({
            success: false
        })
    });
};
