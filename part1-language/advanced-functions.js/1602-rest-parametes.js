/** 
 *  Rest parameters
 *  cho phép chúng ta truyền nhiều đối số vào hàm và gộp chúng thành một mảng.
 *  Cú pháp: ...tên_biến
 *  1. Đối số Rest và cú pháp Spread ...
 *  2. Biến đặc biệt "arguments"
 *  3. Sử dụng cú pháp spread
 *   3.1 Truyền spread vào hàm
 *   3.2 Tạo mảng bằng spread
 *   3.3 sự khác nhau giữa iterable và array-like
 *   3.4 sự khác biệt giữa Array.from(object) và [...object]
 *  4. Sao chép array/object
 *   4.1 Sao chép mảng bằng spread
 *   4.2 Sao chép mảng Object bằng spread
 *   4.3 Có thể dùng Object.assign để sao chép object như spread
 *  
 */

// 1. Đối số Rest và cú pháp Spread ... 
// trong javascript có nhiều hàm có thể nhận nhiều đối số
// ví dụ Math.max(a, b, c, ...)
// Object.assign(dest, ...sources) : 
// Để định nghĩa hàm có thể nhận nhiều đối số, ta sử dụng cú pháp rest parameters

function sum(a, b) {
    return a + b;
}
console.log(sum(1, 2, 3, 4, 5)); // 3 : chỉ lấy 2 đối số đầu

// 1.1 sử dụng 1 tham số rest
// cú pháp : ...tên_biến
// tên_biến sẽ là một mảng chứa tất cả các đối số được truyền vào hàm
function sumAll(...args) {
    let sum = 0;
    for (let arg of args) {
        sum += arg;
    }
    return sum;
}
console.log(sumAll(1, 2, 3, 4, 5)); // 15 : lấy tất cả đối số

// 1.2 sử dụng nhiều tham số và tham số rest
// phân rã thành các biến riêng biệt vào tham và mảng rest
function showName(firstName, lastName, ...titles) {
    console.log(firstName + ' ' + lastName); // Julius Caesar

    console.log(titles[0]); // Consul
    console.log(titles[1]); // Imperator
    console.log(titles.length); // 2
}

showName("Julius", "Caesar", "Consul", "Imperator");
// Julius Caesar 
// Consul
// Imperator
// 2

// 1.3 tham số rest phải là tham số cuối cùng
// sai
// function f(...args, lastName) { // Lỗi cú pháp
//     // ...
// }

// đúng
function f(firstName, ...args) {
    // ...
}

// 2. Biến đặc biệt "arguments"

// js có một đối tượng đặc biệt arguments
// chứa tất cả các đối số được truyền vào hàm
// arguments không phải là mảng thực sự
// nhưng có thể truy cập các phần tử qua chỉ số và có thuộc tính length

function showName2() {
    console.log(arguments.length);
    console.log(arguments[0]);
    console.log(arguments[1]);
}
showName2("Julius", "Caesar");
// 2
// Julius
// Caesar
showName2("Ilya");
// 1
// Ilya
// undefined

// 2.1 arguments là array-like, iterable( có thể lặp ) nhưng không phải mảng
// không dùng hàm map hoặc forEach trực tiếp trên arguments

// sai
function sumArgumentsWrong() {
    let sum = 0;

    // sai
    // arguments.forEach((arg) => { // Lỗi, vì arguments không có forEach
    //     sum += arg;
    // });

    // sửa sai 
    let args = Array.from(arguments);
    args.forEach((arg) => {
        sum += arg;
    });
    return sum;
}
console.log(sumArgumentsWrong(4, 5, 6)); // 15

// 2.2 hàm arrow không có arguments
function showNameFunction() {
    let showNameArrow = () => console.log(arguments[0]); // Lấy arguments từ hàm bao ngoài là 1 thay vì 2
    showNameArrow(2);
}

showNameFunction(1); // 1

// 3. Sử dụng cú pháp spread
// cú pháp spread ... cho phép tách một mảng thành các phần tử riêng lẻ
// ví dụ truyền mảng vào hàm Math.max
// Math.max(...array) tương đương Math.max(a, b, c, ...) 

// 3.1 Truyền spread vào hàm

// sai - không truyền mảng trực tiếp
let arr = [3, 5, 1];
console.log(Math.max(arr)); // NaN

// đúng - truyền từng trị thông thường 
console.log(Math.max(3, 5, 1)); // 5

// đúng - truyền spread vào hàm

// truyền mảng với spread
console.log(Math.max(...arr)); // 5
// truyền nhiều spread 
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];
console.log(Math.max(...arr1, ...arr2)); // 8
// truyền cả spread và giá trị riêng lẻ
console.log(Math.max(1, ...arr1, 2, ...arr2, 25)); // 25

// 3.2 Tạo mảng bằng spread

// ghép nhiều spread
let merged = [0, ...arr1, 6, ...arr2]; // [0, 1, -2, 3, 4, 6, 8, 3, -8, 1]

// chuyển chuỗi thành mảng ký tự
let str = "Hello";
let chars = [...str]; // ['H', 'e', 'l', 'l', 'o']

// 3.3 sự khác nhau giữa iterable và array-like

// array-like 
// - có thuộc tính length 
// - có các phần tử được đánh chỉ số 0, 1, 2, ...
// nhưng không có các phương thức mảng như forEach, map, filter, ...
let arrayLike = {
  0: "Hello",
  1: "World",
  length: 2
};

// Iterable object 
// - là object có phương thức đặc biệt [Symbol.iterator], cho phép duyệt qua bằng
// - duyệt được for..of , Array.from, hoặc spread ..., 

// 3.4 sự khác biệt giữa Array.from(object) và [...object]

// - Array.from(object) hoạt động với cả iterable và array-like
// - spread ... [...object] chỉ hoạt động với iterable
// ví dụ với Array.from(object) và [...object]
let arrayLike2 = {
  0: "Hello",
  1: "World",
  length: 2
};

console.log(Array.from(arrayLike2)); // ["Hello", "World"]
// console.log([...arrayLike2]); // Lỗi, vì arrayLike2 không phải iterable

// 4. Sao chép array/object

// 4.1 Sao chép mảng bằng spread
let arrOriginal = [1, 2, 3];
let arrCopy = [...arrOriginal]; // sao chép mảng

// hay mảng có cùng nội dung ? trả lời true
console.log(JSON.stringify(arrOriginal) === JSON.stringify(arrCopy)); // true

// cập nhật arrOriginal có ảnh hưởng arrCopy ? -> không
arrOriginal.push(4);
console.log(arrOriginal); // [1, 2, 3, 4]
console.log(arrCopy); // [1, 2, 3]

// 4.2 Sao chép Object bằng spread
let objArrOriginal = {a: 1, b: 2, c: 3};
let objArrCopy = {...objArrOriginal}; // sao chép object

// hay object có cùng nội dung ? trả lời true
console.log(JSON.stringify(objArrOriginal) === JSON.stringify(objArrCopy)); // true

// cập nhật objArrOriginal có ảnh hưởng objArrCopy ? -> không
objArrOriginal.d = 4;
console.log(objArrOriginal); // {a: 1, b: 2, c: 3, d: 4}
console.log(objArrCopy); // {a: 1, b: 2, c: 3}
// Lưu ý : sao chép nông (shallow copy)
// nếu object có thuộc tính là object khác, thì thuộc tính đó vẫn tham chiếu đến cùng object ban đầu

// 4.3 Có thể dùng Object.assign để sao chép object như spread
let objAssignOriginal = {x: 10, y: 20};
let objAssignCopy = Object.assign({}, objAssignOriginal); // sao chép object