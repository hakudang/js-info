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
            if (idx !== -1) tasks.splice(idx, 1);
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
    let key = field;
    return function (a, b) { // closure truy cập biến key
        return a[key] > b[key] ? 1 : -1;
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

/* ========================================================
* Bài 6 – Logger có prefix
* Bài toán : Viết logger(prefix):
* ---------------------------------------------------------
* Ví dụ :
const warning = logger("[WARNING]");
warning("Disk low"); 
// [WARNING] Disk low
* ---------------------------------------------------------
Yêu cầu:
prefix được “nhớ” bằng closure, không truyền lại mỗi lần gọi.
* ====================================================== */

section("Bài 6 – logger(prefix)");

function logger(prefix) {
    // closure "nhớ" biến prefix
    return function (msg) { // closure truy cập biến prefix
        return console.log(prefix, msg);
    }
}

const warning = logger("[WARNING]");
warning("Disk low"); // [WARNING] Disk low
warning("Memory low"); // [WARNING] Memory low

const error = logger("[ERROR]");
error("System crash"); // [ERROR] System crash

/* ========================================================
* Bài 7 – Memoize (cache kết quả)
* ---------------------------------------------------------
* Bài toán : Viết hàm memoize(fn):
* ---------------------------------------------------------
* Ví dụ :
Cho hàm nặng:

function slowSquare(n) {
  console.log("Computing...");
  return n * n;
}

const cached = memoize(slowSquare);

console.log(cached(5)); // Computing..., 25
console.log(cached(5)); // 25 (không log "Computing...")
* ---------------------------------------------------------
Yêu cầu:
Cache theo tham số đầu vào.
Dùng Map là tốt nhất.
* ====================================================== */

section("Bài 7 – memoize(fn)");

function memoize(fn) {
    const cache = new Map(); // private cache

    return function (...args) { // closure truy cập biến cache
        // tạo key đơn giản bằng JSON (đủ dùng cho bài tập)
        const key = JSON.stringify(args); // tham số đầu vào

        if (cache.has(key)) {
            return cache.get(key); // không gọi hàm gốc -> lấy từ cache
        }

        const result = fn.apply(this, args); // gọi hàm gốc
        cache.set(key, result); // lưu kết quả vào cache
        return result;
    };
}

function slowSquare(n) {
    console.log("Computing...");
    return n * n;
}

const cached = memoize(slowSquare);

console.log(cached(5)); // Computing..., 25
console.log(cached(5)); // 25 (không log "Computing...")
console.log(cached(7)); // Computing..., 49

/* ========================================================
* Bài 8 – once() wrapper
* ---------------------------------------------------------
* Bài toán : Viết once(fn) để fn chỉ chạy đúng 1 lần:
* ---------------------------------------------------------
* Ví dụ :
const init = once(() => console.log("Run"));
init(); // Run
init(); // nothing
* ---------------------------------------------------------
Yêu cầu:
Trả về result của lần chạy đầu tiên cho các lần sau.
* ====================================================== */

section("Bài 8 – once(fn)");

function once(fn) {
    let called = false;
    let result;
    return function (...args) { // closure truy cập biến called, result
        if (!called) {
            called = true;
            result = fn.apply(this, args);
        }
        return result; // các lần sau trả lại kết quả cũ
    }
}

const init = once(() => console.log("Run"));
init(); // Run
init(); // nothing

/* ========================================================
* Bài 9 – Generator ID theo prefix
* ---------------------------------------------------------
* Bài toán : Viết createIdGenerator(prefix):
* ---------------------------------------------------------
* Ví dụ :
const genUserId = createIdGenerator("USER_");
console.log(genUserId()); // USER_1
console.log(genUserId()); // USER_2
* ---------------------------------------------------------
Yêu cầu:
Mỗi generator độc lập.
Prefix cố định theo generator.
* ====================================================== */

section("Bài 9 – createIdGenerator(prefix)");

function createIdGenerator(prefix) {
    let id = 1;
    return function () {  // closure truy cập biến prefix, id
        return `${prefix}_${id++}`;
    };
}

const genUserId = createIdGenerator("USER_");
console.log(genUserId()); // USER_1
console.log(genUserId()); // USER_2

/* ========================================================
* Bài 10 – Fix code lỗi bằng closure
* ---------------------------------------------------------
* Bài toán :
Fix makeArmy (shooter bug)
* ---------------------------------------------------------
* Ví dụ :
Cho code lỗi:

function makeArmy() {
  let shooters = [];

  for (var i = 0; i < 10; i++) {
    shooters.push(function() {
      console.log(i);
    });
  }

  return shooters;
}

const army = makeArmy();
army[0](); // tất cả in 10
Hãy sửa để:

army[0](); // 0
army[1](); // 1
...
army[9](); // 9
* ---------------------------------------------------------
Yêu cầu:
Sửa bằngclosure (đúng bản chất), không hack.
* ====================================================== */

section("Bài 10 – Fix makeArmy (shooter bug)");

function makeArmy() {
    let shooters = [];

    for (let i = 0; i < 10; i++) { // không dùng var chỉ tạo biến i tham chiếu duy nhất cho cả vòng lặp 
        shooters.push(function () { // closure truy cập biến i
            console.log(i);
        });
    }
    return shooters;
}

const army = makeArmy();

army[0](); // 0
army[1](); // 1
// ...
army[9](); // 9