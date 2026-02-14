/** @file 
 * 
 */

function section(title) {
    console.log(`\n--- ${title} ---\n`);
}

section('1. Class inheritance là gì?');

class Animal {
    constructor(name) {
        this.speed = 0;
        this.name = name;
    }

    run(speed) {
        this.speed = speed;
        console.log(`${this.name} chạy với tốc độ ${this.speed}.`);
    }

    stop() {
        this.speed = 0;
        console.log(`${this.name} dừng lại.`);
    }
}

let animal = new Animal("Mèo");
animal.run(10); // Mèo chạy với tốc độ 10.
animal.stop(); // Mèo dừng lại.

section('2. Dùng extends để kế thừa');

class Rabbit extends Animal {
    hide() {
        console.log(`${this.name} đang ẩn nấp!`);
    }
}

let rabbit = new Rabbit("Thỏ");
rabbit.run(5); // Thỏ chạy với tốc độ 5.
rabbit.hide(); // Thỏ đang ẩn nấp!


section('4. Any expression is allowed after extends');
// Không chỉ class — bất kỳ expression nào trả về class đều dùng được.
function f(phrase) {
    return class {
        sayHi() {
            console.log(phrase);
        }
    };
}

class User extends f("Xin chào") { }

new User().sayHi(); // Xin chào

section('5. Overriding method (ghi đè method)');

class Dog extends Animal {
    // Ghi đè method run
    run(speed) {
        this.speed = speed * 2;
        console.log(`${this.name} đang chạy tốc độ gấp bội: ${this.speed}.`);
    }
}

let dog = new Dog("Chó");
dog.run(5); // Chó đang chạy tốc độ gấp đôi bình thường!

section('6. Dùng super để gọi method cha');

class Cat extends Animal {
    hide() {
        console.log(`${this.name} đang ẩn nấp!`);
    }
    stop() {
        super.stop(); // goi method cha
        this.hide(); // them hanh vi
    }
}

let cat = new Cat("Mèo");
cat.run(10);
cat.stop(); // Mèo dừng lại. Mèo đang ẩn nấp!

section('8. Constructor inheritance (chỗ dễ sai nhất)');
/*
class Rabbit1 extends Animal {
    constructor(name, earLength) {
        this.speed = 0; // lỗi: phải gọi super() trước khi sử dụng this
        this.name = name;
        this.earLength = earLength; // thêm thuộc tính mới
    }
}

let rabbit1 = new Rabbit1("Thỏ", 10); 

*/

class Rabbit2 extends Animal {
    constructor(name, earLength) {
        super(name); // sửa lỗi : gọi super(name) để khởi tạo name và speed
        this.earLength = earLength; // thêm thuộc tính mới
    }
}

let rabbit2 = new Rabbit2("Thỏ", 10);
console.log('Tên : ', rabbit2.name, ' Chiều dài tai: ', rabbit2.earLength); // Thỏ 10

section('9. Overriding class fields');

class UserNetwork {
    constructor(role = "Người dùng") {
        this.role = role;
        this.showRole(); // gọi method trong constructor
    }

    showRole() {
        console.log(`Role : ${this.role}!`);
    }
}

class Admin extends UserNetwork {
    constructor() {
        super("Quản trị viên"); // gọi constructor cha với role = "Quản trị viên"
    }
}

let nguoiDung = new UserNetwork();
let quanTri = new Admin();