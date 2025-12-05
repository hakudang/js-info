/** @file
 * @title Biến (Variables)
 * @description Biến là một khái niệm cơ bản trong lập trình, cho phép bạn lưu trữ và thao tác với dữ liệu.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#variables|MDN Variables}
 * @example
 */


"use strict";
// A. Biến số (Variables)
// 1. Khai báo biến
// Sử dụng từ khóa 'let' để khai báo một biến mới
let message;
message = 'Hello'; // store the message 
alert(message); // show the message in alert box

// let user = 'John', age = 25, message2 = 'Hello'; // khai báo nhiều biến trong một dòng, không sai nhưng không nên dùng cách này vì khó đọc

let user = 'John';
let age = 25;
let message2 = 'Hello'; // khai báo tên biến message 2 lần sẽ lỗi nên đổi tên cho khác đi 


// 2. Quy tắc đặt tên biến
// Tên biến có thể bao gồm chữ cái, chữ số, dấu gạch dưới (_) và dấu đô la ($)
// Tên biến không được bắt đầu bằng chữ số

let userName; // hợp lệ
let $user; // hợp lệ
let _age; // hợp lệ
// let 1stUser; // không hợp lệ, bắt đầu bằng chữ số
// Tên biến phân biệt chữ hoa và chữ thường
let color = 'red';
let Color = 'blue';
alert(color); // red
alert(Color); // blue

// 3. Từ khóa đặt tên biến
// Không sử dụng các từ khóa đã được định nghĩa trong JavaScript làm tên biến
// Ví dụ: let, const, var, function, if, else, return, v.v.
// let let = 5; // sai, 'let' là từ khóa    
let myLet = 5; // đúng

// 4. Tên biến có ý nghĩa
// Sử dụng tên biến có ý nghĩa để làm cho mã dễ đọc và hiểu hơn
let firstName = 'Alice'; // tốt hơn là dùng 'a' hoặc 'x'
let userAge = 30;

// 5. Thay đổi giá trị biến
let count = 10;
alert(count); // 10
count = 20;
alert(count); // 20

// 6. Biến chưa được khai báo
// Trong chế độ nghiêm ngặt (strict mode), việc sử dụng biến chưa được khai báo sẽ gây ra lỗi
// num = 5 // Lỗi! num chưa được khai báo

// B. Hằng số (Constants)
// 1. Khai báo hằng số
// Sử dụng từ khóa 'const' để khai báo một hằng số
const BIRTHDAY = '2000-01-01';
alert(BIRTHDAY); // 2000-01-01

// 2. Không thể thay đổi hằng số bằng phép gán lại 
const PI = 3.14;
alert(PI); // 3.14
// PI = 3.14159; // Lỗi! Không thể thay đổi giá trị của hằng số
// 3. Quy tắc đặt tên hằng số
// Tên hằng số thường được viết hoa để phân biệt với biến
const MAX_USERS = 100;
const COLOR_RED = '#FF0000';
const COLOR_GREEN = '#00FF00';
let color2 = COLOR_RED; // sử dụng hằng số trong mã


