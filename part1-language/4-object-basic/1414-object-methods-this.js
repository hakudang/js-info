/** file: 1414-object-method.js
 * Giới thiệu về phương thức của đối tượng trong JavaScript và this
 * 1. Định nghĩa phương thức
 * 2. Thêm phương thức cho đối tượng
 * 2.1 Thêm phương thức cho đối tượng - biểu thức hàm
 * 2.2 Thêm phương thức bên trong đối tượng - khai báo hàm
 * 2.3 Thêm phương thức cho đối tượng - cú pháp ngắn gọn, bên trong khai báo đối tượng
 * 3. Phương thức và this
 * 4. This - Không bị ràng buộc
 * 4.1 Giá trị của this được xác định tại thời điểm gọi phương thức, 
 *     không phải tại thời điểm định nghĩa phương thức
 * 4.2 Gọi phương thức không có đối tượng - undefined 
 * 5. hàm Arrow function và this
 * 6. Bài tập
 *  Bài tập 1 - lỗi khi dùng this
 *  Bài tập 2 - dùng phương thức tạo thuộc tính, tính toán và trả về giá trị trong đối tượng
 *  Bài tập 3 - dùng this trả về đối tượng hiện tại để gọi chuỗi các phương thức liên tiếp
 *  Bài tập 4 - show các thuộc tính bên trong đối tượng
 */

"use strict";

// in ra html tag <h2> Object Methods </h2>
document.write("<h2> Object Methods, 'this' </h2>");

// 1. Định nghĩa phương thức
// Đối tượng thường được tạo ra để biểu diễn một thực thể trong thực tiễn
// Ví dụ: người dùng, sản phẩm, đơn hàng, v.v.
// hàm là 1 thuộc tính của đối tượng, được gọi là phương thức

let user = {
    name: "John",
    age: 30,
};

// 2. Thêm phương thức cho đối tượng

// Tạo đối tượng user với các thuộc tính name và age
// người dùng thực tế có thể thực hiện các hành động như đưa và giỏ hàng, đăng nhập, đăng xuất, v.v.
// Các hành động này được biểu diễn dưới dạng các phương thức của đối tượng

// 2.1 Thêm phương thức cho đối tượng - biểu thức hàm

// biểu thức hàm : tạo ra 1 hàm và gán nó cho thuộc tính sayHi của đối tượng user2
let user1 = {
    name: "John",
    age: 30,
};

// biểu thức hàm, gán hàm cho thuộc tính sayHi của đối tượng user1
user1.sayHi = function () {
    console.log("Hello!");
}

// gọi phương thức sayHi của đối tượng user1
user1.sayHi();

// biểu thức hàm : tạo ra 1 hàm và gán nó cho thuộc tính sayHi của đối tượng user1
// Tương đương với việc định nghĩa phương thức bên trong đối tượng

// 2.2 Khai báo hàm

// khai báo hàm : khai báo hàm sayHi, sau đó gán nó cho thuộc tính sayHi của đối tượng cho hàm 
let user2 = {
    name: "Alice",
    age: 25,
};

// gán thuộc tính phương thức sayHi cho hàm sayHi
user2.sayHi = sayHi;

// khai báo hàm
function sayHi() {
    console.log("Hello!");
}

// gọi phương thức sayHi của đối tượng user2
user2.sayHi();

// 2.3 Cú pháp ngắn gọn, bên trong khai báo đối tượng

// cú pháp cơ bản 
let user3 = {
    name: "Bob",
    age: 40,
    // phương thức sayHi
    sayHi: function () {
        console.log("Hello!");
    }
};

// cú pháp ngắn gọn
let user4 = {
    name: "Bob",
    age: 40,
    sayHi() {
        console.log("Hello!");
    }
};

//3. Phương thức và this
// Trong phương thức, từ khóa this tham chiếu đến đối tượng mà phương thức thuộc về

// 3.1 Từ khóa this - truy cập đối tượng hiện tại
let user5 = {
    name: "Charlie",
    age: 35,
    sayHi() {
        console.log(`Hello, my name is ${this.name}`);
    }
};

// gọi phương thức sayHi của đối tượng user5
user5.sayHi();

//3.2 Tránh lỗi với this
let ad = {
    name: "Diana",
    age: 28,
    sayHi() {
        // console.log(`Hello, my name is ${ad.name}`); // sai, nên tránh dùng ad.name mà dùng this.name
        console.log(`Hello, my name is ${this.name}`); // đúng, fix lỗi bằng cách dùng this.name
    }
};
let administrator = ad;

// gán ad = null
ad = null; // gán ad = null
// administrator.sayHi(); // Lỗi! dòng code 107, ad là null, không thể truy cập thuộc tính name -> dùng this.name để tránh lỗi này

// gọi phương thức sayHi của đối tượng ad
administrator.sayHi(); // Hello, my name is Diana

// 4. This - Không bị ràng buộc

// 4.1 Giá trị của this được xác định tại thời điểm gọi phương thức, không phải tại thời điểm định nghĩa phương thức
let user6 = { name: "David" };
let admin = { name: "Eva" };
function sayHi() {
    console.log(`Hello, my name is ${this.name}`);
}
// gán phương thức sayHi cho đối tượng user6 và admin
user6.sayHi = sayHi;
admin.sayHi = sayHi;
// gọi phương thức sayHi của đối tượng user6
user6.sayHi(); // Hello, my name is David
// gọi phương thức sayHi của đối tượng admin
admin.sayHi(); // Hello, my name is Eva

//4.2 Gọi phương thức không có đối tượng
// Khi gọi một hàm không phải là phương thức của đối tượng, this sẽ là undefined trong chế độ nghiêm ngặt
function sayHello() {
    console.log(this);
}
sayHello(); // undefined trong chế độ nghiêm ngặt

// 5. hàm Arrow function và this
// Arrow function không có this riêng, nó kế thừa this từ ngữ cảnh bao quanh tại thời điểm định nghĩa
let group = {
    title: "Our Group",
    students: ["John", "Alice", "Bob"],
    showList() {
        this.students.forEach(student => {
            console.log(`${this.title}: ${student}`);
        });
    }
};
group.showList();


// 6. Bài tập - lỗi khi dùng this 

// Bài tập 1
function makeUser() {
    return {
        name: "john",
        ref: this
    };
}

let user7 = makeUser();
console.log(user7.name); // john
console.log(user7.ref); // this trong hàm makeUser trỏ đến undefined trong chế độ nghiêm ngặt
// console.log (user7.ref.name); // Lỗi! không thể đọc thuộc tính 'name' của undefined

// Sửa lại bằng cách sử dụng hàm tạo
function fixMakeUser() {
    this.name = "john";
    this.ref = this;
}
let user8 = new fixMakeUser();
console.log(user8.ref.name); // john    

// Bài tập 2 - dùng phương thức tạo thuộc tính, tính toán và trả về giá trị trong đối tượng

let calculator = {
    read() {
        this.a = +prompt("Nhập số a:", 0);
        this.b = +prompt("Nhập số b:", 0);
    },
    sum() {
        return this.a + this.b;
    },
    mul() {
        return this.a * this.b;
    }
}
calculator.read()
console.log(calculator.sum());
console.log(calculator.mul());

// Bài tập 3 - dùng this trả về đối tượng hiện tại để gọi chuỗi các phương thức liên tiếp
let ladder = { 
    step: 0,
    up() {
        this.step++;
        return this; // thêm để fix lỗi cho hàng 230
    },
    down() {
        this.step--;
        return this; // thêm để fix lỗi cho hàng 230
    },
    showStep: function () { // shows the current step
        console.log(this.step);
        return this; // thêm để fix lỗi cho hàng 230
    }
};

ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
ladder.down();
ladder.showStep(); // 0

// ladder.up().up().down().showStep().down().showStep(); // Lỗi! vì các phương thức up, down, showStep không trả về đối tượng ladder để có thể gọi chuỗi các phương thức liên tiếp
ladder.up().up().down().showStep().down().showStep(); // 1 0

// bài tập 4 - show các thuộc tính bên trong đối tượng 

let sportClub = {
    title: "EBINAP",
    students: ["John", "Alice", "Bob"],
    showList() {
        this.students.forEach(student => {
            console.log(`${this.title}: ${student}`);
        });
    },
    showObjects() { 
        for (let key in this) {
            console.log(`${key}: ${this[key]}`);
        }
    }
};
sportClub.showObjects(); // in ra tất cả các thuộc tính của đối tượng sportClub