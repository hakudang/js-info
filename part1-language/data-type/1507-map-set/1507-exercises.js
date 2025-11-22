"use strict";

// in ra html tag <h2> Map và Set trong JavaScript </h2>
document.write("<h2> Map và Set trong JavaScript </h2>");
document.write("<h3> Bài tập làm thêm </h3>");

function section(title) {
    console.log("\n====================");
    console.log(`===${title}===`);
    console.log("====================");
}

/* =========================================================
 * Bài tập 1 : Đếm tần suất phần tử MAP
 * ---------------------------------------------------------
 * Giải pháp: 
 * - Dùng Map để lưu trữ tần suất xuất hiện của từng phần tử.
 * - Duyệt mảng, với mỗi phần tử:
 *   - Nếu phần tử đã có trong Map, tăng giá trị đếm lên 1.
 *   - Nếu chưa có, thêm phần tử vào Map với giá trị đếm là 1.  
 * =======================================================*/

section("Bài tập 1 : Đếm tần suất phần tử MAP");

// Hãy dùng Map để tạo bảng đếm:

// key = tên fruit
// value = số lần xuất hiện

// Answer here
(() => {
    const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
    let map = new Map();
    for (const f of fruits) {
        if (map.has(f)) {
            map.set(f, map.get(f) + 1);
        } else {
            map.set(f, 1);
        }
    }
    console.log("B1 freq:", map); // Map { 'apple' => 3, 'banana' => 2, 'orange' => 1 }   
    // Kết quả mong muốn:
    // Map { "apple" => 3, "banana" => 2, "orange" => 1 }
})();

/* =========================================================
 * Bài tập 2 : Lọc duy nhất SET
 * ---------------------------------------------------------
 * Giải pháp:
 * - Dùng Set để loại bỏ phần tử trùng lặp.
 * - Chuyển Set trở lại thành mảng (nếu cần).
 * =======================================================*/

section("Bài tập 2 : Lọc duy nhất SET");

(() => {
    const nums = [1, 2, 2, 3, 4, 4, 4, 5];
    // Answer here
    let set = new Set(nums);
    console.log("B2 unique:", [...set]);

    // Kết quả mong muốn
    // [1,2,3,4,5]
})();

/* =========================================================
 * Bài tập 3 : GroupBy theo city MAP
 * ---------------------------------------------------------
 * Giải pháp:
 * - Dùng Map để nhóm người theo city.
 * - Key = city, Value = mảng người ở city đó.
 * =======================================================*/

section("Bài tập 3 : GroupBy theo city MAP");

// Cho danh sách user:

const users = [
    { name: "An", city: "Tokyo" },
    { name: "Binh", city: "Osaka" },
    { name: "Chi", city: "Tokyo" },
    { name: "Dung", city: "Osaka" },
    { name: "Em", city: "Nagoya" },
];

// Nhóm user theo city bằng Map:

// key = city
// value = mảng user thuộc city đó

(() => {
    let userMap = new Map();
    for (let user of users) {
        if (!userMap.has(user.city)) userMap.set(user.city, []);
        userMap.get(user.city).push(user);
    }
    console.log(userMap);
})();
// Kết quả mong muốn:
// Map {
//   "Tokyo" => [ {name:"An",city:"Tokyo"}, {name:"Chi",city:"Tokyo"} ],
//   "Osaka" => [ {name:"Binh",city:"Osaka"}, {name:"Dung",city:"Osaka"} ],
//   "Nagoya" => [ {name:"Em",city:"Nagoya"} ]
// }

/* =========================================================
 * Bài tập 4 : Đảo ngược Map (value -> key)
 * ---------------------------------------------------------        
 * Giải pháp:
 * - Duyệt Map gốc, với mỗi cặp [key, value], thêm vào Map mới cặp [value, key].
 * =======================================================*/

section("Đảo ngược Map (value -> key)");

const map = new Map([
    ["a", 1],
    ["b", 2],
    ["c", 3],
]);

// Kết quả mong muốn:
// Map {
//   1 => "a",
//   2 => "b",
//   3 => "c"
// }

// Gợi ý: value luôn duy nhất.

// Answer here

let reversedMap = new Map();
for (let [key, value] of map) {
    reversedMap.set(value, key);
}
console.log("B4 reversedMap:", reversedMap);

/* ===================================
 * Bài tập 5 : Tập hợp: Union / Intersection / Difference (Set)
    * -----------------------------------------
    * Giải pháp:
    * - Union: gộp hai Set rồi lọc trùng bằng Set mới.
    * - Intersection: lọc phần tử của Set A mà cũng có trong Set B.
    * - Difference: lọc phần tử của Set A mà không có trong Set B.  
 * =================================== */
section("Bài tập 5 : Tập hợp: Union / Intersection / Difference (Set)");

// Cho 2 Set:
const A = new Set([1, 2, 3, 4]);
const B = new Set([3, 4, 5, 6]);

// Hãy tạo:

// union(A,B) => Set([1,2,3,4,5,6])
// intersection(A,B) => Set([3,4])
// difference(A,B) (A\B) => Set([1,2])

// Answer here

function bai5(a, b) {
    // Union: gộp rồi Set lọc trùng
    const union = (a, b) => new Set([...a, ...b]);
    // Intersection: lấy phần chung
    const intersection = (a, b) => new Set([...a].filter(x => b.has(x)));
    // Difference A\B: phần thuộc A nhưng không thuộc B
    const difference = (a, b) => new Set([...a].filter(x => !b.has(x)));
    return { union: union(a, b), intersection: intersection(a, b), difference: difference(a, b) };
}

console.log("B5 union:", bai5(A, B).union);
console.log("B5 intersection:", bai5(A, B).intersection);
console.log("B5 difference:", bai5(A, B).difference);

/* =========================================================
 * Bài tập 6 : Kiểm tra trùng lặp nhanh (Set)
 * ---------------------------------------------------------
 * Bài toán: viết hàm hasDuplicates(arr) để kiểm tra mảng arr có phần tử trùng lặp hay không.
  - Trả về true nếu có trùng lặp, false nếu không.
 * =======================================================
 * Giải pháp:
 * - Tạo Set từ mảng.
 * - So sánh size của Set với length của mảng.
 * - Nếu size < length => có trùng lặp.
 * =======================================================*/
// Ví dụ:
// hasDuplicates([1,2,3]) // false
// hasDuplicates([1,2,2,3]) // true

section("Bài tập 6 : Kiểm tra trùng lặp nhanh (Set)");

function hasDuplicates(arr) {
    let set = new Set(arr);
    if (set.size < arr.length) return true
    return false
}
console.log(hasDuplicates([1, 2, 3])); // false
console.log(hasDuplicates([1, 2, 2, 3])); // true
