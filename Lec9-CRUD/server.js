// console.log("CRUD operation using express server");

import express from "express";

const app = express();

// Create => POST (Method)
// Read => GET (Method)
// Update => PUT (Method)
// DELETE => DELETE (Method)

// get method is use to read the data of any page, here home page
app.get("/", (req, res) => {
  res.send("You are on Home page");
});

// post is used to post anything or create anything like insta post here
app.post("/insta_post", (req, res) => {
  res.send("Your post is posted succcessfully");
});

const port = 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
