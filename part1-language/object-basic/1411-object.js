
/**
 * file : 1410-object.js
 * Giới thiệu về Object trong JavaScript
 * 1. Tạo Object
 * 2. Nghĩa đen và thuộc tính
 * 3. Dấu ngoặc vuông []
 * 4. Tính toán tên thuộc tính
 * 5. Viết tắt giá trị Thuộc tính
 * 6. Giới hạn tên thuộc tính
 * 7. Kiểm tra sự tồn tại của thuộc tính, toán tử "in"
 * 8. Vòng lặp for..in
 * 9. Sắp xếp thứ tự thuộc tính
 * 10. Tóm tắt
 * 11. Bài tập
 */

"use strict";

// in ra html tag <h2> Object </h2>
document.write("<h2> Object </h2>");

// 1. tạo object rỗng

// Cách 1 : sử dụng đối tượng literal
let user1 = {};

// Cách 2 : sử dụng từ khóa new
let user2 = new Object();

// 2. Nghĩa đen và thuộc tính
// Object là một tập hợp các thuộc tính (key-value pairs).
// Key là tên thuộc tính, value là giá trị của thuộc tính đó.
// Key có kiểu dữ liệu là chuỗi hoặc Symbol.
// Value có thể là bất kỳ kiểu dữ liệu nào: primitive, object, function, v.v...

// Tạo đối tượng user với các thuộc tính name và age
let user = {
    name: "John",
    age: 30
};

// 2.1 Truy cập thuộc tính
console.log(user.name); // John
console.log(user["age"]); // 30

// 2.2 Thêm thuộc tính
user.isAdmin = true;
console.log(user.isAdmin); // true

// 2.3 Xóa thuộc tính
delete user.isAdmin;
console.log(user.isAdmin); // undefined

// 2.4 thuộc tính nhiều từ
let member = {
    name: "Alice",
    age: 25,
    "likes birds": true
};

console.log(member); // { name: 'Alice', age: 25, 'likes birds': true }

// 2.5 Tên thuộc tính cuối cùng
let member2 = {
    name: "Bob",
    age: 28,
};

// thêm thuộc tính cuối cùng
member2.isMember = true;
console.log(member2); // { name: 'Bob', age: 28, isMember: true }

// 3. Dấu ngoặc vuông []

// 3.1 truy cập thuộc tính

let user3 = {};
// set thuộc tính sử dụng dấu ngoặc vuông
user3["likes cats"] = true;
// get thuộc tính sử dụng dấu ngoặc vuông
console.log(user3["likes cats"]); // true
// Xóa thuộc tính sử dụng dấu ngoặc vuông
delete user3["likes cats"];
console.log(user3["likes cats"]); // undefined

// 3.2 Sử dụng biến làm tên thuộc tính
let key = "likes cats";
// truy cập thuộc tính linh hoạt
user3[key] = true;

// get thuộc tính linh hoạt
let user4 = {
    name: "Charlie",
    age: 32,
};

let prop = prompt("Enter property name to access (name or age):", "name");
console.log(user4[prop]);

// không làm được điều này với dấu chấm
console.log(user4.prop);  // undefined

// 4. Tính toán tên thuộc tính
let fruit = prompt("Which fruit to buy?", "apple");
let bag = {
    [fruit]: 5, // tên thuộc tính được tính toán
};
console.log(bag.apple); // 5
console.log(bag[fruit]); // 5

let fruit2 = "banana";
let bag2 = {
    [fruit2 + "Computers"]: 10
};
console.log(bag2.bananaComputers); // 10

//5. Viết tắt giá trị Thuộc tính

function makeUser(name, age) {
    return {
        name: name,
        age: age,
    };
}
let user5 = makeUser("David", 29);
console.log(user5); // { name: 'David', age: 29 }

// thay vì viết name: name, age: age, ta có thể viết ngắn gọn hơn như sau
function makeUserShort(name, age) {
    return {
        name, // tương đương name: name
        age, // tương đương age: age
    };
}

let user6 = makeUserShort("Eva", 27);
console.log(user6); // { name: 'Eva', age: 27 }

// không dùng viết tắt khi gán giá trị cho thuộc tính trùng tên biến
user6 = {
    name, // tương đương name: name
    age: 35,
};
console.log(user6); // { name: '', age: 35 }

// 6. Giới hạn tên thuộc tính

// 6.1 Không giới hạn tên thuộc tính
// có thể dùng các tên riêng như "for", "let", "return"
let obj = {
    for: 1,
    let: 2,
    return: 3
};
console.log(obj.for + obj.let + obj.return); // 6   

// 6.2 Tên thuộc tính là số - dùng như chuỗi
let obj2 = {
    0: "zero",
    1: "one",
};
console.log(obj2[0]); // zero
console.log(obj2["1"]); // one
console.log(obj2[0] === obj2["0"]); // true
// console.log(obj2.0); // Lỗi cú pháp

let obj3 = {};
obj3.__proto__ = 5;
// console.log(obj3.__proto__ ); // không trả về 5 vì __proto__ là thuộc tính đặc biệt

// 7. Kiểm tra sự tồn tại của thuộc tính, toán tử "in"

// 7.1 sử dụng toán tử "in"

let user7 = {
    name: "Frank",
    age: 40,
};

console.log("age" in user7); // true
console.log("isAdmin" in user7); // false

key = "name";
console.log(key in user7); // true

// 7.2 Giá trị undefined

let user8 = {
    test: undefined,
};

console.log(user8.test); // undefined
console.log("test" in user8); // true

// 8. Vòng lặp for..in
let user9 = {
    name: "Grace",
    age: 22,
    isAdmin: true,
};

for (let key in user9) {
    console.log(key + ": " + user9[key]);
} // name: Grace, age: 22, isAdmin: true

// 9. Sắp xếp thứ tự thuộc tính

// 9.1 Thuộc tính số được sắp xếp theo thứ tự tăng dần

let codes = {
    "84": "Vietnam",
    "81": "Japan",
    // other countries
    "49": "Germany",
    "41": "Switzerland",
    "44": "UK",
    "33": "France",
    // other countries
    "1": "USA"
};

for (let code in codes) {
    console.log(code); // 1,33,41,44,49,81,84
}

// nếu muốn các key số nguyên giữ thứ tự chèn, ta có thể chuyển chúng thành chuỗi
let codes2 = {
    "+84": "Vietnam",
    "+81": "Japan",
    // other countries
    "+49": "Germany",
    "+41": "Switzerland",
    "+44": "UK",
    "+33": "France",
    // other countries
    "+1": "USA"
};

for (let code in codes2) {
    console.log(code); // +84, +81, +49, +41, +44, +33, +1
}

// 9.2 Thuộc tính chuỗi và Symbol theo thứ tự chèn
let user10 = {
    name: "Hannah",
    age: 31,
    isAdmin: false,
};

for (let key in user10) {
    console.log(key + ": " + user10[key]); // name: Hannah, age: 31, isAdmin: false
}


// 10. Tóm tắt

// 10.1 Đối tượng lưu trữ các cặp thuộc tính và giá trị
// 10.2 Thuộc tính có thể được truy cập bằng dấu chấm hoặc dấu ngoặc vuông
// - object.prop
// - object["prop"]
// 10.3  thêm, xóa
// - delete object.prop
// - object.newProp = value
// 10.4 kiểm tra sự tồn tại của thuộc tính bằng toán tử in
// - "prop" in object
// 10.5 lặp qua các thuộc tính bằng for..in
// - for (let key in object) { ... }
// 10.6 Có nhiều đối tượng có trọng javascript 
// - Array - Date - Error - Function - v.v...

// 11. Bài tập

// 11.1 Bài tập 1 

// Tạo một đối tượng rỗng user.
// Thêm thuộc tính namecó giá trị John.
// Thêm thuộc tính surname có giá trị Smith.
// Thay đổi giá trị name của Pete.
// Xóa thuộc tính namekhỏi đối tượng.

let user11 = {};
user11.name = "John";
user11.surname = "Smith";
user11.name = "Pete";
delete user11.name;

// 11.2 Bài tập 2

// Write the function isEmpty(obj) which returns true 
// if the object has no properties, false otherwise.

function isEmpty(obj) {
    for (let key in obj) {
        // nếu vòng lặp bắt được thuộc tính nào thì obj không rỗng
        return false;
    }
    return true;
}

let schedule = {};
console.log(isEmpty(schedule)); // true
schedule["8:30"] = "get up";
console.log(isEmpty(schedule)); // false
if (!isEmpty(schedule)) {
    console.log(schedule);
}

// 11.3 Bài tập 3

let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
}
// Write the code to sum all salaries and store in the variable sum.
// Should be 390 in the example above.


let sum = 0;
for (let key in salaries) {
    sum += salaries[key];
}
console.log(sum); // 390

// 11.4 Bài tập 4
// before the call
let menu = {
    width: 200,
    height: 300,
    title: "My menu"
};

multiplyNumeric(menu);

// // after the call
// menu = {
//     width: 400,
//     height: 600,
//     title: "My menu"
// };
function multiplyNumeric(obj) {
    for (let key in obj) {
        if (typeof obj[key] === "number") {
            obj[key] *= 2;
        }
    }
}
console.log(menu);
