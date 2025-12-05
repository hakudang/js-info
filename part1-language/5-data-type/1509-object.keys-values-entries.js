/**
 * file : part1-language/data-type/1590-object.keys-values-entries.js
 *  title : Object.keys(), Object.values(), Object.entries()
 *  1. Định nghĩa
 *  2. Khác nhau giữa map (keys, values...) và object (keys, values...)
 *  3. Object có key là symbol
 *  4. Chuyển đổi giữa Object và Map
 *  5. Bài tập
 *  - Bài tập 1 : tính tổng các giá trị trong object
 *  - Bài tập 2 : đếm số thuộc tính trong object
 * 
 */

"use strict";

// in ra tiêu đề
document.write("<h2> Object.keys(), Object.values(), Object.entries() </h2>");

// 1. Object.keys(), Object.values(), Object.entries() 

// 1.1 Định nghĩa

// - Object.keys(obj) : trả về mảng các key (tên thuộc tính) của object
// - Object.values(obj) : trả về mảng các giá trị của object
// - Object.entries(obj) : trả về mảng các cặp [key, value] của object

let user = {
    name: "John",
    age: 30,
    isAdmin: true
};

let keys = Object.keys(user); // ["name", "age", "isAdmin"]
let values = Object.values(user); // ["John", 30, true]
let entries = Object.entries(user);
console.log(entries); // [ [ 'name', 'John' ], [ 'age', 30 ], [ 'isAdmin', true ] ]

let map = new Map(entries);
console.log(map); // Map(3) { 'name' => 'John', 'age' => 30, 'isAdmin' => true }

console.log(map.keys()); // [Map Iterator] { 'name', 'age', 'isAdmin' }
console.log(map.values()); // [Map Iterator] { 'John', 30, true }  

// 1.2. Khác nhau giữa map (keys, values...) và object (keys, values...)

// - Object.keys trả về mảng các key (tên thuộc tính) của object
// - Map.keys trả về iterator (set) các key của map
// - iterator và set khác nhau về mặt cấu trúc và cách sử dụng : 
//   + iterator có thể duyệt 1 lần, không lưu trữ giá trị
//   + set lưu trữ giá trị, có thể duyệt nhiều lần

// 1.3 Object có key là symbol

// khi duyệt Object.keys/values/entries, sẽ phớt lờ symbolic properties
let obj = {
    [Symbol("id")]: 123,
    name: "Alice"
};
console.log(Object.keys(obj)); // ["name"]
console.log(Object.values(obj)); // ["Alice"]
console.log(Object.entries(obj)); // [ [ 'name', 'Alice' ] ]

// 2. Chuyển đổi giữa Object và Map

let prices = {
    banana: 1,
    orange: 2,
    meat: 4
};

// chuyển object prices thành mảng các cặp [key, value] và nhân đôi giá trị
let doublePrices = Object.entries(prices).map(([key, value]) => [key, value * 2]);

console.log(doublePrices); // [ [ 'banana', 2 ], [ 'orange', 4 ], [ 'meat', 8 ] ]

// hiểu thị giá meat. Phải chuyển mảng thành Object trước
let doublePricesObj = Object.fromEntries(doublePrices);
console.log(doublePricesObj["meat"]); // 8

// 3. Bài tập

// Bài tập 1 : tính tổng các giá trị trong object
// Question :
// Viết hàm sumSalaries(salaries) nhận vào object salaries và trả về tổng các giá trị.
// Giải pháp : sử dụng Object.values để lấy mảng các giá trị và tính tổng chúng.

// Answer :
let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};
// Your code here
function sumSalaries(salaries) {
    let values = Object.values(salaries);
    let sum = 0;
    for (let value of values) {
        sum += value;
    }
    return sum;
}   
console.log( sumSalaries(salaries) ); // 650

// Bài tập 2 : đếm số thuộc tính trong object
// Question :
// Viết hàm count(obj) nhận vào một object obj và trả về số lượng thuộc tính (key) của nó.
// Giải pháp : sử dụng Object.keys để lấy mảng các key và trả về độ dài của mảng đó.    
// Answer :

let member = {
  name: 'John',
  age: 30
};
// Your code here 
function count(obj) {
    return Object.keys(obj).length;
}
console.log( count(member) ); // 2