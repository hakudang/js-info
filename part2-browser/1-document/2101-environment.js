/**
 * Environment trong trình duyệt
 * 
 * Học cách quản lý trang trình duyệt: 
 * thêm các thành phần, thay đổi kích thước và vị trí, 
 * tạo giao diện động và tương tác với khách truy cập.
 * 
 * 
 */

"use strict";

// in ra tiêu đề
document.write("<h2> Environment trong trình duyệt </h2>");

function section(title) {
    console.log("\n================================ ");
    console.log("=== " + title + " ===");
    console.log("================================ \n");
}

// 1. Javascript chạy ở đâu ?
//  - Trong trình duyệt web (browser)
//  - Trên server (Node.js)
//  - Trong các ứng dụng di động (React Native, Ionic)
//  - Trong các ứng dụng desktop (Electron)
//  👉 Mỗi nơi gọi là một host environment
//  👉 Mỗi host có thêm các API riêng, ngoài core JavaScript 
//  như DOM, Fetch, etc trong trình duyệt


// 2. Browser environment có gì?

//  - Window object: đại diện cho cửa sổ trình duyệt
//    - Global object trong trình duyệt là window
//    - Document object (DOM): đại diện cho nội dung trang web
//    - BOM (Browser Object Model): navigation, screen, location, frames, history,... các đối tượng khác liên quan đến trình duyệt
//    - CSSOM (CSS Object Model): quản lý các kiểu dáng CSS
//    - Các API khác: Fetch API, Web Storage API, Canvas API, WebRTC, etc

// 3. window – gốc của mọi thứ trong browser

// 3.1 Global object

// mọi biến / hàm global đều là thuộc tính của window 

section("3.1 Global object");

function sayHi() {
    console.log("Hello");
}

window.sayHi(); // Hello

// 3.2 Đại diện cho cửa sổ trình duyệt

console.log(window.innerWidth);  // chiều rộng cửa sổ trình duyệt

// 4. DOM - Document Object Model
// DOM cho phép
// - Thay đổi cấu trúc trang web
// - Thêm, xóa, sửa các phần tử HTML
// - Thay đổi kiểu dáng CSS
// - Lắng nghe, xử lý sự kiện người dùng

// biến toàn bộ HTML thành object JS để thao tác

document.body.style.background = "red"; // đổi màu nền trang web thành đỏ

// setTimeout(() => {
//     document.body.style.background = ""; // đổi lại màu nền trang web
// }, 1000); // sau 1 giây

setInterval(() => {
    document.body.style.background = document.body.style.background == "red" ? "white" : "red";    
}, 2000);

// 5. DOM không chỉ dành cho browser

// DOM là spec, không phải browser-only
// spec là gì ?
// - Tập hợp các quy tắc, hướng dẫn để xây dựng và phát triển công nghệ
// - Đảm bảo tính tương thích và tiêu chuẩn hóa giữa các trình duyệt và nền tảng khác nhau
// Server cũng có thể dùng DOM
// - parse HTML, XML
// - manipulate DOM (jsdom, cheerio, etc)

// 6. CSSOM - điều khiển CSS bằng JS 
section("6. CSSOM - điều khiển CSS bằng JS");

// CSSOM là gì?
// - CSS rules 
// - stylesheets 
// - cách JS thao tác CSS 

// console.log(element.style.color); // lấy giá trị màu chữ

// 7. BOM - Browser Object Model
section("7. BOM - Browser Object Model");

// BOM = các API của browser không liên quan trực tiếp đến document 

// 7.1 navigator 
console.log (navigator.userAgent); // lấy thông tin trình duyệt
console.log (navigator.platform); // lấy thông tin hệ điều hành

// 7.2 location
console.log (location.href); // URL hiện tại của trang web

// if (confirm ("Go to vnexpress.net ?")) {
//     location.href = "https://vnexpress.net"; // chuyển hướng trang web
// }

// 7.3 alert / confirm / prompt

// alert("Hello! This is an alert box."); // hiển thị hộp thoại cảnh báo

// confirm("Do you confirm this action?"); // hiển thị hộp thoại xác nhận

// prompt("Please enter your name:"); // hiển thị hộp thoại nhập liệu

// 7.4 history

console.log("số trang đã truy cập: ", history.length); // số trang đã truy cập trong phiên hiện tại

// 8. Specs - Chuẩn nằm ở đâu ?

// ✅ DOM Spec : 
// Cấu trúc document
// Element, event, traversal
// https://dom.spec.whatwg.org/

// ✅ CSSOM Spec
// Stylesheet, rule, style object
// https://www.w3.org/TR/cssom-1/

// ✅ HTML Spec (rất rộng)
// HTML tags
// DOM extensions
// BOM (alert, setTimeout, location…)
// https://html.spec.whatwg.org/

// 📌 HTML spec = DOM + BOM + HTML markup

// 10. Tóm tắt
section("10. Tóm tắt");

// JavaScript core rất nhỏ
// Những thứ “quen dùng” (DOM, alert, fetch…) là do host environment
// Browser cung cấp:
// - window (global + browser window)
// - document (DOM)
// - BOM (navigator, location…)
// - CSSOM
// Tất cả được định nghĩa bởi spec, không phải “do browser tự nghĩ”