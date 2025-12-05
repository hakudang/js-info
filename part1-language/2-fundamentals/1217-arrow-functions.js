/** @file 
 * Arrow functions 
 * 1. Cú pháp
 * 2. Hàm Arrow một dòng lệnh
 * 3. Hàm Arrow nhiều dòng lệnh
 */
"use strict";

// in ra html tag <h2>Arrow Functions</h2>
document.write("<h2>Arrow Functions</h2>");

// 1. Cú pháp
// cú pháp :
// (đối_số_1, đối_số_2, ...) => { khối_lệnh }
// đặc điểm :
// - Ngắn gọn hơn so với hàm thông thường
// - Không có từ khóa this, super, arguments
// - Không thể sử dụng làm hàm khởi tạo với từ khóa new

// 2. Hàm Arrow một dòng lệnh
// - khối lệnh 1 dòng có thể bỏ dấu ngoặc nhọn {} và từ khóa return

// ví dụ 1: hàm cộng hai số

let sum = (a, b) => a + b; // hàm arrow với hai đối số a và b , trả về a + b

// hàm arrow trên có cú pháp ngắn hơn
// let sum = function(a, b) {
//     return a + b;
// };

console.log(sum(1, 2)); // in ra 3 

//ví dụ 2: 
let double = n => n * 2; // hàm arrow với một đối số n , trả về n * 2
console.log(double(3)); // in ra 6

let double_2 = function (n) { return n * 2 }; // hàm thông thường với một đối số n , trả về n * 2
console.log(double_2(3)); // in ra 6

// ví dụ 3: toán tử điều kiện nhị phân 
let age = 18;
let welcome = (age < 18) ?
    () => console.log("Chào bạn !") : // hàm arrow không có đối số
    () => console.log("Xin chào khách hàng !"); // hàm arrow không có đối số
welcome(); // in ra Xin chào khách hàng !

// 3. Hàm Arrow nhiều dòng lệnh

// - có nhiều hơn một dòng lệnh thì phải sử dụng dấu ngoặc nhọn {}
// - phải sử dụng từ khóa return để trả về giá trị

let sum_2 = (a, b) => { // hàm arrow với hai đối số a và b
    let result = a + b; // nhiều dòng lệnh trong khối lệnh
    return result; // phải có từ khóa return để trả về giá trị
};
console.log(sum_2(5, 7)); // in ra 12

// Bài tập : thay thế hàm trong ví dụ dưới đây bằng hàm arrow

// function ask(question, yes, no) {
//     if (confirm(question)) yes();
//     else no();
// }

// ask(
//     "Do you agree?",
//     function () { console.log("You agreed."); },
//     function () { console.log("You canceled the execution."); }
// );

function ask(question, yes, no) {
    if (confirm(question)) yes();
    else no();
}
ask( "Do you agree?",
    () => console.log("You agreed."), // hàm arrow không có đối số
    () => console.log("You canceled the execution.") // hàm arrow không có đối số
);