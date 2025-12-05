/** @file 
 * datatypes.js
 * @title Kiểu dữ liệu (Data Types)
 * 1. Giới thiệu về kiểu dữ liệu trong JavaScript
 * 2. Kiểu dữ liệu nguyên thủy (Primitive Data Types)
 * 3. Kiểu dữ liệu phức tạp (Complex Data Types)
 * 4. Toán tử typeof
 */

"use strict";

// kiểu dữ liệu có thể thay đổi (Dynamic Types)
let message = "hello"; // String
message = 123456;   // Number


//1. Kiểu dữ liệu nguyên thủy (Primitive Data Types)
// a. Number
let n = 123;         // số nguyên
n = 12.345;      // số thực

console.log(1 / 0); // Infinity 
console.log(-1 / 0); // -Infinity
console.log("not a number" / 2); // NaN

// các phép toán với NaN luôn trả về NaN
console.log(NaN + 1); // NaN 
console.log(NaN * 3); // NaN
console.log("not a number" / 2 - 1); // NaN
// b. bigInt
// cuối của số có chữ 'n'
let bigInt = 1234567890123456789012345678901234567890n;

// c. String
// trong javascript có 3 loại dấu ngoặc kép: "", '', ``
let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed ${str}`; // sử dụng dấu ` để nhúng biến vào chuỗi


// d. Boolean
let nameFieldChecked = true; // đúng, name field is checked
let ageFieldChecked = false; // sai, age field is not checked

// kết quả của các phép so sánh
let isGreater = 4 > 1; // true (kết quả của biểu thức so sánh)
console.log(isGreater); // true kết quả của phép so sánh là đúng 

// e. null
let age = null; // giá trị null biểu thị "không có giá trị"

// f. undefined
let age2; // giá trị undefined biểu thị "chưa được gán giá trị"
console.log(age2); // undefined

let age3 = 50;
age3 = undefined; // không nên làm vậy, tốt hơn nên dùng null để gán giá trị 
console.log(age3); // undefined

// 2. Kiểu dữ liệu phức tạp (Complex Data Types)
// a. Object
let person = {
    name: "John",
    age: 30,
    isEmployed: true
};
console.log(person.name); // John

// b. Symbol
let sym1 = Symbol("id");
let sym2 = Symbol("id");
console.log(sym1 === sym2); // false, mỗi Symbol là duy nhất
// ngay cả khi chúng có cùng mô tả
console.log(String(sym1)); // "Symbol(id)"
console.log(sym1.description); // "id"

// 3. Kiểu dữ liệu đặc biệt
// a. Function
// Function là một khối mã có thể được gọi và thực thi khi cần thiết
function greet(name) {
    return `Hello, ${name}!`;
}
console.log(greet("Alice")); // Hello, Alice!

// b. Array
// Mảng là một tập hợp các giá trị được lưu trữ trong một biến duy nhất
let fruits = ["Apple", "Banana", "Cherry"];
console.log(fruits[0]); // Apple

// c. Date
let now = new Date();
console.log(now); // Hiển thị ngày và giờ hiện tại
// d. RegExp - Biểu thức chính quy
// Biểu thức chính quy được sử dụng để tìm kiếm và thao tác với các chuỗi
let pattern = /ab+c/; // biểu thức chính quy để tìm chuỗi "a" theo sau bởi một hoặc nhiều "b" và kết thúc bằng "c"
let str3 = "abc abbc abbbc";
let result = str3.match(pattern);
console.log(result[0]); // abc
// e. Error
// Đối tượng Error được sử dụng để biểu thị các lỗi trong JavaScript

// ví dụ bắt lỗi và hiển thị thông báo lỗi
try {
    throw new Error("Something went wrong");
} catch (error) {
    console.log(error.message); // Something went wrong
}
// 4. toán tử typeof
typeof 123; // "number"
typeof 12.34; // "number"
typeof "hello"; // "string"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof null; // "object" (đây là một lỗi trong JavaScript)
typeof { name: "John" }; // "object"
typeof [1, 2, 3]; // "object"
typeof function() {}; // "function"
typeof new Set([1, 2, 3]); // "object"
typeof [{a:1}, 1000]; // "object"

// Kết luận
// JavaScript hỗ trợ nhiều kiểu dữ liệu khác nhau, từ các kiểu nguyên thủy như Number, String, Boolean đến các kiểu phức tạp như Object và Array. Hiểu rõ về các kiểu dữ liệu này sẽ giúp bạn viết mã hiệu quả và dễ bảo trì hơn.