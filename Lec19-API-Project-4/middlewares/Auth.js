import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
// "isAuthenticated" naam hum kuch bhi rakh sakte hain,ye middleware ka naam hai
export const isAuthenticated = async (req, res, next) => {
  // Request ke header se token nikal rahe hain
  // "Auth" header ka naam hai, isko hum apni requirement ke according rakh sakte hain
  const token = req.header("Auth");

  // Agar token nahi mila matlab user login nahi hai
  if (!token) {
    return res.json({
      message: "Login First",
      success: false,
    });
  }

  // Token ko verify kar rahe hain
  // "#@1430" wahi secret key hai jo token generate/sign karte time use ki thi
  // Agar token invalid/expired hua toh jwt.verify error throw karega
  const decoded = jwt.verify(token, "#@1430");

  // Decoded token se userId nikal rahe hain
  // Login ke time token ke andar userId store ki thi
  const id = decoded.userId;

  // Ab us userId ke basis par database se user ko find kar rahe hain
  let user = await User.findById(id);

  // Agar user database mein exist nahi karta
  if (!user) {
    return res.json({
      message: "User not found",
    });
  }

  // User ko request object ke andar store kar rahe hain
  // Isse next controller/middleware mein req.myUser se user ko access kar sakte hain
  req.myUser = user;

  // Sab kuch successfully verify hone ke baad
  // request ko next middleware/controller ke paas bhej rahe hain
  next();
};
