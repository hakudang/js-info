/** 
 * Prototypal Inheritance in JavaScript
 */

'use strict';

// tiêu đề trang 
document.write('<h2>Prototypal Inheritance in JavaScript</h2>');

function section(title) {
    console.log('=== ' + title + ' ===');
}


// 2. Thiết lập prototype bằng proto
section('2. Thiết lập prototype bằng proto');

let animal = {
    eats: true
};

let rabbit = {
    jumps: true
};

rabbit.__proto__ = animal; // set rabbit.[[Prototype]] = animal
console.log("Rabbit eats:", rabbit.eats); // true (from the prototype)
console.log("Rabbit jumps:", rabbit.jumps); // true (own property)


// 3. Prototype dùng để đọc, không dùng để ghi
section('3. Prototype dùng để đọc, không dùng để ghi');

animal = {
    eats: true,
    walk() {
        console.log("Animal walk");
    }
};

rabbit = {
    jumps: true,
    __proto__: animal
};

rabbit.walk(); // Animal walk (from the prototype)

// Ghi đè phương thức walk -> ok, không ảnh hưởng đến prototype
rabbit.walk = function () {
    console.log("Rabbit! Bounce-bounce!");
};

rabbit.walk(); // Rabbit! Bounce-bounce!

// 4. Prototype chain – chuỗi kế thừa
section('4. Prototype chain – chuỗi kế thừa');

let animalA = {
    eats: true,
    walk() {
        console.log("Animal walk");
    }
};
let rabbitA = {
    jumps: true,
    __proto__: animalA
};
let longEarA = {
    earLength: 10,
    __proto__: rabbitA
};
longEarA.walk(); // Animal walk
console.log("longEar jumps:", longEarA.jumps); // true

// 7. Setter/Getter vẫn hoạt động khi kế thừa
section('7. Setter/Getter vẫn hoạt động khi kế thừa');

let user = {
    name: "John",
    surname: "Smith",
    set fullName(value) {
        [this.name, this.surname] = value.split(" ");
    },
    get fullName() {
        return `${this.name} ${this.surname}`;
    }
}

let admin = {
    __proto__: user,
    isAdmin: true
}

console.log("Before:", admin.fullName); // John Smith
admin.fullName = "Alice Cooper"; // Calls the setter
console.log("After:", admin.fullName); // Alice Cooper

// 8. Ví dụ minh họa giá trị của this trong phương thức kế thừa
section('8. Ví dụ minh họa giá trị của this trong phương thức kế thừa');

let animalB = {
    walk() {
        if (!this.isSleeping) {
            console.log("I walk");
        }
    },
    sleep() {
        this.isSleeping = true;
    }
};
let rabbitB = {
    name: "White Rabbit",
    __proto__: animalB
};

rabbitB.sleep();

console.log("Rabbit isSleeping:", rabbitB.isSleeping); // true
console.log("Animal isSleeping:", animalB.isSleeping); // undefined

// 9. for…in liệt kê cả thuộc tính kế thừa
section('9. for…in liệt kê cả thuộc tính kế thừa');

let animalC = { eats: true };
let rabbitC = { jumps: true, __proto__: animalC };
console.log("Object.keys(rabbitC):", Object.keys(rabbitC)); // jumps  (chỉ own properties)

for (let prop in rabbitC) {
    console.log(`Property: ${prop}`); // jumps, eats
}

// Muốn lọc thuộc tính riêng của object:

section('Muốn lọc thuộc tính riêng của object');

for (let prop in rabbitC) {
    let isOwn = rabbitC.hasOwnProperty(prop);
    if (isOwn) {
        console.log(`Our: ${prop}`);
    } else {
        console.log(`Inherited: ${prop}`);
    }
}

// Bài tập 

// Bài tập 1 - Working with prototype
section('Bài tập 1 - Working with prototype');
let animalD = {
    jumps: null
};
let rabbitD = {
    __proto__: animalD,
    jumps: true
};

console.log(rabbitD.jumps); // ? (1) -> true
delete rabbitD.jumps;

console.log(rabbitD.jumps); // ? (2) -> null
delete animalD.jumps;

console.log(rabbitD.jumps); // ? (3) -> undefined

// Bài tập 2 - Searching algorithm
section('Bài tập 2 - Searching algorithm');
// Dùng __proto__ để gán prototype sao cho đường tìm kiếm thuộc tính sẽ đi theo thứ tự:
// // pockets → bed → table → head.
// Ví dụ:
// pockets.pen phải trả về 3 (tìm thấy ở table)
// bed.glasses phải trả về 1 (tìm thấy ở head)

let head = {
    glasses: 1
};

let table = {
    pen: 3,
    __proto__: head // table.[[Prototype]] = head
};

let bed = {
    sheet: 1,
    pillow: 2,
    __proto__: table // bed.[[Prototype]] = table
};

let pockets = {
    money: 2000,
    __proto__: bed // pockets.[[Prototype]] = bed
};

console.log("pockets.pen:", pockets.pen); // 3
console.log("bed.glasses:", bed.glasses); // 1

// Bài tập 3 : Where does it write?
section('Bài tập 3 : Where does it write?');

// Khi ta gọi rabbit.eat(), object nào sẽ nhận thuộc tính full:
// animal hay rabbit?

let animalE = {
  eat() {
    this.full = true;
  }
};

let rabbitE = {
  __proto__: animalE
};

rabbitE.eat();

console.log("rabbitE.full:", rabbitE.full); // true
console.log("animalE.full:", animalE.full); // undefined

// Bài tập 4 : Why are both hamsters full?
section('Bài tập 4 : Why are both hamsters full?');

// Khi ta cho một con ăn, con còn lại cũng bị đầy bụng. Tại sao?
// Làm sao sửa lỗi này?

let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
    stomach: [],
  __proto__: hamster
};

let lazy = {
    stomach: [],
  __proto__: hamster
};

// This one found the food
speedy.eat("apple");
console.log( "speedy stomach: ",speedy.stomach ); // apple

// This one also has it, why? fix please.
console.log( "lazy stomach: ",lazy.stomach ); // apple