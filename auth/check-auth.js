const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        console.log(req.headers);
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "jwt_key");
        req.userData = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ messsage: 'Auth failed!' });
    }
}