/** 
 *  Flags Descriptor trong JavaScript
 *  a. Trong JavaScript, mỗi thuộc tính của một object đều có các flags descriptor xác định
 *  cách mà thuộc tính đó hoạt động. Các flags descriptor bao gồm:
 *   - writable: Xác định xem thuộc tính có thể được gán giá trị mới hay không.
 *   - enumerable: Xác định xem thuộc tính có xuất hiện trong các vòng lặp như for...in hay Object.keys() hay không.
 *   - configurable: Xác định xem thuộc tính có thể bị xóa hoặc thay đổi các flags descriptor khác hay không.
 *  b. Mặc định, các thuộc tính được tạo ra thông qua khai báo object hoặc gán giá trị có các flags descriptor
 *   là writable, enumerable và configurable đều là true.
 *  c. Descriptor là gì?
 *  - Descriptor là một đối tượng mô tả các đặc tính của một thuộc tính trong object.
 *  Mỗi thuộc tính trong object có một descriptor liên kết với nó, chứa thông tin về
 *  cách thuộc tính đó hoạt động.
 *  - Descriptor có thể được kiểm tra và thay đổi bằng các hàm 
 *    -> Object.getOwnPropertyDescriptor() và Object.defineProperty()
 */
"use strict";

// in ra tiêu đề
document.write("<h2> Flags Descriptor trong JavaScript </h2>");

function section(title) {
    console.log("\n================================ ");
    console.log("=== " + title + " ===");
    console.log("================================ \n");
}

// 1. Xem descriptor của thuộc tính
// Ý tưởng:
// – Sử dụng Object.getOwnPropertyDescriptor(obj, prop)
//   để lấy descriptor của thuộc tính prop trong obj


section("1. Xem descriptor của thuộc tính"); ``

let user = { name: "John" };

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');
console.log(descriptor);
// {value: "John", writable: true, enumerable: true, configurable: true}

console.log(JSON.stringify(descriptor, null, 2));
// {
//   "value": "John",
//   "writable": true,
//   "enumerable": true,
//   "configurable": true
// }

// 2. Tạo hoặc chỉnh sửa descriptor của thuộc tính
// Ý tưởng:
// – Sử dụng Object.defineProperty(obj, prop, descriptor)
//   để tạo mới hoặc chỉnh sửa descriptor của thuộc tính prop trong obj
section("2. Tạo hoặc chỉnh sửa descriptor của thuộc tính");

let user2 = {};

Object.defineProperty(user2, 'name', {
    value: "Alice",
    writable: false,      // không thể gán giá trị mới
    enumerable: true,     // xuất hiện trong vòng lặp
    configurable: false   // không thể xóa hoặc thay đổi descriptor
});

let descriptor2 = Object.getOwnPropertyDescriptor(user2, 'name');
console.log(JSON.stringify(descriptor2, null, 2));
// {
//   "value": "Alice",
//   "writable": false,
//   "enumerable": true,
//   "configurable": false
// }

// 3. writable: false → không cho sửa giá trị
section("3. writable: false → không cho sửa giá trị");

let user3 = { name: "Bob" };
Object.defineProperty(user3, 'name', { writable: false });

// user3.name = "Charlie"; // TypeError: Cannot assign to read only property 'name' of object '#<Object>'

// 4. enumerable: false → không xuất hiện trong vòng lặp
section("4. enumerable: false → không xuất hiện trong vòng lặp");

let user4 = {
    name: "David",
    toString() {
        return this.name;
    }
}
for (let key in user4) {
    console.log(key); // name, toString
}

// ẩn toString khỏi vòng lặp
Object.defineProperty(user4, 'toString', { enumerable: false });

for (let key in user4) {
    console.log(key); // name
}

// 6. Configurable: false → không thể delete hoặc thay đổi flag

section("6. Configurable: false → không thể delete hoặc thay đổi flag");

let user5 = { name: "Eve" };
Object.defineProperty(user5, 'name', { configurable: false });

user5.name = "Eva"; // vẫn có thể sửa giá trị nếu writable là true
console.log(user5.name); // Eva
// delete user5.name; // TypeError: Cannot delete property 'name' of #<Object>

//7. “Niêm phong” property hoàn toàn
section("7. “Niêm phong” property hoàn toàn");

let user6 = { name: "Frank" };
Object.defineProperty(user6, 'name', {
    writable: false,
    configurable: false
});

// user6.name -> không thể sửa giá trị, không thể xóa, không thể thay đổi flags