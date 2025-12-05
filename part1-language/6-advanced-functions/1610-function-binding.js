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

// Định nghĩa wrapper : một hàm trung gian gọi đến hàm gốc và giữ nguyên ngữ cảnh this

// Sử dụng hàm mũi tên để gọi user.sayHi() giữ nguyên this
// Điểm hạn chế : phải tạo wrapper cho mỗi lần gọi. Nếu user bị thay đổi trước khi timer chạy, 
// callback sẽ sử dụng user mới, không phải user ban đầu

section("2. Giải pháp dùng wrapper để giữ this");

setTimeout (() => user.sayHi(), 1000); // Hello, John


// 3. Giải pháp dùng bind() để cố định this

// cú pháp : let boundFunc = func.bind(thisArg, arg1, arg2, ...);
// - thisArg : giá trị sẽ được sử dụng làm this khi hàm được gọi
// - arg1, arg2, ... : các tham số cố định được truyền trước cho hàm
// - Trả về một hàm mới với this và tham số đã được cố định

section("3. Giải pháp dùng bind() để cố định this");

let sayHi = user.sayHi.bind(user); // bind với this là user
setTimeout(sayHi, 1000); // Hello, John
// bind() trả về hàm mới với this luôn trỏ vào user
// không bị ảnh hưởng bởi ngữ cảnh gọi sau này


// 4. bind cũng giữ nguyên arguments

section("4. bind cũng giữ nguyên arguments");

let userA = {
    firstName: "John",
    sayHi(phrase) {
        console.log(`${phrase}, ${this.firstName} !`);
    }
};
let sayHiBound = userA.sayHi.bind(userA); // bind với this là userA

// Gọi sayHiBound với tham số phrase
sayHiBound("Hello"); // Hello, John !

// Gọi sayHiBound với tham số phrase khác
sayHiBound("Greetings"); // Greetings, John !

// 5. Partial function – bind một phần tham số

// Định nghĩa Partial function : hàm được tạo ra từ hàm gốc với một số tham số đã được cố định trước

section("5. Partial function – bind một phần tham số");

function multiply(a, b) {
    return a * b;
}

let double = multiply.bind(null, 2); // bind với this là null và cố định a = 2
console.log(double(5)); // 10 (2 * 5)

// 6. bindAll – bind hàng loạt method trong object
section("6. bindAll – bind hàng loạt method trong object");

// Giả sử ta có nhiều method trong object và muốn bind tất cả chúng

// Cách 1 : dùng for in để duyệt qua các key và bind từng method
// for ( let key in userA ) {
//     if ( typeof userA[key] === 'function' ) {
//         userA[key] = userA[key].bind(userA);
//     }
// }

// Cách 2 : sử dụng thư viện như lodash với _.bindAll(userA);

// Để sử dụng lodash trong browser, cần nạp nó qua CDN hoặc script tag trong HTML
// _ là đối tượng toàn cục của lodash
_.bindAll(userA); // bind tất cả method trong userA với this là userA

// Bây giờ tất cả method trong userA đều có this cố định là userA
setTimeout(() => userA.sayHi("Greetings"), 1000); // Greetings, John !

// 7. Partial không cần bind this

section("7. Partial không cần bind this");

let userB = {
  firstName: "John",
  say(time, msg) {
    console.log(`[${time}] ${this.firstName}: ${msg}`);
  }
};

// Sử dụng _.partial của lodash để cố định tham số mà không ảnh hưởng this
let sayNow = _.partial(userB.say, _ , "Hello!"); // cố định msg = "Hello!"

// Gọi sayNow với this là userB và truyền tham số time
sayNow.call(userB, "10:00"); // [10:00] John: Hello!

// BÀI TẬP

/* -------------------------------------------------------
 * Bài tập 1 : 
 * Hỏi : màn hình sẽ hiển thị gì sau khi chạy đoạn code dưới đây ?
 * -----------------------------------------------------
function f() {
  console.log( this ); // ?
}

let user = {
  g: f.bind(null)
};

user.g();
* ----------------------------------------------------- */

section("Bài tập 1 : Bound function as a method");

function f() {
  console.log( this ); // ?  -> màn hình hiển thị null vì f được bind với this là null
}

let userC = {
  g: f.bind(null)
};

userC.g();


/* -------------------------------------------------------
 * Bài tập 2 : Second bind
 * 
 * Có thể thay đổi this bằng cách thêm bind lần nữa không?
 * Kết quả sẽ là gì?
 * ------------------------------------------------------
function f() {
  console.log(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Ann" } );

f();
 * -----------------------------------------------------*/

section("Bài tập 2 : Second bind");

function f2() {
  console.log(this.name);
}

f2 = f2.bind( {name: "John"} ).bind( {name: "Ann" } );
f2();  
// bind với this là {name: "John"} đầu tiên sẽ có hiệu lực
// bind lần hai với {name: "Ann"} sẽ không thay đổi this nữa
// "John" ->  vì bind chỉ có tác dụng lần đầu tiên, lần sau không thay đổi this nữa

/* -------------------------------------------------------
 * Bài tập 3 : Thuộc tính của Function sau khi bind
 * There’s a value in the property of a function. 
 * Will it change after bind? Why, or why not?
 * 
function sayChao() {
  console.log( this.name );
}
sayChao.test = 5;

let bound = sayChao.bind({
  name: "John"
});

console.log( bound.test ); // what will be the output? why?
 * ------------------------------------------------------*/

section("Bài tập 3 : Hàm formatDate với partial");

function sayChao() {
  console.log( this.name );
}
sayChao.test = 5;

let bound = sayChao.bind({ name: "John"}); // bind với this là {name: "John"}

console.log( bound.test ); // undefined

// Giá trị của thuộc tính test không được sao chép sang hàm mới bound
// Vì bind tạo ra một hàm mới, không phải là bản sao hoàn chỉnh của hàm gốc
// Do đó, các thuộc tính tùy chỉnh như test không được giữ lại trong hàm mới

/* -------------------------------------------------------
 * Bài tập 4 : Fix lỗi mất this"
 * 
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let userD = {
  name: 'John',

  loginOk() {
    console.log(`${this.name} logged in`);
  },

  loginFail() {
    console.log(`${this.name} failed to log in`);
  },

};

askPassword(userD.loginOk, userD.loginFail);
 * ------------------------------------------------------*/

section("Bài tập 4 : Fix lỗi mất this");

function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let userD = {
  name: 'John',

  loginOk() {
    console.log(`${this.name} logged in`);
  },

  loginFail() {
    console.log(`${this.name} failed to log in`);
  },

};

// askPassword(userD.loginOk, userD.loginFail); // this bị mất trong loginOk và loginFail
askPassword(userD.loginOk.bind(userD), userD.loginFail.bind(userD)); // bind userD.loginOk và userD.loginFail với this là userD

/* -------------------------------------------------------
* Bài tập 5 : Partial application for login
* fix lại đoạn code sau để sử dụng bind
*-------------------------------------------------------
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  login(result) {
    console.log( this.name + (result ? ' logged in' : ' failed to log in') );
  }
};

askPassword(?, ?); // ?
*-------------------------------------------------------*/

section("Bài tập 5 : Partial application for login");

function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let userE = {
  name: 'John',

  login(result) {
    console.log( this.name + (result ? ' logged in' : ' failed to log in') );
  }
};

// askPassword(?, ?); // ?
askPassword(
  userE.login.bind(userE, true),  // bind this là userE và cố định result = true
  userE.login.bind(userE, false)  // bind this là userE và cố định result = false
);