function Ninja() {};
Ninja.prototype.swingSword = function(){
    return true;
};

Ninja.prototype.blahFish = function() {
    return "word";
};

const ninja1 = Ninja();
console.log(ninja1);

const ninja2 = new Ninja();
console.log(ninja2);
console.log(ninja2.swingSword);
console.log(ninja2.swingSword());


console.log(ninja2.blahFish());

