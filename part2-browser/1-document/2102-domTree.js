/** 
 * DOM Tree
 */

"use strict";

function section(title) {
    console.log("\n================================ ");
    console.log("=== " + title + " ===");
    console.log("================================ \n");
}

// in ra tiêu đề
document.write("<h2> DOM Tree trong JavaScript </h2>");


// 2. DOM node là object → có thể sửa bằng JS

document.body.style.background = 'red';

setTimeout(() => {
    document.body.style.background = '';
}, 3000);

// 9. Kết nối Elements ↔ Console (rất hay dùng)

section("9. Kết nối Elements ↔ Console (rất hay dùng)");

// $0.style.background = 'yellow'; // đổi màu nền phần tử đang chọn trong DevTools thành xanh dương
// inspect(document.body);// chuyển phần tử body vào DevTools Elements panel
