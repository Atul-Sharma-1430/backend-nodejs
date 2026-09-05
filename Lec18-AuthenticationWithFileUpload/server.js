import express from "express";
import mongoose from "mongoose";

// load krna hai pahle then use krne ke liye import
import multer from "multer";

// load krna hai pahle then use krne ke liye import
import { v2 as cloudinary } from "cloudinary";
import path from "path";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.static("public"));

// Express ko form ka data read karne ke liye urlencoded middleware chahiye.
// MiddleWare
app.use(express.urlencoded({ extended: true }));

// ==================== MONGOOSE ====================
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "NodeJs_Mastery_Course",
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("Error :", error));

// ==================== DEFAULT PAGE ====================
app.get("/", (req, res) => {
  res.render("login.ejs", { url: null });
});

// ==================== RENDERING REGISTER PAGE ====================
app.get("/register", (req, res) => {
  res.render("register.ejs", { url: null });
});

// ==================== CLOUDINARY ====================

// Cloudinary ki configuration Ye details Cloudinary account se milti hain
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ==================== MULTER ====================

// Multer ka storage configure kar rahe hain
// Isse decide hota hai ki uploaded file ko temporarily
// server par kaise store karna hai
const storage = multer.diskStorage({
  // Har baar jab tum new photo upload karoge, Multer usko ek unique filename dene ke liye ye code
  filename: function (req, file, cb) {
    // Date.now() se unique value milti hai
    // path.extname() original file ka extension (.jpg, .png etc.) deta hai
    const uniqueSuffix = Date.now() + path.extname(file.originalname);

    // Final filename:
    // myFile-123456789.jpg
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

// Multer ko storage configuration de rahe hain
// Middleware
// storage batata hai file ko kaise handle/save karna hai, aur upload = multer({ storage }) un rules ko use karne wala upload system ready karta hai.
const upload = multer({ storage: storage });

// ==================== DTABASE SCHEMA ====================

// MongoDB mein user and image ki information store karne ke liye schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  fileName: String,
  public_id: String,
  imgUrl: String,
});

// NodeJs_Mastery_Course(Cluster) me ek users name ka databse banega userSchema ke liye
const User = mongoose.model("user", userSchema);

// ==================== UPLOAD ROUTE ====================

// "myFile" wahi name hai jo HTML ke input mein diya hai:
// <input type="file" name="myFile">
// upload.single() ka matlab ek time par sirf ek file upload hogi
app.post("/register", upload.single("myFile"), async (req, res) => {
  // Agar user ne file select nahi ki toh req.file undefined hoga
  if (!req.file) {
    return res.status(400).send("Please select a file first");
  }

  // Multer ne uploaded file ka path req.file.path mein diya hai Isi path ki file ko Cloudinary par upload karenge
  const file = req.file.path;

  // Isko sab eksaaath aise krna chahiye instead of doing single single
  const { name, email, password } = req.body;

  // Local/server par stored file ko Cloudinary par upload kar rahe hain
  const cloudinaryRes = await cloudinary.uploader.upload(file, {
    // Cloudinary ke andar image is folder mein save hogi
    folder: "NodeJS_Mastery_Course",
  });

  // ==================== REGISTERING USER ====================
  const db = await User.create({
    name,
    email,
    password,

    // User ke original file ka naam
    fileName: req.file.originalname,

    // Cloudinary ki unique public ID
    // Isse future mein image ko identify/delete kar sakte hain
    public_id: cloudinaryRes.public_id,

    // Cloudinary par uploaded image ka URL
    // Isi URL se frontend par image display hogi
    imgUrl: cloudinaryRes.secure_url,
  });

  // ==================== REDIRECTING AFTER LOGIN ====================

  // jab user register kr lega toh usko login page pr redirect kr do login krne ke liye
  res.redirect("/");
});

// ye Error page ke liye route
app.get("/invalidCredentials", (req, res) => {
  res.render("invalidCredentials.ejs");
});

// ==================== JAB USER LOGIN KREGA TOH KYA HONA CHAHIYE ====================
app.post("/login", async (req, res) => {
  // pahle jo user ne login krne ke liye email pass daala vo nikal lenge
  const { email, password } = req.body;

  // fir email ke basis pe check krenge ki vo databse me exist krta hai ya nhi
  // ye basically user ka poora object laake de dega databse se
  let user = await User.findOne({ email });

  // agar user exist nhi krta hai toh hum error page ko render kr rhe hain
  if (!user) {
    // yaha maine directly render ke badle usko ek dusre route ke through dikha rha hu taaki url ka endpoint bhi change ho accordingly
    return res.redirect("/invalidCredentials");
  }

  // agar user mil gya but usne jo pass daala hai vo galat daala hai toh bhi error page render kr denge
  else if (user.password != password) {
    // yaha maine directly render ke badle usko ek dusre route ke through dikha rha hu taaki url ka endpoint bhi change ho accordingly
    return res.redirect("/invalidCredentials");
  }

  // agar user mil gya means gmail sahi hai and password bhi match ho gya toh uska profile dikha do ans user jo object nikla toh usko bhi bhej denge tabhi ejs file me JS wala code likh payenge
  else {
    return res.render("profile.ejs", { user });
  }
});

const port = 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
