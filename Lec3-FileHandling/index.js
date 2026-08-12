// console.log("Learninig File Handling");

// readFile -> read content of file
// writeFile -> Write/replace file content
// appendFile -> used to add content to an existing file
// mkdir ->  used to create packages
import { readFile, writeFile, appendFile, mkdir } from "fs/promises"; // fs -> file system

// Read file content
// as readFile returns a promise hence we use async await
const read_file = async (fileName) => {
  const data = await readFile(fileName, "utf-8"); // UTF-8 tells Node.js how to decode the file's bytes into readable text
  console.log(data);
};

read_file("sample.txt");

// Create File
const create_file = async (fileName, fileContent) => {
  await writeFile(fileName, fileContent);
  console.log("File Created Successfully");
};

create_file("file.txt", "This file is been created using writeFile function");
create_file("app.py", "# This file is also created using writeFile function");
create_file(
  "react.jsx",
  "// This file is a react file created using writeFile function",
);

// Add content to file
const append_file = async (fileName, fileContent) => {
  await appendFile(fileName, "\n" + fileContent); // to add new line
  console.log("Content added to the file successfully");
};

append_file(
  "sample.txt",
  "This content is been appended using appendFile function",
);

// Create Folder
const create_folder = async (folderName) => {
  await mkdir(folderName);
  console.log("Folder Created Successfully");
};

// create_folder("public");

// Created nested folder
const create_nested_folder = async (folderName) => {
  await mkdir(folderName, { recursive: true }); // for nested folder just make this as recursive : true
  console.log("Nested folder Created Successfully");
};

create_nested_folder("src/main/components/com/demo/java");
