/** file 1313-code-comments.js
 * Code Comments in JavaScript
 * 1. Bad comments
 * 2. Good comments
 * 3. When to comment
 * 4. Why comments matter
 * - 4.1 function hóa 
 * - 4.2 Tạo hàm
 * - 4.3 tạo document
 * - 4.4 Tránh comment thừa thãi
 * - 4.5 Khi nào nên comment
 *   - 4.5.1 Kiến trúc tổng thể, overview
 *   - 4.5.2 Hướng dẫn cách dùng hàm / API
 *   - 4.5.3 Giải thích quyết định quan trọng
 *   - 4.5.4 Nói về lý do (Why), - không mô tả hành động (What)
 * - 4.6 Ví dụ Good comments
 *
 * Mục đích của comments:
 * - Giải thích "Why - tại sao" code làm việc theo cách nhất định
 * - Cung cấp thông tin hữu ích ( ngắn gọn, trọng tâm ) bổ sung những logic không rõ ràng từ code
 * - Tài liệu hóa các hàm, lớp, module
 */

"use strict";

//1. Bad comments

// ví dụ 

// This code will do this thing (...) and that thing (...)
// ...and who knows what else...
very;
complex;
code;


// Lý do comment trên NG 
// - Không nói rõ “this thing” hay “that thing” là gì
// - Vô nghĩa đối với người không viết code này
// - Giống comment tự trấn an bản thân hơn là giải thích logic
// - Comment kiểu mơ hồ làm người đọc mất thời gian mà không hiểu thêm được gì

// 2. Good comments

// (1) function hóa 
// những logic phức tạp thành hàm phụ với tên hàm rõ ràng

// ví dụ 
function showPrimes(n) {
    nextPrime:
    for (let i = 2; i < n; i++) {

        // check if i is a prime number - kiểm tra nếu i là số nguyên tố
        for (let j = 2; j < i; j++) {
            if (i % j == 0) continue nextPrime;
        }

        alert(i);
    }
}

// sửa thành

function showPrimesBetter(n) {
    for (let i = 2; i < n; i++) {
        if (!isPrime(i)) continue;
        alert(i);
    }
}

function isPrime(num) {
    for (let i = 2; i < num; i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// (2) Tạo hàm
// Tạo hàm thay các khối lệnh phức tạp

// ví dụ : 

// here we add whiskey
for (let i = 0; i < 10; i++) {
    let drop = getWhiskey();
    smell(drop);
    add(drop, glass);
}

// here we add juice
for (let t = 0; t < 3; t++) {
    let tomato = getTomato();
    examine(tomato);
    let juice = press(tomato);
    add(juice, glass);
}

// ...

// sửa thành
addWhiskey(glass);
addJuice(glass);

function addWhiskey(container) {
    for (let i = 0; i < 10; i++) {
        let drop = getWhiskey();
        //...
    }
}

function addJuice(container) {
    for (let t = 0; t < 3; t++) {
        let tomato = getTomato();
        //...
    }
}

// (3) tạo document
// - Làm tài liệu cho Functions, Classes, Modules

/**
 * Returns x raised to the n-th power. - Trả về x mũ n
 *
 * @param {number} x The number to raise. - Số cần lũy thừa
 * @param {number} n The power, must be a natural number. - Số mũ, phải là số tự nhiên
 * @return {number} x raised to the n-th power. - Trả về x mũ n
 */
function pow(x, n) {
    // ...
}

// (4) Tránh comment thừa thãi
// - Comment điều ai cũng thấy và hiểu từ code
// - comment thay vì đặt tên rõ ràng cho biến, hàm, lớp
// - comment dài dòng che code rối rắm

// NG 1
i = i + 1; // tăng i lên 1   ❌
// sửa thành 
i = i + 1;

// NG 2
// check if approved
if (s === 1)    ❌
// sửa thành 
if (status === APPROVED) ✅

// NG 3
// This checks if the user is not banned and is active and the plan is premium
if (!user.banned && user.active && user.plan === "premium")  // ❌

// sửa thành
const canAccessPremium = !user.banned && user.active && user.plan === "premium";
if (canAccessPremium) ...

// (5) Khi nào nên comment

// - Kiến trúc tổng thể, overview
// - Hướng dẫn cách dùng hàm / API
// - Giải thích quyết định quan trọng
// - Nói về lý do (Why), - không mô tả hành động (What)

// (6) Ví dụ Good comments

// ví dụ 1 - kiến trúc tổng thể 

// Payment flow: validate -> charge -> log -> notify
processPayment(order);

// Ví dụ 2 - hướng dẫn cách dùng hàm / API

/**
 * Fetch user profile from server
 * @param {string} userId - must be valid UUID
 * @returns Promise<User>
 */
function getUser(userId) { ... }

// Ví dụ 3 - giải thích quyết định quan trọng

// Using Map instead of object to avoid prototype key collision
const users = new Map();

// Ví dụ 4 - Nói về lý do (Why), không mô tả hành động (What)

// Retry 3 times because backend has eventual consistency
retry(fetchData, 3);

// (7) Tóm tắt
// Chốt cho bạn

// Code có comment chưa chắc là code tốt

// không comment chưa chắc là không tốt, biết comment đúng lúc mới là tốt

// Mục tiêu cuối: self-descriptive code - code tường minh để nó tự nó comment cho chính nó

// Comment để nói “tại sao quyết định vậy”, không phải giải thích “dòng này làm gì”.