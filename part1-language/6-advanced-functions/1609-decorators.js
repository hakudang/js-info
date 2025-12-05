/** 
 *  Decorators trong JavaScript
 *  Định nghĩa :
 *  Decorator là hàm bọc (wrapper). Nó nhận một function gốc, 
 *  thêm tính năng, rồi trả về function mới có hành vi được mở rộng, 
 *  nhưng không đụng vào code gốc.
 *  Cách viết phổ biến nhất là bọc function bằng closure.
 *  
 *  Call/Apply :
 * - Giữ nguyên giá trị this khi forward function
 * - Truyền tham số linh hoạt
 *  
 * Cú pháp :
 *  function decorator(func) {
 *      // mở rộng func
 *      return function(...args) {
 *         // code mở rộng
 *        return func(...args); // gọi func gốc
 *      }
 *  }
 *  Sử dụng :
 *  let decoratedFunc = decorator(originalFunc);
 * Ứng dụng :
 * - Dùng khi object không có method cần thiết
 * - ví dụ mượn join, map, filter từ Array
 */

'use strict';

function section(title) {
    console.log("\n================================ ");
    console.log("=== " + title + " ===");
    console.log("================================ \n");
}

// in ra tiêu đề phần
document.write("<h2> Decorators trong JavaScript </h2>");

// 1. Transparent Caching

section("1. Transparent Caching");

// Ý tưởng:
// – cachingDecorator tạo ra function mới
// – Function này kiểm tra cache
// – Nếu chưa có thì gọi hàm gốc, lưu cache, rồi trả về kết quả

// Lợi ích:
// ✔ Không làm rối hàm gốc
// ✔ Reusable
// ✔ Kết hợp nhiều decorator được

function slow(x) {
    console.log("Called with " + x);
    // giả sử hàm tính toán phức tạp
    return x;
}

function cachingDecorator(func) {
    let cach = new Map();

    return function (x) { // wrapper
        if (cach.has(x)) {
            return cach.get(x); // trả về từ cache
        }
        let result = func(x); // gọi hàm gốc
        cach.set(x, result);
        return result;
    }
}

slow = cachingDecorator(slow); // bọc hàm slow bằng decorator

// // slow -> f(x) { ... }

console.log(slow(1)); // Called with 1 \n 1
console.log("Again " + slow(1));

console.log(slow(2)); // Called with 2 \n 2
console.log("Again " + slow(2));

// 2. Vấn đề với this : mất context
// Ý tưởng:
// – Nếu hàm gốc là method của object, 
//   thì this sẽ bị mất khi gọi func(x) trong decorator
// – Cần giữ nguyên this khi gọi hàm gốc
// Giải pháp:
// – Sử dụng func.call(this, x) để gọi hàm gốc với this đúng
// – Hoặc func.apply(this, arguments) để truyền tham số linh hoạt

section("2. Vấn đề với this : mất context");

let worker = {
    someMethod() {
        return 1;
    },
    slow(x) {
        console.log("Called with " + x);
        return x * this.someMethod(); // sử dụng this
    }
};

function cachingDecorator2(func) {
    let cach = new Map();
    return function (x) { // wrapper
        if (cach.has(x)) {
            return cach.get(x);
        }
        // let result = func(x); // lỗi vì mất this
        let result = func.call(this, x); // giữ nguyên this, gọi lại hàm gốc với this đúng

        cach.set(x, result);
        return result;
    }
}

worker.slow = cachingDecorator2(worker.slow); // bọc method
// worker.slow(2); // LỖI: Cannot read property 'someMethod' of undefined
worker.slow(2);


// 4. Decorator hỗ trợ nhiều tham số

let worker2 = {
    slow(min, max) {
        console.log(`Called with ${min}, ${max}`);
        return min + max;
    }
};

function cachingDecorator3(func) {
    let cach = new Map();
    return function (...args) { // wrapper với nhiều tham số
        let key = hash(args); // tạo key từ args
        if (cach.has(key)) {
            return cach.get(key);
        }

        // 2 cách gọi hàm gốc với nhiều tham số
        // let result = func.call(this, ...args); // giữ this, truyền nhiều tham số, goi hàm gốc
        let result = func.apply(this, args); // giữ this, truyền args dạng array-like

        cach.set(key, result);
        return result;
    }
}
function hash(args) {
    return args.join(","); // đơn giản nối chuỗi làm key
}

worker2.slow = cachingDecorator3(worker2.slow);

console.log(worker2.slow(3, 5));

// 5. Apply - phiên bản truyền args dạng array-like 

section("5. Apply - phiên bản truyền args dạng array-like ");

// func.call(this, ...args); // truyền từng tham số 
// func.apply(this, args); // truyền cả list args dưới dạng mảng-like

// BÀI TẬP 

/* -------------------------------------------------------
 * Bài tập 1 : 
 * Viết hàm spy(func) tạo decorator 
 * ----------------------------------------------------- 
 * ví dụ :
 * function work(a, b) {
  alert( a + b ); // work is an arbitrary function or method
}

work = spy(work);

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
  alert( 'call:' + args.join() ); // "call:1,2", "call:4,5"
}
* ----------------------------------------------------- 
* Giải pháp :
* - Tạo decorator spy(func) trả về hàm bọc
* - Hàm bọc lưu mảng calls để ghi lại tham số mỗi lần gọi
* - Gọi hàm gốc bằng func.apply(this, arguments) để giữ this và truyền tham số linh hoạt
* ----------------------------------------------------- */

function work(a, b) {
    console.log(a + b); // work is an arbitrary function or method
}

work = spy(work);

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) { // duyệt mảng calls của hàm bọc
    console.log('call:' + args.join()); // "call:1,2", "call:4,5"
}

function spy(func) {
    function wrapper(...args) { // hàm bọc
        wrapper.calls.push(args); // lưu tham số vào mảng calls
        return func.apply(this, args); // gọi hàm gốc với this và tham số đúng
    }
    wrapper.calls = [];
    return wrapper;
}

/* -------------------------------------------------------
* Bài tập 2 : 
* Viết hàm delay(f,ms) delay mỗi lần gọi f ms mili giây
* ----------------------------------------------------- 
* ví dụ :
function f(x) {
  alert(x);
}

// create wrappers
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000("test"); // shows "test" after 1000ms
f1500("test"); // shows "test" after 1500ms
* ----------------------------------------------------- 
* Giải pháp :
* - Tạo hàm delay(f, ms) trả về hàm bọc
* - Hàm bọc sử dụng setTimeout để gọi hàm gốc sau ms mili giây
* - Gọi hàm gốc bằng func.apply(this, arguments) để giữ this và truyền tham số linh hoạt
* ----------------------------------------------------- */

function f(x) {
    console.log(x);
}

// create wrappers
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000("test"); // shows "test" after 1000ms
f1500("test"); // shows "test" after 1500ms

function delay(func, ms) {
    return function (...args) {
        setTimeout(() => func.apply(this, args), ms);
    }
}

/* -------------------------------------------------------
* Bài tập 3 : 
* Viết hàm debounce(f, ms) chỉ cho phép gọi f sau ms mili giây
* kể từ lần gọi cuối cùng
* ----------------------------------------------------- 
* ví dụ :
let f = _.debounce(alert, 1000);

f("a");
setTimeout( () => f("b"), 200);
setTimeout( () => f("c"), 500);
// debounced function waits 1000ms after the last call and then runs: alert("c")
* -----------------------------------------------------
* Giải pháp :
* - Tạo hàm debounce(f, ms) trả về hàm bọc
* - Hàm bọc sử dụng setTimeout để gọi hàm gốc sau ms mili giây
* - Mỗi lần gọi hàm bọc sẽ hủy timeout trước đó để chỉ gọi hàm gốc sau ms từ lần gọi cuối cùng
* - Gọi hàm gốc bằng func.apply(this, arguments) để giữ this và truyền tham số linh hoạt
* ----------------------------------------------------- */

let fn = debounce(console.log, 1000);

fn("a"); // gọi lần đầu
setTimeout(() => fn("b"), 200); // gọi sau 200ms
setTimeout(() => fn("c"), 500); // gọi sau 500ms
// debounced function waits 1000ms after the last call and then runs: alert("c")

function debounce(func, ms) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout); // hủy timeout trước đó
        timeout = setTimeout(() => func.apply(this, args), ms); // tạo timeout mới
    }
}

/* -------------------------------------------------------
 * Bài tập 4 – Tạo Decorator: Logging + Timing Decorator
 * ----------------------------------------------------- 
 * ví dụ :
 * function calculateTotal(price, qty) {
    // giả sử logic này phức tạp
    for (let i = 0; i < 1e7; i++) {} // mô phỏng CPU-heavy
    return price * qty;
}
không được phép sửa hàm calculateTotal
- Log tham số mỗi lần chạy
- Log thời gian thực thi hàm để đánh giá hiện năng 
* -------------------------------------------------------*/

// 1. Tạo hàm gốc
function calculateTotal(price, qty) {
    // giả sử logic này phức tạp
    for (let i = 0; i < 1e7; i++) { } // mô phỏng CPU-heavy
    return price * qty;
}
// không được phép sửa hàm calculateTotal

// 2. Tạo decorator logging + timing
function withLoggingAndTiming(func) {
    // mở rộng func
    return function (...args) {
        // 2.1.code mở rộng - đây là phần logging và timing
        console.log(`Calling: ${func.name} with:`, args);
        const start = performance.now(); // bắt đầu thời gian
        const result = func.apply(this, args); // gọi func gốc
        const end = performance.now();
        console.log(`Execution time: ${(end - start).toFixed(2)} ms`);
        console.log(`Result:`, result);

        return result; // 2.2.gọi func gốc
    }
}

// 3. Bọc hàm gốc
const calculateTotalLogged = withLoggingAndTiming(calculateTotal);

// 4. Sử dụng hàm đã bọc
calculateTotalLogged(10, 5); // logs tham số, thời gian thực thi và kết quả