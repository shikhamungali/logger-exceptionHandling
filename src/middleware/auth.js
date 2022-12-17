const jwt = require('jsonwebtoken')

const authentication = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) {
            return res.status(401).send({ status: false, msg: "token must be present" })
        };
        //============================= decoding the token ========================================
        let decodedToken = jwt.verify(token, "Blogging_site_group_35", function (error, decodedToken) {
            if (error) {
                return res.status(401).send({ status: false, msg: "token is invalid" })
            } else {
                req.loggedInAuthorId = decodedToken._id
                next()
            }
        });
    }
    catch (error) {
        return res.status(500).send({ status: false, Error: error.message })
    }

}





module.exports = { authentication }