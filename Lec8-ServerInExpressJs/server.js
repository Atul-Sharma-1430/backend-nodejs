// console.log("Making Server in Express Js");

// importing express type = module
import express from "express";

// This is how server is created
const app = express();

// .get is used to get req and send response
app.get("/", (req, res) => {
  res.send("You are requested for Home Route");
});

app.get("/srk", (req, res) => {
  res.send("Info about SRK");
});

//port num
const port = 3002;
app.listen(port, () => console.log("Server is running on port", port));
