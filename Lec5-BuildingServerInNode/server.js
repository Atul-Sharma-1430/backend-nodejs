// console.log("Building Server in Node Js")

// to create a http server we need to import this
import http from "http";

// This is how the server is created
const server = http.createServer((req, res) => {
  // .end is used to end the req and send a response to req
  res.end("This is your response");
});

const port = 3000; // port number on which server will listen
server.listen(port, () => console.log(`Server is Running on port ${port}`));
