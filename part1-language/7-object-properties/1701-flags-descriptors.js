/** 
 *  Flags Descriptor trong JavaScript
 */
"use strict";

// in ra tiêu đề
document.write("<h2> Flags Descriptor trong JavaScript </h2>");

function section(title) {
    console.log("\n================================ ");
    console.log("=== " + title + " ===");
    console.log("================================ \n");
}


section("3. Xem flag bằng getOwnPropertyDescriptor"); ``

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

// 4. Tạo / chỉnh flag bằng defineProperty

section("4. Tạo / chỉnh flag bằng defineProperty");

// – Cú pháp : Object.defineProperty(obj, prop, descriptor)
//   để tạo mới hoặc chỉnh sửa descriptor của thuộc tính prop trong obj

let user2 = {};

Object.defineProperty(user2, 'name', {
    value: "John",
});

let descriptor2 = Object.getOwnPropertyDescriptor(user2, 'name');
console.log(JSON.stringify(descriptor2, null, 2));
// {
//   "value": "John",
//   "writable": false,
//   "enumerable": false,
//   "configurable": false
// }

// 5. Non-writable (readonly)
section("5. Non-writable (readonly)");

let user3 = { name: "John" };
Object.defineProperty(user3, 'name', {
    writable: false
});

// user3.name = "Pete"; // TypeError: Cannot assign to read only property 'name' of object '#<Object>'

// 6. Non-enumerable (ẩn khỏi vòng lặp)
section("6. Non-enumerable (ẩn khỏi vòng lặp)");

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

// 7. Non-configurable (khóa vĩnh viễn)

section("7. Non-configurable (khóa vĩnh viễn)");

let descriptor7 = Object.getOwnPropertyDescriptor(Math, 'PI');
// lấy descriptor của Math.PI
console.log(JSON.stringify(descriptor7, null, 2));

// {
//   "value": 3.141592653589793,
//   "writable": false,
//   "enumerable": false,
//   "configurable": false
// }
// Hệ quả:
// - Không thể xoá thuộc tính
// - Không thể thay đổi descriptor (writable, enumerable, configurable) nữa
// - Không thể chuyển thành accessor property (getter/setter) nữa

// 8. configurable:false nhưng writable:true thì sao?
section("8. configurable:false nhưng writable:true thì sao?");
let user8 = {
    name: "John"
};

Object.defineProperty(user8, "name", {
    configurable: false
});

user8.name = "Pete"; // ✅ được
// delete user8.name;   // ❌ lỗi. Cannot delete property 'name' of #<Object>
console.log("name: " + user8.name); // Pete

// 9. “Khoá cứng” như hằng số
section("9. “Khoá cứng” như hằng số");

let user9 = {
    name: "John"
};
Object.defineProperty(user9, "name", {
  writable: false,
  configurable: false
});

Object.defineProperties(user9, {
  name: { value: "John", writable: false },
  surname: { value: "Smith", writable: false }
});

let descriptor9 = Object.getOwnPropertyDescriptor(user9, 'name');
console.log(JSON.stringify(descriptor9, null, 2));
// {
//   "value": "John",
//   "writable": false,
//   "enumerable": false,
//   "configurable": false
// }