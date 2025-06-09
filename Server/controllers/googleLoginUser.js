const { OAuth2Client } = require("google-auth-library");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel"); // Make sure this path is correct
const createToken = require("../utils/createToken"); // Your JWT creation logic
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google Login Controller
const googleLoginUser = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Token is required",
    });
  }

  try {
    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    if (!email || !name) {
      return res.status(400).json({
        success: false,
        message: "Google account information incomplete",
      });
    }

    // Check if user already exists
    let user = await userModel.findOne({ email });

    // If user doesn't exist, create one
    if (!user) {
      const hashedPassword = await bcrypt.hash("GOOGLE_AUTH", 10); // dummy password
      user = await userModel.create({
        name,
        email,
        password: hashedPassword,
      });
    }

    // Generate JWT token
    const authToken = createToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Google login successful",
      token: authToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Google login error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid Google token or authentication failed",
    });
  }
};

module.exports = { googleLoginUser };
