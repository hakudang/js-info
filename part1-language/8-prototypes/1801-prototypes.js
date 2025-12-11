/** 
 * Prototypal Inheritance in JavaScript
 */

'use strict';

function section(title) {
    console.log('=== ' + title + ' ===');
}


// 2. Thiết lập prototype bằng proto
section('2. Thiết lập prototype bằng proto');

let animal = {
    eats : true
};

let rabbit = {
    jumps : true
};

rabbit.__proto__ = animal; // set rabbit.[[Prototype]] = animal
console.log("Rabbit eats:", rabbit.eats); // true (from the prototype)
console.log("Rabbit jumps:", rabbit.jumps); // true (own property)


// 3. Prototype dùng để đọc, không dùng để ghi
section('3. Prototype dùng để đọc, không dùng để ghi');

animal = {
    eats : true,
    walk() {
        console.log("Animal walk");
    }
};

rabbit = {
    jumps : true,
    __proto__ : animal
};

rabbit.walk(); // Animal walk (from the prototype)

// Ghi đè phương thức walk -> ok, không ảnh hưởng đến prototype
rabbit.walk = function() {
    console.log("Rabbit! Bounce-bounce!");
};

rabbit.walk(); // Rabbit! Bounce-bounce!

// 4. Prototype chain – chuỗi kế thừa
section('4. Prototype chain – chuỗi kế thừa');

let animalA = {
    eats : true,
    walk() {
        console.log("Animal walk");
    }
};
let rabbitA = {
    jumps : true,
    __proto__ : animalA
};
let longEarA = {
    earLength : 10,
    __proto__ : rabbitA
};
longEarA.walk(); // Animal walk
console.log("longEar jumps:", longEarA.jumps); // true

// 7. Setter/Getter vẫn hoạt động khi kế thừa
section('7. Setter/Getter vẫn hoạt động khi kế thừa');

let user = {
    name : "John",
    surname : "Smith",  
    set fullName(value) {
        [this.name, this.surname] = value.split(" ");
    },
    get fullName() {
        return `${this.name} ${this.surname}`;
    }
}

let admin = {
    __proto__ : user,
    isAdmin : true
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
    name : "White Rabbit",
    __proto__ : animalB
};

rabbitB.sleep();

console.log("Rabbit isSleeping:", rabbitB.isSleeping); // true
console.log("Animal isSleeping:", animalB.isSleeping); // undefined

// 9. for…in liệt kê cả thuộc tính kế thừa
section('9. for…in liệt kê cả thuộc tính kế thừa');

let animalC = { eats: true };
let rabbitC = { jumps: true, __proto__: animalC };
console.log("Object.keys(rabbitC):", Object.keys(rabbitC)); // jumps  (chỉ own properties)

for ( let prop in rabbitC ) {
    console.log(`Property: ${prop}`); // jumps, eats
}

// Muốn lọc thuộc tính riêng của object:

section('Muốn lọc thuộc tính riêng của object');

for ( let prop in rabbitC ) {
    let isOwn = rabbitC.hasOwnProperty(prop);
    if ( isOwn ) {
        console.log(`Our: ${prop}`);
    } else {
        console.log(`Inherited: ${prop}`);
    }
}