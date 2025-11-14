/** 
 * Map và Set trong JavaScript\
 * Map - tập hợp các cặp key-value, key có thể là bất kỳ kiểu dữ liệu nào
 * 
 * Set - tập hợp các giá trị duy nhất, không có cặp key-value
 * I. Map trong JavaScript
 * I.1 So sánh Map với Object
 * I.2 Duyệt Map sử dụng for..of
 * I.3 Duyệt Map sử dụng forEach
 * I.4 Các phương thức của Map
 * I.4.1 Map.set(key, value)
 * I.4.2 Map.get(key)
 * I.4.3 Map.has(key)
 * I.4.4 Map.delete(key)
 * I.4.5 Map.clear()
 * I.4.6 Map.size
 * I.5 Chuyển đổi giữa Map và Object
 * II. Set trong JavaScript
 * II.1 So sánh Set với Array
 * II.1.1 Tìm kiếm phần tử
 * II.1.2 Thêm phần tử
 * II.1.3 Loại bỏ phần tử trùng lặp trong mảng sử dụng Set
 * II.2 Duyệt Set sử dụng for..of
 * III Bài tập
 * Bài tập 1 : lọc các thành phần mảng duy nhất
 * Bài tập 2 : Lọc các anagram - từ đảo chữ
 * Bài tập 3 : Iterable keys
 * Bài tập 4 : Theo dõi trạng thái xử lý đối tượng
 * 
 */

// in ra tiêu đề
document.write("<h2> Map và Set trong JavaScript </h2>");

// I. Map trong JavaScript

// I.1 So sánh Map với Object

// Giống Object , nhưng có 3 điểm nâng cấp cực quan trọng:
// - Key có thể là bất kỳ loại dữ liệu nào (Object, Number, Boolean, NaN…)
// - Không ép key về chuỗi như Object
// - Giữ nguyên thứ tự bổ sung vào (thứ tự chèn)

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

// I.4 Các phương thức của Map

// I.4.1 Map.set(key, value) : thêm cặp key-value vào Map
// nếu trùng key thì giá trị sẽ được cập nhật ghi đè lên giá trị cũ

let map1 = new Map();
map1.set("name", "John");
map1.set("age", 30);
console.log(map1); // Map(2) { 'name' => 'John', 'age' => 30 }
map1.set("name", "Pete"); // ghi đè giá trị cũ
console.log(map1); // Map(2) { 'name' => 'Pete', 'age' => 30 }

// I.4.2 Map.get(key) : lấy giá trị từ key
// nếu key không tồn tại thì trả về undefined
console.log(map1.get("name")); // Pete
console.log(map1.get("job")); // undefined

// I.4.3 Map.has(key) : kiểm tra key có trong Map không, trả về true/false

// I.4.4 Map.delete(key) : xóa cặp key-value khỏi Map

// I.4.5 Map.clear() : xóa tất cả các phần tử trong Map
// I.4.6 Map.size : trả về số lượng phần tử trong Map

// I.5 Chuyển đổi giữa Map và Object

// từ Object → Map
let obj = { name: "John", age: 30 };
let map2 = new Map(Object.entries(obj)); // dùng từ khóa new vì entries không phải là phương thức tĩnh
console.log(map2); // Map(2) { 'name' => 'John', 'age' => 30 }

// từ Map → Object
let obj2 = Object.fromEntries(map2); // không dùng từ khóa new vì fromEntries là phương thức tĩnh
console.log(obj2); // { name: 'John', age: 30 }

// II. Set trong JavaScript

// Tập hợp các value duy nhất
// Chỉ lưu value, không có key ( không có cặp key-value như Object, Map )
// Value có kiểu dữ liệu bất kỳ: primitive, object, function, v.v...

// II.1 So sánh Set với Array
// Giống Array , nhưng có 3 điểm nâng cấp cực quan trọng:
// - Chỉ lưu giá trị duy nhất, không có phần tử trùng lặp
// - Nhanh hơn Array khi thao tác tìm kiếm, thêm, xóa phần tử
// - Có các phương thức đặc biệt để thao tác với tập hợp giá trị

// II.1 Nhanh hơn Array

// II.1.1 Tìm kiếm phần tử

// với Array sử dụng includes
let numbers = [1, 2, 3, 4, 5];
console.log(numbers.includes(3)); // true 

// với Set sử dụng has
let numSet = new Set([1, 2, 3, 4, 5]);
console.log(numSet.has(3)); // true

// Tóm lại, khi số phần tử lớn tìm kiếm trong Set với has 
// sẽ nhanh hơn vì sử dụng cấu trúc dữ liệu đặc biệt

// II.1.2 Thêm phần tử
// với Array sử dụng push
let arrNumbers = [1, 2, 3];
arrNumbers.push(4);
console.log(arrNumbers); // [ 1, 2, 3, 4 ]
// với Set sử dụng add
let setNumbers = new Set([1, 2, 3]);
setNumbers.add(4);
console.log(setNumbers); // Set(4) { 1, 2, 3, 4 }

// Tóm lại, khi số phần tử lớn thêm vào Set với add
// sẽ nhanh hơn vì sử dụng cấu trúc dữ liệu đặc biệt

// II.1.3 Loại bỏ phần tử trùng lặp trong mảng sử dụng Set

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

// III Bài tập

// Bài tập 1 : lọc các thành phần mảng duy nhất

// Question :
// Viết hàm unique(arr) nhận vào một mảng arr và trả về một mảng mới chỉ chứa các phần tử duy nhất từ arr, loại bỏ các phần tử trùng lặp.
// Phương pháp sử dụng Set để loại bỏ các phần tử trùng lặp trong mảng rất hiệu quả vì Set chỉ lưu trữ các giá trị duy nhất.

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

let arrAnagram = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

// your code
function aclean(arr) {
  let map = new Map();
  for ( let word of arr ) {
    // Chuẩn hóa từ bằng cách sắp xếp các chữ cái theo thứ tự bảng chữ cái
    let sorted = word.toLowerCase().split('').sort().join('');
    // Lưu từ gốc vào Map với từ đã chuẩn hóa làm key
    map.set(sorted, word);
  }

  // Trả về mảng các từ duy nhất
  return Array.from( map.values());
}

console.log( aclean(arrAnagram) ); // "nap,teachers,ear" or "PAN,cheaters,era"

// Bài tập 3 : Iterable keys
// Question :
// Chúng ta có một Map map. Chúng ta muốn lấy một mảng map.keys() trong một biến và 
// sau đó áp dụng các phương thức dành riêng cho mảng đó vào đó, 
// ví dụ .push: Tại sao điều này không hoạt động? Cách khắc phục là gì?

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