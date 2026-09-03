class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  talk() {
    return `my name is ${this.name} and my age is ${this.age}`;
  }
}

class Student extends Person {
  constructor(name, age, marks) {
    super(name, age);
    this.marks = marks;
  }
  talk() {
    console.log(super.talk() + ` & my marks are ${this.marks}`);
  }
}

class Teacher extends Person {
  constructor(name, age, salary) {
    super(name, age);
    this.salary = salary;
  }
  talk() {
    console.log(super.talk() + ` & my salary is ${this.salary}`);
  }
}

let s1 = new Student("John", 20, 85);
let s2 = new Student("Alice", 22, 90);
let t1 = new Teacher("Smith", 40, 50000);
let t2 = new Teacher("Johnson", 35, 60000);

console.log(s1.age);
console.log(s2.marks);
console.log(t1.salary);
console.log(t2.name);
s1.talk();
t1.talk();
