import express from "express";
import mongoose from "mongoose";

// Ye jab thunder client se post req krenge toh us time parse krne keliye
import bodyParser from "express";

// env file ke content ko read krne ke liye
import dotenv from "dotenv";
dotenv.config();

import userRouter from "./routes/userRouter.js";
import contactRouter from "./routes/contactRouter.js";

const app = express();

// ==================== BODY PARSER MIDDLEWARE ====================
app.use(bodyParser.json());

// ==================== DATABSASE ====================
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "NodeJs_Mastery_Course",
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("Error :", error));

// ==================== USER ROUTE ====================
// user ki jitni bhi cheeze hongi sab is route pe hit hongi and then iska endpoint routes wale folder me se select ho jaayega jiske liye bhi call hoga
// yaha pe app.use  use krenge bcz routes wala folder ek middleware ki trh act krega
app.use("/api/user", userRouter);

// ==================== CONTACT ROUTE ====================
// contact ki jitni bhi cheeze hongi sab is route pe hit hongi and then iska endpoint routes wale folder me se select ho jaayega jiske liye bhi call hoga
app.use("/api/contact", contactRouter);

// ==================== HOME ROUTE ====================
app.get("/", (req, res) => {
  res.json({ message: "This is Home Route" });
});

const port = 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
