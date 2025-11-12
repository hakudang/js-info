/** @file 
 * 
 */

"use strict";

// in ra html tag <h2>JavaScript Debugging </h2>
document.write("<h2>JavaScript Debugging </h2>");

// Debugging trên browser
// - tìm và fix lỗi js trong 1 tệp, các browser hiện đại và công cụ devtools đều hỗ trợ rất tốt việc này
// - ở đây sử dụng chrome devtools (F12) để debug code js

// 1. Source panel 
// - mở tab Sources trong devtools
// 1.1 file navigation : tìm và mở file js cần debug trong danh sách file bên trái
//  - đặt breakpoint (click vào số dòng code) tại vị trí muốn dừng thực thi code để kiểm tra
//  - reload trang web (F5) để chạy lại code, khi chạy đến breakpoint sẽ dừng lại
//  - sử dụng các công cụ step over (F10), step into (F11), step out (Shift+F11) để đi qua từng dòng code
//  - quan sát giá trị biến, call stack, scope variables trong các panel bên phải
// 1.3 Code Editor : xem và chỉnh sửa code trực tiếp trong devtools
//  - sau khi chỉnh sửa có thể nhấn Ctrl+S để lưu lại và chạy lại code
//  - có thể thêm các câu lệnh debug như debugger; trong code để đặt breakpoint tự động
//  - có thể thêm watch expressions để theo dõi giá trị biến, biểu thức trong quá trình debug
// 1.2 JavaScript Debugging controls : sử dụng các nút điều khiển để tiếp tục chạy code, tạm dừng, dừng hoàn toàn
//  - Resume script execution (F8) : tiếp tục chạy code đến breakpoint tiếp theo hoặc kết thúc
//  - Pause script execution : tạm dừng code đang chạy
//  - Step over next function call (F10) : chạy qua dòng code hiện tại, không vào trong hàm
//  - Step into next function call (F11) : vào trong hàm được gọi ở dòng code hiện tại
//  - Step out of current function (Shift+F11) : chạy đến cuối hàm hiện tại và thoát ra ngoài


// 2. Console panel
// - mở tab Console trong devtools
// - sử dụng console.log() trong code để in giá trị biến, thông tin debug ra console
// - có thể nhập lệnh js trực tiếp trong console để kiểm tra giá trị biến, gọi hàm
// - sử dụng các phương thức console khác như console.error(), console.warn(), console.table() để in thông tin với định dạng khác nhau
// - sử dụng console.trace() để in call stack tại vị trí gọi hàm
// - sử dụng console.group() và console.groupEnd() để nhóm các thông tin log lại
// - sử dụng console.time() và console.timeEnd() để đo thời gian thực thi đoạn code

// 3. Breakpoints

// 4. Lệnh “debugger”

// 5. Pause and look around
// 5.1 Watch – Hiện các giá trị hiện tại của bất kỳ biểu thức nào.
// 5.2 Call Stack – Hiện đường dẫn đến điểm thực thi hiện tại.
// 5.3 Scope – Hiện tất cả các biến cục bộ và toàn cục có sẵn tại điểm thực thi hiện tại.

// 6. Tracing the execution
// 6.1 Resume script execution (F8)
// 6.2 Step over next function call (F10)
// 6.3 Step into next function call (F11)
// 6.4 Step out of current function (Shift+F11)

// 7. Logging
// dùng console.log để in thông tin debug ra console
// open console to see
for (let i = 0; i < 5; i++) {
    console.log("value:", i);
}

// Tóm tắt : có 3 điểm chính khi debug code js
// 1. breakpoint - Xác định vị trí lỗi : sử dụng thông tin lỗi từ console, đặt breakpoint để dừng code tại vị trí nghi ngờ
// 2. lệnh debugger - Tạm dừng thực thi code : sử dụng lệnh debugger hoặc các nút điều khiển debug để tạm dừng code và kiểm tra trạng thái hiện tại
// 3. Lỗi - nếu nút pause đang bật , code sẽ tự động tạm dừng khi gặp lỗi