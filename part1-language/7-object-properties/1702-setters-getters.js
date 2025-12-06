/** 
 * Setters và Getters trong JavaScript
 * --------------------------------
 * - JS hỗ trợ hai loại thuộc tính trong object:
 *  1. Data property (thuộc tính dữ liệu)
 *     - Là thuộc tính thông thường có giá trị cụ thể
 *     - Có thể đọc và ghi trực tiếp
 *     - Ví dụ: obj.prop = value; let val = obj.prop;
 * 
 *  2. Accessor property (thuộc tính truy cập)
 *    - Là thuộc tính ảo không lưu trữ giá trị trực tiếp
 *   - Được định nghĩa thông qua các hàm getter và setter
 *   - Khi truy cập hoặc gán giá trị, các hàm này sẽ được gọi
 *   - Ví dụ:
 *     + Getter: lấy giá trị thông qua hàm
 *     + Setter: gán giá trị thông qua hàm
 *   - Lợi ích của Accessor property:
 *     + Cho phép kiểm soát việc truy cập và gán giá trị
 *     + Thực hiện các thao tác bổ sung khi giá trị được lấy hoặc thay đổi
 *     + Giúp ẩn chi tiết triển khai bên trong object
 * 
 * - Setters và Getters là các phương thức đặc biệt
 *   cho phép chúng ta định nghĩa các thuộc tính ảo (virtual properties)
 *   trong các đối tượng JavaScript.
 * - Chúng giúp kiểm soát việc truy cập và gán giá trị cho các thuộc tính
 *   thông qua các hàm thay vì truy cập trực tiếp.
 * - Điều này rất hữu ích để thực hiện các phép tính, kiểm tra dữ liệu
 *   hoặc thực hiện các hành động phụ khi thuộc tính được truy cập hoặc thay đổi.
 * 
 * Tóm tắt:
 * ✅Getter / Setter dùng khi:
*  - Cần computed property
*  - Cần validate / transform dữ liệu
*  - Cần backward compatibility
*  - Muốn API “đẹp” nhưng logic phức tạp bên trong
* 🚫 Không dùng khi:
*  - Chỉ đơn giản lưu giá trị
*  - Không cần xử lý thêm
*/

"use strict";

// in ra tiêu đề
document.write("<h2> Setters và Getters trong JavaScript </h2>");
function section(title) {
    console.log("\n================================ ");
    console.log("=== " + title + " ===");
    console.log("================================ \n");
}

// 1.Data property (thuộc tính dữ liệu)

section("1. Data property (thuộc tính dữ liệu)");

let user = {
    firstName: "John",
    lastName: "Doe"
};

user.firstName = "Jane"; // gán giá trị mới
console.log(user.firstName); // Jane
console.log(user.lastName);  // Doe

// 2. Accessor property (thuộc tính truy cập)
section("2. Accessor property (thuộc tính truy cập)");

// 2.1 Cú pháp getter và setter
let obj = {
    // getter
    get prop() {
        // chạy khi đọc obj.prop
    },
    // setter
    set prop(value) {
        // chạy khi gán obj.prop = value
    }
};

// 2.2 Ví dụ cơ bản: fullName
section("2.2 Ví dụ cơ bản: fullName");

let user2 = {
    name: "John",
    surname: "Doe",
    get fullName() {
        return `${this.name} ${this.surname}`;
    }
};

console.log(user2.fullName); // John Doe, gọi getter, không có dấu ()

// 2.3 Getter không có setter → không gán được

section("2.3 Getter không có setter → không gán được");

let user3 = {
    get fullName() {
        return "John Smith";
    }
};

// user3.fullName = "Alice Cooper"; //  TypeError: Cannot set property fullName of #<Object> which has only a getter

// 2.4 Thêm setter để có thể gán value 
section("2.4 Thêm setter để có thể gán value ");

let user4 = {
    name: "John",
    surname: "Doe",

    get fullName() {
        return `${this.name} ${this.surname}`;
    },

    set fullName(value) {
        [this.name, this.surname] = value.split(" ");
    }
};

user4.fullName = "Alice Cooper"; // gọi setter

console.log("name: " + user4.name);    // Alice
console.log("surname: " + user4.surname); // Cooper

// fullName trở thành thuộc tính ảo
// khi đọc thì gọi getter, khi gán thì gọi setter

// 2.5 Accessor Descriptor với defineProperty

// Accessor property cũng có thể được tạo bằng cách 
// sử dụng Object.defineProperty
// với các thuộc tính get và set trong descriptor 
// thay cho value và writable
section("2.5 Accessor Descriptor với defineProperty");

let user5 = {
    name: "John",
    surname: "Doe"
};

Object.defineProperty(user5, 'fullName', {
    get() {
        return `${this.name} ${this.surname}`;
    },
    set(value) {
        [this.name, this.surname] = value.split(" ");
    }
});

user5.fullName = "Alice Cooper"; // gọi setter

console.log("name: " + user5.name);
console.log("surname: " + user5.surname);

console.log("fullName: " + user5.fullName); // gọi getter

// Không thể vừa là data property vừa là accessor

Object.defineProperty(user5, 'age', {
    value: 30,
    // get() { return 30; } // SyntaxError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute
});
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

// 2.7 Dùng accessor để giữ sự tương thích compatibility (case cực quan trọng)
// Ví dụ: đổi thuộc tính age sang birthday
// nhưng code cũ vẫn dùng age thì sao?
// Giải pháp: dùng getter và setter cho age

section("2.7 Dùng accessor để giữ sự tương thích compatibility (case cực quan trọng)");

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