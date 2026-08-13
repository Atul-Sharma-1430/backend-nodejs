// console.log("Routing in Node Js");

// Used to create a http server
import http from "http";

// creating server
const server = http.createServer((req, res) => {
  //   console.log(req.url); // output / (slash) as default url is localhost:3000/

  // handling req based on url
  // case insensitive
  if (req.url === "/Atul") {
    res.end("Your req is accepted by Atul");
  } else if (req.url === "/Srk") {
    res.end("Your req is accepted by SRK");
  } else {
    res.end("Invalid Req");
  }
});

const port = 3001;
server.listen(port, console.log(`Server is Running on port ${port}`));
