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
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "NodeJs_Mastery_Course",
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("Error :", error));

app.get("/", (req, res) => {
  res.render("index.ejs", { url: null });
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

// MongoDB mein image ki information store karne ke liye schema
const imageSchema = new mongoose.Schema({
  fileName: String,
  public_id: String,
  imgUrl: String,
});

// Dataabse me ek cloudinary name ka databse banega imageSchema ke liye
const File = mongoose.model("cloudinary", imageSchema);

// ==================== UPLOAD ROUTE ====================

// "myFile" wahi name hai jo HTML ke input mein diya hai:
// <input type="file" name="myFile">
// upload.single() ka matlab ek time par sirf ek file upload hogi
app.post("/upload", upload.single("myFile"), async (req, res) => {
  // Agar user ne file select nahi ki toh req.file undefined hoga
  if (!req.file) {
    return res.status(400).send("Please select a file first");
  }

  // Multer ne uploaded file ka path req.file.path mein diya hai Isi path ki file ko Cloudinary par upload karenge
  const file = req.file.path;

  // Local/server par stored file ko Cloudinary par upload kar rahe hain
  const cloudinaryRes = await cloudinary.uploader.upload(file, {
    // Cloudinary ke andar image is folder mein save hogi
    folder: "NodeJS_Mastery_Course",
  });

  // Cloudinary se mili information MongoDB mein save kar rahe hain
  const db = await File.create({
    // User ke original file ka naam
    fileName: req.file.originalname,

    // Cloudinary ki unique public ID
    // Isse future mein image ko identify/delete kar sakte hain
    public_id: cloudinaryRes.public_id,

    // Cloudinary par uploaded image ka URL
    // Isi URL se frontend par image display hogi
    imgUrl: cloudinaryRes.secure_url,
  });

  // Cloudinary ka URL EJS page ko bhej rahe hain
  // EJS mein isi URL ko <img src=""> mein use karenge
  res.render("index.ejs", {
    url: cloudinaryRes.secure_url,
  });
});

const port = 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
