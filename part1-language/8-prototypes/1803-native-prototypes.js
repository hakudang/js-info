/** 
 * Native Prototypes in JavaScript
 */

"use strict";
// tiêu đề trang
document.write("<h2>Native Prototypes in JavaScript</h2>");

function section(title) {
    console.log("=== " + title + " ===");
}

// 1. Object.prototype – mọi object đều kế thừa từ đây
section("1. Object.prototype – mọi object đều kế thừa từ đây");

let obj = {};
console.log(obj.toString()); // "[object Object]"

// 5. Thay đổi native prototype (cực kỳ nguy hiểm)

section("5. Thay đổi native prototype (cực kỳ nguy hiểm)");

String.prototype.show = function() {
  console.log(this);
};

"BOOM!".show(); // BOOM!

if (!String.prototype.repeat) {
  String.prototype.repeat = function(n) {
    return new Array(n + 1).join(this);
  };
}

console.log( "La".repeat(3) ); // LaLaLa

// 6. Borrowing (mượn phương thức)
section("6. Borrowing (mượn phương thức)");

// Cách 1 : dùng call/apply
let obj_a = {
  0: "Hello",
  1: "world!",
  length: 2,
};

obj_a.join = Array.prototype.join; // mượn phương thức join từ Array.prototype

console.log( obj_a.join(',') ); // Hello,world! 
// giống như Array.prototype.join.call(obj_a, ',')
// chỉ join các object array-like, index từ 0 đến length-1, ignore length và các thuộc tính khác

// Cách 2 : đặt trực tiếp __proto__
let obj_b = {
  0: "Hello",
  1: "world!",
  length: 2,
};

obj_b.__proto__ = Array.prototype; // đặt prototype của obj_b là Array.prototype

console.log( obj_b.join(',') ); // Hello,world!