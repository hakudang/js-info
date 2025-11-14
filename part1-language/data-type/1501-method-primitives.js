/** 
 * file : 1510-method-primitives.js
 * Giới thiệu về phương thức của 7 kiểu dữ liệu primitives - nguyên thủy trong JavaScript
 * 1. Phân loại kiểu dữ liệu trong JavaScript
 * 2. Mâu thuẩn và cách JS giải quyết
 * 3. Khi không nên dùng từ khóa new 
 * 4. Phương thức của null và undefined
 * 5. Bài tập
 */

"use strict";

// in ra html tag <h2> Method of Primitives </h2>
document.write("<h2> Method of Primitives </h2>");

// 1. Phân loại kiểu dữ liệu trong JavaScript
// - Kiểu dữ liệu nguyên thủy (Primitive types) : 7 kiểu -> number, string, boolean, null, undefined, symbol, bigint
// - Kiểu dữ liệu phức hợp (Object types) : Object, Array, Function, Date, v.v. {},  [] , function(){}, Date, Error, v.v.


// 2. Mâu thuẩn và cách JS giải quyết 

"Hello".toUpperCase(); // "HELLO"
(1.2345).toFixed(2); // "1.23" 

// Hello va 1.2345 là kiểu nguyên thủy (primitive) không có phương thức (method) toUpperCase() và toFixed()
// Nhưng JS vẫn cho phép gọi phương thức trên kiểu nguyên thủy
// Vậy JS đã làm thế nào?
// Câu trả lời: JS tạm thời bọc (wrap) giá trị nguyên thủy trong một đối tượng tương ứng : String, Number, Boolean, Symbol, BigInt
// - Đối với chuỗi (string) -> String object
// - Đối với số (number) -> Number object
// Sau khi gọi phương thức xong, đối tượng tạm thời này sẽ bị hủy bỏ

// 3. Khi không nên dùng new 

typeof 123; // "number"
typeof new Number(123); // "object" -> không nên 

// new Number(), new String(), new Boolean() tạo object thật → nặng, hành xử khác.
// Đừng dùng để “bọc” primitive, trừ khi bạn thật sự cần object.

Number("123"); // ✅ convert chuỗi sang số
Boolean(0);    // ✅ false
String(true);  // ✅ "true"

// → Dùng như hàm chuyển kiểu thì hoàn toàn hợp lệ.

// 4. Riêng null và undefined

// Không có object wrapper.
// Không có method hay property nào cả.
// Gọi thuộc tính sẽ báo lỗi:

// null.toString(); // ❌ TypeError
// undefined.test;  // ❌ TypeError

// Bài tập 1
let str = "Hello";
str.test = 5; // cố gắng thêm thuộc tính cho chuỗi
console.log(str.test); // undefined , không lỗi