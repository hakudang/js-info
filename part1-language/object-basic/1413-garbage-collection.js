/** file: 1413-garbage-collection.js
 * Giới thiệu về Garbage Collection trong JavaScript 
 * Garbage Collection là quá trình tự động giải phóng bộ nhớ không còn sử dụng
 * 
 * 1. Giới thiệu về Garbage Collection
 * 2. reachability - khả năng tiếp cận
 * 3. Ví dụ về Garbage Collection   
 * 4. ví dụ phức tạp hơn - các đối tượng liên kết
 * 5. unreachable - vùng không thể tiếp cận
 * lưu ý : bạn hãy xem code kèm xem trình duyệt khi chạy file index.html để dễ hiểu
 */

"use strict";

// in ra html tag <h2> Garbage Collection </h2>
document.write("<h2> Garbage Collection </h2>");

// 1. Giới thiệu về Garbage Collection

// javascript sử dụng cơ chế Garbage Collection tự động để quản lý bộ nhớ 
// js tự động theo dõi các đối tượng không còn được sử dụng và giải phóng bộ nhớ của chúng

// 2. reachability - khả năng tiếp cận
// 2.1 tập cơ bản các gốc (roots)
//  - hàm đang thực thi có ngữ cảnh hiện tại
//  - biến cục bộ của hàm đó
//  - tham chiếu đến đối tượng được truyền vào hàm đó
// 2.2 Các đối tượng reachable (có thể tiếp cận)
//  - đối tượng có thể tham chiếu từ tập cơ bản các gốc (roots)
//  - đối tượng có thể được tiếp cận thông qua một chuỗi tham chiếu từ các gốc

// 3. Ví dụ về Garbage Collection
let user = { name: "John" };

// in ra hình img/1413-simple-01.PNG
document.write('<h3> Ví dụ đơn giản về Garbage Collection </h3>');
document.write('<img src="./img/1413-simple-01.PNG" alt="ví dụ về Garbage Collection">');
document.write('<p>let user = { name: "John" }</p>');

// 3.1 biến toàn cục user tham chiếu đến đối tượng { name: "John" }
console.log(user.name); // John

// 3.2 ghi đề đối tượng bằng null
user = null; 

// in ra hinh img/1413-simple-02.PNG
document.write('<h3> Cập nhật tham chiếu -  gán null xóa tham chiếu </h3>');
document.write('<img src="./img/1413-simple-02.PNG" alt="ví dụ về Garbage Collection">');
document.write('<p>user = null</p>');

user = { name: "John" };
let admin = user; 
console.log(admin.name); 

// in ra hinh img/1413-simple-03.PNG
document.write('<h3> Hai tham chiếu </h3>');
document.write('<img src="./img/1413-simple-03.PNG" alt="Hai tham chiếu ">');
document.write('<p> user = { name: "John" }; let admin = user</p>');

// tham chiếu từ biến user đến đối tượng { name: "John" } bị xóa
// đối tượng vẫn còn được tham chiếu bởi biến admin -> vẫn còn lưu trong bộ nhớ


// 4. ví dụ phức tạp hơn - các đối tượng liên kết

/**
 * Hàm marry “liên kết” hai đối tượng
 * bằng cách cung cấp cho chúng các tham chiếu với nhau và
 * trả về một đối tượng mới chứa cả hai đối tượng.
 * @ param {Object} man - đối tượng người chồng
 * @ param {Object} woman - đối tượng người vợ
 * @return {Object} đối tượng gia đình chứa cha và mẹ
 */

// object : các biến được gán thông qua hàm marry
//  - family { father: {name: "John"} , mother : {name: "Ann"} } 
//  - father { name: "John", wife: {name: "Ann"} 
//  - mother { name: "Ann", husband: {name: "John" }
//  - husband { name: "John", wife: {name: "Ann"} }
//  - wife { name: "Ann", husband: {name: "John"} }

function marry(man, woman) {
  woman.husband = man;
  man.wife = woman;

  return {
    father: man,
    mother: woman
  }
}

let family = marry({
  name: "John"
}, {
  name: "Ann"
});

// in ra img/1413-01.PNG, 
document.write('<h3> Ví dụ phức tạp hơn - Các đối tượng liên kết </h3>');
// in ra đoạn code nhiều dòng 
document.write('<pre><code>' +
'function marry(man, woman) { \n' +
'  woman.husband = man; \n' +
'  man.wife = woman;\n' +
'\n' +
'  return {\n' +
'    father: man,\n' +
'    mother: woman\n' +
'  }\n' +
'}\n' +
'\n' +
'let family = marry({\n' +
'  name: "John"\n' +
'}, {\n' +
'  name: "Ann"\n' +
'});' +
'</code></pre>');
document.write('<img src="./img/1413-01.PNG" alt="Cấu trúc bộ nhớ">');
document.write('<p>Hình 1413-01: Hàm marry “liên kết” hai đối tượng bằng cách cung cấp cho chúng các tham chiếu với nhau và trả về một đối tượng mới chứa cả hai đối tượng</p>');

// 4.1 Xóa tham chiếu đến đối tượng family
delete family.father;
delete family.mother.husband;

// bây giờ không có tham chiếu nào đến đối tượng { name: "John" }
// và đối tượng { name: "Ann" } chỉ tham chiếu đến đối tượng { name: "John" }
// nhưng đối tượng { name: "John" } không thể tiếp cận được từ gốc (roots)
// nên cả hai đối tượng đều bị thu gom rác

// in hình img/1413-02.PNG
document.write('<img src="./img/1413-02.PNG" alt="Cấu trúc bộ nhớ sau khi xóa tham chiếu">');
document.write('<p>Hình 1413-02: Xóa đi family.father và family.mother.husband</p>');

// in hình img/1413-03.PNG
document.write('<img src="./img/1413-03.PNG" alt="Cấu trúc bộ nhớ ">');
document.write('<p>Hình 1413-03: John không còn tham chiếu đến giá trị nào</p>');

// in hình img/1413-04.PNG
document.write('<img src="./img/1413-04.PNG" alt="Cấu trúc bộ nhớ sau khi thu gom rác">');
document.write('<p>Hình 1413-04: Cấu trúc bộ nhớ sau khi thu gom rác, giải phóng bộ nhớ</p>');

// 5. unreachable - vùng không thể tiếp cận
// - đối tượng không thể tiếp cận từ gốc (roots) được gọi là unreachable (không thể tiếp cận)
// - các đối tượng unreachable sẽ bị thu gom rác và giải phóng bộ nhớ   

family = null

// in hình img/1413-05.PNG
document.write ('<h3> Xóa tham chiếu family </h3>');
document.write('<img src="./img/1413-05.PNG" alt="Cấu trúc bộ nhớ sau khi xóa family">');
document.write('<p>Hình 1413-05: Xóa đi tham chiếu family, family = null</p>');

// in đoạn code nhiều dòng
document.write('<pre><code>' +
'family = null; \n' +
'Ví dụ này chứng minh tầm quan trọng của khái niệm khả năng tiếp cận - reachability.\n' +
'Rõ ràng là John và Ann vẫn còn liên quan, cả hai đều có mối liên hệ. Nhưng thế vẫn chưa đủ.\n' +
'Đối tượng trước đó "family" đã bị hủy liên kết khỏi gốc, không còn tham chiếu nào đến nó nữa, do đó toàn bộ hòn đảo sẽ không thể tiếp cận được và sẽ bị xóa\n' +
'</code></pre>');