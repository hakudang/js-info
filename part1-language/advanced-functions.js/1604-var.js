/** 
 * Khai báo biến Var trong JavaScript
 * Var là một từ khóa dùng để khai báo biến trong JavaScript cũ (trước ES6).
 * Biến khai báo bằng var có phạm vi 
 * - toàn cục 
 * - hàm
 * 
 * 
 * */

"use strict";

function section(title) {
    console.log("\n================================ ");
    console.log("=== " + title + " ===");
    console.log("================================ \n");
}

// in ra tiêu đề
document.write("<h2> Khai báo biến Var trong JavaScript </h2>");

// 1. var KHÔNG có block scope
section("1. var KHÔNG có block scope");

// 1.1 var trong if, for ...

// var không có block scope, 
// nên biến có thể truy cập bên ngoài block if, for ...

if (true) {
    var testVar = true;
}
console.log(testVar); // true, vì var không có block scope, xuyên qua block if

for (var i = 0; i < 10; i++) {
    var one = 1;
}

console.log(i);   // 10 
console.log(one); // 1

// 1.2 let

// let có block scope
// nên biến testLet KHÔNG thể truy cập bên ngoài block if

if (true) {
    let testLet = true;
}
// console.log(testLet); // Lỗi, vì let có block scope, không thể truy cập bên ngoài block if

// 1.3 var trong function
// var có function scope,
// nên biến chỉ có thể truy cập bên trong function

function sayHi_a() {
    if (true) {
        var phrase = "Hello";
    }
    console.log(phrase); // OK
}

sayHi_a();
// console.log(phrase); // Error, phrase is not defined

// 2. var cho phép redeclare (khai báo lại nhiều lần)
section("2. var cho phép redeclare (khai báo lại nhiều lần)");

// 2.1 var redeclare
var user = "Pete";
var user = "John"; // KHÔNG lỗi
console.log(user); // John

// 2.2 let redeclare

/*
let user = "Pete";
let user = "John"; // SyntaxError
*/

// 3. var bị hoisting (được “kéo lên đầu”)
// Chỉ hoisting phần khai báo, không hoisting phần gán giá trị.

section("3. var bị hoisting (được “kéo lên đầu”)");

function sayHi_b() {
    phrase = "Hello";
    console.log(phrase);
    var phrase;
}
sayHi_b();


// JS sẽ hiểu như sau (phần khai báo var phrase được hoisting lên đầu hàm)
function sayHi_c() {
    var phrase;   // hoisting
    phrase = "Hello";
    console.log(phrase);
}
sayHi_c();


// 3.1 hoisting -> undefined
// phần khai báo var được hoisting lên đầu hàm, 
// nhưng phần gán giá trị vẫn giữ nguyên vị trí ban đầu
// nên khi truy cập biến trước khi gán giá trị sẽ nhận được undefined

section("3.1 hoisting -> undefined");

function sayHi_d() {
    console.log(phrase); // undefined, vì biến phrase đã được hoisting nhưng chưa gán giá trị
    var phrase = "Hello";
}

sayHi_d(); // undefined, 


// 3.2 hoisting chỉ với khai báo var
// hoisting chỉ xảy ra với khai báo var
// phần gán giá trị vẫn giữ nguyên vị trí ban đầu

section("3.2 hoisting chỉ với khai báo var");

function sayHi_e() {
    var phrase;       // hoisted → tồn tại nhưng = undefined
    console.log(phrase);    // undefined
    phrase = "Hello"; // gán lúc này
}
sayHi_e(); // undefined,

// 4. IIFE: cách code cũ tạo “block scope” bằng function
// Ngày xưa vì var không có block scope, 
// người ta tự tạo block bằng cách tự gọi function ngay lập tức
// Ngày nay gần như không dùng nữa, vì đã có let và const.

section("4. IIFE: cách code cũ tạo “block scope” bằng function");

// cách viết IIFE (Immediately Invoked Function Expression)
// tự gọi hàm ngay lập tức để tạo block scope

(function() {
  var message = "Hello";
  console.log(message); // Hello
})();

// cách viết khác 

(function(){})();
(function(){}());
!function(){}();
+function(){}();

