// Importing

// This syntax will be used when "type" : "commonjs"
// const { add, sub, mul, div } = require("./utils.js");

// This will be used when "type" : "module"
import { add, sub, mul, div } from "./utils.js";

console.log("Add", add(5, 6));
console.log(sub(10, 9));
console.log(mul(10, 3));
console.log(div(10, 0));
