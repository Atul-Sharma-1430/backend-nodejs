console.log("Learning Template engine");

import express from "express";
import path from "path";

const app = express();

const port = 3000;

let prod = [
  {
    title: "SAMSUNG",
    price: 25000,
  },
  {
    title: "APPLE",
    price: 35000,
  },
  {
    title: "REDMI",
    price: 45000,
  },
];

// .render will have to use to send .ejs files , while .sendFile is used to send HTML files
// agar sendFile krenge toh jab req krenge toh vo poora file ka code hi utha ke de dega downloads me isliye don't do this galti
app.get("/", (req, res) => {
  // Yaha pe dono tarike se likh skte hain bcz vo views folder ko automatically dhund leta hai. isliye humey usko (views) folder me hi rakhna chahiye hamesha
  // res.render(path.resolve("./views/index.ejs",));
  // res.render("index.ejs");

  // Now mujhe ye name and uper array (dynamic data) jo suppose server se aaya hai usko mujhe mere EJS wale html me show krna hai dynamically toh kaise krenge
  let name = "Atul Sharma";
  res.render("index.ejs", { name, prod }); // just pass the value and then usko ejs file me jaake .ejs format me JS likh do
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
