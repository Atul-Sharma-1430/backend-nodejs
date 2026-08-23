import { User } from "../models/User.js";

// Ye humne pahle direclty server.js me hi likh diye the but generally jo main working logic hota hai usko controllers me rakhte hain
export const userRegister = async (req, res) => {
  // form ka jo bhi data rhega vo req me aayega
  console.log(req.body);
  try {
    // basically create method me jo bhi data dalenge vo dbs me chale jaata hai
    // User.create() → us data ko MongoDB collection me insert/save karta hai
    // user → jo data database me save hua, uska created document return karta hai
    let user = await User.create(req.body);
    res.json({
      message: "User Created successfully",
      newUser: user,
      success: true,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
