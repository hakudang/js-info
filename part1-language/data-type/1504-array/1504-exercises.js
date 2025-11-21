"use strict";

/**
 * file: 1504-exercises.js
 * 10 BÀI TẬP THÊM VỀ MẢNG (Array) TRONG JAVASCRIPT
 * Mỗi bài tập đều kèm lời giải + chú thích chi tiết.
 * Chạy file bằng Node: `node 1504-exercises.js`
 */

// Để log ngăn nắp

function section(title) {
    console.log("\n====================");
    console.log(title);
    console.log("====================");
}

// in ra html tag <h2> BÀI TẬP THÊM </h2>
document.write("<h2> 10 BÀI TẬP THÊM </h2>");

// BÀI TẬP THÊM

/* =========================================================
 * Bài tập 1 : Tính tổng các phần tử mảng
 * ---------------------------------------------------------
 * Giải pháp 1: sử dụng vòng lặp for...of
 * Giải pháp 2: sử dụng phương thức reduce : tính toán giá trị tích lũy
 * =======================================================*/

section("Bài 1 - Tính tổng các phần tử mảng");

let arr = [1, 2, 3, 4, 5];
// Giải pháp 1: sử dụng vòng lặp for...of
let sum1 = 0;
for (const n of arr) {
    sum1 += n;
}

console.log("B1 - sum(for..of):", sum1); // 15

// Giải pháp 2: sử dụng phương thức reduce : tính toán giá trị tích lũy
// cú pháp arr.reduce((accumulator, currentValue) => { ... }, initialValue);

const sum2 = arr.reduce((sum, value) => sum + value, 0);
console.log("B1 - sum(reduce):", sum2); // 15

/* =========================================================
 * Bài tập 2 : Lọc số chẵn từ mảng
 * ---------------------------------------------------------
 * Sử dụng phương thức filter để lọc các số chẵn từ mảng ban đầu
 * =======================================================*/

section("Bài 2 - Lọc số chẵn từ mảng");
const nums = [10, 15, 22, 33, 40];
// Kỳ vọng: [10, 22, 40]

// cú pháp arr.filter((element, index, array) => { ... });
// element: phần tử hiện tại
// index: chỉ số phần tử hiện tại
// array: mảng gốc
const evensNums = nums.filter(element => element % 2 === 0); // giữ lại phần tử thoả n % 2 === 0
console.log("B2 - evensNums(filter):", evensNums); // [10, 22, 40]


/* =========================================================
 * Bài tập 3 : Nhân đôi giá trị trong mảng
 * ---------------------------------------------------------
 * Sử dụng phương thức map để tạo mảng mới với các giá trị được nhân đôi
 * =======================================================*/
section("Bài 3 - Nhân đôi giá trị trong mảng");
const arr3 = [1, 2, 3];
// Kỳ vọng: [2, 4, 6]

// cú pháp arr.map((element, index, array) => { ... });
// element: phần tử hiện tại
// index: chỉ số phần tử hiện tại
// array: mảng gốc

const arrDoubled = arr3.map(element => element * 2);
console.log("B3 - doubledNums(map):", arrDoubled); // [2, 4, 6]


/* =========================================================
 * Bài tập 4 : Tìm phần tử lớn nhất trong mảng
 * ---------------------------------------------------------
 * Giải pháp 1: sử dụng Math.max với cú pháp spread
 * Giải pháp 2: sử dụng phương thức reduce để tìm giá trị lớn nhất
 * =======================================================*/
let arr4 = [5, 2, 8, 1, 9];

section("Bài 4 - Tìm phần tử lớn nhất trong mảng");
// Giải pháp 1: sử dụng Math.max với cú pháp spread
// cú pháp spread ...arr tách mảng thành các phần tử riêng lẻ
// cú pháp Math.max(a, b, c, ...) trả về giá trị lớn nhất trong các đối số

const max1 = Math.max(...arr4);
console.log("B4 - max1(Math.max + spread):", max1); // 9


// Giải pháp 2: sử dụng phương thức reduce để tìm giá trị lớn nhất
// cú pháp arr.reduce((accumulator, currentValue) => { ... }, initialValue);

const max2 = arr4.reduce((acc, cur) => acc > cur ? acc : cur, 0); // acc ban đầu là 0
console.log("B4 - max2(reduce):", max2); // 9

/* =========================================================
 * Bài tập 5 : Kiểm tra điều kiện phần tử trong mảng (some/every)
 * ---------------------------------------------------------
 * Sử dụng phương thức some để kiểm tra 
 * Sử dụng phương thức every để kiểm tra 
 * ---------------------------------------------------------
 * some: trả về true nếu ít nhất một phần tử thoả mãn điều kiện
 * every: trả về true nếu tất cả phần tử thoả mãn điều kiện
 * =======================================================*/

section("Bài 5 - Kiểm tra điều kiện phần tử trong mảng (some/every)");

let ages = [18, 25, 12, 40]
// Có ai < 18 không? (dùng some())
// Tất cả đều >= 18? (dùng every())

// Cách 1 - sử dụng some
// cú pháp arr.some((element, index, array) => { ... });
const hasUnder18 = ages.some(age => age < 18);
console.log("B5 - hasUnder18(some):", hasUnder18); // true

// Cách 2 - sử dụng every
// cú pháp arr.every((element, index, array) => { ... });
const allAdult = ages.every(age => age >= 18);
console.log("B5 - allAdult(every):", allAdult); // false

/* =========================================================
 * Bài tập 8 : Làm phảng mảng lồng (flatten)
 * ---------------------------------------------------------
 * Sử dụng phương thức flat để làm phẳng mảng lồng
 * ---------------------------------------------------------
 * flat(depth): depth là độ sâu làm phẳng   
 * =======================================================*/
section("Bài 6 - Làm phẳng mảng lồng (flatten)");

let arr6 = [1, [2, 3], [4, [5, 6]]];

// Dùng flat(Infinity)
// Hoặc viết đệ quy bằng reduce()
// Kỳ vọng: [1,2,3,4,5,6]

// Cách 1 - Dùng flat(Infinity)
// cú pháp arr.flat(depth);

let flatArr1 = arr6.flat(Infinity);
console.log("B6 - flatArr1(flat):", flatArr1); // [1, 2, 3, 4, 5, 6]

// Cách 2 - Viết đệ quy bằng reduce()
// cú pháp arr.reduce((accumulator, currentValue) => { ... }, initialValue);

let flatArr2 = arr6.reduce((flat, toFlatten) => {
    return flat.concat(Array.isArray(toFlatten) ?
        flatten(toFlatten) : toFlatten);
}, []);

console.log("B6 - flatArr2(reduce):", flatArr2); // [1, 2, 3, 4, 5, 6]

function flatten(arr) {
    return arr.reduce((flat, toFlatten) => {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}

/* =========================================================
 * BÀI 7. XÓA PHẦN TỬ TRÙNG LẶP (UNIQUE)
 * ---------------------------------------------------------
 * Tạo hàm unique(arr) trả về mảng với các phần tử duy nhất của arr
 *
 * Ý tưởng:
 * - Sử dụng Set để loại bỏ phần tử trùng lặp
 * - Chuyển Set trở lại mảng bằng Array.from hoặc spread
 * =======================================================*/
section("Bài 7 - Xoá phần tử trùng lặp (unique)");

let arr7 = [1, 2, 3, 2, 4, 1, 5];
// Dùng Set
// Hoặc filter() + indexOf
// Kỳ vọng: [1,2,3,4,5]

// Cách 1 : sử dụng Set
function unique(arr) {
    let set = new Set([...arr]);
    return Array.from(set)
}

console.log(unique(arr7));

// Cách 2 : sử dụng filter() và indexOf 

// cú pháp arr.filter((element, index, array) => { ... });
// element: phần tử hiện tại
// index: chỉ số phần tử hiện tại
// array: mảng gốc

// cú pháp arr.indexOf(searchElement, fromIndex);
// searchElement: phần tử cần tìm
// fromIndex: chỉ số bắt đầu tìm kiếm (mặc định là 0)
function uniqueFilter(arr) {
    return arr.filter((element, index) => arr.indexOf(element) === index);
}

console.log(uniqueFilter(arr7));

/* =========================================================
 * Bài tập 8 : Đếm số lần xuất hiện của phần tử trong mảng
 * ---------------------------------------------------------
 * Tạo hàm countOccurrences(arr) trả về object đếm số lần xuất hiện 
 * của mỗi phần tử trong arr
 *
 * Ý tưởng:
 * - Sử dụng reduce để xây dựng object đếm
 * =======================================================*/

section("Bài 8 - Đếm số lần xuất hiện của phần tử trong mảng");

let fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
// Kỳ vọng: { apple: 3, banana: 2, orange: 1 }

// cú pháp arr.reduce((accumulator, currentValue) => { ... }, initialValue);

// Cách 1 : Dùng reduce để tạo object đếm
const counter = fruits.reduce((acc, f) => { // acc là object đếm
    acc[f] = (acc[f] || 0) + 1; // nếu acc[f] falsy ( chưa có ) thì gán 0, sau đó cộng thêm 1. Nếu đã có thì cộng thêm 1

    return acc; // trả về acc object và tiếp tục vòng lặp
}, {});
// counter ; // { apple: 3, banana: 2, orange: 1 }
console.log("B8 - countOccurrences(reduce):", counter); // { apple: 3, banana: 2, orange: 1 }

// Cách 2 : Dùng map nếu muốn
const counterMap = fruits.reduce((m, f) =>  // m là Map đếm
    m.set(f, (m.get(f) || 0) + 1), // nếu m.get(f) falsy ( chưa có ) thì gán 0, sau đó cộng thêm 1. Nếu đã có thì cộng thêm 1
    new Map());
// counterMap; // Map(3) { 'apple' => 3, 'banana' => 2, 'orange' => 1 }    
console.log("B8 - countOccurrences(Map):", Object.fromEntries(counterMap)); // tương đương object  { apple: 3, banana: 2, orange: 1 }, dùng Object.fromEntries để chuyển Map thành object

/* =========================================================
 * Bài tập 9 : Sắp xếp mảng object theo tuổi tăng dần
 * ---------------------------------------------------------
 * Sử dụng phương thức sort để sắp xếp mảng object theo thuộc tính age
 * =======================================================*/
section("Bài 9 - Sắp xếp mảng object theo tuổi tăng dần");

let users = [
    { name: "John", age: 30 },
    { name: "Alice", age: 25 },
    { name: "Bob", age: 28 }
];

// Sắp xếp theo age tăng dần. Không làm thay đổi mảng gốc.
// Kỳ vọng: [Alice(25), Bob(28), John(30)]

// Giải pháp :

// Cách 1 :
// sử dụng slice() để tạo bản sao mảng gốc trước khi sắp xếp
// tránh làm thay đổi mảng gốc
// sử dụng phương thức sort để sắp xếp mảng

// cú pháp : arr.sort((a, b) => { ... });
let sortedUsers = users
    .slice() // tạo bản sao mảng gốc
    .sort((a, b) => a.age - b.age) // sắp xếp
    .map(user => `${user.name}(${user.age})`);
console.log("B9 - sortedUsers(sort):", sortedUsers);

// Cách 2 :
// sử dụng spread operator [...] để tạo bản sao mảng gốc trước khi sắp xếp
// tránh làm thay đổi mảng gốc
// sử dụng phương thức sort để sắp xếp mảng

let sortedUsers2 = [...users]
    .sort((a, b) => a.age - b.age)
    .map(user => `${user.name}(${user.age})`);
console.log("B9 - sortedUsers(sort):", sortedUsers2);

// Cách 3 :
// sử dụng reduce để xây dựng mảng sorted mới
// tìm index của phần tử lớn hơn user hiện tại
// - nếu tìm thấy thì chèn user vào vị trí đó bằng splice
// - nếu không tìm thấy thì thêm user vào cuối mảng bằng push
let sortedUsers3 = users
    .reduce((sorted, user) => {
        let index = sorted.findIndex(u => u.age > user.age);
        if (index === -1) {
            sorted.push(user);
        } else {
            sorted.splice(index, 0, user);
        }
        return sorted;
    }, [])
    .map(user => `${user.name}(${user.age})`);
console.log("B9 - sortedUsers(reduce):", sortedUsers3);

/* =========================================================
 * Bài tập 10 : Chuyển danh sách thành chuỗi
 * ---------------------------------------------------------
 * Tạo hàm listToString(names) nhận mảng tên và trả về chuỗi tên cách nhau bởi dấu phẩy và khoảng trắng
 * - Sử dụng phương thức join để nối các phần tử mảng thành chuỗi
 * =======================================================*/
section("Bài 10 - Chuyển danh sách thành chuỗi");

(() => {
    let names = ["John", "Alice", "Bob"];

    // Kỳ vọng: "John, Alice, Bob"

    let str = names.join(", ");
    console.log("B10 - joined:", str);
})();