/** @file 
 * chuyển đổi kiểu 
 * 1. Chuyển đổi sang String
 * 2. Chuyển đổi sang Number
 * 3. Chuyển đổi sang Boolean
 * 
 */

"use strict";
// 1. Chuyển đổi sang String
let value = true;
console.log(typeof value); // boolean
value = String(value); // chuyển đổi sang String
console.log(typeof value); // string

// 2. Chuyển đổi sang Number
let str = "123";
console.log(typeof str); // string
let num = Number(str);
console.log(typeof num); // number

let age = Number("an arbitrary string instead of a number");
console.log(age); // NaN , không thể chuyển đổi chuỗi này sang số

console.log(Number(undefined)); // NaN
console.log(Number(null)); // 0
console.log(Number(true)); // 1
console.log(Number(false)); // 0
console.log(Number("   123   ")); // 123, khoảng trắng được bỏ qua
console.log(Number("123abc")); // NaN, chuỗi không thể chuyển đổi hoàn toàn sang số

// 3. Chuyển đổi sang Boolean
console.log(Boolean(1)); // true
console.log(Boolean(-1)); // true
console.log(Boolean(0)); // false
console.log(Boolean("hello")); // true
console.log(Boolean("")); // false
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN)); // false
