/**
 * Basic syntax of JavaScript classes
 */

"use strict";

// in tieu de
document.getElementById("1901").innerText = "1901 - Basic syntax of JavaScript classes";

function section(title) {
    console.log(`\n=== ${title} ===`);
}

// 4️⃣ Class thực chất là gì?
section("4️⃣ Class thực chất là gì?");

class User {
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        console.log(`Hello, ${this.name}!`);
    }
}

// Usage:
let user = new User("John");
user.sayHi(); // Hello, John!

console.log(typeof User); // function
console.log(User === User.prototype.constructor); // true
console.log(User.prototype.sayHi);
console.log(Object.getOwnPropertyNames(User.prototype)); // [ 'constructor', 'sayHi' ]

// 5️⃣ Viết lại class bằng function constructor
section("5️⃣ Viết lại class bằng function constructor");

function UserConstructor(name) {
    this.name = name;
}

UserConstructor.prototype.sayHi = function () {
    console.log(`Hello, ${this.name}!`);
};

// Usage:
let userConstructor = new UserConstructor("John");
userConstructor.sayHi(); // Hello, John!

// Class có cờ IsClassConstructor = true -> không thể gọi mà không có new

try {
    let userError = User(); // Error: Class constructor User cannot be invoked without 'new'
} catch (e) {
    console.log(e.message);
}

// Function constructor có thể gọi mà không cần new

try {
    let userFunc = UserConstructor("John"); // this = undefined -> lỗi ở strict mode
} catch (e) {
    console.log(e.message);
}

// 6️⃣ Class Expression (ít dùng nhưng nên biết)
section("6️⃣ Class Expression (ít dùng nhưng nên biết)");

// gán biến cho class
let UserClass = class {
    sayHi() {
        console.log("Hello");
    }
};

// biểu thức class có tên

let UserNamedClass = class MyClass {
    sayHi() {
        console.log(MyClass); // MyClass chỉ có thể truy cập bên trong class    }
    };
};
new UserNamedClass().sayHi(); // [class MyClass]
// console.log(MyClass); // Lỗi: MyClass is not defined - tên MyClass chỉ dùng trong class

// 7️⃣ Getter và Setter trong class
section("7️⃣ Getter và Setter trong class");

class UserWithGetterSetter {
    constructor(name) {
        this.name = name;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        if (value.length < 4) {
            console.log("Name is too short.");
            return;
        }
        this._name = value;
    }
}
let userGS = new UserWithGetterSetter("John");
userGS.name = "Peter";
console.log(userGS.name); // Peter
// userGS.name = "Al"; // Name is too short.
userGS.name = ""; // Name is too short.