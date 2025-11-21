/** 
 * Map và Set trong JavaScript\
 * Map - tập hợp các cặp key-value, key có thể là bất kỳ kiểu dữ liệu nào
 * 
 * Set - tập hợp các giá trị duy nhất, không có cặp key-value
 * 1. Map trong JavaScript
 * 1.1 So sánh Map với Object
 * 1.2 Thêm phần tử vào Map
 * 1.3 Lấy giá trị từ Map
 * 1.4 Khởi tạo Map với mảng các cặp key-value, mảng lồng nhau
 * 1.5 Duyệt Map sử dụng for..of
 *  1.5.1 duyệt theo key
 *  1.5.2 duyệt theo value
 *  1.5.3 duyệt theo entry
 *  1.5.4 duyệt theo cặp [key, value]
 * 1.6 Duyệt Map sử dụng forEach
 *  1.6.1 Không thay đổi Map ban đầu
 *  1.6.2 Tạo Map mới với giá trị được nhân đôi
 * 1.7 Các phương thức của Map
 *  1.7.1 Map.set(key, value) : thêm cặp key-value vào Map
 *  1.7.2 Map.get(key) : lấy giá trị từ key
 *  1.7.3 Map.has(key) : kiểm tra key có trong Map không
 *  1.7.4 Map.delete(key) : xóa cặp key-value khỏi Map
 *  1.7.5 Map.clear() : xóa tất cả các phần tử trong Map
 *  1.7.6 Map.size : trả về số lượng phần tử trong Map
 * 1.8 Chuyển đổi giữa Map và Object
 *  1.8.1 Chuyển từ Object → Map
 *  1.8.2 Chuyển từ Map → Object
 * 2. Set trong JavaScript
 * 2.1 So sánh Set với Array
 * 2.2 Set nhanh hơn Array
 *  2.2.1 Tìm kiếm phần tử
 *  2.2.2 Thêm phần tử
 * 2.3 Loại bỏ phần tử trùng lặp trong mảng sử dụng Set
 * 2.4 Chuyển đổi giữa Set và Array
 *  2.4.1 Chuyển từ Array → Set
 *  2.4.2 Chuyển từ Set → Array
 * 2.5 Duyệt Set sử dụng for..of
 * 2.6 Duyệt Set sử dụng forEach
 * Bài tập
 * Bài tập 1 : lọc các thành phần mảng duy nhất
 * Bài tập 2 : Lọc các anagram - từ đảo chữ
 * Bài tập 3 : Iterable keys
 */

// in ra tiêu đề
document.write("<h2> Map và Set trong JavaScript </h2>");

function section(title) {
  console.log("=====================================");
  console.log(`=== ${title} ===`);
  console.log("=====================================");
}

// 1. Map trong JavaScript
// Tập hợp các cặp key-value
// Key có thể là bất kỳ loại dữ liệu nào: primitive, object, function, v.v...
// Giữ thứ tự chèn các phần tử
// Có các phương thức đặc biệt để thao tác với cặp key-value
// Entry trong Map là cặp [key, value]
// Key duy nhất trong Map

section("1. Map trong JavaScript");

// 1.1 So sánh Map với Object

// Giống Object , nhưng có 3 điểm nâng cấp cực quan trọng:
// - Lưu trữ cặp key-value như Object, khác nhau ở chỗ: 
//   - Cú pháp định nghĩa cặp key-value khác với Object là key => value thay vì key : value 
//   - Key trong Map có thể là bất kỳ loại dữ liệu nào, không chỉ là chuỗi hoặc symbol như Object
//   - Key trong Map là duy nhất, không thể trùng lặp
//   - Có các phương thức đặc biệt để thao tác với cặp key-value
// - Giữ thứ tự chèn các phần tử, trong khi Object không đảm bảo thứ tự
// - Hiệu suất nhanh hơn Object khi thao tác thêm, xóa, tìm kiếm phần tử
section("1.1 So sánh Map với Object");

let map = new Map([["name", "John"], ["age", 30], ["salary", 5000]]); // khởi tạo Map rỗng
console.log(map); // Map(3) { 'name' => 'John', 'age' => 30, 'salary' => 5000 }
let object = { name: "John", age: 30, salary: 5000 };
console.log(object); // { name: 'John', age: 30, salary: 5000 }

// 1.2 Thêm phần tử vào Map
section("1.2 Thêm phần tử vào Map");

map.set("1", "string key");
map.set(1, "number key");
map.set(true, "boolean key");
console.log(map.size); // 3
console.log(map); // Map(3) { '1' => 'string key', 1 => 'number key', true => 'boolean key' }

// 1.3 Lấy giá trị từ Map
section("1.3 Lấy giá trị từ Map");

console.log(map.get(1)); // number key
console.log(map.get("1"));; // string key
console.log(map.get(true)); // boolean key

let john = { name: "John" };
console.log(john); // { name: 'John' }

let visits = new Map();
visits.set(john, 123); // John is the key, 123 is the value
console.log(visits); // Map(1) { { name: 'John' } => 123 }

// 1.4 Khởi tạo Map với mảng các cặp key-value, mảng lồng nhau
// Mỗi phần tử trong mảng là một mảng con [key, value]
// Giống như Object.entries(obj)

section("1.4 Khởi tạo Map với mảng các cặp key-value, mảng lồng nhau");

let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion', 50]
]);
console.log(recipeMap); // Map(3) { 'cucumber' => 500, 'tomatoes' => 350, 'onion' => 50 }

// 1.5 Duyệt Map sử dụng for..of
// Duyệt theo thứ tự chèn vào

section("1.5 Duyệt Map sử dụng for..of");

// 1.5.1 duyệt theo key
section("1.5.1 duyệt theo key");

for (let key of recipeMap.keys()) {
  console.log(key); // cucumber, tomatoes, onion
}
// 1.5.2 duyệt theo value
section("1.5.2 duyệt theo value");
for (let value of recipeMap.values()) {
  console.log(value); // 500, 350, 50
}
// 1.5.3 duyệt theo entry
section("1.5.3 duyệt theo entry");
for (let entry of recipeMap.entries()) {
  console.log(entry); // [ 'cucumber', 500 ] ...
}
// 1.5.4 duyệt theo cặp [key, value] 
section("1.5.4 duyệt theo cặp [key, value]");
for (let [key, value] of recipeMap) {
  console.log(`${key}: ${value}`); // cucumber: 500 ...
}

// 1.6 Duyệt Map sử dụng forEach
section("1.6 Duyệt Map sử dụng forEach");
// cú pháp map.forEach((value, key, map) => { ... });

// 1.6.1 Không thay đổi Map ban đầu
section("1.6.1 Không thay đổi Map ban đầu");

recipeMap.forEach((value, key, map) => {
  console.log(`${key}: ${value}`); // cucumber: 500 ...
});

// 1.6.2 Tạo Map mới với giá trị được nhân đôi
section("1.6.2 Tạo Map mới với giá trị được nhân đôi");

recipeMap.forEach((value, key, m) => { // m là biến map, tham chiếu đến recipeMap
  // console.log(m === recipeMap); // true
  m.set(key, value * 2); // nhân đôi giá trị trong Map
});

console.log(recipeMap); // Map vẫn giữ nguyên giá trị ban đầu

// 1.7 Các phương thức của Map
section("1.7 Các phương thức của Map");

// 1.7.1 Map.set(key, value) : thêm cặp key-value vào Map
// nếu trùng key thì giá trị sẽ được cập nhật ghi đè lên giá trị cũ
section("1.7.1 Map.set(key, value)");

let map1 = new Map();
map1.set("name", "John");
map1.set("age", 30);
console.log(map1); // Map(2) { 'name' => 'John', 'age' => 30 }

map1.set("name", "Pete"); // ghi đè giá trị cũ
console.log(map1); // Map(2) { 'name' => 'Pete', 'age' => 30 }

// 1.7.2 Map.get(key) : lấy giá trị từ key
// nếu key không tồn tại thì trả về undefined
section("1.7.2 Map.get(key)");

console.log(map1.get("name")); // Pete
console.log(map1.get("job")); // undefined

// 1.7.3 Map.has(key) : kiểm tra key có trong Map không
section("1.7.3 Map.has(key)");

console.log(map1.has("age")); // true
console.log(map1.has("salary")); // false

// 1.7.4 Map.delete(key) : xóa cặp key-value khỏi Map
section("1.7.4 Map.delete(key)");

map1.delete("age");
console.log(map1); // Map(1) { 'name' => 'Pete' }

// 1.7.5 Map.clear() : xóa tất cả các phần tử trong Map
section("1.7.5 Map.clear()");

map1.clear();
console.log(map1); // Map(0) {}

// 1.7.6 Map.size : trả về số lượng phần tử trong Map
section("1.7.6 Map.size");

map1.set("name", "John");
map1.set("age", 30);
console.log(map1.size); // 2

// 1.8 Chuyển đổi giữa Map và Object
section("1.8 Chuyển đổi giữa Map và Object");

// 1.8.1 Chuyển từ Object → Map
// Object.entries(obj) : trả về entries, mảng các cặp [key, value]
section("1.8.1 Chuyển từ Object → Map");

let obj = { name: "John", age: 30 };
// Object.entries(obj); // [ ['name', 'John'], ['age', 30] ]
let map2 = new Map(Object.entries(obj)); // dùng từ khóa new vì entries không phải là phương thức tĩnh
console.log(map2); // Map(2) { 'name' => 'John', 'age' => 30 }

// 1.8.2 Chuyển từ Map → Object
// lưu ý : Key trong Map phải là chuỗi hoặc symbol
section("1.8.2 Chuyển từ Map → Object");
// Object.fromEntries(map) : chuyển entries, mảng các cặp [key, value] thành Object

// map2; // Map(2) { 'name' => 'John', 'age' => 30 }
let obj2 = Object.fromEntries(map2); // không dùng từ khóa new vì fromEntries là phương thức tĩnh
console.log(obj2); // { name: 'John', age: 30 }

// 2. Set trong JavaScript

// Tập hợp các value duy nhất
// Chỉ lưu value, không có key ( không có cặp key-value như Object, Map )
// Value có kiểu dữ liệu bất kỳ: primitive, object, function, v.v...

section("2. Set trong JavaScript");

// 2.1 So sánh Set với Array

section("2.1 So sánh Set với Array");

// Giống Array , nhưng có 3 điểm nâng cấp cực quan trọng:
// - Chỉ lưu giá trị duy nhất, không có phần tử trùng lặp
// - Nhanh hơn Array khi thao tác tìm kiếm, thêm, xóa phần tử
// - Có các phương thức đặc biệt để thao tác với tập hợp giá trị
// - Entry trong Set là value, có tính duy nhất
// - Giữ thứ tự chèn các phần tử

let set = new Set([1, 2, 3, 4, 5, 5, 4]);
console.log(set); // Set(5) { 1, 2, 3, 4, 5 }
let array = [1, 2, 3, 4, 5, 5, 4];
console.log(array); // [ 1, 2, 3, 4, 5, 5, 4 ]

// 2.2 Set nhanh hơn Array
// Khi số phần tử lớn tìm kiếm trong Set với has 
// sẽ nhanh hơn vì sử dụng cấu trúc dữ liệu đặc biệt
section("2.2 Set nhanh hơn Array");

// 2.2.1 Tìm kiếm phần tử

section("2.2.1 Tìm kiếm phần tử");

// Array sử dụng includes
let numbers = [1, 2, 3, 4, 5];
console.log(numbers); // [ 1, 2, 3, 4, 5 ]
console.log(numbers.includes(3)); // true 

// Set sử dụng has
let numSet = new Set([1, 2, 3, 4, 5]);
console.log(numSet); // Set(5) { 1, 2, 3, 4, 5 }
console.log(numSet.has(3)); // true



// 2.2.2 Thêm phần tử

// Khi số phần tử lớn thêm vào Set với add
// sẽ nhanh hơn vì sử dụng cấu trúc dữ liệu đặc biệt
section("2.2.2 Thêm phần tử");

// Array sử dụng push
let arrNumbers = [1, 2, 3];
console.log(arrNumbers); // [ 1, 2, 3 ]

arrNumbers.push(4);
console.log(arrNumbers); // [ 1, 2, 3, 4 ]

// Set sử dụng add
let setNumbers = new Set([1, 2, 3]);
console.log(setNumbers); // Set(3) { 1, 2, 3 }

setNumbers.add(4);
console.log(setNumbers); // Set(4) { 1, 2, 3, 4 }

// 2.3 Loại bỏ phần tử trùng lặp trong mảng sử dụng Set
section("2.3 Loại bỏ phần tử trùng lặp trong mảng sử dụng Set");

let set1 = new Set();

let dang = { name: "Dang" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

set1.add(dang);
set1.add(pete);
set1.add(mary);
set1.add(dang); // bị bỏ qua vì trùng, không lỗi 

console.log(set1); // Set(3) { { name: 'Dang' }, { name: 'Pete' }, { name: 'Mary' } }

for (let user of set1) {
  console.log(user.name); // Dang, Pete, Mary
}
// 2.4 Chuyển đổi giữa Set và Array
section("2.4 Chuyển đổi giữa Set và Array");

// 2.4.1 Chuyển từ Array → Set
section("2.4.1 Chuyển từ Array → Set");

// Cách 1 : sử dụng cú pháp new Set(array)
let arr = ["apple", "banana", "apple"];
let setFromArr1 = new Set(arr);
console.log(setFromArr1); // Set(2) { 'apple', 'banana' }

// Cách 2 : sử dụng Set.prototype.add() trong vòng lặp
let setFromArr2 = new Set();
for (let fruit of arr) {
  setFromArr2.add(fruit);
}
console.log(setFromArr2); // Set(2) { 'apple', 'banana' }

// 2.4.2 Chuyển từ Set → Array
// sử dụng spread operator [...]
section("2.4.2 Chuyển từ Set → Array");

// Cách 1 : sử dụng Array.from()
let uniqueArr1 = Array.from(setFromArr1);
console.log(uniqueArr1); // ["apple", "banana"]

// Cách 2 : sử dụng spread operator [...]
let uniqueArr2 = [...setFromArr2];
console.log(uniqueArr2); // ["apple", "banana"]

// 2.5 Duyệt Set sử dụng for..of
section("2.5 Duyệt Set sử dụng for..of");

// Set chỉ có value, không có key
let fruits = new Set(["apple", "banana", "orange"]);
for (let fruit of fruits) {
  console.log(fruit); // apple, banana, orange
}

// 2.6 Duyệt Set sử dụng forEach
section("2.6 Duyệt Set sử dụng forEach");

fruits.forEach((value, valueAgain, set) => {
  console.log(`${value} (again: ${valueAgain})`); // value và valueAgain giống nhau
});


// Bài tập

section("BÀI TẬP");

// Bài tập 1 : lọc các thành phần mảng duy nhất

// Question :
// Viết hàm unique(arr) nhận vào một mảng arr và trả về một mảng mới chỉ chứa các phần tử duy nhất từ arr, loại bỏ các phần tử trùng lặp.
// Phương pháp sử dụng Set để loại bỏ các phần tử trùng lặp trong mảng rất hiệu quả vì Set chỉ lưu trữ các giá trị duy nhất.

section("Bài 1 - Lọc các phần tử mảng duy nhất");

// Answer :
function unique(arr) {
  /* your code */
  // Cách 1 : Sử dụng Set để loại bỏ phần tử trùng lặp
  // return [...new Set(arr)];

  // Cách 2 : sử dụng Array.from để chuyển Set thành mảng
  return Array.from(new Set(arr));
}

let values = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

console.log(unique(values)); // Hare, Krishna, :-O

// Bài tập 2 : Lọc các anagram - từ đảo chữ

// Question :
// Viết hàm aclean(arr) nhận vào một mảng các chuỗi arr và trả về một mảng mới 
// chỉ chứa các từ duy nhất, loại bỏ các từ là anagram của nhau.
// Ví dụ: 
// nap - pan
// ear - are - era
// cheaters - hectares - teachers
// Phương pháp sử dụng Map để lưu trữ các từ đã chuẩn hóa (sắp xếp chữ cái) làm key và từ gốc làm value.

section("Bài 2 - Lọc các anagram - từ đảo chữ");
// Answer :
let arrAnagram = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

// your code
function aclean(arr) {
  let map = new Map();
  for (let word of arr) {
    // Chuẩn hóa từ bằng cách sắp xếp các chữ cái theo thứ tự bảng chữ cái
    let sorted = word.toLowerCase().split('').sort().join('');
    // Lưu từ gốc vào Map với key là từ đã chuẩn hóa
    map.set(sorted, word);
  }
  // Trả về mảng các từ duy nhất
  return Array.from(map.values());
}

console.log(aclean(arrAnagram)); // "nap,teachers,ear" or "PAN,cheaters,era"

// Bài tập 3 : Iterable keys

// Tại sao gọi là Iterable keys? 
// Vì phương thức map.keys() trả về một đối tượng Iterable (MapIterator) chứa các key của Map.
// Đối tượng Iterable này có thể được sử dụng trong 
// các vòng lặp như for..of để duyệt qua các key của Map.

// Question :
// Chúng ta có một Map đặt tên map. Chúng ta muốn lấy một mảng map.keys() trong một biến và 
// sau đó áp dụng các phương thức dành riêng cho mảng đó vào đó, 
// ví dụ .push: Tại sao điều này không hoạt động? Cách khắc phục là gì?

section("Bài 3 - Iterable keys");

/*
let map = new Map();
map.set("name", "John");
let keys = map.keys();
// Error: keys.push is not a function
// keys.push("more");
*/
// Answer :
let map3 = new Map();

map3.set("name", "John");

// let keys = map.keys();
// Error: keys.push is not a function. keys là MapIterator, không phải mảng nên lỗi push không hoạt động
let keys = Array.from(map3.keys()); // Sử dụng Array.from để chuyển MapIterator thành mảng
keys.push("more");
console.log(keys); // [ 'name', 'more' ]