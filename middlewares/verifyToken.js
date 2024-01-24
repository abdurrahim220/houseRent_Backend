

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.cookies && req.cookies["auth_token"];
    // console.log(token)

    if (!token) {
        return res.status(401).json({ message: "unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decoded.userId;
        console.log(req.userId )
        next();
    } catch (error) {
        return res.status(401).json({ message: "unauthorized" });
    }
};

module.exports = verifyToken;

