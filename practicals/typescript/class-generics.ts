// Classes, constructors, access modifiers, inheritance and generics
class Person { constructor(public name: string, private age: number) {} introduce(): string { return `${this.name} is ${this.age}`; } }
class Student extends Person { constructor(name: string, age: number, public course: string) { super(name, age); } }
class Box<T> { constructor(private value: T) {} getValue(): T { return this.value; } }
const student = new Student("Asha", 20, "FSD-2");
console.log(student.introduce(), new Box<number>(42).getValue());
