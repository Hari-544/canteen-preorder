// Node.js HTTP server practical (syllabus: Node.js 1a)
const http = require("node:http");
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end("<h1>Node.js HTTP Server</h1><p>Request received successfully.</p>");
});
server.listen(3001, () => console.log("Open http://localhost:3001"));
