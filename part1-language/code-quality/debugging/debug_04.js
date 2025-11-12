/**
 * file: debug_04.js
 * Step into multiple levels of function calls
 * - Đặt breakpoint tại dòng đầu tiên trong hàm level2
 * - Dùng step into (F11) để vào từng hàm một
 *  -   Đặt breakpoint tại dòng level2();
 *  -   Step into (F11) để vào trong hàm level2
 *  -   Step out (Shift+F11) để quay về hàm level1
 *  -   Step out (Shift+F11) để quay về hàm nested
 *  -   Step out (Shift+F11) để thoát khỏi hàm nested
 * - Dùng step over (F10) để chạy qua từng dòng
 *  -   Đặt breakpoint tại dòng level2();
 *  -   Step over (F10) để chạy qua dòng level2();
 *  -   Step over (F10) để chạy qua dòng console.log("Back to level1");
 *  -   Step over (F10) để chạy qua dòng level1();
 *  -   Step over (F10) để chạy qua dòng console.log("Back to nested");
 * - Quan sát call stack và giá trị biến tại mỗi mức
 */
"use strict";
function nested() {
  function level1() {
    function level2() {
      console.log("Inside level2");
    }
    level2();
    console.log("Back to level1");
  }
  level1();
  console.log("Back to nested");
}

nested();