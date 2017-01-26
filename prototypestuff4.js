var ninja = {};
ninja.name = "Yoshi";
ninja.weapon = "kusarigama";

Object.defineProperty(ninja, "sneaky", {
    configurable: false,
    enumerable: true,
    value: true,
    writable: true
});

console.log(ninja.sneaky);

for(let prop in ninja){
    console.log(prop);
}