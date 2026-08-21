import express from "express";
import path from "path";

const app = express();

// Middleware to access the static files in app
app.use(express.static("public"));
// Middle to protect privacy after submiting form
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

// Jab bhi user form submit karega, toh request "/form-submit" wale POST route par aayegi
// aur ye wala route execute hoga.
// POST request use karne ki wajah se form ka data URL mein directly nahi dikhta.
// Request se mila user ka data hum baad mein JSON format mein process karke
// database ya jahan bhi hume save karna ho, wahan save kar sakte hain.

// Filhal hum database mein data save nahi kar rahe hain.
// Sirf ek JSON response bhej rahe hain ki form successfully submit ho gaya hai.
app.post("/form-submit", (req, res) => {
  // terminal me output dikhega
  // VImp, hum express se data isi req.body se lete hain
  console.log(req.body);
  res.json({
    message: "Your Form Has Been Submitted",
    success: true,
  });
});

const port = 3000;
app.listen(port, () => console.log(`Server is Running on Port ${port}`));
