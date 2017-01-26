const assert = require('assert');

const yoshi = { skulk: true }
const hattori = { sneak: true }
const kuma = { creep: true };

assert("skulk" in yoshi, "Yoshi can skulk");
assert(!("sneak" in yoshi), "Yoshi cannot sneak");
assert(!("creep" in yoshi), "Yoshi cannot creep");
console.log(yoshi.skulk);
console.log(yoshi.sneak);
console.log(yoshi.creep);

Object.setPrototypeOf(yoshi, hattori);

assert("sneak" in yoshi, "Yoshi can now sneak!")
assert(!("creep" in hattori), "Hattori cannot creep");
console.log(yoshi.sneak);
console.log(hattori.creep);

Object.setPrototypeOf(hattori, kuma);

assert("creep" in hattori, "Hattori can now cree");
assert("creep" in yoshi, "Yoshi can also creep");
console.log(hattori.creep);
console.log(yoshi.creep);
