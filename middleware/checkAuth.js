const { User } = require('../models');
const jwt = require("jsonwebtoken");
require("dotenv").config()
const { SECRET_KEY } = process.env;

module.exports = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        next(res.status(401).json("Unauthorized"))
    }
    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user || !user.token || user.token !== token) {
            next(res.status(401).json("Unauthorized"))
        }
        req.user = user;
        next();

    } catch {
        next(res.status(401).json("Unauthorized"))
    }
    
};