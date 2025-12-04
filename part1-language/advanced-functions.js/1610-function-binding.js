/**
 * Function Binding trong JavaScript
 * 
 * - Function Binding là kỹ thuật liên kết ngữ cảnh (this) của hàm với một đối tượng cụ thể
 * - Giúp kiểm soát giá trị this khi hàm được gọi
 * - Thường sử dụng với các hàm callback hoặc khi truyền hàm như tham số
 * - Các phương thức chính:
 *   + bind(): tạo hàm mới với this cố định
 *   + call(): gọi hàm với this cụ thể và tham số rời rạc
 *   + apply(): gọi hàm với this cụ thể và tham số dưới dạng mảng 
 * 
 */

"use strict";

function section(title) {
    console.log("\n================================ ");
    console.log("=== " + title + " ===");
    console.log("================================ \n");
}

//1. Vấn đề Mất This 

// Ý tưởng:
// – Khi lấy một method ra khỏi object và gọi nó,
//   this bên trong method không còn trỏ tới object ban đầu nữa
// – Cần cách để giữ nguyên this trỏ tới object gốc

section("1. Vấn đề Mất This");

let user = {
    firstName: "John",
    sayHi() {
        console.log("Hello, " + this.firstName);
    }
};

setTimeout(user.sayHi, 1000); // Hello, undefined (this mất context)
// user.sayHi bị tách khỏi object -> this không còn trỏ vào user 

// 2. Giải pháp dùng wrapper để giữ this

section("2. Giải pháp dùng wrapper để giữ this");

setTimeout (() => user.sayHi(), 1000); // Hello, John
// Sử dụng hàm mũi tên để gọi user.sayHi() giữ nguyên this
// điểm hạn chế : phải tạo wrapper cho mỗi lần gọi. Nếu user bị thay đổi trước khi timer chạy, 
// callback sẽ sử dụng user mới, không phải user ban đầu

// 3. Giải pháp dùng bind() để cố định this
// cú pháp : let boundFunc = func.bind(thisArg, arg1, arg2, ...);
// - thisArg : giá trị sẽ được sử dụng làm this khi hàm được gọi
// - arg1, arg2, ... : các tham số cố định được truyền trước cho hàm
// - Trả về một hàm mới với this và tham số đã được cố định

section("3. Giải pháp dùng bind() để cố định this");

let sayHi = user.sayHi.bind(user); // tạo hàm mới với this cố định là user
setTimeout(sayHi, 1000); // Hello, John
// bind() trả về hàm mới với this luôn trỏ vào user
// không bị ảnh hưởng bởi ngữ cảnh gọi sau này