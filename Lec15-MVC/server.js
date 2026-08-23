console.log("Learning MVC model");
console.log("M : Model → Data/Database ka kaam");
console.log("V : Views → User ko kya dikhana hai");
console.log("C : Controllers → Request aane par kya karna hai");

import express from "express";
import mongoose from "mongoose";

// User ko import kr rhe hain
// import { User } from "./models/User.js";

// userRegister Ko import kro
import { userRegister } from "./controllers/user.js";

// jab bhi database se connect kr rhe ho toh ye dono jarur kro agar env use kr rhe ho toh
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // Form se aane wale URL-encoded data ko parse karke req.body mein store karega

// connectiong with database
mongoose
  // dbName me spaces nhi dena h
  .connect(process.env.MONGO_URI, { dbName: "NodeJs_Mastery_Course" })
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log("Error :", e));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

// Isko humne controllers me daal diya toh isliye yaha se comment
// // To save info in database collected from form
// app.post("/form-submit", async (req, res) => {
//   // form ka jo bhi data rhega vo req me aayega
//   console.log(req.body);
//   try {
//     // basically create method me jo bhi data dalenge vo dbs me chale jaata hai
//     // User.create() → us data ko MongoDB collection me insert/save karta hai
//     // user → jo data database me save hua, uska created document return karta hai
//     let user = await User.create(req.body);
//     res.json({
//       message: "User Created successfully",
//       newUser: user,
//       success: true,
//     });
//   } catch (error) {
//     res.json({ message: error.message });
//   }
// });

// Same logiic but ab controllers ke through access
app.post("/form-submit", userRegister);

const port = 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
