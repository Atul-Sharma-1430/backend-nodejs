console.log("Learning Sending response in Express in JSON or HTML format");

// we can give any name here its just variable name
import exp from "express";
// This is imported bcz we have go give absolute path while sending HTML file
import path from "path";

const app = exp();

// dummy array to send this in json format
const products = [
  {
    title: "SAMSUNG",
    price: 10000,
  },
  {
    title: "APPLE",
    price: 20000,
  },
  {
    title: "REDMI",
    price: 30000,
  },
];

app.get("/", (req, res) => {
  // sending response in JSON format
  //   res.json({
  //     // Key : value
  //     message: "Fetched All Products",
  //     kya_de_skte_hain: "Kuch bhi jo humaey dena hai vo de skte hain",
  //     products: products,
  //     success: true,
  //   });

  // send is used to send response in html
  //   res.send("<h1>This is in HTML format</h1>");

  // sendFile method is used to send HTML document or HTMl file in response
  // method 1
  const dir = path.resolve(); // to get absolute path of current file
  const url = path.join(dir, "./index.html"); // absolute path me current file ka path rhega toh usko index.html se se join kr do
  res.sendFile(url); // and then usko send kr do

  // method 2
  // the above 3 line code can be shorten to single line doing exactly same thing
  res.sendFile(path.join(path.resolve(), "index.html"));

  // method 3
  // Or we can direclty send HTML file without joining with current file
  res.sendFile(path.resolve("./index.html"));
});

// Send response

const port = 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
