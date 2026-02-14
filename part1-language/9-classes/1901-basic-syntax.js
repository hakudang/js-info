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
        return this._name; // dùng tên biến khác name để tránh gọi đệ quy vô hạn khi truy cập this.name trong getter và setter
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

// 8️⃣ Computed method names
section("8️⃣ Computed method names");

class UserComputed {
    ["say" + "Hi" + 2]() {
        console.log("Hello");
    }
}
new UserComputed().sayHi2(); // Hello

// 9️⃣ Class Fields (thuộc tính khai báo trực tiếp)
section("9️⃣ Class Fields (thuộc tính khai báo trực tiếp)");

class UserWithFields {
    name = "John";
    sayHi() {
        console.log(`Hello, ${this.name}!`);
    }
}

new UserWithFields().sayHi(); // Hello, John!

let userWithFields = new UserWithFields();
console.log(userWithFields.name); // John

// 10️⃣ Bound methods với class fields (rất thực tế)
section("10️⃣ Bound methods với class fields (rất thực tế)");
// Vấn đề mất this

class ButtonNoThis {
    constructor(value) {
        this.value = value;
    }
    // click() {
    click() {
        console.log(this.value);
        // this bị mất vì cách gọi setTimeout(button.click, 1000);
    }
}
let buttonNoThis = new ButtonNoThis("hello");
// setTimeout(buttonNoThis.click, 1000); // undefined
setTimeout(buttonNoThis.click.bind(buttonNoThis), 1000); 

// Dùng arrow function để giữ this
class Button {
    constructor(value) {
        this.value = value;
    }
    // click() {
    click = () => {
        console.log(this.value);
        // this bị mất vì cách gọi setTimeout(button.click, 1000);
    }
}
let button = new Button("hello");
setTimeout(button.click, 1000); 

