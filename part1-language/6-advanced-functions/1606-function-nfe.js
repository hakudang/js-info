/**
 * Function object & Biểu thức hàm NFE có tên trong JavaScript 
 * NFE (Named Function Expression) : là một biểu thức hàm có tên.
 * 
 * function object là gì?
 * - Mỗi hàm trong JavaScript thực chất là một đối tượng (function object)
 * - Hàm có thể được gán cho biến, truyền làm đối số, hoặc trả về từ hàm khác
 * - Hàm có thể có các thuộc tính (properties) và phương thức (methods)
 * - Thuộc tính và phương thức này có thể được sử dụng để lưu trữ thông tin
 *   về hàm hoặc thực hiện các thao tác liên quan đến hàm đó.
 * - Một số thuộc tính quan trọng của function object:
 *   + name: Tên của hàm
 *   + length: Số lượng tham số không có giá trị mặc định trong định nghĩa hàm
 *   + prototype: Đối tượng prototype của hàm (chỉ áp dụng cho hàm được sử dụng làm constructor)
 * - Các phương thức quan trọng của function object:
 *   + call(thisArg, arg1, arg2, ...): Gọi hàm với this được đặt thành thisArg và các đối số được truyền riêng lẻ
 *   + apply(thisArg, [argsArray]): Gọi hàm với this được đặt thành thisArg và các đối số được truyền dưới dạng mảng
 *   + bind(thisArg, arg1, arg2, ...): Trả về một hàm mới với this được đặt thành thisArg và các đối số được truyền trước
 * * NFE (Named Function Expression):
 * - Là một biểu thức hàm có tên riêng bên trong định nghĩa hàm
 * - Cho phép hàm tự tham chiếu đến chính nó thông qua tên nội bộ
 * - Hữu ích cho việc gọi đệ quy hoặc khi cần tham chiếu đến hàm bên trong chính nó
 * - Cú pháp: let func = function name(params) { ... };
 * - Lưu ý: Tên nội bộ chỉ có thể được sử dụng bên trong hàm, không thể truy cập từ bên ngoài   
 * 
 * 1. Function - thuộc tính name
 * 2. Function - Thuộc tính length
 * 3. Custom properties trong function
 * 4. NFE – Named Function Expression
 * 5. Khai báo Function không có internal name
 * 
 * BÀI TẬP
 * BÀI TẬP 1: Viết hàm sum(n) tính tổng nhiều tham số
 */

"use strict";

function section(title) {
    console.log("\n================================ ");
    console.log("=== " + title + " ===");
    console.log("================================ \n");
}

// in ra tiêu đề
document.write("<h2> Function object & NFE (Named Function Expression) trong JavaScript </h2>");

// 1. Function - thuộc tính name

// Mỗi hàm trong JS đều có thuộc tính name
// Thuộc tính name trả về tên của hàm

section("1. Function - thuộc tính name");

// 1.1 khai báo hàm cơ bản

function sayHi() {
    console.log("Hi");
}
console.log(sayHi.name); // sayHi

// 1.2 Khai báo biểu thức hàm 

// Biểu thức hàm vô danh
// cú pháp: let func = function (params) { ... };

let sayHello = function () {
    console.log("Hello");
};
console.log(sayHello.name); // sayHello

// 1.3 Biểu thức hàm có tên (NFE)
// cú pháp: let func = function name(params) { ... };

let sayHelloNFE = function greet() {
    console.log("Hello NFE");
};

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

// 2. Function - Thuộc tính length

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

// Thuộc tính không liên quan đến biến cục bộ bên trong function.

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

// 3.2 Dùng thuộc tính thay closure

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
// - Cú pháp:
// let func = function name(params) { ... };

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


// 4.2 NFE - func luôn trỏ đúng vào function gốc, 
// không bị ảnh hưởng khi sửa biến bên ngoài

section("4.2 NFE - func luôn trỏ đúng vào function gốc");

// Sai khi không dùng NFE
/*
(() => {
    let sayHi = function (who) {
        if (who) { 
            console.log(`Hello, ${who}`);
        } else {
             sayHi("Guest"); // error, sayHi is not a function
        }
    };

    let welcome = sayHi;
    sayHi = null;

    welcome(); // Error: sayHi is not a function
})();
*/

// Đúng khi dùng NFE - Dùng NFE để fix:
(() => {
    let sayHiNFE = function func(who) { // func là tên nội bộ
        if (who) {
            console.log(`Hello, ${who}`);
        } else {
            func("Guest"); // luôn trỏ đúng vào function gốc
        }
    };

    let welcomeNFE = sayHiNFE;
    sayHiNFE = null; // thay đổi biến bên ngoài không ảnh hưởng đến func

    welcomeNFE(); // Hello, Guest
})();

// 5. Khai báo Function không có internal name

section("5. Function Declaration không có internal name");

// Chỉ Function Expression mới có NFE.
// Function Declaration không có cơ chế đặt “tên nội bộ”.

// Trường hợp cần đệ quy an toàn → phải dùng NFE.

// Ví dụ :
/*
(() => {
    function factorial(n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1); // gọi đệ quy
    }

    let func = factorial;
    factorial = null; // thay đổi biến bên ngoài
    console.log(func(5)); // Error: factorial is not a function
})();
*/
// Cách fix : dùng NFE
(() => {
    let factorialNFE = function fact(n) { // NFE
        if (n <= 1) return 1;
        return n * fact(n - 1); // gọi đệ quy
    };
    let funcNFE = factorialNFE;
    factorialNFE = null; // thay đổi biến bên ngoài
    console.log(funcNFE(5)); // 120
})();

// BÀI TẬP

/* ================================
=== BÀI TẬP 1  ===
* Viết hàm sumT(n) tính tổng nhiều tham số 
*--------------------------------
* Ví dụ :
sum(1)(2) == 3; // 1 + 2
sum(1)(2)(3) == 6; // 1 + 2 + 3
sum(5)(-1)(2) == 6
sum(6)(-1)(-2)(-3) == 0
sum(0)(1)(2)(3)(4)(5) == 15
*--------------------------------
Giải pháp : 
- Sử dụng NFE để hàm có thể tự gọi lại chính nó
- Sử dụng phương thức toString() để trả về giá trị tổng khi cần
- Mỗi lần gọi hàm sẽ trả về một hàm mới để tiếp tục nhận tham số
- Khi hàm được chuyển đổi sang chuỗi (ví dụ khi dùng trong biểu thức), 
  ta sẽ trả về giá trị tổng hiện tại
* ================================ */

section("BÀI TẬP 1: Viết hàm sum(n) tính tổng nhiều tham số");
function sum(n) {
    let total = n;
    function f(x) {
        total += x;
        return f; // trả về chính hàm f để tiếp tục nhận tham số
    }
    f.toString = function () {
        return total;
    };
    return f; // trả về hàm f lần đầu tiên
}

console.log(sum(1)(2).toString()); // 3