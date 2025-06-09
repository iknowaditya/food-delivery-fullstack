const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  // Extract token from Bearer token format

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, token missing",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.id;
        next();
    } catch (err) {
<<<<<<< HEAD
       console.error("JWT verification error:", err);
=======
        console.error("JWT verification error:", err);
>>>>>>> c2d17e1 (some ui update or login update)
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

module.exports = authMiddleware;
