/** 
 * Map và Set trong JavaScript\
 * Map - tập hợp các cặp key-value, key có thể là bất kỳ kiểu dữ liệu nào
 * 
 * Set - tập hợp các giá trị duy nhất, không có cặp key-value 
 * 
 */

// in ra tiêu đề
document.write("<h2> Map và Set trong JavaScript </h2>");

// I. Map trong JavaScript

// I.1 So sánh Map với Object

// Giống Object , nhưng có 3 điểm nâng cấp cực quan trọng:
// - Key có thể là bất kỳ loại dữ liệu nào (Object, Number, Boolean, NaN…)
// - Giữ nguyên thứ tự bổ sung vào (thứ tự chèn)
// - Không ép key về chuỗi như Object

let map = new Map();

// Thêm phần tử vào Map
map.set("1", "string key");
map.set(1, "number key");
map.set(true, "boolean key");
console.log(map.size); // 3

// Lấy giá trị từ Map
console.log(map) // Map(3) { '1' => 'string key', 1 => 'number key', true => 'boolean key' }
console.log(map.get(1)); // number key
console.log(map.get("1"));; // string key
console.log(map.get(true)); // boolean key

let john = { name: "John" };
console.log(john); // { name: 'John' }

let visits = new Map();
visits.set(john, 123); // John is the key, 123 is the value
console.log(visits); // Map(1) { { name: 'John' } => 123 }

// I.2 Duyệt Map sử dụng for..of
// Duyệt theo thứ tự chèn vào

let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion', 50]
]);

// duyệt theo key
for (let key of recipeMap.keys()) {
  console.log(key); // cucumber, tomatoes, onion
}
// duyệt theo value
for (let value of recipeMap.values()) {
  console.log(value); // 500, 350, 50
}
// duyệt theo entry
for (let entry of recipeMap.entries()) {
  console.log(entry); // [ 'cucumber', 500 ] ...
}
// duyệt theo cặp [key, value] 
for (let [key, value] of recipeMap) {
  console.log(`${key}: ${value}`); // cucumber: 500 ...
}

// I.3 Duyệt Map sử dụng forEach
recipeMap.forEach((value, key, map) => {
  console.log(`${key}: ${value}`); // cucumber: 500 ...
});

// I.4 Chuyển đổi giữa Map và Object



// từ Object → Map
let obj = { name: "John", age: 30 };
let map2 = new Map(Object.entries(obj)); // dùng từ khóa new vì entries không phải là phương thức tĩnh
console.log(map2); // Map(2) { 'name' => 'John', 'age' => 30 }

// từ Map → Object
let obj2 = Object.fromEntries(map2); // không dùng từ khóa new vì fromEntries là phương thức tĩnh
console.log(obj2); // { name: 'John', age: 30 }

// II. Set trong JavaScript
// chỉ lưu giá trị, không key, không chỉ mục.

// II.1 Loại bỏ phần tử trùng lặp trong mảng sử dụng Set
let set = new Set();

let dang = { name: "Dang" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

set.add(dang);
set.add(pete);
set.add(mary);
set.add(dang); // bị bỏ qua vì trùng, không lỗi 

console.log(set.size); // 3
for (let user of set) {
    console.log(user.name); // Dang, Pete, Mary
}

let arr = ["apple", "banana", "apple"];
let uniqueArr = [...new Set(arr)]; // chuyển Set thành mảng sử dụng Spread operator
console.log(uniqueArr); // ["apple", "banana"]

// II.2 Duyệt Set sử dụng for..of

let fruits = new Set(["apple", "banana", "orange"]);
for (let fruit of fruits) {
    console.log(fruit); // apple, banana, orange
}

fruits.forEach((value, valueAgain, set) => {
    console.log(`${value} (again: ${valueAgain})`); // value và valueAgain giống nhau
});
