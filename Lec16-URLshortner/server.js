import express from "express";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

// dono controllers ko import kro
import { shortURL, getOriginalUrl } from "./controllers/url.js";

const app = express();

// ye krenge tabhi hum req.body se data le skte hain
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "NodeJs_Mastery_Course",
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log("Error : ", error));

// Rendering EJS file
app.get("/", (req, res) => {
  res.render("index.ejs", { shortURL: null });
});

// ye jab user long URL enter karke submit karega
// us time ye route pe aayega and then controller me shortURL wale function ke pass jaayega
app.post("/get-short-url", shortURL);

// ye jab user shortened URL pe click karega
// toh ye getOriginalUrl wale function ke pass jaayega

// yaha pe :shortcode jo hai vo dynamic hai jo user request karega

// eg: agar maine search kiya
// http://localhost:3000/gbHDTxbPW
// toh gbHDTxbPW shortcode hai ye shortcode ki value lekar getOriginalUrl function ke paas jaayega
// iska matlab ki hai Express URL mein jo bhi value / ke baad aayegi, usko shortcode naam se receive karega.
// : ye imp hota hai agar url se dynamically kuch lena hai toh and ye dynamic route wala part hamesah last me hi aana chahiye
app.get("/:shortcode", getOriginalUrl);

const port = 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
