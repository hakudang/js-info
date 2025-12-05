/**  
 * kiểu String trong JavaScript
 * 1. Khái niệm cơ bản
 * 2. Các loại dấu nháy trong chuỗi
 * 3. Các ký tự đặc biệt trong chuỗi
 * 4. Độ dài chuỗi - thuộc tính length
 * 5. Truy cập ký tự trong chuỗi
 * 6. Tính immutable ( bất biến ) của chuỗi
 * 7. Đổi chữ hoa - thường
 * 8. Tìm kiếm chuỗi con 
 * 9. Cắt chuỗi con
 * 10. So sánh chuỗi
 * 11. Các phương thức hữu ích khác 
 * 12. Bài tập
 */


"use strict";

// in ra html tag <h2> Strings </h2>
document.write("<h2> Strings </h2>");

// 1. Khái niệm cơ bản
// - string : kiểu dữ liệu lưu trữ văn bản 


// 2. Các loại dấu nháy trong chuỗi
// 2.1 Dấu nháy đơn ''
let singleQuote = 'Đây là chuỗi dùng dấu nháy đơn';

// 2.2 Dấu nháy kép ""
let doubleQuote = "Đây là chuỗi dùng dấu nháy kép";

// 2.3 Dấu nháy ngược ` ` (backtick)
let backtick = `Đây là chuỗi dùng dấu nháy ngược (backtick)`;

// chèn biểu thức 
` 1 + 2 = ${1 + 2}`; // "1 + 2 = 3"

// chuổi nhiều dòng
let multiLine = `Đây là chuỗi
nhiều dòng
dùng dấu nháy ngược`;

// Tagged template - truyền chuỗi vào hàm xử lý đặc biệt

// tag\...`` là một cú pháp đặc biệt, không phải cách gọi hàm thông thường.
// JavaScript tự động phân tách chuỗi và giá trị rồi gọi hàm tag().
// Tính năng này được gọi là Tagged Template Literals.
// Mục tiêu: cho phép tùy biến cách xử lý chuỗi nội suy — ví dụ: escape HTML, dịch ngôn ngữ, format SQL, v.v.

function tag(strings, ...values) {
    console.log(strings); // mảng các phần chuỗi
    console.log(values); // mảng các giá trị biểu thức
    return "Kết quả từ hàm tag";
}
let result = tag`Giá trị của 1 + 2 là ${1 + 2} và giá trị của 3 * 4 là ${3 * 4}`;
console.log(result); // Kết quả từ hàm tag

// 3. Các ký tự đặc biệt trong chuỗi
// Dấu \ dùng để thoát ký tự đặc biệt

// 3.1 \n : xuống dòng
let newLine = "Dòng 1\nDòng 2";
document.write(newLine);
console.log(newLine);

// 3.2 \r : carriage return
let carriageReturn = "Hello\rWorld"; // ghi đè Hello bằng World
document.write("<br>" + carriageReturn);
console.log(carriageReturn);

// 3.2 \t : tab
let tabbed = "Cột 1\tCột 2";
document.write("<br>" + tabbed);
console.log(tabbed);

// 3.3 \' , \", \` : dấu nháy đơn, kép, ngược
let quotes = 'Dấu nháy đơn: \', Dấu nháy kép: ", Dấu nháy ngược: `';
document.write("<br>" + quotes);
console.log(quotes);

// 3.4 \\ : dấu gạch chéo ngược
let backslash = "Dấu gạch chéo ngược: \\";
document.write("<br>" + backslash);
console.log(backslash);

// 3.5 \b , \f , \v : backspace, form feed, vertical tab
let specialChars = "Backspace:\b , Form feed:\f , Vertical tab:\v";
document.write("<br>" + specialChars);
console.log(specialChars);

// 4. Độ dài chuỗi - thuộc tính length
let str = "Hello, world!";
console.log("Độ dài chuỗi:", str.length);

// 5. Truy cập ký tự trong chuỗi
let str1 = 'Hello';
console.log(str1[0]); // H
console.log(str1.charAt(0)); // H
console.log(str1.at(0)); // H
console.log(str1.at(-1)); // o
console.log(str1.at(-2)); // l

// 6. Tính immutable ( bất biến ) của chuỗi
// không thể sửa trực tiếp ký tự trong chuỗi
// muốn thay đổi -> tạo chuỗi mới
let str2 = "Hi";
str2 = 'h' + str2[1]; // tạo chuỗi mới 'bằng cách nối ký tự'
console.log(str2); // hi

// 7. Đổi chữ hoa - thường

"Test".toUpperCase(); // "TEST"
"Test".toLowerCase(); // "test"

// 8. Tìm kiếm chuỗi con 

// 8.1 indexOf abstract
let str3 = "Hello, world!";
console.log(str3.indexOf("world")); // 7

// 8.2 lastIndexOf abstract
let str4 = "Hello, world! Welcome to the world!";
console.log(str4.lastIndexOf("world")); // 21

// 8.3 includes abstract
let str5 = "Hello, world!";
console.log(str5.includes("world")); // true    

// 8.4 startsWith abstract
let str6 = "Hello, world!";
console.log(str6.startsWith("Hello")); // true

// 9. Cắt chuỗi con
// Khuyên cáo : dùng slice() vì ngắn gọn, linh hoạt 

// 9.1 slice(start, end)
// start : vị trí bắt đầu, end : vị trí kết thúc (không bao gồm)

let str7 = "Hello, world!";
console.log(str7.slice(0, 5)); // Hello
console.log(str7.slice(7)); // world! - từ vị trí 7 đến hết

// 9.2 substring(start, end)
let str8 = "Hello, world!";
console.log(str8.substring(0, 5)); // Hello
console.log(str8.substring(7)); // world!

// 10. So sánh chuỗi
// So sánh theo mã Unicode UTF-16, ký tự thường > ký tự hoa.
// Dùng localeCompare() để so sánh theo ngôn ngữ:
console.log('a' > 'A'); // true
console.log('Österreich'.localeCompare('Zealand')); // -1 , vì Ö đứng trước Z trong tiếng Đức   
console.log('Österreich'.localeCompare('Zealand', 'de')); // -1 , so sánh theo tiếng Đức

// 11. Các phương thức hữu ích khác 

// 11.1 repeat(n) - lặp lại chuỗi n lần
console.log("Hi! ".repeat(3)); // Hi! Hi! Hi!

// 11.2 trim() - xóa khoảng trắng ở đầu và cuối chuỗi
let str9 = "   Hello, world!   ";
console.log(str9.trim()); // "Hello, world!"

// 11.3 codePointAt(pos) - trả về mã Unicode của ký tự tại vị trí pos
let str10 = "Hello";
console.log(str10.codePointAt(0)); // 72 , mã Unicode của 'H'

// 11.4 fromCodePoint(code) - tạo chuỗi từ mã Unicode
console.log(String.fromCodePoint(72)); // H

// 12. Bài tập

// Bài tập 1 - Viết hoa ký tự đầu tiên
// Question : Viết một hàm ucFirst(str)trả về chuỗi strcó ký tự đầu tiên được viết hoa,

// Answer:
function ucFirst(str) {
    if (!str) return str; // kiểm tra chuỗi rỗng

    let firstChar = str.charAt(0).toUpperCase();
    let restStr = str.slice(1);
    return firstChar + restStr;
}

console.log(ucFirst("hello")); // "Hello"
console.log(ucFirst("javaScript")); // "JavaScript"
console.log(ucFirst("")); // ""

// Bài tập 2 - Kiểm tra thư rác 

// Question : Viết hàm checkSpam(str) để kiểm tra chuỗi strcó chứa từ "viagra"hoặc "XXX"không.

// Hàm nên trả về truenếu phát hiện spam, và falsenếu không có spam.
// Ví dụ:
// checkSpam('buy ViAgRA now') = true
// checkSpam('free xxxxx') = true
// checkSpam("innocent rabbit") = false

// Answer:
function checkSpam(str) {
    let lowerStr = str.toLowerCase();
    return lowerStr.includes("viagra") || lowerStr.includes("xxx");
}

console.log(checkSpam('buy ViAgRA now')); // true
console.log(checkSpam('free xxxxx')); // true
console.log(checkSpam("innocent rabbit")); // false

// Bài tập 3 - Cắt chuỗi

// Question : Viết hàm truncate(str, maxlength) để cắt chuỗi strnếu nó dài hơn maxlengthvà thay thế phần bị cắt bằng dấu ba chấm "...".
// Kết quả trả về nên có độ dài bằng maxlength.
// Ví dụ:
// truncate("Hello, world!", 10) = "Hello, w..."
// truncate("Hi there", 20) = "Hi there"            
// Answer:
function truncate(str, maxlength) {
    if (str.length <= maxlength) {  
        return str;
    } else {
        return str.slice(0, maxlength - 3) + "...";
    }
}
console.log(truncate("Hello, world!", 10)); // "Hello, w..."
console.log(truncate("Hi there", 20)); // "Hi there"                

// Bài tập 4 - Extract the money

// Question : Viết hàm extractCurrencyValue(str)nhận chuỗi strtheo định dạng như "$120"và trả về giá trị số 120.
// Ví dụ:
// extractCurrencyValue('$120') = 120   
// Answer:
function extractCurrencyValue(str) {
    return +str.slice(1); // loại bỏ ký tự $ và chuyển sang số
}   
console.log(extractCurrencyValue('$120')); // 120
