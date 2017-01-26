class Ninja{
    constructor(name, level){
        this.name = name;
        this.level = level;
    }

    swingSword() {
        return true;
    }
    static compare(ninja1, ninja2){
        return ninja1.level - ninja2.level;
    }
}

var ninja1 = new Ninja("Yoshi",4);
var ninja2 = new Ninja("Hattori", 3);

console.log(ninja1 instanceof Ninja);
console.log(ninja1.name);
console.log(ninja1.swingSword());
console.log(Ninja.compare(ninja1,ninja2));
//console.log(ninja.compare(ninja1,ninja2));