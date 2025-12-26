/** 
 * Decorators in JavaScript
 */

'use strict';

// in ra tiêu đề phần
document.getElementById("title").innerText = "Decorators in JavaScript";
function section(title) {
    console.log("\n=== " + title + " ===");
}

// 2️⃣ Ví dụ kinh điển: Transparent Caching
section("2️⃣ Ví dụ kinh điển: Transparent Caching");

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
    let result = x*x;
    return result;
}

slow(1); // Called with 1 

// decorator thêm CACH cho hàm slow
section("Decorator thêm CACH cho hàm slow");

function cachingDecorator(func) {
    let cach = new Map();

    return function (x) { 
        if (cach.has(x)) {
            return cach.get(x); 
        }
        let result = func(x);
        cach.set(x, result);
        return result;
    }
}
slow = cachingDecorator(slow); // bọc hàm slow bằng decorator
// ====================================

console.log(slow(2)); // Called with 2 - lần đầu gọi hàm
console.log("Again " + slow(2)); // Lần 2: trả về từ cache - không gọi hàm gốc

// tái sử dụng decorator
section("Tái sử dụng decorator");

function work(x) {
    console.log("Work called with " + x);
    return x*10;
}
work = cachingDecorator(work);

console.log(work(3));
console.log("Again " + work(3));

// 3️⃣ Vấn đề lớn: method + this bị mất
section("3️⃣ Vấn đề lớn: method + this bị mất");

let worker = {
    someMethod() {
        return 1;
    },
    slow(x) {
        console.log("Called with " + x);
        return x * this.someMethod(); // sử dụng this
    }
};
// worker.slow = cachingDecoratorCallThis(worker.slow);
console.log(worker.slow(2)); // Lỗi: Cannot read property 'someMethod' of undefined

// 4️⃣ Giải pháp: func.call – truyền context
section("4️⃣ Giải pháp: func.call – truyền context");

function cachingDecoratorCallThis(func) {
    let cach = new Map();

    return function (x) { 
        if (cach.has(x)) {
            return cach.get(x); 
        }
        let result = func.call(this,x);
        cach.set(x, result);
        return result;
    }
}

worker.slow = cachingDecoratorCallThis(worker.slow);
console.log(worker.slow(2)); // Called with 2 \n 2 -> this đúng
console.log("Again " + worker.slow(2)); // Lần 2: trả về từ cache - không gọi hàm gốc

// 5️⃣ Forwarding nhiều tham số (multi-args)
section("5️⃣ Forwarding nhiều tham số (multi-args)");

function slowF(x, y) {
    console.log("Called with " + x + ", " + y);
    return x + y;
}

function cachingDecoratorForwarding(func, hash) {
    let cache = new Map();
    return function () {
        let key = hash(arguments);
        if (cache.has(key)) {
            return cache.get(key); 
        }
        let result = func.call(this, ...arguments);

        cache.set(key, result);
        return result;
    }
}

function hash(args) {
    return args[0] + ',' + args[1];
}

slowF = cachingDecoratorForwarding(slowF, hash);
console.log(slowF(3, 4)); // Called with 3, 4 \n 7
console.log("Again " + slowF(3, 4)); // Lần 2: trả về từ cache - không gọi hàm gốc

// 6️⃣ call vs apply (chuẩn PM + Dev)
section("6️⃣ call vs apply (chuẩn PM + Dev)");

function cachingDecoratorApply(func, hash) {
    let cache = new Map();
    return function () {
        let key = hash(arguments);
        if (cache.has(key)) {
            return cache.get(key); 
        }
        // let result = func.call(this, ...arguments); // cách 1: call + spread
        let result = func.apply(this, arguments); // cách 2: apply + arguments
        cache.set(key, result);
        return result;
    }
}

function hashF(args) {
    return [].join.call(args, ',');
}

slowF = cachingDecoratorApply(slowF, hashF);
console.log(slowF(5, 6));; // Called with 5, 6 \n 11
console.log("Again " + slowF(5, 6)); // Lần 2: trả về từ cache - không gọi hàm gốc
