function Person(){};
Person.prototype.dance = function(){};

function Ninja(){};
Ninja.prototype = new Person();

const ninja = new Ninja();
console.log(ninja instanceof Ninja);
console.log(ninja instanceof Person);
console.log(ninja instanceof Object)
console.log(typeof ninja.dance);
console.log(ninja.constructor === Ninja);
