const express = require("express");
const userRouter = express.Router();
const {
  loginUser,
  registerUser,
  getAllUsers,
} = require("../controllers/userController");
const { googleLoginUser } = require("../controllers/googleLoginUser");

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
// get all users (for admin purposes) only creat route getAllUsers
userRouter.get("/getAllUsers", getAllUsers);
userRouter.post("/google-login", googleLoginUser);

module.exports = userRouter;
