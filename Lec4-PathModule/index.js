// console.log("Learning Path Module");

import path from "path";

// join two or more file
const fullPath = path.join("/path", "index.py", "file.java"); // Output : Files join =  \path\index.py\file.java
console.log("Files join = ", fullPath);

// To see absolute path of a file
const absolutePath = path.resolve();
console.log("We are currently in ", absolutePath); // prints the current working directory path

// Extension name -> used to check type of extension of file or videos and based on it we can restrict the any type while making API
const extName = path.extname("resume.pdf");
console.log("Extension :", extName);
if (extName == ".pdf") {
  console.log("Okay accepted");
} else {
  console.log("This format is not supported");
}
