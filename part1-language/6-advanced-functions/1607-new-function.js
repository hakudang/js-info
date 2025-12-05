/** 
 * Syntax New Function trong JavaScript
 * Cú pháp : new function ([arg1, arg2, ...argN], functionBody)
 * - là một cách đặc biệt để tạo hàm trong JavaScript
 * - Khác với các cách tạo hàm thông thường, 
 *   New Function tạo hàm ở phạm vi toàn cục (global scope)
 * 
 * 
 */

'use strict';

// in ra tiêu đề phần
document.write("<h2> Syntax New Function trong JavaScript </h2>");

function section(title) {
    console.log("\n================================ ");
    console.log("=== " + title + " ===");
    console.log("================================ \n");
}

// 1. Cú pháp New Function trong JavaScript 
section("Cú pháp New Function trong JavaScript");

// let func = new Function [arg1, arg2, ...argN], functionBody);

// Ví dụ :
let sum = new Function('a', 'b', 'return a + b;');

console.log(sum(2, 3)); // 5

// hàm không có tham số 
let sayHi = new Function('console.log("Hello")');

sayHi();

// 2. Điểm khác biệt của New Function so với các cách tạo hàm khác

// Ứng dụng :
// - Hệ thống template
// - Sinh mã động ( dynamic code generation )
// - Các trường hợp chuyên biệt khi code chỉ biết trong runtime
section("Điểm khác biệt của New Function so với các cách tạo hàm khác");

// hàm được tạo từ string, chứ không được viết trực tiếp trong code

// let str = "...mã hàm nhận từ server...";
let str = "console.log('Hàm được tạo từ string');";
let func = new Function(str);
func();


// 3. new Function KHÔNG tạo closure

// Hàm tạo bởi new Function luôn có phạm vi toàn cục (global scope)
// Không phải lexical scope như các hàm thông thường khác

// Ví dụ : hàm thông thường tạo closure, hàm tạo bởi new Function không tạo closure
section("new Function KHÔNG tạo closure");

function getFunc() {
    let value = "test";
    // let func = new Function('console.log(value);'); // LỖI: value không được định nghĩa
    let func = function () { console.log(value); }; // closure
    return func;
}

// getFunc()(); // LỖI: value is not defined
getFunc()(); // test


// 4. Function chỉ nên nhận dữ liệu qua tham số, không dùng biến

// Vì new Function không tạo closure, nên không thể truy cập biến bên ngoài
// Do đó, để hàm hoạt động đúng, ta nên truyền dữ liệu qua tham số

// phân biệt giữa lexical scope và global scope

section("Function chỉ nên nhận dữ liệu qua tham số, không dùng biến");

let value = "global";
let func1 = new Function('console.log(value);'); // value từ global scope
let func2 = function () { console.log(value); }; // value từ lexical scope

func1(); // global
func2(); // global

// 5. Cú pháp rút gọn
section("Cú pháp rút gọn");

// 3 new Function - 3 cách truyền tham số khác nhau
let funcA = new Function('a', 'b', 'return a + b;');
let funcB = new Function('a,b', 'return a + b;');
let funcC = new Function('a, b', 'return a + b;');

console.log(funcA(1, 2)); // 3
console.log(funcB(3, 4)); // 7
console.log(funcC(5, 6)); // 11