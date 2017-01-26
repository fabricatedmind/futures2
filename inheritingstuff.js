class Person{
    constructor(name){
        this.name = name;
    }

    dance() {
        return true;
    }
}

class Ninja extends Person {
    constructor(name, weapon) {
        super(name);
        this.weapon = weapon;
    }

    wieldWeapon(){
        return true;
    }
}

var person = new Person("Bob");

console.log(person instanceof Person);
console.log(person.dance());
console.log(person.name);
console.log(person instanceof Ninja);
for(let prop in person){
    console.log(prop);
}

var ninja = new Ninja("Yoshi", "Wakizashi");
console.log(ninja instanceof Ninja);
console.log(ninja.wieldWeapon());
console.log(ninja instanceof Person);
console.log(ninja.name);
console.log(ninja.dance());