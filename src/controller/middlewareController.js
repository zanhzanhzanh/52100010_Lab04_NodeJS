const jwt = require("jsonwebtoken");

// Kiểm tra Token
const verifyToken = (req, res, next) => {
    // Get Token from header
    const token = req.headers.authorization;

    // Nếu có token
    if (token) {
        const accessToken = token.split(" ")[1];

        // Kiểm tra Token
        jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, decode) => {
            if (err) {
                res.status(403).json("Token is not valid!");
            }

            // Lấy payload
            req.user = decode;
            next();
        });
    } else {
        res.status(401).json("You're not authenticated");
    }
};

// Kiểm tra Admin
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.admin) {
            next();
        } else {
            res.status(403).json("You're not allowed to do that!");
        }
    });
};

module.exports = {
    verifyToken,
    verifyTokenAndAdmin,
};