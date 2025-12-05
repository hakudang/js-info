/** file : 1312-coding-style.js 
 * Coding Style
 * Mục đích của coding style là để code dễ đọc, dễ hiểu và dễ bảo trì
 * Nội dung chính:
 * 1. Cú pháp (Syntax)
 * 2. Curly Braces - Ngoặc nhọn
 * 3. Độ dài dòng code
 * 4. Thụt lề (Indentation)
 * 5. Dấu chấm phẩy (Semicolons)
 * 6. Cấp độ lồng nhau (Nesting Level)
 * 7. Vị trí chức năng (Function Position)
 * 
 */

"use strict";

// 1. Cú pháp 

// (1) Sử dụng dấu cách (space) thay vì tab để thụt lề
// (2) Sử dụng 2 hoặc 4 dấu cách để thụt lề, không sử dụng nhiều hơn 4 dấu cách
// (3) Luôn luôn thụt lề code trong các khối lệnh (block)
// (4) Mở ngoặc nhọn { luôn ở cuối dòng khai báo khối lệnh
// (5) Đóng ngoặc nhọn } luôn ở dòng mới, thụt lề cùng cấp với dòng khai báo khối lệnh
// (6) Sử dụng dấu cách sau từ khóa như if, for, while, function
// (7) Sử dụng dấu cách sau dấu phẩy trong danh sách đối số, phần tử mảng, thuộc tính đối tượng
// (8) Không sử dụng dấu cách trước dấu phẩy
// (9) Sử dụng dấu cách xung quanh toán tử (+, -, =, ==, ===, <, >, &&, ||, v.v.)
// (10) Không sử dụng dấu cách sau dấu mở ngoặc ( và trước dấu đóng ngoặc )
// (11) Sử dụng dòng trống để tách các khối lệnh logic trong code
// (12) Giới hạn độ dài dòng code trong khoảng 80-120 ký tự
// (13) Sử dụng tên biến, hàm có ý nghĩa, rõ ràng
// (14) Sử dụng camelCase cho tên biến và hàm
// (15) Sử dụng PascalCase cho tên lớp (class)
// (16) Sử dụng UPPER_SNAKE_CASE cho hằng số (constant)
// (17) Thêm chú thích (comment) cho các đoạn code phức tạp, hàm, lớp

// Ví dụ về coding style đúng
function calculateSum(a, b) { // sử dụng các cú pháp (8), (9), (10) , (13), (14), (17)
    if (a < 0 || b < 0) { // sử dụng các cú pháp (1), (2), (3), (4), (6), (7), (9)
        console.warn("Negative values are not allowed.");
        return null;
    } else { // sử dụng cú pháp (4), (5)
        let sum = a + b; // sử dụng cú pháp  (9), (13), (14)
        return sum;
    }
}

console.log(calculateSum(5, 10)); // in ra 15   
// console.log(calculateSum(-5, 10)); // in ra cảnh báo và null


// 2. Curly Braces - Ngoặc nhọn

// (1) Luôn sử dụng ngoặc nhọn { } cho tất cả các khối lệnh, kể cả khi chỉ có một câu lệnh
// (2) Mở ngoặc nhọn { luôn ở cuối dòng khai báo khối lệnh
// (3) Đóng ngoặc nhọn } luôn ở dòng mới, thụt lề cùng cấp với dòng khai báo khối lệnh

// Ví dụ về sử dụng ngoặc nhọn đúng
let condition;
if (condition) {
    // do this
    // ... and that
    // ... and that
}

// Cấu trúc dòng đơn không cần { }
if (condition) doSomething();

// Những trường hợp cú pháp sai 

// (1) không cần dấu ngoặc nhọn { } nếu chỉ có một câu lệnh
// if (n < 0) {alert(`Power ${n} is not supported`);} 
// sửa thành
if (n < 0) alert(`Power ${n} is not supported`);

// (2) tách dòng riêng biệt mà không dùng ngoặc nhọn { }
// if (n < 0)
//   alert(`Power ${n} is not supported`);
// sửa thành
if (n < 0) {
    alert(`Power ${n} is not supported`);
}

// 3. Độ dài dòng code 


// (1) Ngắt dòng text quá dài ( trong khoảng 80-120 ký tự) cho dễ đọc

// backtick quotes ` allow to split the string into multiple lines
let str = `
  ECMA International's TC39 is a group of JavaScript developers,
  implementers, academics, and more, collaborating with the community
  to maintain and evolve the definition of JavaScript.
`;

// (2) Ngắt toán tử dài thành nhiều dòng
if (
    id === 123 &&
    moonPhase === 'Waning Gibbous' &&
    zodiacSign === 'Libra'
) {
    letTheSorceryBegin();
}

// 4. Thụt lề (Indentation)
// (1) Thụt lề ngang 

function show(parameters,
    aligned, // dùng 2 hoặc 4 dấu cách để thụt lề
    one,
    after,
    another
) {
    // ...
}
// (2) Thụt lề dọc

// hàm sau có 3 khối lệnh, mỗi khối được tách bởi dòng trống để dễ đọc hiểu

function pow(x, n) {
    let result = 1;
    //              <-- chèn thêm dòng mới vào dễ đọc hiểu các khối -> thục lề dọc
    for (let i = 0; i < n; i++) {
        result *= x;
    }
    //              <-- chèn thêm dòng mới vào dễ đọc hiểu các khối -> thục lề dọc
    return result;
}

// 5. Dấu chấm phẩy (Semicolons)
// (1) Luôn luôn sử dụng dấu chấm phẩy ; ở cuối câu lệnh
// (2) Không sử dụng dấu chấm phẩy ; sau khối lệnh { }

// 6. Cấp độ lồng nhau (Nesting Level)
// (1) Hạn chế cấp độ lồng nhau không quá 3-4 cấp để code dễ đọc, dễ hiểu và dễ bảo trì
// (2) Sử dụng các hàm phụ để tách các khối lệnh phức tạp, giảm cấp độ lồng nhau

// (1) Dùng continue - giảm cấp độ lồng nhau 
// tư duy : if điều kiện xấu -> bỏ qua , thay vì if điều kiện tốt -> xử lý

// ví dụ 1 
for (let n of numbers) {
    // xử lý nếu n là số dương và lẻ 
    if (n > 0) {
        if (n % 2 !== 0) {
            console.log("Xử lý:", n);
        }
    }
}

// sửa thành
for (let n of numbers) {
    if (n <= 0) continue;       // bỏ âm
    if (n % 2 === 0) continue;  // bỏ chẵn

    console.log("Xử lý:", n);
}

// ví dụ 2 
// từ 4 cấp độ lồng nhau
for (let user of users) {
    if (user.name) {
        if (user.active) {
            if (!user.banned) {
                sendEmail(user);
            }
        }
    }
}
// sửa thành 2 cấp độ lồng nhau
for (let user of users) {
    if (!user.name) continue;
    if (!user.active) continue;
    if (user.banned) continue;
    sendEmail(user);
}
// (2) dùng if/else và return - giảm cấp độ lồng nhau

// ví dụ : hàm pow tính lũy thừa x^n
// từ 2 cấp độ lồng nhau
function pow(x, n) {
    // xử lý với n âm
    if (n < 0) {
        alert("Negative 'n' not supported");
    } else {
        let result = 1;

        for (let i = 0; i < n; i++) {
            result *= x;
        }

        return result;
    }
}

// sửa thành 1 cấp độ lồng nhau
function pow(x, n) {
    if (n < 0) {
        alert("Negative 'n' not supported");
        return;
    }
    let result = 1;

    for (let i = 0; i < n; i++) {
        result *= x;
    }

    return result;
}

// 7. Vị trí Hàm (Function Position)
// Viết hàm hỗ trợ bên ngoài hàm chính để tách các khối lệnh phức tạp, giảm cấp độ lồng nhau

// (1) Khai báo các hàm phụ ở đầu tệp hoặc đầu khối lệnh

// function declarations
function createElement() {
  ...
}

function setHandler(elem) {
  ...
}

function walkAround() {
  ...
}

// the code which uses them
let elem = createElement();
setHandler(elem);
walkAround();

// (2) Viết mã trước, sau đó là khai báo hàm phụ
// Khuyến khích dùng cách này để dễ đọc mã chính hơn
// Đọc mục đích chính trước, sau đó mới đến chi tiết hàm phụ sẽ dễ hiểu hơn

// the code which uses the functions
let elem = createElement();
setHandler(elem);
walkAround();

// --- helper functions ---
function createElement() {
  ...
}

function setHandler(elem) {
  ...
}

function walkAround() {
  ...
}


// Bài tập

// bài tập 1 - sửa cú pháp coding style sai

// function pow(x,n)
// {
//   let result=1;
//   for(let i=0;i<n;i++) {result*=x;}
//   return result;
// }

// let x=prompt("x?",''), n=prompt("n?",'')
// if (n<=0)
// {
//   alert(`Power ${n} is not supported, please enter an integer number greater than zero`);
// }
// else
// {
//   alert(pow(x,n))
// }

// sửa thành

function pow(x, n) { // sau dấu phẩy , thêm dấu cách ( )
    let result = 1; // dấu cách xung quanh toán tử =
    for (let i = 0; i < n; i++) { // dấu cách xung quanh toán tử =, <, dấu cách sau dấu chấm phẩy 
        result *= x; // dấu cách xung quanh toán tử *=
    }
    return result;
}

let x = prompt("x?", ''); // dấu cách xung quanh toán tử = , dấu chấm phẩy tách cuối câu lệnh
let n = prompt("n?", '');
if (n <= 0) { // dấu cách xung quanh toán tử <= , ngoặc nhọn { } cho khối lệnh
    alert(`Power ${n} is not supported, 
      please enter an integer number greater than zero`); // ngắt dòng text dài
} else {
    alert(pow(x, n))
}