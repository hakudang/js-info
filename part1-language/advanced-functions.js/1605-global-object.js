/**
 * Global Object trong JavaScript
 * Global Object là đối tượng đặc biệt chứa tất cả các biến và 
 * hàm được khai báo ở phạm vi toàn cục. 
 * Tùy môi trường mà tên khác nhau :
 * - Trong trình duyệt web, global object là "window"
 * - Trong Node.js, global object là "global"
 * - Trong môi trường khác, global object là "globalThis"
 */

"use strict";

// in ra tiêu đề
document.write("<h2> Global Object trong JavaScript </h2>");

// 1. Mọi thứ trong global object đều truy cập trực tiếp được

console.log("Hello");
// tương đương
window.console.log("Hello");


// 2. var (không phải let/const) trở thành thuộc tính của global object

// 2.1 Biến khai báo bằng var, function trở thành thuộc tính của global object 
// - function declaration (không phải function expression).
var gVar = 5;
console.log(window.gVar); // 5

// 2.2 biến khai báo bằng let/const KHÔNG trở thành thuộc tính của global object
let gLet = 5;
console.log(window.gLet); // undefined

// 3. Nếu muốn giá trị thật sự “global”, hãy gán thẳng vào global object

window.currentUser = {
    name: "John"
};

// dùng ở file khác
console.log(currentUser.name); // John

// hoặc an toàn hơn
console.log(window.currentUser.name); // John

// 4. Kiểm tra feature hoặc thêm polyfill bằng global object

// kiểm tra trình duyệt có hỗ trợ Promise:
if (!window.Promise) {
    console.log("Your browser is really old!");
}

// Thêm polyfill:
// polyfill là đoạn code thêm các tính năng mới vào trình duyệt cũ không hỗ trợ tính năng đó
if (!window.Promise) {
    window.Promise = function (executor) {
        // mô phỏng hành vi gốc của Promise
    }; /* custom implementation */
}
