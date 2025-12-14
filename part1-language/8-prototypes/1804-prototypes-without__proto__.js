/** 
 * Prototypes without __proto__
 */

"use strict";
// tiêu đề trang
document.write('<h2>Prototypes without __proto__</h2>');
function section(title) {
    console.log('=== ' + title + ' ===');
}

// 2. Object.create – tạo object với prototype mong muốn
section('2. Object.create – tạo object với prototype mong muốn');

let animal = {
  eats: true
};

// create a new object with animal as a prototype
let rabbit = Object.create(animal); // same as {__proto__: animal}

console.log(rabbit.eats); // true

console.log("Object.getPrototypeOf(rabbit) === animal:", Object.getPrototypeOf(rabbit) === animal); // true

Object.setPrototypeOf(rabbit, {}); // change the prototype of rabbit to {}

// thêm thuộc tính mới vào rabbit

let animal_a = {
  eats: true
};

let rabbit_a = Object.create(animal_a, {
  jumps: {
    value: true
  }
});

console.log("rabbit_a.jumps :", rabbit_a.jumps); // true

// 3. Clone object đúng chuẩn (giữ prototype + descriptors)
section('3. Clone object đúng chuẩn (giữ prototype + descriptors)');

function clone(obj) {
  let proto = Object.getPrototypeOf(obj);
  let descriptors = Object.getOwnPropertyDescriptors(obj);
  return Object.create(proto, descriptors);
}
let user = {
  name: "John",
  hide() {
    console.log("Hiding user");
  }
};
let clonedUser = clone(user);
console.log("clonedUser.name:", clonedUser.name); // John
console.log("clonedUser === user", clonedUser === user); // false

// 6. “Very plain” objects – object không có prototype
section('6. “Very plain” objects – object không có prototype');

let obj = {};
let key = "__proto__";
// let key = prompt("Enter the property name:", "__proto__");
obj[key] = "some value"; 

console.log(obj[key]); // [object Object], không phải some value
console.log(obj.__proto__ === Object.prototype); // true

// Giải pháp 1 
section('Giải pháp 1: dùng Map' );

let map1 = new Map();
let key1 = "__proto__";
map1.set(key1, "some value");
console.log( map1.get(key1) ); // some value

// Giải pháp 2
section('Giải pháp 2: Object.create(null)' );

let obj2 = Object.create(null); // object không có prototype, không kế thừa từ Object.prototype
let key2 = "__proto__";
obj2[key2] = "some value";
console.log(obj2[key2]); // some value