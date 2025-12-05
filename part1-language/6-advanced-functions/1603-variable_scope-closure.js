/**
 * Variable scope trong JavaScript
 *  
 * Phạm vi biến (Variable scope) xác định nơi mà biến có thể được truy cập trong mã.
 * JavaScript có hai loại phạm vi chính: phạm vi toàn cục (global scope) và phạm vi cục bộ (local scope).
 * - Biến được lưu trong cấu trúc tên là Lexical Environment.
 * - Mỗi function nhớ môi trường nơi nó được tạo (closure).
 * - Khi gọi function → tạo môi trường mới + liên kết môi trường cha.
 * - Closure sống tới khi không còn function nào tham chiếu.
 * - V8 có tối ưu nên đôi khi biến outer không xuất hiện trong debugger.
 * 1. Khối lệnh và phạm vi biến
 * 2. Hàm lồng nhau (Nested functions)
 * 3. Lexical Environment-Closure
 *   3.1 Khai báo biến
 *   3.2 Khai báo hàm
 *   3.3 Inner and outer Lexical Environment
 *   3.4 Closure
 * 4. Garbage collection
 * 5. Real-life optimizations
 * 6. BÀI TẬP
 * Bài tập 1: Biến cập nhật trong hàm closure
 * Bài tập 2: Biến trong hàm closure gần nhất
 * Bài tập 3: Biến trong hàm closure riêng biệt
 * Bài tập 4: Tạo Constructor Function với các phương thức up và down
 * Bài tập 5: Phạm vi của hàm lồng nhau
 * Bài tập 6: Tạo hàm sum với cú pháp sum(a)(b)
 * Bài tập 7: Biến trong hàm closure và hoisting
 * Bài tập 8: hàm arr.filter(f) với các hàm inBetween và inArray
 * Bài tập 9: Viết hàm sortByField(fieldName)
 * Bài tập 10 : tạo mảng shooters
 * 
 */

"use strict";

// Hiển thị tiêu đề
document.write("<h2> Variable scope trong JavaScript </h2>");

function section(title) {
    console.log("\n================================ ");
    console.log("=== " + title + " ===");
    console.log("================================ \n");
}

// JavaScript có phạm vi hàm (function scope) và phạm vi khối (block scope).
// Phạm vi hàm có nghĩa là biến được khai báo bên trong một hàm chỉ có thể truy cập được bên trong hàm đó.
// Phạm vi khối có nghĩa là biến được khai báo bên trong một khối lệnh (block) như if, for, while, hoặc bất kỳ cặp dấu ngoặc nhọn {} nào
// sẽ chỉ có phạm vi trong khối đó nếu sử dụng let hoặc const.


// 1. Khối lệnh và phạm vi biến

section("1. Khối lệnh và phạm vi biến");

{
    let message = "Hello";
    console.log(message); // Hello;
}

// alert(message); // Error
// Lỗi, vì biến message không tồn tại ngoài khối lệnh

// 1.1 Dùng block để cô lập biến
// Mỗi khối có biến message riêng biệt

section("1.1 Dùng block để cô lập biến");

{
    let message = "Hello";
    console.log(message);
}

{
    let message = "Goodbye";
    console.log(message);
}

//1.2 Khối if và for, while cũng tạo phạm vi riêng
section("1.2 Khối if và for, while cũng tạo phạm vi riêng");

if (true) {
    let phrase = "Hello!";
    console.log(phrase);
}

// console.log(phrase); // Error

for (let i = 0; i < 3; i++) {
    console.log(i);
}

// console.log(i); // Error

// 2. Hàm lồng nhau (Nested functions)

section("2. Hàm lồng nhau (Nested functions)");

// Hàm bên trong hàm có thể dùng biến bên ngoài:
function sayHiBye(firstName, lastName) {
    function getFullName() {
        return firstName + " " + lastName;
    }

    console.log("Hello, " + getFullName());
    console.log("Bye, " + getFullName());
}
sayHiBye("John", "Doe");

// Hàm lồng nhau cũng có thể return ra ngoài:
function makeCounter() {
    let count = 0;

    return function () {
        return count++;
    };
}

let counter = makeCounter();

console.log(counter()); // 0
console.log(counter()); // 1
console.log(counter()); // 2

// 3. Lexical Environment-Closure

section("3. Lexical Environment");

// Mỗi môi trường thực thi (execution context) có một Lexical Environment
// Lexical Environment là một cấu trúc dữ liệu lưu trữ các biến và hàm được khai báo trong môi trường đó
// Mỗi Lexical Environment bao gồm hai phần:
// - Environment Record: chứa các biến và hàm được khai báo trong môi trường đó
// - A reference to the outer Lexical Environment: liên kết đến môi trường bên ngoài (nơi hàm được tạo ra)
// Khi một hàm được gọi, tạo Execution Context với Lexical Environment riêng -> connect đến Lexical Environment của môi trường bên ngoài
// Khi truy cập biến, JavaScript sẽ tìm kiếm trong Lexical Environment hiện tại trước, nếu không tìm thấy sẽ tiếp tục tìm kiếm trong môi trường bên ngoài

// 3.1 Khai báo biến 
// Biến được khai báo bằng let, const, var sẽ được lưu trong Lexical Environment của môi trường hiện tại
section("3.1 Khai báo biến");

(() => {
    let phrase; // khai báo biến trong global Lexical Environment
    phrase = "Hello";
    phrase = "Bye";

    console.log(phrase); // Bye
})();

// 3.2 Khai báo hàm
// Hàm được khai báo sẽ được thêm vào Lexical Environment ngay khi bước tạo Execution Context
// Do đó, hàm có thể được gọi trước khi nó được định nghĩa trong mã

section("3.2 Khai báo hàm");

(() => {
    say("John"); // → Hoạt động bình thường vì say() đã tồn tại trước khi chạy code.

    function say(name) {
        console.log(name);
    }
})();

// 3.3 Inner and outer Lexical Environment
// Mỗi hàm có Lexical Environment riêng (inner)
// Lexical Environment của hàm liên kết với Lexical Environment của môi trường bên ngoài (outer)
// Khi truy cập biến, JavaScript sẽ tìm kiếm trong inner trước, nếu không tìm thấy sẽ tiếp tục tìm kiếm trong outer

section("3.3 Inner and outer Lexical Environment");
(() => {
    let phrase2 = "Hello";
    sayHi("John");

    function sayHi(name) {
        console.log(`${name}: ${phrase2}`);
    }
})();


// 3.4 Closure
// Closure là một function + môi trường (Lexical Environment) của nó, 
// gồm tất cả các biến ở scope bên ngoài mà nó có thể truy cập tại thời điểm được tạo.
// Closure là một hàm bên trong có quyền truy cập vào biến của hàm bên ngoài ngay cả sau khi hàm bên ngoài đã kết thúc

section("3.4 Trả về hàm ");

(() => {
    let counterF = makeCounter();
    console.log(counterF()); // 0
    console.log(counterF());; // 1
    console.log(counterF());; // 2

    function makeCounter() {
        let count = 0;

        return function () {
            return count++; // → Closure này luôn nhớ count dù hàm outside đã chạy xong.
        };
    }

})();

// 4. Garbage collection
// Lexical Environment sống miễn là còn có hàm nào đó tham chiếu đến nó.

section("4. Garbage collection");

function f() {
    let value = 123;

    return function () {
        console.log(value); // Closure này giữ tham chiếu đến biến value
    }
}

let g = f(); // còn giữ value=123
g(); // 123

g = null; // không còn ai giữ → giải phóng

// Nếu gọi nhiều lần:
let arr = [f(), f(), f()];
// → 3 Lexical Environment khác nhau → tồn tại riêng biệt.
console.log(arr.length); // 3

// 5. Real-life optimizations
// V8 (Chrome) tối ưu: nếu biến outer không được dùng, engine xoá nó khỏi closure để tối ưu memory.
section("5. Real-life optimizations");

// Trong console gõ: console.log(value) → value không tồn tại.
function fa() {
    let value = Math.random();

    function g() {
        // debugger;
    }

    return g;
}

let ga = fa();
ga();

// Gõ value trong console → ra "Surprise!". Vì V8 optimize bỏ biến không dùng.
let value = "Surprise!";

function fb() {
    let value = "the closest value";

    function g() {
        // debugger;
    }

    return g;
}

let gb = fb();
gb();

// 6. BÀI TẬP

section("6. BÀI TẬP");

/*============================================================================
* Bài tập 1: Xác định giá trị hiển thị của biến trong hàm
* Hàm sayHi sử dụng một biến ngoài name. Khi hàm chạy, nó sẽ sử dụng giá trị nào?
let name = "John";

function sayHi() {
  alert("Hi, " + name);
}

name = "Pete";

sayHi(); // what will it show: "John" or "Pete"?

* Giải thích vì sao?
============================================================================*/

section("Bài tập 1: Biến cập nhật trong hàm closure");

(() => {
    let name = "John";

    function sayHi() {
        console.log("Hi, " + name);
    }

    name = "Pete";

    sayHi(); // Hi, Pete
})();

// Vì hàm sayHi tham chiếu đến biến name trong outer Lexical Environment
// Khi gọi sayHi(), nó sẽ lấy giá trị cập nhật của name là "Pete"

/*============================================================================
* Bài tập 2: Biến trong hàm closure gần nhất
* Viết hàm makeCounter() hiển thị biến name. Hàm sẽ hiển thị giá trị nào?
function makeWorker() {
  let name = "Pete";

  return function() {
    console.log(name);
  };
}

let name = "John";

// create a function
let work = makeWorker();

// call it
work(); // what will it show?
* Giải thích vì sao?
============================================================================*/

section("Bài tập 2: Biến trong hàm closure gần nhất");

(() => {
    function makeWorker() {
        let name = "Pete";

        return function () {
            console.log(name); // Closure này giữ tham chiếu đến biến name trong makeWorker
        };
    }

    let name = "John";

    // create a function
    let work = makeWorker();
    // call it
    work(); // Pete
})();

// Vì hàm bên trong tham chiếu đến biến name trong outer Lexical Environment của makeWorker
// Khi gọi work(), nó sẽ lấy giá trị của name là "Pete"

/*============================================================================
* Bài tập 3: Biến trong hàm closure riêng biệt
* Tạo hàm makeCounter() trả về một hàm đếm. Mỗi lần gọi hàm đếm, nó sẽ trả về số lần gọi.
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
let counter2 = makeCounter();

console.log( counter() ); // 0
console.log( counter() ); // 1

console.log( counter2() ); // ?
console.log( counter2() ); // ?
* Giải thích vì sao?
============================================================================*/
section("Bài tập 3: Biến trong hàm closure riêng biệt");

(() => {
    function makeCounter() {
        let count = 0;

        return function () {
            return count++; // → Closure này luôn nhớ count dù hàm outside đã chạy xong.
        };
    }

    let counter = makeCounter();
    let counter2 = makeCounter();

    console.log(counter()); // 0
    console.log(counter()); // 1

    console.log(counter2()); // 0 , vì counter2 là hàm đếm riêng biệt
    console.log(counter2()); // 1 , vì counter2 là hàm đếm riêng biệt
})();

// Vì mỗi lần gọi makeCounter() sẽ tạo một Lexical Environment mới với biến count riêng biệt
// Do đó, counter và counter2 sẽ đếm riêng biệt

/*============================================================================
* Bài tập 4: Tạo Constructor Function với các phương thức up và down
* Viết hàm Counter() làm hàm khởi tạo, với hai phương thức:
* - up() - tăng giá trị biến đếm và trả về nó
* - down() - giảm giá trị biến đếm và trả về nó
*
function Counter() {
  let count = 0;

  this.up = function() {
    return ++count;
  };
  this.down = function() {
    return --count;
  };
}

let counter = new Counter();

console.log( counter.up() ); // ?
console.log( counter.up() ); // ?
console.log( counter.down() ); // ?
* Giải thích vì sao?
============================================================================*/

section("Bài tập 4: Tạo Constructor Function với các phương thức up và down");

(() => {
    function Counter() {
        let count = 0;

        this.up = function () {
            return ++count; // Closure này giữ tham chiếu đến biến count
        };
        this.down = function () {
            return --count; // Closure này giữ tham chiếu đến biến count
        };
    }

    let counter = new Counter();

    console.log(counter.up()); // 1
    console.log(counter.up()); // 2
    console.log(counter.down()); // 1
})();

// Vì biến count được lưu trong Lexical Environment của hàm Counter
// Các phương thức up và down tham chiếu đến biến count trong closure
// Do đó, chúng có thể tăng và giảm giá trị của count một cách chính xác


/*============================================================================
* Bài tập 5: Phạm vi của hàm lồng nhau
* Xem xét đoạn mã sau. Sẽ có lỗi gì xảy ra khi chạy hàm sayHi()? Tại sao?

let phrase = "Hello";

if (true) {
  let user = "John";

  function sayHi() {
    console.log(`${phrase}, ${user}`);
  }
}

sayHi();
============================================================================*/

section("Bài tập 5: Phạm vi của hàm lồng nhau");

(() => {
    let phrase = "Hello";

    if (true) {
        let user = "John";

        function sayHi() {
            console.log(`${phrase}, ${user}`);
        }
    }

    // sayHi(); // error, sayHi is not defined -> vì sayHi không tồn tại ngoài khối if
})();

// Lỗi, vì hàm sayHi không tồn tại ngoài khối if
// Hàm sayHi được khai báo bên trong khối if, nên nó chỉ có phạm vi trong khối đó
// Do đó, khi gọi sayHi() bên ngoài khối if sẽ gây ra lỗi ReferenceError

/*============================================================================
* Bài tập 6: Tạo hàm sum với cú pháp sum(a)(b)
* Viết hàm sum that works like this: sum(a)(b) = a+b.
* ----------------------------------------------------------------------------
* Giải pháp :
* function sum(a) {
*     return function(b) {
*         return a + b;
*     };
* }
* ---------------------------------------------------------------------------- 
* Ví dụ :
sum(1)(2) = 3
sum(5)(-1) = 4

============================================================================*/

section("Bài tập 6: Tạo hàm sum với cú pháp sum(a)(b)");
function sum(a) {
    return function (b) {
        return a + b;
    };
}
console.log(sum(1)(2)); // 3
console.log(sum(5)(-1)); // 4

/*============================================================================
* Bài tập 7: Biến trong hàm closure và hoisting

* hoisting là gì ?
* Hoisting là hành vi mặc định của JavaScript trong đó các khai báo biến và hàm
* được "nâng lên" đầu phạm vi của chúng trước khi mã được thực thi.
* 
* Hoisting ảnh hưởng thế nào đến biến trong hàm closure?
* - Hoisting của let tạo ra TDZ
* - TDZ khiến biến bên trong shadow biến ngoài nhưng chưa usable
* - Closure không được dùng, vì JS ưu tiên biến trong scope hiện tại
* 
* Viết hàm func để hiển thị giá trị của biến x. Hàm sẽ hiển thị giá trị nào?
* ----------------------------------------------------------------------------
* Ví dụ:

let x = 1;

function func() {
  console.log(x); // ?

  let x = 2;
}

func();
* Giải thích vì sao?
============================================================================*/

section("Bài tập 7: Biến trong hàm closure và hoisting");

(() => {
    let x = 1;

    function func() {
        // Hoisted:
        // let x;  (x tồn tại nhưng chưa init, đang ở TDZ)
        console.log(x); // lỗi, vì có x trong cùng scope, không tìm x bên ngoài. Nhưng x chưa được khởi tạo
        let x = 2; // lúc này x mới được init
    }

    // func(); // Lỗi ReferenceError: Cannot access 'x' before initialization
})();

// Lỗi vì biến x được khai báo bằng let trong hàm func, không tham chiếu đến biến x bên ngoài
// Biến x trong hàm func có phạm vi khối và chưa được khởi tạo khi console.log(x) được gọi
// Do đó, truy cập biến x trước khi khởi tạo sẽ gây ra lỗi ReferenceError


/*============================================================================
* Bài tập 8: hàm arr.filter(f) với các hàm inBetween và inArray
* Viết hàm inBetween(a, b) trả về hàm kiểm tra xem một số có nằm trong khoảng từ a đến b hay không.
* Viết hàm inArray(arr) trả về hàm kiểm tra xem một số có nằm trong mảng arr hay không.
* ----------------------------------------------------------------------------
* Giải pháp :
function inBetween(a, b) {
    return function (x) {
        return x >= a && x <= b;
    };
}
function inArray(arr) {
    return function (x) {
        return arr.includes(x);
    };
}
* ----------------------------------------------------------------------------
* Ví dụ :
let arr = [1, 2, 3, 4, 5, 6, 7];

console.log( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

console.log( arr.filter(inArray([1, 2, 10])) ); // 1,2
============================================================================*/

section("Bài tập 8: hàm arr.filter(f) với các hàm inBetween và inArray");

(() => {
    let arr = [1, 2, 3, 4, 5, 6, 7];

    let inBetween = (a, b) => x => x >= a && x <= b;
    let inArray = (array) => x => array.includes(x);

    console.log(arr.filter(inBetween(3, 6))); // 3,4,5,6

    console.log(arr.filter(inArray([1, 2, 10]))); // 1,2

})();

// Hàm inBetween(a, b) trả về một hàm kiểm tra xem một số có nằm trong khoảng từ a đến b hay không
// Hàm inArray(arr) trả về một hàm kiểm tra xem một số có nằm trong mảng arr hay không


/*============================================================================
* Bài tập 9: Viết hàm sortByField(fieldName)
* Viết hàm sortByField(fieldName) để sắp xếp mảng các đối tượng theo trường fieldName.
* ----------------------------------------------------------------------------
* Ví dụ :
let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];
*----------------------------------------------------------------------------
* Giải pháp :
function sortByField(fieldName) {
    return function (a, b) {    
        return a[fieldName] > b[fieldName] ? 1 : -1;
    };
}
*----------------------------------------------------------------------------
users.sort(sortByField('name'));
users.sort(sortByField('age'));
============================================================================*/

section("Bài tập 9: Viết hàm sortByField(fieldName)");

(() => {
    let users = [
        { name: "John", age: 20, surname: "Johnson" },
        { name: "Pete", age: 18, surname: "Peterson" },
        { name: "Ann", age: 19, surname: "Hathaway" }
    ];

    let sortByField = (fieldName) => (a, b) => a[fieldName] > b[fieldName] ? 1 : -1;

    // function sortByField(fieldName) {
    //     return function (a, b) {    
    //         return a[fieldName] > b[fieldName] ? 1 : -1;
    //     };
    // }

    users.sort(sortByField('name'));
    console.log(JSON.stringify(users));

    users.sort(sortByField('age'));
    console.log(JSON.stringify(users));
})();
// Hàm sortByField(fieldName) trả về một hàm so sánh hai đối tượng dựa trên trường fieldName
// Hàm này có thể được sử dụng với phương thức sort() của mảng để sắp xếp các đối tượng theo trường cụ thể
// Ví dụ, users.sort(sortByField('name')) sẽ sắp xếp mảng users theo tên, và users.sort(sortByField('age')) sẽ sắp xếp theo tuổi

/*============================================================================
* Bài tập 10 : tạo mảng shooters 
* ----------------------------------------------------------------------------
* Ví dụ :
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = function() { // create a shooter function,
      alert( i ); // that should show its number
    };
    shooters.push(shooter); // and add it to the array
    i++;
  }

  // ...and return the array of shooters
  return shooters;
}

let army = makeArmy();

// all shooters show 10 instead of their numbers 0, 1, 2, 3...
army[0](); // 10 from the shooter number 0
army[1](); // 10 from the shooter number 1
army[2](); // 10 ...and so on.
*----------------------------------------------------------------------------
* Giải thích vì sao kết quả hiển thị 10 cho tất cả các hàm shooter?
* Vì sao và làm thế nào để sửa nó để mỗi hàm shooter hiển thị số đúng từ 0 đến 9?
============================================================================*/
(() => {
    function makeArmy() {
        let shooters = [];

        let i = 0;
        while (i < 10) {
            let shooter = function () { // create a shooter function,
                console.log(i); // that should show its number
            };
            shooters.push(shooter); // and add it to the array
            i++;
        }

        // ...and return the array of shooters
        return shooters;
    }

    let army = makeArmy();

    // all shooters show 10 instead of their numbers 0, 1, 2, 3...
    army[0](); // 10 from the shooter number 0
    army[1](); // 10 from the shooter number 1
    army[2](); // 10 ...and so on.
})();


// Kết quả hiển thị 10 cho tất cả các hàm shooter vì biến i được tham chiếu trong closure
// Khi các hàm shooter được gọi, chúng đều truy cập biến i trong outer Lexical Environment của makeArmy
// Tại thời điểm gọi, giá trị của i đã là 10 sau khi vòng lặp kết thúc
// Để sửa lỗi này, ta có thể tạo một Lexical Environment riêng cho mỗi hàm shooter bằng cách sử dụng hàm IIFE hoặc let trong vòng lặp

(() => {
    function makeArmy() {
        let shooters = [];

        for (let i = 0; i < 10; i++) {
            shooters.push(function () {
                console.log(i);
            });
        }
        return shooters;
    }

    let army = makeArmy();

    army[0]();
    army[1]();
    army[2]();
})();
// let trong for-loop tạo một binding mới mỗi lần lặp.
// Mỗi shooter nhận đúng bản sao riêng của i.