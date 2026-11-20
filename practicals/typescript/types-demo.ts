// TypeScript types, functions, arrow functions, optional/default/REST parameters
let studentName: string = "Student";
let marks: number[] = [82, 91, 76];
let isPassed: boolean = true;
type Student = { name: string; email?: string };
function greet(student: Student, prefix: string = "Hello"): string { return `${prefix}, ${student.name}`; }
const average = (...values: number[]): number => values.reduce((a,b)=>a+b,0)/values.length;
console.log(greet({name:studentName}), average(...marks), isPassed);
