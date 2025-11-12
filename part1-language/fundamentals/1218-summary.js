/** file  : 1218-summary.js
 * Javascript Summary
 * Tóm tắt các tính năng chính của JavaScript
 * 1. Code Structure
 * 2. Strict mode
 * 3. Biến số
 * 4. Kiểu dữ liệu
 * 5. Tương tác với người dùng
 * 6. Các toán tử - Operators
 *  6.1 Toán tử số học
 *  6.2 Toán tử điều kiện
 *  6.3 Toán tử logic
 *  6.4 Toán tử null coalescing (??)
 *  6.5 Toán tử so sánh
 * 7. Các cấu trúc điều khiển
 * 7.1 Vòng lặp
 *  7.1.1 Vòng lặp for
 *  7.1.2 Vòng lặp while
 *  7.1.3 Vòng lặp do...while
 * 7.2 Câu lệnh switch ...case
 * 8. Hàm - Functions
 *  8.1 Khai báo hàm
 *  8.2 Biểu thức hàm
 *  8.3 Hàm arrow
 */
"use strict";

// in ra html tag <h2>JavaScript Summary </h2>
document.write("<h2>JavaScript Summary </h2>");

// 1. Code Structure

// - Các lệnh trong JavaScript được phân tách bằng dấu chấm phẩy (;)
// - Trong hầu hết các trường hợp, dấu chấm phẩy có thể được bỏ qua khi có ngắt dòng
// - Nhưng trong một số trường hợp đặc biệt, dấu chấm phẩy là cần thiết để tránh lỗi
// - Sau {...} không cần dấu chấm phẩy vì {...} đã được coi là một khối lệnh hoàn chỉnh

// Ví dụ 1: Sử dụng dấu chấm phẩy để phân tách các lệnh
console.log("Hello, world!"); console.log("Welcome to JavaScript.");

// ví dụ 2: Bỏ dấu chấm phẩy khi có ngắt dòng
console.log("Hi, world!")
console.log("Welcome to JS.")

// ví dụ 3: Trường hợp đặc biệt cần dùng dấu chấm phẩy
// alert("There will be an error after this message")
// [1, 2].forEach(console.log) // Lỗi! Hai câu lệnh trên bị hiểu nhầm thành một câu lệnh duy nhất

// ví dụ 4 : Không cần dấu chấm phẩy sau khối lệnh
if (true) {
    console.log("Hello");
} else {
    console.log("Goodbye");
}

for (let i = 0; i < 3; i++) {
    console.log(i);
}


// 2. Strict mode

// - Kích hoạt chế độ nghiêm ngặt để tránh các lỗi phổ biến và cải thiện bảo mật
// - Cú pháp: "use strict"; đặt ở đầu tệp hoặc đầu hàm  
// - Trong chế độ nghiêm ngặt, một số hành vi không an toàn sẽ
//   bị cấm, ví dụ: sử dụng biến chưa khai báo, xóa các biến không thể xóa, v.v.
// - Nên luôn sử dụng "use strict"; trong mã JavaScript để đảm bảo chất lượng mã tốt hơn

// 3. Biến số 

// -  khai báo biến bằng từ khóa let, const hoặc var ( không khuyến khích dùng var )
// -  let và const có phạm vi khối lệnh (block scope) , var có phạm vi hàm (function scope)
// -  const dùng để khai báo hằng số, không thể gán lại giá trị sau khi đã khởi tạo
// -  let dùng để khai báo biến có thể thay đổi giá trị

let x = 10; // khai báo biến x
x = "Hello"; // gán lại giá trị cho biến x
console.log(x); // in ra Hello
const PI = 3.14; // khai báo hằng số PI
// PI = 3.14159; // Lỗi! Không thể gán lại giá trị cho hằng số

// 4. Kiểu dữ liệu

// - JavaScript có 8 kiểu dữ liệu chính: Number, Bigint , String, Boolean,  Null, Undefined, Object và Symbol
// - Kiểu động (dynamic typing): biến có thể chứa giá trị của bất kỳ kiểu dữ liệu nào và có thể thay đổi kiểu dữ liệu trong quá trình thực thi

// toán tử typeof để kiểm tra kiểu dữ liệu
console.log(typeof 42); // in ra number
console.log(typeof "Hello"); // in ra string
console.log(typeof true); // in ra boolean
console.log(typeof null); // in ra object (lỗi thiết kế của JavaScript)
console.log(typeof undefined); // in ra undefined
console.log(typeof Symbol("id")); // in ra symbol
console.log(typeof BigInt(123456789012345678901234567890)); // in ra bigint

typeof null === "object"; // true , lỗi thiết kế của JavaScript

// 5. Tương tác với người dùng

// - Sử dụng hàm prompt() để hiển thị hộp thoại nhập dữ liệu từ người dùng
// - Sử dụng hàm alert() để hiển thị hộp thoại thông báo cho người dùng
// - Sử dụng hàm confirm() để hiển thị hộp thoại xác nhận (OK/Cancel) và trả về giá trị boolean

let userName = prompt("Enter your name:", "Guest"); // hiển thị hộp thoại nhập tên
let isSomeTea = confirm("Do you want some tea?"); // hiển thị hộp thoại xác nhận

console.log("Visitor: " + userName); // in ra tên người dùng
console.log("User wants some tea: " + isSomeTea); // in ra kết quả xác nhận

// 6. Các toán tử - Operators

// - Các toán tử số học: +, -, *, /, %, ** (lũy thừa)
// - Toán tử gán: =, +=, -=, *=, /=, %=
// - Toán tử so sánh: ==, ===, !=, !==, <, >, <=, >=
// - Toán tử logic: && (AND), || (OR), ! (NOT)
// - Toán tử chuỗi: + (nối chuỗi), += (nối chuỗi và gán)
// - Toán tử đặc biệt: typeof, instanceof, delete
// - Toán tử điều kiện: ? : (toán tử ba ngôi)

// 6.1 toán tử số học

console.log("1" + 2); // "12" , nối chuỗi
console.log(1 + "2"); // "12" , nối chuỗi

// 6.2 toán tử điều kiện 

console.log(true ? "Yes" : "No"); // "Yes"
console.log(false ? "Yes" : "No"); // "No"

// 6.3 toán tử logic 

console.log(true && false); // false - tìm giá trị false đầu tiên
console.log(true || false); // true - tìm giá trị true đầu tiên

// 6.4 toán tử null coalescing (??)

// - Trả về toán hạng bên phải nếu toán hạng bên trái là null hoặc undefined, 
// - ngược lại trả về toán hạng bên trái
let user;
console.log(user ?? "Guest"); // "Guest" - user là undefined nên trả về "Guest"
user = "Alice";
console.log(user ?? "Guest"); // "Alice" - user có giá trị nên trả về user

// 6.5 toán tử so sánh 

console.log(0 == false); // true - bằng không nghiêm ngặt 
console.log(0 == ''); // true - bằng không nghiêm ngặt

// 7. Các cấu trúc điều khiển

// - Câu lệnh if...else
// - Câu lệnh switch...case
// - Vòng lặp for, while, do...while
// - Câu lệnh break và continue

// 7.1 Vòng lặp 

// 7.1.1 Vòng lặp for

for (let i = 0; i < 5; i++) {
    console.log(i); // in ra 0,1,2,3,4
}

// 7.1.2 Vòng lặp while

let condition1 = true;
while (condition1) {
    console.log("This will run forever unless we break");
    condition1 = false; // để tránh vòng lặp vô hạn
}
// 7.1.3 Vòng lặp do...while

let condition2 = true;
do {
    console.log("This will run at least once");
    condition2 = false; // để tránh vòng lặp vô hạn
} while (condition2);

// 7.2 Câu lệnh switch ...case

// Cấu trúc "switch" có thể thay thế nhiều ifphép kiểm tra. Nó sử dụng ===(so sánh nghiêm ngặt) để so sánh

let age = 18;
switch (age) {
    case 18:
        console.log("Won't work"); // Không in ra vì so sánh nghiêm ngặt 18 (số) !== "18" (chuỗi)
        break;
    case "18":
        console.log("This works!");
        break;
    default:
        console.log("Any value not equal to one above");
}

// 8. Hàm - Functions

// - Định nghĩa hàm bằng từ khóa function
// - Gọi hàm để thực thi khối mã bên trong hàm
// - Hàm có thể có đối số và trả về giá trị
// - Xem chi tiết trong phần Functions

// 8.1 Khai báo hàm

function sum_1(a, b) {
    let result = a + b;
    return result;
}
console.log(sum_1(2, 3)); // 5

// 8.2 Biểu thức hàm

let sum_2 = function (a, b) {
    let result = a + b;
    return result;
}
console.log(sum_2(2, 3)); // 5

// 8.3 Hàm arrow 

// biểu thức bên phải, bên trái của dấu => là danh sách các đối số
let sum_3 = (a, b) => a + b;
console.log(sum_3(2, 3)); // 5

// cú pháp nhiều dòng lệnh với { ... }
let sum_4 = (a, b) => {
    let result = a + b;
    return result;
}
console.log(sum_4(2, 3)); // 5

// không tham số 
let sayHi = () => console.log("Hello!");
sayHi(); // in ra Hello!
