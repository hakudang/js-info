/** 
 * Setters và Getters trong JavaScript
 * 
*/

"use strict";

// in ra tiêu đề
document.write("<h2> Setters và Getters trong JavaScript </h2>");
function section(title) {
    console.log("\n================================ ");
    console.log("=== " + title + " ===");
    console.log("================================ \n");
}

// 3. Getter – tạo property “ảo” để đọc
section("3. Getter – tạo property “ảo” để đọc");

let user2 = {
    name: "John",
    surname: "Smith",
    get fullName() {
        return `${this.name} ${this.surname}`;
    }
};

console.log(user2.fullName); // John Doe, gọi getter, không có dấu ()

// 4 Getter-onlyr → không gán được

section("4 Getter-only → không gán được");

let user3 = {
    get fullName() {
        return "John Smith";
    }
};

// user3.fullName = "Alice Cooper"; //  TypeError: Cannot set property fullName of #<Object> which has only a getter

// 5. Setter – cho phép ghi và xử lý logic
section("5. Setter – cho phép ghi và xử lý logic");

// fullName trở thành thuộc tính ảo
// khi đọc thì gọi getter, khi gán thì gọi setter

let user4 = {
    name: "John",
    surname: "Smith",

    get fullName() {
        return `${this.name} ${this.surname}`;
    },

    set fullName(value) {
        [this.name, this.surname] = value.split(" ");
    }
};

user4.fullName = "Alice Cooper"; // Writable

console.log("name: " + user4.name);    
console.log("surname: " + user4.surname); 
console.log("fullName: " + user4.fullName); // Readable



// 6. Accessor Descriptor với defineProperty

section("6. Accessor Descriptor với defineProperty");

// Accessor property cũng có thể được tạo bằng cách 
// sử dụng Object.defineProperty
// get và set trong descriptor thay cho value và ghi dữ liệu

let user5 = {
    name: "John",
    surname: "Smith"
};

Object.defineProperty(user5, 'fullName', {
    get() {
        return `${this.name} ${this.surname}`;
    },
    set(value) {
        [this.name, this.surname] = value.split(" ");
    }
});

user5.fullName = "Alice Cooper"; // Writable

console.log("name: " + user5.name);
console.log("surname: " + user5.surname);

console.log("fullName: " + user5.fullName); // Readable

// Không thể vừa là data property vừa là accessor

Object.defineProperty(user5, 'age', {
    // get() { return 2 }, // SyntaxError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute
    value: 2
});

console.log(user5.age); // 2

// Kết quả trên cho thấy không thể định nghĩa cùng lúc
// cả value và get/set cho cùng một thuộc tính

// 2.6 Getter / Setter để kiểm soát dữ liệu (validation)
section("2.6 Getter / Setter để kiểm soát dữ liệu (validation)");

let user6 = {
    get name() {
        return this._name; // dùng thuộc tính ẩn _name để lưu trữ giá trị
        // dùng this.name lỗi do gọi đệ quy vô hạn
    },
    set name(value) {
        if (value.length < 4) {
            console.log(`${value} is too short, need at least 4 characters`);
            return;
        }
        this._name = value;
    }
}

user6.name = "Dang"; // OK
console.log(user6.name); // Dang

user6.name = "Tom"; // Name is too short, need at least 4 characters
console.log(user6.name); // Dang (giá trị không đổi)

// 2.7 Dùng accessor để giữ sự tương thích compatibility (case cực quan trọng)

section("2.7 Dùng accessor để giữ sự tương thích compatibility (case cực quan trọng)");

// Ví dụ: đổi thuộc tính age sang birthday, nhưng code cũ vẫn dùng age thì sao?
// Giải pháp: dùng getter và setter cho age

function User(name, age) {
    this.name = name;
    this.age = age;
}

// Giải pháp: dùng getter và setter cho age
function User(name, birthday) {
    this.name = name;
    this.birthday = birthday;

    Object.defineProperty(this, 'age', {
        get() {
            return new Date().getFullYear() - this.birthday.getFullYear();
        }
    });
}

let dang = new User("Dang", new Date(1978,1,9 )); 
console.log(dang.age); // 47 (năm hiện tại là 2025)