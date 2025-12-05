/**
 *   Scheduling – setTimeout & setInterval trong JavaScript
 * Javascript cho phép hẹn giờ chạy hàm thay vì chạy ngay lập tức
 * - setTimeout -> chạy một lần sau delay
 * - setInterval -> chạy lặp lại liên tục mỗi delay
 * 
*  | Cơ chế            | Chạy          | Hủy           | Lưu ý                              |
 * |-------------------|---------------|---------------|------------------------------------|
 * | setTimeout        | 1 lần         | clearTimeout  | delay 0 vẫn chờ cuối script        |
 * | setInterval       | lặp liên tục  | clearInterval | dễ bị lệch thời gian               |
 * | Nested setTimeout | lặp linh hoạt | clearTimeout  | kiểm soát thời gian chính xác      |
 * | delay 0           | Không phải 0  |               |  browser ép tối thiểu 4ms sau 5 lần|
 * 
 */

"use strict";

// in ra tiêu đề phần
document.write("<h2> Scheduling – setTimeout & setInterval trong JavaScript </h2>");

function section(title) {
    console.log("\n================================ ");
    console.log("=== " + title + " ===");
    console.log("================================ \n");
}

// 1. setTimeout trong JavaScript
section("1. setTimeout trong JavaScript");
// Cú pháp : let timeoutID = setTimeout(func|code, delay, [arg1, arg2, ...]);
// - func : hàm sẽ được gọi sau delay
// - delay : thời gian chờ (tính bằng ms)
// - arg1, arg2, ... : các tham số truyền cho func khi nó được gọi
// - Trả về một ID (timeoutID) dùng để hủy timeout nếu cần

// Ví dụ :
function sayHello(name) {
    console.log("Hello, " + name + "!");
}

setTimeout(sayHello, 1000, "Alice"); // Hello, Alice! (sau 1 giây)

// Không truyền string để tạo code

// setTimeout("console.log('Hello');", 1000); // không nên dùng

// Thay vào đó, dùng hàm vô danh
setTimeout(() => {
    console.log("Hello");
}, 1000); // nên dùng

// 2. clearTimeout - hủy hẹn giờ
section("2. clearTimeout - hủy hẹn giờ");
// Cú pháp : clearTimeout(timeoutID);
// - timeoutID : ID trả về từ hàm setTimeout trước đó
// - Hủy hẹn giờ để hàm không được gọi

let timerIda = setTimeout(() => {
    console.log("never happens");
}, 1000);

clearTimeout(timerIda); // Hủy hẹn giờ, hàm trong setTimeout sẽ không được gọi

// 3. setInterval trong JavaScript

section("3. setInterval trong JavaScript");
// Cú pháp : let intervalID = setInterval(func|code, delay, [arg1, arg2, ...]); 
// - func : hàm sẽ được gọi sau mỗi delay
// - delay : thời gian chờ giữa các lần gọi (tính bằng ms)
// - arg1, arg2, ... : các tham số truyền cho func khi nó được gọi
// - Trả về một ID (intervalID) dùng để hủy interval nếu cần

// Ví dụ :

// print "tick" mỗi giây
let timerIdb = setInterval(() => {
    console.log("tick");
}, 1000);

// Dừng sau 5 giây
setTimeout(() => {
    clearInterval(timerIdb); // hủy interval
    console.log("stop");
}, 5000); // dừng sau 5 giây

// 4. clearInterval - hủy lặp lại

section("4. clearInterval - hủy lặp lại");
// Cú pháp : clearInterval(intervalID);
// - intervalID : ID trả về từ hàm setInterval trước đó
// - Hủy lặp lại để hàm không được gọi nữa
// Ví dụ :
let timerIdc = setInterval(() => {
    console.log("will not happen");
}, 1000);

clearInterval(timerIdc); // hủy interval

// 5. Nested setTimeout - cách lặp linh hoạt hơn setInterval
section("5. Nested setTimeout - cách lặp linh hoạt hơn setInterval");
// Thay vì dùng setInterval, ta có thể dùng setTimeout lồng nhau để tạo lặp
// Ưu điểm :
// - Kiểm soát thời gian chính xác hơn
// - Thay đổi khoảng cách giữa các lần gọi linh hoạt hơn

// thông thường, setInterval có thể bị lệch thời gian

/*
setInterval(() => {
    // gọi hàm bất đồng bộ, ví dụ như fetch
    console.log("tick");
}, 2000);
*/

// cách dùng nested setTimeout để kiểm soát thời gian chính xác hơn

/*
let timerId = setTimeout(function tick() {
    // gọi hàm bất đồng bộ, ví dụ như fetch
    console.log("tick");
    timerId = setTimeout(tick, 2000); // lên lịch lần gọi tiếp theo
}, 2000);
*/

// 5. setTimeout(func, 0) – chạy hàm sau khi kết thúc hiện tại
section("5. setTimeout(func, 0) – chạy hàm sau khi kết thúc hiện tại");
// Đôi khi ta muốn chạy hàm ngay sau khi kết thúc khối lệnh hiện tại
// Ví dụ : sau khi xử lý sự kiện, ta muốn chạy hàm bổ sung
// Cách làm : dùng setTimeout với delay 0

setTimeout(() => console.log("World")); // chạy sau khi kết thúc khối lệnh hiện tại
console.log("Hello");
// Kết quả :
// Hello
// World

// Nhưng trong browser, delay 0 
// thực tế có thể bị ép tối thiểu 4ms sau 5 lần lồng nhau.

// BÀI TẬP
/* ================================
=== BÀI TẬP 1: setTimeout hiển thị gì ?  ===
*--------------------------------
* code sau sẽ hiển thị gì ?
*--------------------------------
let i = 0;

setTimeout(() => console.log(i), 100); // ?

// assume that the time to execute this function is >100ms
for(let j = 0; j < 100000000; j++) {
  i++;
}
* ================================ */

let i = 0;

setTimeout(() => console.log(i), 100); // ?

// assume that the time to execute this function is >100ms
for(let j = 0; j < 100000000; j++) {
  i++;
} 

// Kết quả : 100000000
// Giải thích :
// - setTimeout được đặt trong hàng đợi sự kiện (event queue)
// - Mã đồng bộ (for loop) chạy trước, tăng i lên 100000000
// - Sau khi mã đồng bộ kết thúc, event loop lấy hàm từ hàng đợi và chạy nó
// - Lúc này i đã là 100000000 nên được in ra