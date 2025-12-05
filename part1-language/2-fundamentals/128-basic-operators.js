/** @file 
 * Các toán tử cơ bản, toán học
 * 1. Đơn vị, nhị phân và toán hạng
 * 2. Các toán tử số học
 * 3. Toán tử cộng chuỗi - nối chuỗi nhị phân
 * 4. Toán tử cộng chuỗi - nối chuỗi với giá trị khác
 * 5. Chuyển đổi số và đơn vị cộng/trừ
 * 6. Thứ tự ưu tiên của toán tử
 * 7. Chuỗi nhiệm vụ
 * 8. Sửa đổi tại chỗ
 * 9. Toán tử tăng/giảm
 * 10. Toán tử bitwise
 * 11. Dấu phẩy động
 */

"use strict";
// 1. Đơn vị, nhị phân và toán hạng 

// toán hạng 
console.log ( 5 + 3 ); // 8 , toán hạng là 5 và 3

// toán tử 
console.log ( 5 * 3 ); // 15 , toán tử là dấu nhân (*)

// đơn vị 
console.log ( -5 ); // -5 , toán tử đơn vị là dấu trừ (-)

// 2. Các toán tử số học
console.log ( 5 + 3 ); // 8 , toán tử là dấu cộng (+)
console.log ( 5 - 3 ); // 2 , toán tử là dấu trừ (-)
console.log ( 5 * 3 ); // 15 , toán tử là dấu nhân (*)
console.log ( 5 / 3 ); // 1.6666666666666667 , toán tử là dấu chia (/)
console.log ( 5 % 3 ); // 2 , toán tử là dấu chia lấy dư (%)
console.log ( 4 ** 3 ); // 64 , toán tử là dấu lũy thừa (**)

// 3. Toán tử cộng chuỗi - nối chuỗi nhị phân 
let s1 = "Hello, " + "world!"; // nối hai chuỗi
console.log(s1); // Hello, world!

// 4. Toán tử cộng chuỗi - nối chuỗi với giá trị khác
console.log("The answer is " + 42);  // The answer is 42 , số 42 được chuyển đổi thành chuỗi "42"
console.log("6" + "2"); // 62 , cả hai chuỗi được nối lại với nhau
console.log("2" + 2 + 1); // 221 , số 2 được chuyển đổi thành chuỗi "2"
console.log(2 + 2 + "1"); // 41 , 2 + 2 = 4, sau đó 4 + "1" = "41"
console.log(6 - "2"); // 4 , chuỗi "2" được chuyển đổi thành số 2
console.log("6" / "2"); // 3 , cả hai chuỗi được chuyển đổi thành số
console.log("6" * "2"); // 12 , cả hai chuỗi được chuyển đổi thành số

// 5. Chuyển đổi số và đơn vị cộng/trừ
let n1 = 5;
console.log( +n1 ); // 5 , toán tử đơn vị cộng chuyển đổi n thành số

let m1 = -5;
console.log( m1 ); // -5 , toán tử đơn vị trừ giữ nguyên giá trị âm của m

// chuyển non-number thành số
console.log( +true ); // 1
console.log( +"" ); // 0
console.log( + "123" ); // 123
console.log( + "hello" ); // NaN
console.log( +"2" + +"3"); // 5 , cả hai chuỗi được chuyển đổi thành số trước khi cộng

// 6. Thứ tự ưu tiên của toán tử 
// theo thứ tự ưu tiên sau : một ngôi cộng, một ngôi trừ, lũy thừa, nhân và chia, cộng và trừ, bằng 

let x = 2 * 2 + 1;
console.log(x); // 5 , 2 * 2 = 4, sau đó 4 + 1 = 5

let a2 = 1;
let b2 = 2;

let c2 = 3 - (a2 = b2 + 1); // a = b + 1 = 3, sau đó 3 - 3 = 0
console.log(a2); // 3
console.log(c2); // 0

// 7. Chuỗi nhiệm vụ
let a1, b1, c1;
a1 = b1 = c1 = 2 + 2;
console.log(c1); //  2 + 2 = 4, gán 4 cho c, sau đó gán 4 cho b và a
console.log(b1); // 4
console.log(a1); // 4

// 8. Sửa đổi tại chỗ
let n = 2;
n = n + 5; // n += 5 -> n = 7
n = n * 2; // n *= 2 -> n = 14 
n = n * 2; // n *= 2 -> n = 28
console.log(n); // 28

let m = 2;
m += 5; // m = m + 5 -> m = 7
m *= 2; // m = m * 2 -> m = 14
m *= 2; // m = m * 2 -> m = 28
console.log(m); // 28

let s = 2;
s *= 3 + 5; // s = s * (3 + 5) -> s = 16
console.log(s); // 16

// 9. Toán tử tăng/giảm
let counter = 2;
let a = counter++; // gán giá trị ban đầu của counter cho a, sau đó tăng counter lên 1
console.log(a); // 2
console.log(counter); // 3

let b = ++counter; // tăng counter lên 1, sau đó gán giá trị mới của counter cho b
console.log(b); // 4
console.log(counter); // 4

let c = counter--; // gán giá trị ban đầu của counter cho c, sau đó giảm counter xuống 1
console.log(c); // 4
console.log(counter); // 3

let d = --counter; // giảm counter xuống 1, sau đó gán giá trị mới của counter cho d
console.log(d); // 2
console.log(counter); // 2

// 10. Toán tử bitwise
// Các toán tử bitwise xử lý các đối số như số nguyên 32 bit và hoạt động ở cấp độ biểu diễn nhị phân của chúng.
// Các toán tử này không dành riêng cho JavaScript. Chúng được hỗ trợ trong hầu hết các ngôn ngữ lập trình

// Toán tử AND (&)
console.log(5 & 3); // 1 , 5 = 101, 3 = 011, 101 & 011 = 001 (1)

// Toán tử OR (|)
console.log(5 | 3); // 7 , 5 = 101, 3 = 011, 101 | 011 = 111 (7)

// Toán tử XOR (^)
console.log(5 ^ 3); // 6 , 5 = 101, 3 = 011, 101 ^ 011 = 110 (6)

// Toán tử NOT (~)
console.log(~5); // -6 , 5 = 0000...0101, ~5 = 1111...1010 (-6)

// Toán tử dịch chuyển trái (<<)
console.log(5 << 1); // 10 , 5 = 0000...0101, dịch chuyển trái 1 bit = 0000...1010 (10)
// Toán tử dịch chuyển phải (>>)
console.log(5 >> 1); // 2 , 5 = 0000...0101, dịch chuyển phải 1 bit = 0000...0010 (2)
// Toán tử dịch chuyển phải không dấu (>>>)
console.log(-5 >>> 1); // 2147483645 , -5 = 1111...1011, dịch chuyển phải không dấu 1 bit = 0111...1101 (2147483645)
// Lưu ý: Toán tử bitwise ít được sử dụng trong lập trình hàng ngày, nhưng chúng có thể hữu ích trong các tình huống cụ thể như xử lý cờ (flags) hoặc tối ưu hóa hiệu suất trong các ứng dụng đòi hỏi cao.

// 11. Dấu phẩy động
let x1 = (1 + 2, 3 + 4); // 1 + 2 được tính toán nhưng bỏ qua, giá trị của x là kết quả của 3 + 4
console.log(x1); // 7

// Bài tập
// "" + 1 + 0 - > "10"
console.log("" + 1 + 0); // "10" , "" được coi là chuỗi, nên phép cộng nối chuỗi xảy ra
// true + false -> 1
console.log(true + false); // 1, true được chuyển đổi thành 1, false thành 0
// 6 / "3" -> 2
console.log(6 / "3"); // 2 , "3" được chuyển đổi thành số 3
// "2" * "3" -> 6
// 4 + 5 + "px" -> "9px"
// "$" + 4 + 5 -> "$45"
// "4" - 2 -> 2 
console.log("4px" - 2); // NaN , không thể chuyển đổi "4px" thành số
console.log("  -9  " + 5); // "  -9  5", "  -9  " được coi là chuỗi, nên phép cộng nối chuỗi xảy ra
console.log("  -9  " - 5); // -14 , "  -9  " được chuyển đổi thành số -9
// null + 1 -> 1
// undefined + 1 -> NaN
// " \t \n" - 2 -> -2