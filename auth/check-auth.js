const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        console.log("headers: ", req.headers.authentication);
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, "jwt_key");
        req.userData = decoded;
        console.log(decoded);
        next();
    } catch (error) {
        console.log("error: ", error);
        return res.status(401).json({ messsage: "Auth failed!" });
    }
};
