console.log("This is User Model");

import mongoose from "mongoose";

// CREATE TABLE users (
//     name VARCHAR(255),
//     email VARCHAR(255),
//     password VARCHAR(255),
//     age INT,
//     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// Its like humne User Table bna diya hai which works same as above given code in SQL
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: Number },
  age: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

// "user"                  → Mongoose Model name
// "users"                 → MongoDB Collection name
// userSchema se User model banaya aur ise doosri files mein use karne ke liye export kiya
export const User = mongoose.model("user", userSchema); // ye user jo hai vo databse me hamesha plural form me rhega like users
