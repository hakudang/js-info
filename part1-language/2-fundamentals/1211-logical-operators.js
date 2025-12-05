/** 
 * file : 1211-logical-operators.js
 * Toán tử logic Logical Operators trong JavaScript
 * Các toán tử : || (OR), && (AND), ! (NOT), ?? (Nullish Coalescing)
 * 1. || (OR)
 * 2. && (AND)
 * 3. ! (NOT)
 * 4. ?? (Nullish Coalescing)
*/


"use strict";
// in ra html tag <h2>Logical Operators</h2>
document.write("<h2>Logical Operators</h2>");

function section(title) {
    console.log("\n====================");
    console.log(title);
    console.log("====================");
}

// Giá trị trả về của toán tử logic
// Các toán tử logic không trả về true/false mà trả về một giá trị nào đó dựa trên các toán hạng của nó
// Các giá trị được coi là false trong ngữ cảnh boolean
//  - falsy values :  0, null, undefined, NaN, "" (chuổi rỗng), false
// Các giá trị khác được coi là true trong ngữ cảnh boolean 
//  - truthy values : giá trị khác 0, không phải null, không phải undefined, không phải NaN, không phải chuổi rỗng, true

// 1. || (OR)
// Định nghĩa : OR trả về truthy nếu một trong hai toán hạng là truthy

// Đặc điểm của OR : Tìm và trả về giá trị truthy đầu tiên hay falsy cuối cùng

// Toán tử OR ||thực hiện các chức năng sau:
// - Đánh giá các toán hạng từ trái sang phải.
// - Với mỗi toán hạng, chuyển đổi nó thành boolean. 
// - Nếu kết quả là true, thì dừng lại và trả về giá trị ban đầu của toán hạng đó.
// - Nếu tất cả các toán hạng đã được đánh giá (tức là tất cả đã được đánh giá false), trả về toán hạng cuối cùng.

section("1. Toán tử OR ||");

let a, b
a = "truthy"; // truthy
b = ""; // falsy
console.log(a || b); // "truthy" -> vì a là giá trị truthy, nên trả về a mà không đánh giá b
console.log(true || true); // true 
console.log(false || true); // true 
console.log(true || false); // true 
console.log(false || false); // false 

// 1.1 Toán hạng điều kiện

let hour = 9;
if (hour < 10 || hour > 18) { // true -> vì hour < 10 là truthy đầu tiên
    console.log(' The office is closed.');
}

// 1.2 Nhiều toán hạng điều kiện

let hour2 = 12
let isWeekend = "isWeekend"; // truthy
if (hour2 < 10 || hour2 > 18 || isWeekend) { // "isWeekend" = true -> vì "isWeekend"  là truthy đầu tiên
    console.log(' The office is closed.');
}

// Ví dụ 1 : Tìm truthy đầu tiên hoặc falsy cuối cùng trong chuỗi các giá trị
section("1.2 Ví dụ 1. Tìm truthy đầu tiên hoặc falsy cuối cùng trong chuỗi các giá trị");

console.log(true || "hello"); // true -> vì true là giá trị truthy đầu tiên
console.log(false || "hello"); // "hello" -> vì "hello" là giá trị truthy đầu tiên
console.log(1 || 0); // 1
console.log(null || 1); // 1
console.log(null || 0 || 1); // 1 -> giá trị truthy đầu tiên
console.log(undefined || null || 0); // 0 -> tất cả đều falsy, trả về giá trị cuối cùng

// Ví dụ 2 : tìm truthy đầu tiên hoặc falsy cuối cùng trong chuỗi các biến
section("1.2 Ví dụ 2. Tìm truthy đầu tiên hoặc falsy cuối cùng trong chuỗi các biến");

let firstName = ""; // giá trị rỗng là falsy
let lastName = ""; // giá trị rỗng là falsy
let nickName = "SuperCoder"; // giá trị khác rỗng là truthy
console.log(firstName || lastName || nickName || "Anonymous"); // SuperCoder -> giá trị truthy đầu tiên

// Ví dụ 2 : Đánh giá ngắn mạch
section("1.2 Ví dụ 3. Đánh giá ngắn mạch");

true || console.log("Not printed"); // không in ra gì cả
false || console.log("Printed"); // in ra "Printed"  là giá trị truthy đầu tiên

// 2. && (AND)
// Định nghĩa : AND trả về true nếu cả hai toán hạng đều true

// Đặc điểm của AND : tìm và trả về giá trị falsy đầu tiên hay truthy cuối cùng
// Lưu ý :
// - Độ ưu tiên của AND cao hơn OR
// - Tương đương IF nhưng khuyến cáo không nên thay thế vì tính tường minh thấp hơn

// Toán tử AND && thực hiện các chức năng sau:
// - Đánh giá các toán hạng từ trái sang phải.
// - Với mỗi toán hạng, chuyển đổi nó thành boolean. 
// Nếu kết quả là false, thì dừng lại và trả về giá trị ban đầu của toán hạng đó.
// - Nếu tất cả các toán hạng đã được đánh giá (tức là tất cả đã được đánh giá true), trả về toán hạng cuối cùng.

section("2. Toán tử AND &&");

console.log(true && true); // true
console.log(true && false); // false
console.log(false && true); // false
console.log(false && false); // false

// 2.1 Toán hạng điều kiện

section("2.1 Toán hạng điều kiện");

let hour3 = 12;
let minute3 = 30;
if (hour3 >= 10 && hour3 <= 18) { // true, hour3 <= 18 -> là giá trị truthy cuối cùng
    console.log(' The time is 12:30. The office is open. ');
}

//  giống như OR, bất kỳ giá trị nào cũng được phép làm toán hạng của AND
if (1 && 0) {  // 0 là giá trị falsy đầu tiên
    console.log("Won't work");
}

console.log(1 && 0); // 0 -> giá trị falsy đầu tiên
console.log(1 && 5); // 5 -> tất cả đều true, trả về giá trị cuối cùng

// Ví dụ 1 : Tìm falsy đầu tiên hay truthy cuối cùng trong chuỗi các giá trị

section("2.2 Ví dụ 1. Tìm falsy đầu tiên hay truthy cuối cùng trong chuỗi các giá trị");

console.log(null && 5); // null -> vì null là giá trị falsy đầu tiên
console.log(0 && "no matter what "); // 0 ->  giá trị falsy đầu tiên
console.log(1 && 2 && 3); // 3 -> giá trị truthy cuối cùng
console.log(1 && 2 && null && 3); // null -> giá trị falsy đầu tiên
let input = "";
console.log(input < 100 && input !== null); // false -> vì "" < 100 là falsy đầu tiên

// 2.2 Độ ưu tiên của AND cao hơn OR
section("2.2 Độ ưu tiên của AND cao hơn OR");

console.log(1 || 2 && 3); // 1 -> tương đương 1 || (2 && 3) -> 1 || 3 -> 1
console.log((1 || 2) && 3); // 3 -> vì (1 || 2) -> 1 là truthy đầu tiên ->  1 && 3 -> 3 , truthy cuối cùng

// 2.3 Tương đương với câu lệnh IF 
section("2.3 Tương đương với câu lệnh IF ");
// Trong một số trường hợp, AND có thể được sử dụng thay cho 
// câu lệnh if để thực hiện một hành động chỉ khi điều kiện là true

let x = 1;
(x > 0) && console.log(' x is positive ');
// tương đương với câu lệnh if
if (x > 0) {
    console.log(' x is positive ');
}

// Khuyến cáo :
// Mặc dù cú pháp trên hợp lệ nhưng không nên lạm dụng 
// vì nó làm giảm tính rõ ràng của mã nguồn
// Chỉ sử dụng trong các trường hợp đơn giản và ngắn gọn

// 3. ! (NOT)
// Định nghĩa : NOT chuyển giá trị true thành false và ngược lại

// Đặc điểm của NOT
// Chuyển đổi kiểu về boolean trước khi phủ định
// - Phủ định một giá trị truthy sẽ trả về false
// - Phủ định một giá trị falsy sẽ trả về true
// - Có thể sử dụng !! để chuyển đổi một giá trị về boolean

section("3. Toán tử NOT !");

console.log(! true); // false
console.log(! false); // true


console.log(!1); // false -> vì 1 là truthy
console.log(!0); // true -> vì 0 là falsy
console.log(! "hello "); // false  -> vì chuổi không rỗng là truthy
console.log(! ""); // true -> vì chuổi rỗng là falsy

// 3.1 Chuyển đổi về boolean sử dụng !!
section("3.1 Chuyển đổi về boolean sử dụng !!");

// cú pháp !!value
// - Toán tử ! chuyển value về boolean và phủ định nó
// - Toán tử ! thứ hai phủ định kết quả lần đầu tiên, trả về giá trị boolean tương ứng với value
console.log(!!1); // true -> vì 1 là giá trị truthy -> !1 = false -> !!1 = true
console.log(!! "hello "); // true -> vì chuổi không rỗng là truthy -> ! "hello " = false -> !! "hello " = true
console.log(!! "non - empty string "); // true -> vì chuổi không rỗng là truthy -> ! "non - empty string " = false -> !! "non - empty string " = true
console.log(!!0); // false -> vì 0 là giá trị falsy -> !0 = true -> !!0 = false 
console.log(!! null); // false -> vì null là giá trị falsy -> !null = true -> !!null = false
console.log(!! ""); // false -> vì chuổi rỗng là giá trị falsy -> !"" = true -> !!"" = false
console.log(!!undefined); // false -> vì undefined là giá trị falsy -> !undefined = true -> !!undefined = false
console.log(!!NaN); // false -> vì NaN là giá trị falsy -> !NaN = true -> !!NaN = false

// 3.2 Ứng dụng của NOT
section("3.2 Ứng dụng của NOT !");
// Ví dụ 1 : Chuyển đổi giá trị về boolean
let value1 = "hello";
console.log(typeof value1, typeof !!value1); // string boolean
// Ví dụ 2 : Đảo ngược giá trị boolean
let isActive = false;
console.log(!isActive); // true
// Ví dụ 3 : Kiểm tra điều kiện ngược lại
let isLoggedIn = true;
console.log(!isLoggedIn); // false


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

// bài tập 8 : lệnh nào sẽ được thực hiện ?

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
// let user = prompt("Enter your login: ");
let user = "Admin";

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

// Nullish là gì ?
// - null và undefined được gọi là nullish (giá trị không xác định)
// - Các giá trị khác như 0, false, "" (chuổi rỗng) không phải là nullish

// Định nghĩa : Nullish Coalescing xét toán hạng bên trái 
//  - nếu nó là nullish thì trả về toán hạng bên phải
//  - nếu không thì trả về chính nó 

// Cú pháp : a ?? b
// - Nếu a không phải nullish, trả về a
// - Nếu a là null hoặc undefined, trả về b
// Đặc điểm 
// - Toán tử ?? chỉ kiểm tra null và undefined
// - Toán tử ?? không thay thế được AND và OR
// - Toán tử ?? dùng chung với && và || cần dùng dấu ngoặc để chỉ rõ thứ tự đánh giá

section("4. Toán tử Nullish Coalescing ??");

console.log(null ?? "default string"); // "default string" -> vì null là nullish
console.log(undefined ?? "default string"); // "default string" -> vì undefined là nullish
console.log(false ?? "default string"); // false -> vì false không phải là nullish -> trả về toán hạng bên trái
console.log(0 ?? "default string"); // 0 -> vì 0 không phải là nullish
console.log("" ?? "default string"); // "" -> vì chuổi rỗng không phải là nullish   
console.log("hello" ?? null); // "hello" -> vì "hello" không phải là nullish

let userName = null;
let defaultName = "Anonymous";
let currentName = userName ?? defaultName;
console.log(currentName); // Anonymous


let firstName2 = null;
let lastName2 = null;
let nickName2 = "Supercoder";

// 4.1 Tìm giá trị đầu tiên không phải null hoặc undefined
section ("4.1 Tìm giá trị đầu tiên không phải null hoặc undefined");

console.log(firstName2 ?? lastName2 ?? nickName2 ?? "Anonymous"); // Supercoder



// 4.2 So sánh với toán tử OR ||
section ("4.2 So sánh với toán tử OR ||");

let height = 0;
console.log(height || 100); // 100 -> vì 0 là giá trị falsy
console.log(height ?? 100); // 0 -> vì 0 không phải là nullish

// 4.3 Độ ưu tiên của ?? thấp hơn với && và ||
// Lưu ý : Toán tử ?? có độ ưu tiên thấp hơn && và ||
section ("4.3 Độ ưu tiên của ?? thấp hơn với && và ||");

// let x = 1 && 2 ?? 3; // Lỗi cú pháp
// Vì ?? có độ ưu tiên thấp hơn && và ||, nên cần dùng dấu ngoặc để chỉ rõ thứ tự đánh giá
let y = 1 && (2 ?? 3); // 2 -> vì 2 không phải là nullish -> 1 && 2 -> 2
console.log(y);
let z = (1 && 2) ?? 3; // 2 -> vì 1 && 2 -> 2 không phải là nullish
console.log(z);