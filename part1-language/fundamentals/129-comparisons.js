/** @file 
 * các phép tính comparisons 
 * 1. Boolean là kết quả
 * 2. So sánh String
 * 3. So sánh khác kiểu dữ liệu
 * 4. So sánh bằng nghiêm ngặt - strict
 * 5. So sánh null và undefined
 */
"use strict";
// in ra html tag <h2>Comparisons</h2>
document.write("<h2>Comparisons</h2>");


// 1. Boolean là kết quả
console.log(2 > 1); // true -> đúng
console.log(2 == 1); // false -> sai
console.log(2 != 1); // true -> đúng

let result = 5 > 4;
console.log(result); // true - > đúng

// 2. So sánh String
console.log('Z' > 'A'); // true 
console.log('Glow' > 'Glee'); // true 
console.log('Bee' > 'Be'); // true 

// 3. So sánh khác kiểu dữ liệu
console.log(true == 1); // true -> true trở thành 1 
console.log(false == 0); // true -> false trở thành 0

let a = 0;
console.log(Boolean(a)); // false

let b = "0";
console.log(Boolean(b)); // true -> phép chuyển đổi kiểu qua phương thức Boolean hiểu 1 chuổi bất kỳ không rỗng là true 
console.log(Boolean("b")); // true
console.log(Boolean("")); // false

// 4. So sánh bằng nghiêm ngặt - strict
// so sánh thường qua toán tử ==
console.log(0 == false); // true
console.log('' == false); // true
// so sánh strict qua toán tử ===
console.log(0 === false); // false, vì khác kiểu

// 5. So sánh null và undefined
// so sánh strict qua toán tử ===
console.log(null === undefined); // false

// so sánh thường qua toán tử ==
console.log(null == undefined); // true

// với các toán tử khác như < > <= >=, null/undefined chuyển sang kiểu số: null -> 0,  undefined -> NaN

// so sánh null với 0 . Lưu ý với toán tử == thì null không được chuyển thành 0 
console.log(null > 0);  // false
console.log(null == 0); // false -> vì với toán tử == null không được chuyển thành 0
console.log(null >= 0); // true

// undefined khi so sánh được chuyển thành NaN
console.log(undefined > 0); // false
console.log(undefined < 0); // false
console.log(undefined == 0); // false

// Bài tập
console.log(5 > 4); // true
console.log("apple" > "pineapple"); //false
console.log("2" > "12"); // true 
console.log(undefined == null); // true
console.log(undefined === null); // false
console.log(null == "\n0\n"); // false
console.log(null === +"\n0\n"); // false