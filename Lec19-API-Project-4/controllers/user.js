import { User } from "../models/User.js";

// password ko hash krne ke liye
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

// ==================== REGISTER ====================
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  // handling empty field
  if (name === "" || email === "" || password === "") {
    return res.json({ message: "All Fields are required to be filled" });
  }

  // checking ki kya same gmail pahle exist krta hai ya nhi
  let user = await User.findOne({ email });
  if (user) {
    return res.json({
      message: `User with ${email} already exists.`,
      success: false,
    });
  }

  // ye password ko hash kr diya hai hash func ka use krke
  // 10 batata hai password ko kitna difficult/strong tarike se hash karna hai
  const hashPassword = await bcrypt.hash(password, 10);

  // DBs me save krne ke liye uska new object bna ke pass kr do
  // Agar user database me exist nhi krta toh database me save kr do
  user = await User.create({ name, email, password: hashPassword });

  return res.json({
    message: "User Created Successfully",
    success: true,
    user: user,
  });
};

// ==================== LOGIN ====================
export const login = async (req, res) => {
  const { email, password } = req.body;

  // handling empty field
  if (email === "" || password === "") {
    return res.json({ message: "All Fields are required to be filled" });
  }

  // checking ki user exist krta hai ki nhi with gmail
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "User does not exist", success: false });
  }

  // agar gmail exist krta hai toh fir password dekh rhe hain ki match krta hai ya nhi
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({
      message: "The password you entered is invalid",
      success: false,
    });
  }

  // token banane ke liye jwt ka sign method use karenge
  // pehle object me jis user ka token banana hai uska data denge
  // aur second parameter me secret key denge
  // ye secret key baad me token ko verify karne ke kaam aayegi
  // expiresIn ye batata hai ki kitne din me expire ho jaayega ye token
  // ye token jo generate hoga agar usko hhum jwt.io pe jaake dalenge toh vo poori details user ki laake de dega
  const token = jwt.sign({ userId: user._id }, "#@1430", { expiresIn: "1d" });

  // agar sab pass ho rha hai toh welcome message dikha do
  return res.json({
    message: `Welcome ${user.name.toUpperCase()}`,
    // token ko response me dena zaroori hai
    // frontend is token ko store karke future requests me use karega
    token: token,
    success: true,
  });
};
