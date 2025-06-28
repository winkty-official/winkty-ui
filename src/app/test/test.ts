interface Human {
  name: string | number;
  age: string | number;
}

interface Monster {
  type: string;
}

export interface Zombie_ extends Human, Monster {}

export class Man implements Human {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

export class Zombie implements Zombie_ {
  name: string;
  age: number;
  type: string;
  key: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    this.type = "Zombie";
    this.key = 1;
  }
}

export class Child implements Human {
  name: number;
  age: string;

  constructor(name: number, age: string) {
    this.name = name;
    this.age = age;
  }
}

const man = new Man("John", 30);
const child = new Child(23, "John");

console.log(man, child);

// class Person {
//   name: string;
//   age: number;

//   constructor(name: string, age: number) {
//     this.name = name;
//     this.age = age;
//   }
// }
// export class Child extends Person {
//   name: number;
//   age: string;

//   constructor(name: number, age: string) {
//     super(String(name), Number(age));
//   }
// }

// export class Man implements Person {
//   name: string;
//   age: number;


//   constructor(name: string, age: number) {
//     this.name = name;
//     this.age = age;
//   }
// }



// const man = new Man("John", 30);
// const child = new Child("John", 30);

// console.log(man, child);