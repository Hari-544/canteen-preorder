// Express routing, form data, EJS templates and middleware practical
// Run from the repository root after: npm --prefix server install
const express = require("express");
const path = require("node:path");
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true })); // parses HTML form data
app.use((req, _res, next) => { console.log(new Date().toISOString(), req.method, req.url); next(); }); // middleware
app.get("/", (_req, res) => res.render("form", { message: "" }));
app.post("/greet", (req, res) => res.render("form", { message: `Welcome, ${String(req.body.studentName || "Student")}!` }));
app.get("/student/:id", (req, res) => res.json({ routeParameter: req.params.id, query: req.query }));
app.listen(3002, () => console.log("EJS practical: http://localhost:3002"));
