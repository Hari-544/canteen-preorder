// User-defined module practical (syllabus: Node.js 1e)
function add(a, b) { return a + b; }
function multiply(a, b) { return a * b; }
module.exports = { add, multiply };
// Run: node -e "const m=require('./practicals/nodejs/math-module'); console.log(m.add(4,5),m.multiply(4,5))"
