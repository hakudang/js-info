/** 
 * Destructuring Assignment trong JavaScript
 * Cho phép phân rã cấu trúc của mảng hoặc object 
 * thành các biến riêng biệt
 * 
 * 1. Phân rã Mảng (Arrays)
 * 1.1 Cách cơ bản
 * 1.2 Bỏ qua phần tử không cần thiết
 * 1.3 Dùng với các iterable khác
 * 1.4 Gán vào thuộc tính của object 
 * 1.5 Duyệt cặp key-value của Map
 * 1.6 Hoán đổi biến
 * 1.7 Lấy phần còn lại (...rest)
 * 1.8 Giá trị mặc định
 * 2. Phân rã Object (Objects)
 * 2.1 Cách cơ bản
 * 2.2 Đổi tên biến
 * 2.3 Giá trị mặc định
 * 2.4 Lấy phần còn lại (...rest)
 * 3. Bài tập
 * 3.1 Phân rã trong tham số hàm
 * 3.2 Tránh lỗi khi không truyền đối số 
 * 4. Bài tập
 * - Bài tập 1 : Phân rã Object với đổi tên biến và giá trị mặc định
 * - Bài tập 2 : Phân rã mảng với phần còn lại và giá trị mặc định
 */

"use strict";

// in ra tiêu đề
document.write("<h2> Destructuring Assignment trong JavaScript </h2>");

// 1. Phân rã Mảng (Arrays)


// 1.1 Cách cơ bản
// thay vì arr[0], arr[1]... ta gán vào biến

let arr = ["John", "Smith"];

// destructuring assignment
// gán firstName = arr[0], lastName = arr[1]
let [firstName, lastName] = arr;
console.log(firstName); // John
console.log(lastName); // Smith

// 1.2 Bỏ qua phần tử không cần thiết
let [first, , last, titleA] = ["Julius", "Caesar", "Consul"];
console.log(titleA); // Consul

// 1.3 Dùng với các iterable khác
let [a, b, c] = "abc"; // chuỗi là iterable
let [one, two, three] = new Set([1, 2, 3]); // Set là iterable

// 1.4 Gán vào thuộc tính của object 
let user = {};
[user.name, user.age] = ["Alice", 25];
console.log(user); // { name: 'Alice', age: 25 }

// 1.5 Duyệt cặp key-value của Map
user = { name: "Bob", age: 30 };

for (let [key, value] of Object.entries(user)) {
    console.log(`${key}: ${value}`);
}
// name: Bob
// age: 30

// 1.6 Hoán đổi biến
// đã khai báo ở trên let
a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // 2 1

// 1.7 lấy phần còn lại (...rest)
let [name1, name2, ...rest] = ["Mike", "Tom", "Jerry", "Spike"];
console.log(rest); // [ 'Jerry', 'Spike' ]

// 1.8 Giá trị mặc định 

let [name = "Guest", surname = "Anonymous"] = ["Kate"];
console.log(name); // Kate
console.log(surname); // Anonymous

// 2. Phân rã Object (Objects)

// 2.1 Cách cơ bản
let options = {
    title: "Menu",
    width: 100,
    height: 200
};
// let { title, width, height } = options;
// console.log(title); // Menu
// console.log(width); // 100
// console.log(height); // 200

// 2.2 Đổi tên biến
// let { width: w, height: h, title } = options;
// console.log(w, h); // 100 200
// console.log(title); // Menu

// 2.3 Giá trị mặc định

// let { title, width = 300, height = 400 } = { title: "My Menu" };
// console.log(width); // 300
// console.log(height); // 400
// console.log(title); // My Menu

// 2.4 Phần còn lại (...rest)
// let { title, ...restProps } = {
//     title: "Menu",
//     width: 100,
//     height: 200
// };
// console.log(restProps); // { width: 100, height: 200 }

// 2.5 Phân rã lồng nhau (Nested destructuring)
let optionsNested = {
    size: { width: 100, height: 200 },
    items: ["Cake", "Donut"]
};

let {
    size: { width, height },
    items: [item1, item2],
    title = "Menu"
} = optionsNested;
console.log(title); // Menu
console.log(width); // 100
console.log(height); // 200
console.log(item1); // Cake
console.log(item2); // Donut

// 3. Phân rã trong tham số hàm

// 3.1 Gọi hàm đưa vào tham số là 1 object
// có thể thiếu key nào đó, dùng giá trị mặc định
function showMenu({ title = "Untitled", width = 200, height = 100, items = [] }) {
    console.log(`${title} ${width}x${height}`);
    console.log(`Items: ${items.join(", ")}`);
}

showMenu({
    title: "My Menu",
    items: ["Item1", "Item2"]
});
// My Menu 200x100
// Items: Item1, Item2  

// 3.2 Tránh lỗi khi không truyền đối số 
// gán giá trị mặc định là object rỗng {} để tránh lỗi
function showMenu2({ title = "Menu", width = 100, height = 200, items = [] } = {}) {
    console.log(`${title} ${width}x${height}`);
}
showMenu2(); // Menu 100x200

// 4. Bài tập
// Bài tập 1 : Phân rã Object với đổi tên biến và giá trị mặc định

// Question :
// Viết code phân rã object john thành các biến name, age, isAdmin
// với biến age đổi tên thành age và isAdmin có giá trị mặc định false

// Answer :

let john = { nameA: "John", years: 30 };

// your code to the left side:
// ... = john
let { nameA, years: age, isAdmin = false } = john;
console.log(nameA); // John
console.log(age); // 30
console.log(isAdmin); // false

// Bài tập 2 : Phân rã mảng với phần còn lại và giá trị mặc định

// Question :
// Tạo hàm topSalary(salaries) nhận vào object salaries,
// trả về tên người có lương cao nhất.
// Nếu object rỗng thì trả về null.
// Nếu có nhiều người có lương cao nhất thì trả về 1 trong số họ.
// Giải pháp : sử dụng destructuring assignment để lấy phần còn lại và giá trị mặc định

// Answer :

let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

// Object.entries(salaries); 
// // [ [ 'John', 100 ], [ 'Pete', 300 ], [ 'Mary', 250 ] ]

// Your code here
function topSalary(salaries) {
  let maxSalary = 0;
  let topEmployee = null;
    for (let [name, salary] of Object.entries(salaries)) {
        if (salary > maxSalary) {
            maxSalary = salary;
            topEmployee = name;
        }
    }
    return topEmployee;
}
console.log(topSalary(salaries)); // Pete