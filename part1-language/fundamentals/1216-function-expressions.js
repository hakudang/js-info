/** @file 
 * Function expressions
 * Biểu thức hàm : hàm được tạo ra trong biểu thức, không phải trong khai báo.
 * Một hàm biểu thức có thể được không tên (hàm vô danh) hoặc có tên.
 * 1. Khai báo hàm - Function Declaration
 * 2. Biểu thức hàm - hàm vô danh - Function Expression - Anonymous function
 * 3. Hàm là một giá trị
 * 4. Sử dụng hàm vô danh làm callback
 * 5. Gọi hàm sớm hơn định nghĩa
 */
"use strict";

// in ra html tag <h2> Function Expressions </h2>
document.write("<h2> Function Expressions </h2>");

// 1. Khai báo hàm - Function Declaration
function sayHi() {
    console.log("Hello");
}

// 2. Biểu thức hàm - hàm vô danh - Function Expression - Anonymous function
let sayHello = function () {
    console.log("Hello");
};

// 3. Hàm là một giá trị
// - có thể gán hàm cho biến 
// - hoặc truyền hàm như một đối số cho hàm khác gọi là callback function

// Gán hàm cho biến
let func = sayHi; // sao chép tham chiếu hàm vào biến khác
console.log(sayHi); // in ra toàn bộ định nghĩa hàm sayHi, không in ra giá trị trả về của hàm
// ƒ sayHi() {
//     console.log("Hello");
// }
func(); // gọi hàm thông qua biến func , in ra Hello

// 4. Sử dụng hàm vô danh làm callback
// Khai báo 
function ask(question, yes, no) {
    if (confirm(question)) yes();
    else no();
}

// 4.1 Sử dụng hàm vô danh làm callback
ask(
    "Do you agree?",
    function () { console.log("You agreed."); },
    function () { console.log("You canceled the execution."); }
);
// 4.2 Sử dụng hàm đã định nghĩa làm callback

function showOk() {
    console.log("You agreed.");
}
function showCancel() {
    console.log("You canceled the execution.");
}
// sử dụng hàm showOk và showCancel làm callback
ask("Do you agree?", showOk, showCancel);

// 5. Gọi hàm sớm hơn định nghĩa
// - Hàm khai báo (Function Declaration) có thể được gọi trước khi định nghĩa trong mã nguồn
// - Hàm biểu thức (Function Expression) chỉ có thể được gọi sau khi định nghĩa

//5.1 Gọi hàm khai báo trước định nghĩa
// gọi hàm trước khi định nghĩa
sayHi_2("John"); // in ra Hello, John!
// định nghĩa hàm
function sayHi_2(name) {
    console.log("Hello, " + name + "!");
}

// 5.2 Gọi hàm biểu thức sau định nghĩa

// gọi hàm biểu thức trước định nghĩa sẽ lỗi
// sayHello_2("Alice"); // Lỗi! sayHello_2 chưa được định nghĩa

// định nghĩa hàm biểu thức

let sayHello_2 = function (name) {
    console.log("Hello, " + name + "!");
};
// gọi hàm biểu thức sau định nghĩa
sayHello_2("Alice"); // in ra Hello, Alice!

// Bài tập 
// bài tập 1
let age = prompt("Nhập tuổi của bạn:", 18);
if (age < 18) {
    function welcome() { // khai báo hàm trong khối lệnh if
        console.log("Chào bạn!");
    }
} else {
    function welcome() { // khai báo hàm trong khối lệnh else
        console.log("Xin chào quý khách!");
    }
}
// welcome(); // error ! welcome không được định nghĩa vì hàm khai báo cục bộ trong khối lệnh if/else 
// không được phép truy cập từ bên ngoài khối lệnh đó

// Sửa lại bằng cách sử dụng biểu thức hàm
let age_2 = prompt("Nhập tuổi của bạn:", 18);
let welcome_2;

if (age_2 < 18) {
    welcome_2 = function () {
        console.log("Chào bạn!");
    };
} else {
    welcome_2 = function () {
        console.log("Xin chào quý khách!");
    };
}
welcome_2(); // in ra Chào bạn! hoặc Xin chào quý khách!

// bài tập 2

let age_3 = prompt("Nhập tuổi của bạn:", 18);
if (age_3 < 18) {
    welcome_3(); // gọi hàm trước định nghĩa -> in ra Chào bạn!
    function welcome_3() {
        console.log("Chào bạn!");
    }
    welcome_3(); // gọi hàm sau định nghĩa -> in ra Chào bạn!
} else {
    function welcome_3() {
        console.log("Xin chào quý khách!");
    }
}
// welcome_3(); // gọi hàm ngoài khối lệnh if/else -> lỗi ! welcome_3 không được định nghĩa

// Sửa lại bằng cách sử dụng biểu thức hàm
let age_4 = prompt("Nhập tuổi của bạn:", 18);
let welcome_4;
if (age_4 < 18) {
    welcome_4 = function () {
        console.log("Chào bạn!");
    };
} else {
    welcome_4 = function () {
        console.log("Xin chào quý khách!");
    };
}
welcome_4(); // in ra Chào bạn! hoặc Xin chào quý khách!
