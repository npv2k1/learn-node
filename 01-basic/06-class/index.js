class People {
  name;

  constructor(name) {
    this.name = name;
  }

  hi() {
    console.log("Hi " + this.name);
  }
}

const people = new People("A");
people.hi();
