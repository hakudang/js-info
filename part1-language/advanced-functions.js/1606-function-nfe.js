/**
 * Function object & Biểu thức hàm NFE có tên trong JavaScript 
 * NFE (Named Function Expression) : là một biểu thức hàm có tên.
 * 
 * function object là gì?
 * - Mỗi hàm trong JavaScript thực chất là một đối tượng (function object)
 * - Hàm có thể được gán cho biến, truyền làm đối số, hoặc trả về từ hàm khác
 */

"use strict";

function section(title) {
    console.log("\n================================ ");
    console.log("=== " + title + " ===");
    console.log("================================ \n");
}

// in ra tiêu đề
document.write("<h2> Function object & NFE (Named Function Expression) trong JavaScript </h2>");

// 1. Function có thuộc tính name

section("1. Function có thuộc tính name");

// 1.1 khai báo hàm cơ bản
function sayHi() {
    console.log("Hi");
}
console.log(sayHi.name); // sayHi

// 1.2 Khai báo biểu thức hàm 
let sayHello = function () {
    console.log("Hello");
};
console.log(sayHello.name); // sayHello

// 1.3 Biểu thức hàm có tên (NFE)
// JS cũng tự đoán tên trong default param:

function f(sayChao = function () { }) {
    console.log(sayChao.name); // sayChao
}
f();

// 1.4 Phương thức của object
let user = {
    sayHi() { },
    sayBye: function () { }
};

console.log(user.sayHi.name); // sayHi
console.log(user.sayBye.name); // sayBye

// JS không đoán được tên 
// Khi biểu thức hàm không được gán cho biến hoặc 
// thuộc tính object,

let arr = [function () { }];
console.log(arr[0].name); // "" (empty string)

// 2. Thuộc tính length của function
// Thuộc tính length trả về số lượng tham số 
// không có default trong định nghĩa hàm

section("2. Thuộc tính length của function");

function f1(a) { }
function f2(a, b) { }
function many(a, b, ...more) { }

console.log(f1.length); // 1
console.log(f2.length); // 2
console.log(many.length); // 2 , ...more không được tính vì là rest parameter

// Ví dụ dùng length để xử lý handler:
// handler là hàm có 0 hoặc 1 tham số

function ask(question, ...handlers) {
    let isYes = confirm(question);

    for (let handler of handlers) {
        if (handler.length == 0) {
            if (isYes) handler();
        } else {
            handler(isYes); // truyền kết quả cho handler
        }
    }
}

ask("Question?",
    () => console.log('You said yes'),
    result => console.log(result));

// 3. Custom properties trong function

section("3. Custom properties trong function");

// 3.1 Thêm thuộc tính vào function object
// property không liên quan đến biến cục bộ bên trong function.

(() => {
    function sayHi() {
        console.log("Hi");
        sayHi.counter++;
    }

    sayHi.counter = 0; // khai báo và khởi tạo thuộc tính counter

    sayHi();
    sayHi();
    console.log(`Called ${sayHi.counter} times`); // Called 2 times
})();

// 3.2 Dùng property thay cho closure
// Thay Closure → biến private, bên ngoài không sửa được.
// Function property → bên ngoài sửa thoải mái:

function makeCounter() {
    function counter() {
        return counter.count++;
    }
    counter.count = 0; // khai báo và khởi tạo thuộc tính count
    // counter.count = 10; // sửa bên ngoài nếu muốn
    return counter;
}

let counter = makeCounter();
console.log(counter()); // 0
console.log(counter()); // 1

// 4. NFE – Named Function Expression
// Đây là Function Expression có “tên riêng bên trong”
// function được định nghĩa là sao ?
// - function vô danh (anonymous function)
// - function có tên (named function) → NFE

section("4. NFE – Named Function Expression");

// Bình thường 
(() => {
    let sayHi = function (who) {
        console.log(`Hello, ${who}`);
    };
})();

// NFE

(() => {
    let sayHiNFE = function func(who) {
        console.log(`Hello, ${who}`);
    }
})();


// 4.1 NFE - Dùng để gọi đệ quy

(() => {
    let sayHiNFE = function func(who) {
        if (who) {
            console.log(`Hello, ${who}`);
        } else {
            func("Guest"); // gọi đệ quy
        }
    };

    sayHiNFE(); // Hello, Guest
    // func(); // Error: func is not defined, 
    // - chỉ gọi được bên trong hàm
    // - muốn không có lỗi thì không làm NFE mà khai báo bt
})();


// 4.2 NFE - (2) func luôn trỏ đúng vào function gốc, 
// không bị ảnh hưởng khi sửa biến bên ngoài

section("4.2 NFE - func luôn trỏ đúng vào function gốc");

// Sai khi không dùng NFE
/*
(() => {
    let sayHi = function (who) {
        if (!who) sayHi("Guest"); // sai, vì sayHi có thể bị thay đổi bên ngoài
    };

    let welcome = sayHi;
    sayHi = null;

    welcome(); // Error: sayHi is not a function
})();
*/

// Đúng khi dùng NFE - Dùng NFE để fix:
(() => {
    let sayHiNFE = function func(who) { // func là tên nội bộ
        if (!who) func("Guest"); // luôn trỏ đúng vào function gốc
    };

    let welcomeNFE = sayHiNFE;
    sayHiNFE = null;

    welcomeNFE(); // Hello, Guest
})();

// 5. Function Declaration không có internal name

section("5. Function Declaration không có internal name");

// Chỉ Function Expression mới có NFE.
// Function Declaration không có cơ chế đặt “tên nội bộ”.

// Trường hợp cần recursion an toàn → phải dùng NFE.