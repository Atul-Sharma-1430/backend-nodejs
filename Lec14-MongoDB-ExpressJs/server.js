import express from "express";
import mongoose from "mongoose";

// since hum URL directly nhi rakhenge toh hum env file use krenge isliye ye import
import dotenv from "dotenv";

dotenv.config(); // .env file ke andar jo variables hain, unko Node.js ke environment variables mein load karega.

console.log("Connecting MongoDB with ExpressJS");
// Ye database se connect krne ke liye
// MongoDB Atlas se connection string copy karke .env file mein store karenge
// isko directly yaha pe bhi link daal skte hai but that is not recommended due to privacy
mongoose
  .connect(
    process.env.MONGO_URI,
    { dbName: "NodeJs_Mastery_Course" }, // ye db name humko manually dena hota hai jo compass me dikhega and ye spaces nhi dena hai isme
  )
  .then(() => console.log("MongoDB connected")) // ye jab databse se connect ho jaayega toh ye message display hoga
  .catch((e) => console.log("Error : ", e)); // agar kuch error aaya toh ye error message display krega

const app = express();

const port = 3000;
app.listen(port, () => console.log(`Server is running on ${port}`));
