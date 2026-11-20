// Node.js URL + File System practical (syllabus: Node.js 1c, 1d)
const fs = require("node:fs");
const path = require("node:path");
const { URL } = require("node:url");
const filePath = path.join(__dirname, "sample.txt");
fs.writeFileSync(filePath, "HTML, CSS, JavaScript, TypeScript, MongoDB, Express.js, React.js, Node.js");
const address = new URL("http://localhost:3000/menu?category=Breakfast&sort=price");
console.log("pathname:", address.pathname);
console.log("category:", address.searchParams.get("category"));
console.log("file contents:", fs.readFileSync(filePath, "utf8"));
