/** 
 *  file : 1415-constructor-operator-new.js
 *  Constructor Operator New 
 * Tạo nhiều đối tượng cùng kiểu với constructor function
 * 1. Định nghĩa Constructor Function
 * 2. Nếu không dùng từ khóa new - lỗi vì sao?
 * 3. Nếu dùng return trong Constructor Function
 * 4. Phương thức trong Constructor Function
 */

// in ra tiêu đề
document.write('<h2>1415. CONSTRUCTOR OPERATOR New</h2>');

// Vì sao cần Constructor Function
// - tạo đối 1 tượng mới với cú pháp {} có nhược điểm
//   không thể tái sử dụng để tạo nhiều đối tượng cùng kiểu

let user = {
    name: "Jack",
    isAdmin: false
}

// 1. Constructor Function - Hàm khởi tạo

// - Đặt tên: viết hoa chữ cái đầu
// - khởi tạo bằng từ khóa new
// - không trả về giá trị
// - không khuyến khích dùng từ khóa return
// - không viết ngắn gọn cho phương thức như đối tượng bình thường

// hàm khởi tạo Constructor 
function User(name) {
    this.name = name;
    this.isAdmin = false;
}

let user1 = new User("Jack");

// kết quả tương tự tạo đối tượng mới
console.log(user1.name); // Jack
console.log(user1.isAdmin); // false

// 2. Nếu không dùng từ khóa new - lỗi vì sao?

let user2 = User("Alice"); // gọi hàm bình thường
// console.log(user2.name); // lỗi , vì hàm không trả về giá trị 
// console.log(user2.isAdmin); // lỗi , vì hàm không trả về giá trị

// 3. Nếu dùng return trong Constructor Function 
// - không khuyến khích dùng return trong Constructor Function
// - nếu return trả về đối tượng khác thì thay thế this bằng đối tượng đó
// - nếu return không trả về gì hoặc trả về giá trị nguyên thủy thì bỏ qua và trả về this

function BigUser() {
    this.name = "Jack";
    return { name: "Alice" }; // trả về đối tượng khác
}
console.log(new BigUser().name); // Alice , vì hàm trả về đối tượng khác

function SmallUser() {
    this.name = "Jack";
    return; // không trả về gì
}
console.log(new SmallUser().name); // Jack , vì hàm không trả về gì nên trả về this

// 4. Phương thức trong Constructor Function

function UserWithMethod(name) {
    this.name = name;
    this.sayHi = function () {
        console.log("Hi " + this.name);
    }
}

let john = new UserWithMethod("John");
john.sayHi(); // Hi John

// kết quả tương tự với tạo đối tượng mới thông thường - không dùng Constructor Function
let john1 = {
    name: "John",
    sayHi() {
        console.log("Hi " + this.name);
    }
}
john1.sayHi(); // Hi John

// 5. Bài tập

// Bài tập 1 

// Question:
// tạo hai hàm khởi tạo A và B , cả hai đều trả về cùng một đối tượng sao cho :
// function A() { ... }
// function B() { ... }
// let a = new A();
// let b = new B();
// console.log( a == b ); // true

// Answer:
let object = {};

function A() {
    return object; // thêm vào để fix lỗi bài tập 
}

function B() {
    return object; // thêm vào để fix lỗi bài tập
}

console.log(new A() == new B()); // true , vì cả hai đều trả về cùng một đối tượng

// Bài tập 2
// Question:
// tạo hàm khởi tạo Calculator với các phương thức :
// read() : nhận hai giá trị từ người dùng và lưu vào thuộc tính của đối tượng
// sum() : trả về tổng hai giá trị đã lưu
// mul() : trả về tích hai giá trị đã lưu

// Answer:
function Calculator() {
    this.read = function () {
        this.a = +prompt("Nhập số a:", 0); // dấu + để chuyển chuỗi sang số
        this.b = +prompt("Nhập số b:", 0);
    }
    this.sum = function () {
        return this.a + this.b;
    }
    this.mul = function () {
        return this.a * this.b;
    }
}

let calculator = new Calculator();
calculator.read(); // nhập hai số
console.log("Tổng: " + calculator.sum()); // in ra tổng
console.log("Tích: " + calculator.mul()); // in ra tích


// Bài tập 3
// Question:
// tạo hàm khởi tạo Accumulator(startingValue) :
// - nhận một giá trị số làm tham số khởi tạo startingValue
// - lưu giá trị này trong thuộc tính value của đối tượng
// - phương thức read() : nhận một giá trị số từ người dùng và cộng nó vào thuộc tính value

// Answer:
function Accumulator(startingValue) {
    this.value = startingValue;
    this.read = function () {
        this.value += +prompt("Nhập số cần cộng vào:", 0);
    }
}
let accumulator = new Accumulator(100);
accumulator.read(); // nhập số cần cộng thêm
console.log(accumulator.value);