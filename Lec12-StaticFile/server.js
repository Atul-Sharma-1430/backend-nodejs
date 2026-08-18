import express from "express";
import path from "path";

const app = express();

//
// This is a type of middleware jo basically "public" folder ko static folder bana deta hai
// jisse public folder ke andar rakhi hui CSS, JS, images aur other static files browser directly access kar sakta hai.
// Toh app me jo bhi static cheeze hain usko public folder me rakh do normally and then usko middleware ki help se acces kr lo
app.use(express.static(path.join(path.resolve(), "public")));

// We can write in this was also
app.use(express.static("public"));
//

// ejs run krne ke liye bhi npm i ejs krna padta hai warna error aayega
app.get("/", (req, res) => {
  res.render("index.ejs");
});

const port = 3000;
app.listen(port, () => console.log(`Server is Running on port ${port}`));
