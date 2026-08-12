// This syntax when "type" : "module" in package.json
export const add = (num1, num2) => num1 + num2;
export const sub = (num1, num2) => num1 - num2;
export const mul = (num1, num2) => num1 * num2;
export const div = (num1, num2) => {
  if (num2 == 0) {
    console.log("Division by 0 is not possible");
    return;
  } else {
    return num1 / num2;
  }
};

// module not Module
// This module.export syntax we will use when "type" : "commmon js"
// module.exports = { add, sub, mul, div };
