/**
 * Revisiting Arrow Functions
 *  Arrow function:
❌ Không có this
❌ Không có arguments
❌ Không có super
❌ Không dùng được new
✅ Dùng callback cực mạnh vì giữ nguyên lexical this
✅ Viết gọn, sạch, tránh bug mất this
Chúng sinh ra để dùng trong:
forEach
map/filter/reduce
setTimeout
event handlers trong object
decorators
 * 
 */

"use strict";

// in ra tiêu đề
document.write("<h2> Revisiting Arrow Functions </h2>");

function section(title) {
    console.log("\n================================ ");
    console.log("=== " + title + " ===");
    console.log("================================ \n");
}

//1. Arrow Functions không có this riêng
// Ý tưởng:
// – Arrow functions không có this riêng, this bên trong arrow function
//   được lấy từ ngữ cảnh bao quanh nơi nó được định nghĩa
// – Giúp tránh các vấn đề về mất this trong các hàm callback

section("1. Arrow Functions không có this riêng");

let group = {
    title : "Our Group",
    students : ["John", "Pete", "Alice"],
    showList() {
        // this.students.forEach( function (student) {console.log (this.title + ": " + student);} ); // this trong function thông thường trỏ tới undefined
        this.students.forEach( student => console.log (this.title + ": " + student) );
        // this trong arrow function trỏ tới this của showList()
    }
}

group.showList();

// 2. Arrow functions không thể dùng làm constructor
// Ý tưởng:
// – Arrow functions không có prototype
// – Không thể sử dụng từ khóa new với arrow functions

section("2. Arrow functions không thể dùng làm constructor");

let User = (name) => { this.name = name; };

// new User("John"); // Lỗi: User is not a constructor


// 3. Arrow functions không có arguments riêng
// Ý tưởng:
// – Arrow functions không có đối tượng arguments riêng
// – Sử dụng rest parameters ...args để thay thế nếu cần

section("3. Arrow functions không có arguments riêng");

// tạo hàm decorator defer
function defer(f, ms) {  
    return function(...args) { 
        setTimeout( () => f.apply(this, args), ms ); // gọi lại hàm gốc sau ms mili giây
        // arrow function không có arguments riêng, dùng args từ hàm bao ngoài
    }
}

function sayHi(who) {
    console.log("Hello, " + who);
}

let sayHiDeferred = defer(sayHi, 2000); 

sayHiDeferred("John"); // Hello, John (sau 2 giây)