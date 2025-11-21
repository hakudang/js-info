/** 
 * Các phương thức mảng (array methods) 
 * 1. Push/Unshift, Pop/ Shift - Thêm / xóa phần tử mảng
 * 2. Splice  - thêm/xóa phần tử ở vị trí bất kỳ    
 * 3. Đảo ngược, sắp xếp mảng
 * 4. fill / copyWithin - ghi đè cập nhật thay đổi mảng gốc
 * 5. slice / concat - Tạo bản sao bằng cách Cắt / Nối (không biến đổi gốc)
 * 6. split / join - chuyển đổi giữa chuỗi và mảng
 * 7. flat / flatMap - làm phẳng mảng đa chiều
 * 8. Duyệt / ánh xạ mảng: forEach, map
 * 9. Tìm kiếm / lọc mảng
 * 10. Reduce / reduceRight - tính toán trên mảng
 * 11. Phương thức mảng khác
 * 12. Bài tập
 * Bài tập 1 - Tạo mảng từ chuỗi
 * Bài tập 2 - Biên dịch border-left-width thành borderLeftWidth
 * Bài tập 3 - Lọc mảng - tạo mảng mới
 * Bài tập 4 - Lọc và xóa khỏi mảng
 * Bài tập 5 - Sắp xếp mảng theo thứ tự giảm dần
 * Bài tập 6 - Sao chép và sắp xếp mảng
 * Bài tập 7 - Tạo Constructor Function Calculator
 * Bài tập 8 - Mở rộng Calculator để thêm các phép toán mới
 * Bài tập 9 - Map mảng đối tượng -> mảng tên
 * Bài tập 10 - Map mảng đối tượng -> mảng đối tượng khác
 * Bài tập 11 - Sắp xếp mảng đối tượng theo thuộc tính
 * Bài tập 12 - Bài tập 12 - Shuffle ( trộn ) mảng ngẫu nhiên
 * Bài tập 13 - Tính trung bình cộng từ mảng số
 * Bài tập 14 - Tạo mảng chỉ gồm các phần tử duy nhất
 * Bài tập 15 - Tạo đối tượng từ mảng đối tượng 
 */

// in ra tiêu đề
document.write("<h2>1550 - Các phương thức mảng (array methods) </h2>");

// 1. Push/Unshift, Pop/ Shift - Thêm / xóa phần tử mảng
let arr = [];
// Thêm phần tử vào cuối mảng - push()
arr.push(2); // arr = [2]
// thêm phần tử vào đầu mảng - unshift()
arr.unshift(1); // arr = [1,2]
// xóa phần tử cuối mảng - pop()
arr.pop(); // arr = [1]
// xóa phần tử đầu mảng - shift()
arr.shift(); // arr = []

// 2 Splice  - thêm/xóa phần tử ở vị trí bất kỳ 

// 2.1 splice(start, deleteCount, ...items) 
// — xóa/chèn/thay thế phần tử mảng
arr = [1, 2, 3, 4, 5];
// xóa 2 phần tử từ vị trí index 1
let spliceArr = arr.splice(1, 2); // arr = [1,4,5]
console.log(spliceArr); // [2,3] - mảng các phần tử bị xóa

// 2.2 chèn phần tử mà không xóa
// chèn ...items từ vị trí index -1, không xóa phần tử nào
arr.splice(-1, 0, "a", "b"); // arr = [1,4,"a","b",5]

// 2.3 không sử dụng delete để xóa phần tử 
// vì nó để lại "lỗ hổng" trong mảng, không thay đổi độ dài mảng
arr = [1, 2, 3, 4, 5];

// xóa 1 phần tử từ vị trí index 1
delete arr[1]; // arr = [1, empty, 3, 4, 5]
console.log(arr.length); // 5 - độ dài mảng không thay đổi

// 3. Reverse/Sort - Đảo ngược, sắp xếp mảng
arr = [1, 2, 3, 4, 5];
arr.reverse(); // arr = [5,4,3,2,1]

arr = [1, 2, 15];
// 3.1 sắp xếp mảng theo thứ tự chữ số (mặc định)
arr.sort(); // arr = [1,15,2]

// 3.2 sắp xếp tăng dần theo giá trị số, dùng callback function
arr.sort((a, b) => a - b); // arr = [1,2,15] 

// 4. fill / copyWithin - ghi đè cập nhật thay đổi mảng gốc
// cả 2 method này có chức năng như nhau, thay đổi mảng gốc

// 4.1 fill(value, start, end) - ghi đè phần tử mảng
// arr = [1, 2, 15]; 
arr.fill(0, 1, 3); // arr = [1,0,0] - ghi 0 từ vị trí 1 đến 3, [1, 3)(không bao gồm)
console.log(arr); // [1,0,0]

// 4.2 copyWithin(target, start, end) - sao chép phần tử trong mảng
// arr = [1, 0, 0];
arr.copyWithin(1, 0, 2); // arr = [1,1,0] - sao chép phần tử từ vị trí [0, 2) 
console.log(arr); // [1,1,0]

// 5 slice / concat - Cắt / Nối tạo mảng mới (không biến đổi gốc)

// 5.1 slice(start, end) - tạo bản sao hoặc cắt mảng
arr = ["t", "e", "s", "t"];
console.log(arr.slice(1, 3)); // ["e","s"] - cắt từ vị trí 1 đến 3 [1,3) ->(không bao gồm)
console.log(arr.slice(-2)); // ["s","t"] - cắt từ vị trí -2 đến hết

// 5.2 concat(...items) - nối mảng, tạo mảng mới
arr = [1, 2];
arr.concat([3, 4]); // arr = [1,2,3,4]
arr.concat([3, 4], [5, 6]); // arr = [1,2,3,4,5,6]
arr.concat([3, 4], 5, 6); // arr = [1,2,3,4,5,6] - có thể nối mảng và giá trị rời

// 6. split / join - chuyển đổi giữa chuỗi và mảng

// 6.1 split(delimiter) - chuyển chuỗi thành mảng
let str = "Hello, world!";
let arrFromStr = str.split(", "); // arrFromStr = ["Hello", "world!"]
console.log(arrFromStr); // ["Hello", "world!"]

// 6.2 join(separator) - chuyển mảng thành chuỗi
let arr2 = ["Hello", "world!"];
let strFromArr = arr2.join(",  "); // strFromArr = "Hello,  world!"
console.log(strFromArr); // "Hello,  world!"

// 7. flat / flatMap - làm phẳng mảng đa chiều

// 7.1 flat(depth) - làm phẳng mảng đa chiều
let nestedArr = [1, 2, [3, 4, [5, 6]]];
console.log(nestedArr.flat(1)); // [1,2,3,4,[5,6]] - làm phẳng 1 cấp
console.log(nestedArr.flat(2)); // [1,2,3,4,5,6] - làm phẳng 2 cấp

// 7.2 flatMap(callback) - kết hợp map và flat
let arr3 = [1, 2, 3];
let flatMappedArr = arr3.flatMap(x => [x, x * 2]);
console.log(flatMappedArr); // [1, 2, 2, 4, 3, 6]

// 8. Duyệt / ánh xạ mảng: forEach, map

// 8.1 forEach(callback) - duyệt mảng, không trả về mảng mới
arr = ["Bilbo", "Gandalf", "Nazgul"];
arr.forEach((item, index) => {
    console.log(`${index + 1}: ${item}`);
}); // 1: Bilbo 2: Gandalf 3: Nazgul

// 8.2 map(callback) - ánh xạ mảng, trả về mảng mới
arr.map(item => item.length); // [5,7,6] - mảng độ dài tên

// 9. Tìm kiếm / lọc mảng

// 9.1 indexOf(value) / includes(value) - tìm phần tử trong mảng
arr = [1, 0, false];
arr.indexOf(0); // 1 - tìm vị trí phần tử
arr.indexOf(false); // 2
arr.indexOf(null); // -1 - không tìm thấy
arr.includes(1); // true

const a = [NaN];
a.indexOf(NaN); // -1 , vì NaN !== NaN theo quy ước
a.includes(NaN); // true

// 9.2 find(callback) / findIndex(callback) - tìm phần tử theo điều kiện
let users = [
    { id: 1, name: "John" },
    { id: 2, name: "Pete" },
    { id: 3, name: "Mary" },
    { id: 4, name: "John" }
];

// find(callback) - trả về phần tử đầu tiên tìm thấy
let member = users.find(user => user.id == 1); // {id:1, name:"John"}

// findIndex(callback) - trả về vị trí phần tử đầu tiên tìm thấy
let memberIndex =
    users.findIndex(user => user.name == "John"); // 0

// findlastIndex(callback) - trả về vị trí phần tử cuối cùng tìm thấy
let memberLastIndex =
    users.findLastIndex(user => user.name == "John"); // 3  

// 9.3 filter(callback) - lọc mảng theo điều kiện, trả về mảng mới
let johns = users.filter(user => user.name == "John");
// johns = [ {id:1, name:"John"}, {id:4, name:"John"} ]


// 9.4 some(callback) / every(callback) - kiểm tra phần tử mảng

// some(callback) - trả về true nếu ít nhất 1 phần tử thỏa mã
[1, 2, 3].some(x => x > 2); // true
[1, 2, 3].every(x => x > 3); // false

// 10. Reduce / reduceRight - tính toán trên mảng
// array.reduce((biến_tích_lũy, phần_tử_hiện_tại) => { ... }, giá_trị_khởi_đầu)

// 10.1 cộng tích lũy các phần tử mảng

arr = [1, 2, 3, 4, 5];
// cú pháp rút gọn:
// let sum = arr.reduce((s, cur) => s + cur, 0);

// cú pháp đầy đủ:
// let sum = arr.reduce(function(s, cur, idx, arr) { return s + cur; }, 0)
let sum = arr.reduce((s, cur) => s + cur, 0); // sum = 15 , tính tổng các phần tử mảng

let product = arr.reduce((s, cur) => s * cur, 1); // product = 120 , tính tích các phần tử mảng

// 11. Phương thức mảng khác

// 11.1 Array.from(obj, mapFn) - tạo mảng từ đối tượng giống mảng
let str2 = "Hello";
let chars = Array.from(str2); // chars = ['H','e','l','l','o']


// 11.2 Array.isArray(value) - kiểm tra giá trị có phải mảng không
Array.isArray([1, 2, 3]); // true
Array.isArray({}); // false
Array.isArray("Hello"); // false
Array.isArray({ a: 1 }); // false
Array.isArray(undefined); // false
// 11.3 arr.keys() / arr.values() / arr.entries() - Trả về các iterator

// 12. Bài tập

// Bài tập 1 - Tạo mảng từ chuỗi

arr = [1, 2, 3, 4, 5];

arr.splice(2, 2); // arr = [1,2,5] - xóa 2 phần tử từ vị trí index 2
arr.splice(1, 0, 3, 4); // arr = [1,3,4,2,5], từ vị trí index 1, không xóa phần tử nào, chèn 3,4

let sliceArr = arr.slice(1, 4); // arr = [3,4,2] - cắt từ vị trí 1 đến 4 [1,4) (không bao gồm)

console.log(arr); // [1,3,4,2,5] - mảng gốc không thay đổi
console.log(sliceArr); // [3,4,2] - mảng mới từ slice
[1, 5].splice(1, 0, sliceArr.flat()); // [1,3,4,2,5] - chèn mảng sliceArr vào vị trí index 1 của mảng [1,5]


// Bài tập 2 - Biên dịch border-left-width thành borderLeftWidth
// Question
// Biên dịch border-left-width thành borderLeftWidth

// Answer:
// Phương pháp sử dụng split, map, join và slice

// hàm camelize - chuyển chuỗi nối bằng dấu gạch ngang thành camelCase
function camelize(str) {
    let arr = str.split('-') // tách chuỗi thành mảng các từ
    // viết hoa ký tự đầu của mỗi từ (trừ từ đầu tiên)
    arr.map((word, index) => {
        if (index == 0) {
            return word;
        } else {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
    })
    return arr.join('');
}
console.log(camelize("border-left-width")); // borderLeftWidth
console.log(camelize("list-style-image")); // listStyleImage
console.log(camelize("-webkit-transition")); // WebkitTransition

// Bài tập 3 - Lọc mảng - tạo mảng mới
// Question: 
// Viết hàm filterRange(arr, a, b) nhận mảng arr, 
// trả về mảng mới chỉ gồm các phần tử có giá trị trong khoảng từ a đến b (bao gồm a, b).

// Answer:
/** 
 * Lọc mảng theo phạm vi [a, b]
 * @param {Array} arr - mảng đầu vào
 * @param {number} a - giá trị bắt đầu của khoảng
 * @param {number} b - giá trị kết thúc của khoảng
 * @return {Array} mảng mới gồm các phần tử trong khoảng [a, b]
 * Phương pháp sử dụng filter()
 */
function filterRange(arr, a, b) {
    return arr.filter(item => item >= a && item <= b);
}
let arr4 = [5, 3, 8, 1];
let filteredArr = filterRange(arr4, 1, 4); // filteredArr = [3,1]

// Bài tập 4 - Lọc và xóa khỏi mảng
// Question: 
// Viết hàm filterRangeInPlace(arr, a, b) nhận mảng arr 
// và loại bỏ khỏi mảng tất cả các giá trị không nằm trong khoảng từ a đến b.
// Phương pháp sử dụng splice() để xóa phần tử khỏi mảng gốc
// Answer:
/**
 * Lọc và xóa khỏi mảng các phần tử không trong phạm vi [a, b]
 * @param {Array} arr - mảng đầu vào
 * @param {number} a - giá trị bắt đầu của khoảng
 * @param {number} b - giá trị kết thúc của khoảng
 * @return {void} - không trả về gì, thay đổi mảng gốc
 */
// Cách 1
function filterRangeInPlace(arr, a, b) {
    arr.forEach((item, index) => {
        if (item < a || item > b) {
            arr.splice(index, 1);
        }
    });
}
let arr6 = [5, 3, 8, 1];
filterRangeInPlace(arr6, 1, 4); // arr6 = [3,1]

// Cách 2 - duyệt mảng từ cuối về đầu để tránh lỗi index khi xóa
function filterRangeInPlace2(arr, a, b) {
    arr.filter(item => item <= a && item >= b);
}
let arr7 = [5, 3, 8, 1];
filterRangeInPlace2(arr7, 1, 4); // arr7 = [3,1]

// Bài tập 5 - Sắp xếp mảng theo thứ tự giảm dần

// Question: 
// Viết hàm sortDescending(arr) để sắp xếp mảng arr theo thứ tự giảm dần.
// ví dụ : 
// [5, 2, 1, -10, 8] -> [8, 5, 2, 1, -10]

// Answer:
/**
 * Sắp xếp mảng theo thứ tự giảm dần
 * @param {Array} arr - mảng đầu vào
 * @return {void} - không trả về gì, thay đổi mảng gốc
 */

function sortDescending(arr) {
    arr.sort((a, b) => b - a); // sắp xếp số theo thứ tự giảm dần
}
let arr8 = [5, 2, 1, -10, 8];
sortDescending(arr8); // arr8 = [8,5,2,1,-10]

// Bài tập 6 - Sao chép và sắp xếp mảng

// Question:
// Viết hàm copySorted(arr) để tạo bản sao mảng arr và sắp xếp nó theo thứ tự tăng dần.
// Mảng gốc arr không bị thay đổi.
// ví dụ :
// ["HTML", "JavaScript", "CSS"] -> ["CSS", "HTML", "JavaScript"]

// Answer:
/**
 * Tạo bản sao mảng và sắp xếp theo thứ tự tăng dần
 * @param {Array} arr - mảng đầu vào
 * @return {Array} mảng mới đã sắp xếp
 * Phương pháp sử dụng slice() để tạo bản sao và sort() để sắp xếp
 */
function copySorted(arr) {
    // return arr.slice().sort((a, b) => a - b);
    return arr.slice().sort();  // sắp xếp chuỗi theo thứ tự bảng chữ cái
}
let arr9 = ["HTML", "JavaScript", "CSS"];
copySorted(arr9); // ["CSS", "HTML", "JavaScript"]

// Bài tập 7 - Tạo Constructor Function Calculator
// Question: 
// tạo Constructor Function tên Calculator với các phương thức:
// calculate(str) : nhận chuỗi tính toán như "3 + 7" và trả về kết quả
// ví dụ:
// calculate("3 + 7") 

// Answer:
function Calculator() {
    this.calculate = function (str) {
        let [a, operator, b] = str.split(' ');
        a = +a;
        b = +b;
        this.a = a;
        this.b = b;
        this.operator = operator;
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
            default:
                return NaN;
        }
    };

}
let calc = new Calculator();
console.log(calc.calculate("3 + 7")); // 10
console.log(calc.calculate("10 - 2")); // 8
console.log(calc.calculate("4 * 5")); // 20
console.log(calc.calculate("20 / 4")); // 5

// Bài tập 8 - Mở rộng Calculator để thêm các phép toán mới

// Question:

// mở rộng Calculator để thêm các phép toán mới 
// phương thức addMethod(name, func)
// sử dụng toán tử name và hàm hai đối số func(a,b)để triển khai phép toán
// name là toán tử như "*", "/", "+", "-"
// func là hàm thực hiện phép toán với hai đối số a và b
// ví dụ:
// let powerCalc = new Calculator;
// powerCalc.addMethod("*", (a, b) => a * b);
// powerCalc.addMethod("/", (a, b) => a / b);
// powerCalc.addMethod("**", (a, b) => a ** b); lũy thừa

// let result = powerCalc.calculate("2 ** 3"); // result = 8

// Answer:

function AdvancedCalculator() {
    // phương thức calculate để thực hiện phép toán
    this.calculate = function (str) {
        let [a, operator, b] = str.split(' ');
        this.a = +a;
        this.b = +b;
        this.operator = operator;
        if (!this.methods[operator] || isNaN(this.a) || isNaN(this.b)) {
            return NaN;
        }
        return this.methods[operator](this.a, this.b);
    };
    // lưu trữ các phương thức toán học
    this.methods = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
    };

    // phương thức addMethod để thêm các phép toán mới
    this.addMethod = function (name, func) {
        this.methods[name] = func;
    };
}

let powerCalc = new AdvancedCalculator();
powerCalc.addMethod("*", (a, b) => a * b);
powerCalc.addMethod("/", (a, b) => a / b);
powerCalc.methods; // { '+': [Function], '-': [Function], '*': [Function], '/': [Function] }
powerCalc.addMethod("**", (a, b) => a ** b); // lũy thừa
powerCalc.calculate("2 ** 3"); // 8

// Bài tập 9 - Map mảng đối tượng -> mảng tên

// Question: 

// mảng users là các đối tượng user { name : ..., age : ...} 
// Hãy viết mã chuyển đổi nó thành một mảng names.

// Answer:

let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let users2 = [john, pete, mary];

/* ... your code ... */
let names = users2.map(user => user.name);

console.log(names); // ["John", "Pete", "Mary"]

// Bài tập 10 - Map đối tượng

// Question:
// mảng users là các đối tượng user { name : ..., surname : ..., id : ...} 
// Hãy viết mã chuyển đổi nó thành một mảng các đối tượng 
// mới với các thuộc tính fullName và id, 
// trong đó fullName là sự kết hợp của name và surname.

// Answer:

let john3 = { name: "John", surname: "Smith", id: 1 };
let pete3 = { name: "Pete", surname: "Hunt", id: 2 };
let mary3 = { name: "Mary", surname: "Key", id: 3 };

let users3 = [john3, pete3, mary3];

/* ... your code ... */
let usersMapped = users3.map(user => ({ fullName: `${user.name} ${user.surname}`, id: user.id })); // {} mà không () thì bị lỗi, vì JS hiểu là khối lệnh

console.log(usersMapped);
/*
usersMapped = [
  { fullName: "John Smith", id: 1 },
  { fullName: "Pete Hunt", id: 2 },
  { fullName: "Mary Key", id: 3 }
]
*/
console.log(usersMapped[0].id) // 1
console.log(usersMapped[0].fullName) // John Smith

// Bài tập 11 - Sắp xếp mảng đối tượng theo thuộc tính

// Question:
// Mảng users là các đối tượng user { name : ..., age : ...} 
// Hãy viết hàm sortByAge(users) để sắp xếp mảng theo độ tuổi tăng dần.

// Answer:
/* ... your code ... */
function sortByAge(arr) {
    arr.sort((a, b) => a.age - b.age);
}

let john4 = { name: "John", age: 25 };
let pete4 = { name: "Pete", age: 30 };
let mary4 = { name: "Mary", age: 28 };
let users4 = [john4, pete4, mary4];

sortByAge(users4);
console.log(users4);
/*
 [
{ name: "John", age: 25 }, 
{ name: "Mary", age: 28 }, 
{ name: "Pete", age: 30 }
]
*/

// Bài tập 12 - Shuffle ( trộn ) mảng ngẫu nhiên

// Question:

// Viết hàm shuffle(array) để xáo trộn (shuffle) các phần tử trong mảng.
// Phương pháp sử dụng Math.random() để tạo vị trí ngẫu nhiên cho mỗi phần tử

// Answer:

let arr10 = [1, 2, 3, 4, 5];
shuffle(arr10);
console.log(arr10);
shuffle(arr10);
console.log(arr10);

shuffle2(arr10);
console.log(arr10);
shuffle2(arr10);
console.log(arr10);

// cách 1 
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // tạo mảng tạm làm phụ, gán biến để hoán đổi vị trí là chính
    }
}

// cách 2
function shuffle2(array) {
    // sắp xếp ngẫu nhiên 
    // 50%, Math.random() - 0.5 < 0 -> tăng dần
    // 50%, Math.random() - 0.5 > 0 -> giảm dần
    array.sort(() => Math.random() - 0.5);
}

// Bài tập 13 - Tính trung bình cộng từ mảng số

// Question:
// Mảng users là các đối tượng user { name : ..., age : ...} 
// Viết hàm getAverageAge(users) để tính tuổi trung bình của tất cả người dùng trong mảng users.
// ví dụ :
let john11 = { name: "John", age: 25 };
let pete11 = { name: "Pete", age: 30 };
let mary11 = { name: "Mary", age: 29 };

let arr11 = [john11, pete11, mary11];

console.log(getAverageAge(arr11)); // (25 + 30 + 29) / 3 = 28
console.log(getAverageAge2(arr11)); // (25 + 30 + 29) / 3 = 28


// Answer:

// Cách 1 - sử dụng reduce()
function getAverageAge(users) {
    return users.reduce((sum, user) => sum + user.age, 0) / users.length;
}

// Cách 2 - sử dụng vòng lặp for..of
function getAverageAge2(users) {
    let totalAge = 0;
    for (let user of users) {
        totalAge += user.age;
    }
    return totalAge / users.length;
}

// Bài tập 14 - Tạo mảng chỉ gồm các phần tử duy nhất

// Question:
// Viết hàm unique(arr) để trả về một mảng chỉ gồm các phần tử duy nhất của arr.
// Phương pháp sử dụng Set để loại bỏ các phần tử trùng lặp

// ví dụ:
let strings = ["Hare", "Krishna", "Hare", "Krishna",
    "Krishna", "Krishna", "Hare", "Hare", ":-O"
];
console.log(unique(strings)); // Hare, Krishna, :-O
console.log(unique2(strings)); // Hare, Krishna, :-O

// Answer:

// cách 1 
function unique(arr) {
    return Array.from(new Set(arr));
}

// cách 2
function unique2(arr) {
    // tạo Set từ mảng arr để loại bỏ phần tử trùng lặp
    let uniqueSet = new Set(arr);
    // chuyển Set thành mảng và trả về
    return [...uniqueSet];
}


// Bài tập 15 - Tạo đối tượng từ mảng đối tượng

// Question:
// Mảng users là các đối tượng user { name : ..., surname : ..., id : ...} 
// Hãy viết mã chuyển đổi nó thành một mảng đối tượng mới 
// với các thuộc tính key là name, value là 1 đối tượng { id:..., name:..., age:...}, 
// ví dụ:

let users12 = [
    { id: 'john', name: "John Smith", age: 20 },
    { id: 'ann', name: "Ann Smith", age: 24 },
    { id: 'pete', name: "Pete Peterson", age: 31 },
];

let usersById = groupById(users12);
console.log(usersById);
/*
// after the call we should have:

usersById = {
  john: {id: 'john', name: "John Smith", age: 20},
  ann: {id: 'ann', name: "Ann Smith", age: 24},
  pete: {id: 'pete', name: "Pete Peterson", age: 31},
}
*/
// Answer:
function groupById(array) {
    // sử dụng reduce để chuyển mảng thành đối tượng tích lũy
    return array.reduce((obj, item) => {
        obj[item.id] = item;
        return obj; // trả về đối tượng tích lũy cho lần lặp tiếp theo
    }, {});
}