/** @file  
 * Toán tử logic trong JavaScript gồm có bốn: || (OR), && (AND), ! (NOT), ?? (Nullish Coalescing)
 * 1. || (OR)
 * 2. && (AND)
 * 3. ! (NOT)
 * 4. ?? (Nullish Coalescing)
*/


"use strict";
// in ra html tag <h2>Logical Operators</h2>
document.write("<h2>Logical Operators</h2>");

// 1. || (OR)
// Định nghĩa : OR trả về true nếu một trong hai toán hạng là true
let a, b
console.log(a || b); // undefined

console.log(true || true); // true 
console.log(false || true); // true 
console.log(true || false); // true 
console.log(false || false); // false 

// điều kiện

let hour = 9;
if (hour < 10 || hour > 18) {
    console.log(' The office is closed.');
}

// điều kiện nhiều hơn 
let hour2 = 12
let isWeekend = true;
if (hour2 < 10 || hour2 > 18 || isWeekend) {
    console.log(' The office is closed.');
}

// Đặc điểm của OR : Tìm giá trị true đầu tiên

// Toán tử OR ||thực hiện các chức năng sau:
// Đánh giá các toán hạng từ trái sang phải.
// Với mỗi toán hạng, chuyển đổi nó thành boolean. Nếu kết quả là true, thì dừng lại và trả về giá trị ban đầu của toán hạng đó.
// Nếu tất cả các toán hạng đã được đánh giá (tức là tất cả đã được đánh giá false), trả về toán hạng cuối cùng.


// Ví dụ: 1

console.log(1 || 0); // 1

console.log(null || 1); // 1

console.log(null || 0 || 1); // 1 -> giá trị true đầu tiên

console.log(undefined || null || 0); // 0 -> tất cả đều false

// Ví dụ: 2

// tìm giá trị đúng đầu tiên trong chuỗi các biến
let firstName = ""; // giá trị rỗng là false
let lastName = "";
let nickName = "SuperCoder"; // giá trị khác rỗng là true
console.log(firstName || lastName || nickName || "Anonymous"); // SuperCoder -> giá trị true đầu tiên

// Đánh giá ngắn mạch
true || console.log("Not printed"); // không in gì cả
false || console.log("Printed"); // in ra Printed

// 2. && (AND)
// Định nghĩa : AND trả về true nếu cả hai toán hạng đều true
console.log(true && true); // true
console.log(true && false); // false
console.log(false && true); // false
console.log(false && false); // false

// điều kiện
let hour3 = 12;
let minute3 = 30;
if (hour3 >= 10 && hour3 <= 18) {
    console.log(' The time is 12:30. The office is open. ');
}

//  giống như OR, bất kỳ giá trị nào cũng được phép làm toán hạng của AND
if (1 && 0) { // 0 là false
    console.log("Won't work");
}

// Đặc điểm của AND 
// - Tìm giá trị false đầu tiên
// - Độ ưu tiên của AND cao hơn OR
// - Không thay thế được if

// Toán tử AND && thực hiện các chức năng sau:
// Đánh giá các toán hạng từ trái sang phải.
// Với mỗi toán hạng, chuyển đổi nó thành boolean. Nếu kết quả là false, thì dừng lại và trả về giá trị ban đầu của toán hạng đó.
// Nếu tất cả các toán hạng đã được đánh giá (tức là tất cả đã được đánh giá true), trả về toán hạng cuối cùng.

console.log(1 && 0); // 0
console.log(1 && 5); // 5
console.log(null && 5); // null -> giá trị false đầu tiên
console.log(0 && "no matter what "); // 0 -> giá trị false đầu tiên
console.log(1 && 2 && 3); // 3 -> tất cả đều true, trả về giá trị cuối cùng
let input = "";
console.log(input < 100 && input !== null); // false , vì "" < 100 là true , nhưng input !== null là false , nên trả về false


// ưu tiên cao hơn OR
console.log(1 || 2 && 3); // 1 , tương đương với 1 || (2 && 3)

// không thay thế được if
let x = 1;
// dù tương đương if , nhưng khuyến cáo không nên dùng vì if tường minh hơn 
(x > 0) && console.log(' x is positive '); // And đi tìm giá trị false đầu tiên, toán hạng đầu tiên đúng, nên in ra 'x is positive'

// 3. ! (NOT)
// Định nghĩa : NOT chuyển giá trị true thành false và ngược lại
console.log(! true); // false
console.log(! false); // true

// Đặc điểm của NOT
// - Chuyển đổi kiểu về boolean trước khi phủ định
// - dùng 2 lần !! để chuyển đổi về boolean
console.log(!1); // false , vì 1 là true
console.log(!0); // true , vì 0 là false
console.log(! "hello "); // false , vì chuổi không rỗng là true
console.log(! ""); // true , vì chuổi rỗng là false

// chuyển đổi về boolean bất kỳ giá trị nào khác 0, null, undefined, NaN, hoặc chuổi rỗng
console.log(!!1); // true
console.log(!! "non - empty string "); // true

console.log(!!0); // false
console.log(!! null); // false
console.log(!! ""); // false
console.log(!!undefined); // false
console.log(!!NaN); // false

// Bài tập

// bài tập 1
console.log(null || 2 || undefined); // 2
// bài tập 2
console.log(console.log(1) || 2 || console.log(3)); // 1 , 2 -> vì console.log(1) in ra 1 và trả về undefined (false), nên tiếp tục đánh giá đến 2
// bài tập 3
console.log(1 && null && 2); // null -> giá trị false đầu tiên
// bài tập 4
console.log(console.log(1) && console.log(2)); // 1 , undefined -> vì console.log(1) in ra 1 và trả về undefined (false), nên dừng lại và trả về undefined
// bài tập 5
console.log(null || 2 && 3 || 4); // 3 -> tương đương null || (2 && 3) || 4 -> null || 3 || 4 -> 3

// bài tập 6
let age = 25;

// Viết một if điều kiện để kiểm tra xem age nằm giữa 14 và 90 bao gồm 14 và 90
if (age >= 14 && age <= 90) {
    console.log("Age is between 14 and 90");
}
// bài tập 7
// Viết một if điều kiện để kiểm tra xem age không nằm giữa 14 và 90 bao gồm 14 và 90
if (age < 14 || age > 90) {
    console.log("Age is not between 14 and 90");
}

// bài tập 8
// lệnh nào sẽ được thực hiện ?
if (-1 || 0) console.log('first'); // in ra 'first' -> vì -1 là giá trị true
if (-1 && 0) console.log('second'); // không in gì cả
if (null || -1 && 1) console.log('third'); // in ra 'third' -> vì -1 && 1 là true

// bài tập 9
// Viết mã yêu cầu đăng nhập bằng prompt.
// Nếu khách truy cập nhập "Admin", thì promptnhập mật khẩu, nếu đầu vào là dòng trống hoặc Esc– hiển thị “Đã hủy”, nếu là chuỗi khác – thì hiển thị “Tôi không biết bạn”.
// Mật khẩu được kiểm tra như sau:
// Nếu nó bằng “TheMaster”, thì hiển thị “Welcome!”,
// Một chuỗi khác – hiển thị “Mật khẩu sai”,
// Đối với chuỗi rỗng hoặc đầu vào bị hủy, hãy hiển thị “Đã hủy”
let user = prompt("Enter your login: ");

if (user === "Admin") {
    let password = prompt("Enter your password: ");
    if (password === "TheMaster") {
        console.log("Welcome!");
    } else if (password === "" || password === null) {
        console.log("Canceled");
    } else {
        console.log("Wrong password");
    }
} else if (user === "" || user === null) {
    console.log("Canceled");
} else {
    console.log("I don't know you");
}

// 4. ?? (Nullish Coalescing)

// Định nghĩa : Nullish Coalescing trả về toán hạng bên phải nếu toán hạng bên trái là null hoặc undefined, ngược lại trả về toán hạng bên trái
// Đặc điểm 
// - Toán tử ?? chỉ kiểm tra null và undefined
// - Toán tử ?? không thay thế được AND và OR
// - Toán tử ?? dùng chung với && và || cần dùng dấu ngoặc để chỉ rõ thứ tự đánh giá

console.log(null ?? "default string");
let userName = null;
let defaultName = "Anonymous";
let currentName = userName ?? defaultName;
console.log(currentName); // Anonymous


let firstName2 = null;
let lastName2 = null;
let nickName2 = "Supercoder";

// shows the first defined value:
alert(firstName2 ?? lastName2 ?? nickName2 ?? "Anonymous"); // Supercoder



// So sánh với toán tử OR ||
let height = 0;
console.log(height || 100); // 100 , vì 0 là giá trị falsy
console.log(height ?? 100); // 0 , vì 0 không phải là null hoặc undefined

// Sử dụng ?? với && hoặc ||
// let x = 1 && 2 ?? 3; // Lỗi cú pháp
// Vì ?? có độ ưu tiên thấp hơn && và ||, nên cần dùng dấu ngoặc để chỉ rõ thứ tự đánh giá
let y = 1 && (2 ?? 3); // đúng - > 2
let z = (1 && 2) ?? 3; // đúng - > 2