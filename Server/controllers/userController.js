const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const validator = require('validator')


// login ..
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    try {
        // Check if the user exists
        const existingUser = await userModel.findOne({ email });

        if (!existingUser) {
            // For security, return a generic error message to avoid leaking information
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // Check if the password matches
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // Create a JWT token
        const token = createToken(existingUser._id);

        // Send success response with token
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
        });
    } catch (err) {
        // Handle server error
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


// create token..
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

// Register user..
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;

    // Check if all fields are provided
    if (!name || !password || !email) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    try {
        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Enter a valid email"
            });
        }

        // Ensure password is at least 8 characters long
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters"
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        // Save the user
        const user = await newUser.save();

        // Generate a token
        const token = createToken(user._id);

        // Send success response
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            token
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}


module.exports = {
    loginUser,
    registerUser
}