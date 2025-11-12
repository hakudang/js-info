/** 
 * file : 1520-numbers.js
 * Giới thiệu về số trong JavaScript
 * 
 * Mọi số JS (trừ BigInt) đều là float 64-bit.
 * Dạng khoa học e, các hệ cơ số, làm tròn, và lỗi chính xác là trọng tâm.
 * Khi làm việc với số tiền tệ hoặc đo lường, luôn làm tròn bằng .toFixed() hoặc Math.round().
 * Dùng parseInt/parseFloat khi trích số từ chuỗi.
 * Dùng isNaN, isFinite, Object.is để kiểm tra tính hợp lệ.
 * 
 * 1. Hai loại số chính trong JS
 * 2. Biểu diễn số trong JS
 * 3. Chuyển đổi chuỗi sang số
 * 4. Làm tròn số
 * 5. Mất chính xác với số dấu chấm động
 * 6. Các giá trị đặc biệt : Infinity, -Infinity, NaN
 * 7. Kiểm tra số hợp lệ
 * 8. Chuyển đổi chuỗi sang số
 * 9. Một số hàm trong Math
 */

"use strict";

// in ra html tag <h2> Numbers </h2>
document.write("<h2> Numbers </h2>");

// 1. Hai loại số chính trong JS
// - number : 
//   - bao gồm số nguyên : 1, 2, 3 , -10, 0
let intNum = 42;  //  số nguyên
//   - số dấu chấm động (floating-point) : 1.5, 3.14, -0.99
let floatNum = 3.14; // số dấu chấm động
// - bigint : số nguyên lớn hơn giới hạn của number
let bigIntNum = 1234567890123456789012345678901234567890n; // số nguyên lớn


// 2. Biểu diễn số trong JS

// 2.1 Các hệ cơ số trong JS
// - Hệ thập phân (Decimal) : cơ số 10 , 0-9
let decimalNum = 255; // hệ thập phân , các số từ 0 đến 9
// - Hệ nhị phân (Binary) : cơ số 2 , 0-1, bắt đầu bằng 0b hoặc 0B
let binaryNum = 0b11111111;
// - Hệ bát phân (Octal) : cơ số 8 , 0-7, bắt đầu bằng 0o hoặc 0O
let octalNum = 0o377;
// - Hệ thập lục phân (Hexadecimal) : cơ số 16 , 0-9, A-F, bắt đầu bằng 0x hoặc 0X
let hexNum = 0xFF;

// 2.2 cách viết số lớn và nhỏ và dễ đọc
let a = 1e6; // 1 nhân với 10 mũ 6 = 1000000, hệ thập phân lớn hơn 1
let b = 1e-6; // 1 chia cho 10 mũ 6 = 0.000001, hệ thập phân nhỏ hơn 1
let c = 1_000_000; // 1 triệu , dấu _ để dễ đọc, hệ thập phân

// 3. Chuyển đổi chuỗi sang số
// sử dụng num.toString(base)

(123).toString(16); // "7b" , chuyển số 123 sang hệ thập lục phân
(255).toString(2);  // "11111111" , chuyển số 255 sang hệ nhị phân
(100).toString(8);  // "144" , chuyển số 100 sang hệ bát phân, 

// 4. Làm tròn số

// 4.1 Math.floor() - làm tròn xuống
Math.floor(3.9); // 3

// 4.2 Math.ceil() - làm tròn lên
Math.ceil(3.1); // 4

// 4.3 Math.round() - làm tròn gần nhất
Math.round(3.5); // 4

// 4.4 toFixed(n) - làm tròn đến n chữ số thập phân
let num = 1.23456;
num.toFixed(2); // "1.23" , làm tròn đến 2 chữ số thập phân

// 4.5 trunc - bỏ phần thập phân
Math.trunc(3.9); // 3

// 5. Mất chính xác với số dấu chấm động
0.1 + 0.2 === 0.3; // false , do mất chính xác
// Giải pháp : làm tròn với toFixed hoặc nhân lên trước khi tính toán
(0.1 * 10 + 0.2 * 10) / 10 === 0.3; // true

// 6. Các giá trị đặc biệt : Infinity, -Infinity, NaN

// 6.1 Infinity và -Infinity
console.log(1 / 0); // Infinity
console.log(-1 / 0); // -Infinity
// 6.2 NaN - Not a Number
console.log("abc" / 2); // NaN

// 6.3 giá trị 0 và -0
console.log(0 === -0); // true

// 7. Kiểm tra số hợp lệ

// 7.1 isNaN(value) - kiểm tra NaN
console.log(isNaN(NaN)); // true
console.log(isNaN("abc")); // true
console.log(isNaN("")); // false , vì "" được chuyển thành 0
console.log(isNaN(123)); // false

// 7.2 Number.isNaN(value) - kiểm tra NaN chính xác hơn
console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN("abc")); // false
console.log(Number.isNaN(123)); // false

// 7.3 isFinite(value) - kiểm tra số hữu hạn
console.log(isFinite(123)); // true
console.log(isFinite(Infinity)); // false
console.log(isFinite(NaN)); // false

// 7.4 Number.isFinite(value) - kiểm tra số hữu hạn chính xác hơn
console.log(Number.isFinite(123)); // true
console.log(Number.isFinite(Infinity)); // false
console.log(Number.isFinite(NaN));  // false
console.log(Number.isFinite("123")); // false   

// 8. Chuyển đổi chuỗi sang số

// 8.1 Number(value) - chuyển chuỗi sang số
console.log(Number("123")); // 123
console.log(Number("  123  ")); // 123 , bỏ khoảng trắng
console.log(Number("123abc")); // NaN , không thể chuyển

// 8.2 parseInt(value, base) - chuyển chuỗi sang số nguyên
console.log(parseInt("123px")); // 123 , dừng lại khi gặp ký tự không phải số
console.log(parseInt("  0b111  ", 2)); // 7 , chuyển chuỗi nhị phân sang số nguyên
console.log(parseInt("ff", 16)); // 255 , chuyển chuỗi thập lục phân sang số nguyên

// 8.3 parseFloat(value) - chuyển chuỗi sang số dấu chấm động
console.log(parseFloat("3.14abc")); // 3.14 , dừng lại khi gặp ký tự không phải số
console.log(parseFloat("  2.71  ")); // 2.71 , bỏ khoảng trắng

// 9. Một số hàm trong Math 

// 9.1 Math.random() - trả về số ngẫu nhiên trong khoảng [0, 1)
console.log(Math.random()); // ví dụ: 0.123456789

// 9.2 Math.max(...values) - trả về giá trị lớn nhất
console.log(Math.max(1, 3, 2)); // 3

// 9.3 Math.pow(base, exponent) - lũy thừa
console.log(Math.pow(2, 3)); // 8 , 2 mũ 3

// 10. Bài tập

// 10.1 Viết script cho phép người dùng nhập hai số, sau đó in ra tổng của chúng.

let x = +prompt("Nhập số x:", 0);
let y = +prompt("Nhập số y:", 0);
console.log("Tổng: " + (x + y));

// 10.2 Tại sao 6.35.toFixed(1) trả về 6.3 mà không phải 6.4?
// cách làm tròn chính xác với toFixed

console.log((6.35).toFixed(1)); // 6.3
// Vì 6.35 không được lưu chính xác trong bộ nhớ do lỗi dấu chấm động
// Giá trị thực tế là 6.34999999999999964473...
// Giải pháp : nhân lên trước khi làm tròn

console.log((1.35).toFixed(1)); // 1.4
// Vì sao 1.35.toFixed(1) trả về 1.4 mà không phải 1.3?
// Vì 1.35 không được lưu chính xác trong bộ nhớ do lỗi dấu chấm động
// Giá trị thực tế là 1.35000000000000008882...
// Giải pháp : nhân lên trước khi làm tròn

//  cách làm tròn chính xác với toFixed
console.log((Math.round(6.35 * 10) / 10).toFixed(1)); // 6.4

// 10.3 Viết hàm readNumber() , hàm này sẽ lặp lại việc yêu cầu nhập số cho đến khi người dùng nhập đúng giá trị số.
// Hàm trả về giá trị số đã nhập.

/**
 * nhập số từ người dùng, lặp lại cho đến khi nhập đúng số hoặc hủy
 * @returns {number|null}
 */
function readNumber() {
    let num;
    do {
        num = prompt("Vui lòng nhập một số:", 0);
    } while (!isFinite(num));
    if (num === null || num === "") return null; // nếu người dùng click Cancel hoặc nhập rỗng thì trả về null
    return +num;
}
console.log("Số đã nhập: " + readNumber());

// 10.4 Sửa lỗi trong hàm dưới đây để nó kết thúc đúng khi i đạt giá trị 10.
function loopUntilTen() {
    let i = 0;
    while (i != 10) {
        i += 0.2;
    }
}
// loopUntilTen();

// Hàm trên sẽ chạy mãi mãi. Tại sao? Cách khắc phục?
// Vì 0.2 không thể biểu diễn chính xác trong dấu chấm động, dẫn đến i không bao giờ chính xác bằng 10.
// Cách khắc phục: sử dụng một khoảng sai số nhỏ để so sánh, hoặc làm tròn i trước khi so sánh.
function loopUntilTenFixed() {
    let i = 0;
    while (i != 10) { // so sánh với khoảng sai số nhỏ
        i += 0.2 * 10 / 10; // nhân lên để tránh lỗi dấu chấm động
    }
}
loopUntilTenFixed(); // bây giờ hàm sẽ kết thúc đúng khi i gần bằng 10

// 10.5 Một số ngẫu nhiên từ min đến max, không bao gồm max

/**
 * trả về số ngẫu nhiên trong khoảng [min, max)
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function random(min, max) {
    return Math.random() * (max - min) + min;
}

random(1, 5); // ví dụ: 3.456789

// 10.6 Viết hàm randomInteger(min, max) để trả về số nguyên ngẫu nhiên trong khoảng từ min đến max, bao gồm cả min và max.