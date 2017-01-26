function Ninja(){
    this.swung = false;
    this.swingSword = function() {
        return "BALLS";
    };
}
Ninja.prototype.swingSword = function() {
    return this.swung;
}

const ninja = new Ninja();
console.log(ninja.swingSword());