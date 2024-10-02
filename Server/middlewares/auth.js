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
        req.body.userId = decoded.id;  // Pass the user ID to the request body
        next();
    } catch (err) {
        console.error("JWT Error:", err);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

module.exports = authMiddleware;
