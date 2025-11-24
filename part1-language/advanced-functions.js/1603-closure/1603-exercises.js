/**
 * Bài tập về Closure trong JavaScript
 * 10 bài closure + lời giải chi tiết + chú thích
 * Closure là gì?
 * Closure là một hàm con có thể truy cập các biến từ hàm cha của nó,
 *  ngay cả sau khi hàm cha đã kết thúc thực thi.
 * Closure cho phép chúng ta tạo ra các biến private và 
 * duy trì trạng thái giữa các lần gọi hàm.
 */

"use strict";

// in ra tiêu đề
document.write("<h2> Bài tập về Closure trong JavaScript </h2>");
function section(title) {
    console.log("\n================================ ");
    console.log("=== " + title + " ===");
    console.log("================================ \n");
}
/* ========================================================
* Bài 1 - Bộ đếm cơ bản (counter)
* – Viết hàm makeCounter() tạo ra một counter độc lập
* --------------------------------------------------------- 
* Yêu cầu : 
* - Mỗi lần gọi makeCounter() tạo một counter độc lập, 
* không ảnh hưởng nhau.
* --------------------------------------------------------- 
// Ví dụ
const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
* ====================================================== */

section("Bài 1 – makeCounter()");

function makeCounter() {
    // biến count là biến private của hàm makeCounter
    let count = 0;
    // hàm trả về là một closure, nó "đóng gói" biến count
    return function () { // closure
        count++; //
        return count; // truy cập biến count từ hàm cha
    }
}

// Demo
(() => {
    const c1 = makeCounter(); // counter độc lập 1
    const c2 = makeCounter(); // counter độc lập 2

    console.log("B1 c1:", c1(), c1(), c1()); // 1 2 3
    console.log("B1 c2:", c2(), c2());       // 1 2 (độc lập)
})();

/* ========================================================
* Bài 2 – Counter tăng/giảm
* Bài toán : Viết hàm createCounter(start) với các phương thức inc/dec
* ---------------------------------------------------------
* Yêu cầu : 
* - Hàm createCounter(start) nhận tham số bắt đầu là start
* - Trả về một object với 2 phương thức:
*   + inc() : tăng biến đếm lên 1 và trả về giá trị mới
*   + dec() : giảm biến đếm xuống 1 và trả về giá trị mới
* - Không cho phép truy cập trực tiếp biến đếm từ bên ngoài.
* ---------------------------------------------------------
* Ví dụ:    
const c = createCounter(10);
console.log(c.inc()); // 11
console.log(c.inc()); // 12
console.log(c.dec()); // 11
* ====================================================== */
section("Bài 2 – createCounter(start) với inc/dec");

function createCounter(start = 0) {

    let count = start;
    return { // 
        inc() { // closure truy cập biến count
            count++
            return count;
        },
        dec() { // closure truy cập biến count
            count--
            return count;
        },
        get() { // closure truy cập biến count
            return count;
        }
    }
}
const c1 = createCounter(10);
const c2 = createCounter(100);
console.log(c1);
console.log("B2 :", c1.get(), c1.inc(), c1.inc(), c1.dec());
console.log(c2);
console.log("B2 :", c2.get(), c2.inc(), c2.inc(), c2.dec());

/* ========================================================
* Bài 3 – Secret variable (get/set)
* ---------------------------------------------------------
* Bài toán : Viết makeSecret(initial):
* ---------------------------------------------------------
* Ví dụ :
const secret = makeSecret(123);

console.log(secret.get()); // 123
secret.set(999);
console.log(secret.get()); // 999
* ---------------------------------------------------------
* Yêu cầu:
* - initial được lưu kín bên trong.
* - Chỉ thay đổi được qua set.
* - Không truy cập trực tiếp từ bên ngoài.
* ====================================================== */

section("Bài 3 – makeSecret(initial) với get/set");

function makeSecret(initial = 0) {
    let value = initial;
    return {
        get() { // closure truy cập biến value
            return value;
        },
        set(x) { // closure truy cập biến value
            value = x;
            return value;
        }
    }
}

const secret = makeSecret(123);
console.log(secret);
console.log(secret.get()); // 123
secret.set(999);
console.log(secret.get()); // 999

/* ========================================================
* Bài 4: Mini todo bằng closure
* ---------------------------------------------------------
* Bài toán : Viết createTodo():
* ---------------------------------------------------------
* Ví dụ :
const todo = createTodo();

todo.add("Learn JS");
todo.add("Sleep");

console.log(todo.list()); 
// ["Learn JS", "Sleep"]
* ---------------------------------------------------------
* Yêu cầu:
Không được lộ mảng tasks ra ngoài (không trả về reference trực tiếp).
* ====================================================== */

section("Bài 4 – createTodo() với add/list");

function createTodo() {
    let tasks = [];
    return {
        add(task) { // closure truy cập biến tasks
            tasks.push(task);
        },
        list() { // closure truy cập biến tasks
            // trả về bản sao của mảng tasks để tránh bị mutate từ bên ngoài
            return [...tasks];
        },
        remove(task) { // closure truy cập biến tasks
            const idx = tasks.indexOf(task);
            if (idx !== -1 ) tasks.splice(idx,1);
            return [...tasks];
        }
}
}

const todo = createTodo();

todo.add("Learn JS");
todo.add("Sleep");
todo.add("gomi");

console.log(todo.list()); // ["Learn JS", "Sleep", "gomi"]

todo.remove("gomi");
console.log(todo.list()); // ["Learn JS", "Sleep"]

/*=======================================================
* Bài 5 – byField(field) cho sort
* ---------------------------------------------------------
* Bài toán : Viết hàm byField(field) để sử dụng với arr.sort(byField(field))
* ---------------------------------------------------------
* Ví dụ :
Cho mảng users:

const users = [
  { name: "John", age: 20 },
  { name: "Pete", age: 18 },
  { name: "Ann", age: 19 }
];
Viết byField(field) để dùng:

users.sort(byField("name"));
users.sort(byField("age"));
Yêu cầu:
byField trả về comparator function.
* ====================================================== */

section("Bài 5 – byField(field) cho sort");

function byField(field) {
    let key = field ;
    return function (a, b){ // closure truy cập biến key
        return  a[key] > b[key] ? 1 : -1; 
    }
}

const users = [
  { name: "John", age: 20 },
  { name: "Pete", age: 18 },
  { name: "Ann", age: 19 }
];

users.sort(byField("name"));
console.log(JSON.stringify(users));
users.sort(byField("age"));
console.log(JSON.stringify(users));