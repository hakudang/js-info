/** 
 * f.prototypes trong JavaScript
 */

'use strict';
function section(title) {
    console.log('=== ' + title + ' ===');
}

// 1. Cách F.prototype hoạt động
section('1. Cách F.prototype hoạt động');

let animal = {
    eats: true
};

function Rabbit(name) {
    this.name = name;
}

Rabbit.prototype = animal; 

let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal
console.log("Rabbit eats:", rabbit.eats); // true

// 2. F.prototype chỉ được dùng khi tạo object mới
section('2. F.prototype chỉ được dùng khi tạo object mới');

function Rabbit() {}
Rabbit.prototype = animal;

let rabbit1 = new Rabbit();
console.log("rabbit1.__proto__ === animal:", rabbit1.__proto__ === animal); // true

let otherObj = {};
Rabbit.prototype = otherObj; // đổi prototype khác

let rabbit2 = new Rabbit();
console.log("rabbit2.__proto__ === {}:", rabbit2.__proto__ === otherObj); // false

// 3. Giá trị mặc định của F.prototype
section('3. Giá trị mặc định của F.prototype');

function RabbitA() {}

console.log("Default RabbitA.prototype:", RabbitA.prototype); // {constructor: RabbitA}
console.log("RabbitA.prototype.constructor === RabbitA:", RabbitA.prototype.constructor === RabbitA); // true


function RabbitB(name) {
  this.name = name;
  console.log(name);
}

section('Dùng constructor của một object để tạo object mới:');
let rabbit3 = new RabbitB("White Rabbit");
console.log("rabbit3.constructor === RabbitB:", rabbit3.constructor === RabbitB); // true

let rabbit4 = new rabbit3.constructor("Black Rabbit");
console.log("rabbit4.constructor === RabbitB:", rabbit4.constructor === RabbitB); // true

// 4. Cảnh báo quan trọng: ghi đè prototype làm mất constructor
section('4. Cảnh báo quan trọng: ghi đè prototype làm mất constructor');

function RabbitC() {}
// ghi đè hoàn toàn prototype -> mất constructor
RabbitC.prototype = {
    jumps: true
};

let rabbitC = new RabbitC();
console.log("rabbitC.constructor === RabbitC :", rabbitC.constructor === RabbitC); // false

// 5. Cách giữ lại constructor đúng
section('5. Cách giữ lại constructor đúng');
// Cách 1 — Chỉ thêm thuộc tính, không ghi đè

section('Cách 1 — Chỉ thêm thuộc tính, không ghi đè');

function RabbitD() {}
// Not overwrite RabbitD.prototype totally
RabbitD.prototype.jumps = true;
// constructor vẫn còn
console.log("RabbitD.prototype.constructor === RabbitD:", RabbitD.prototype.constructor === RabbitD); // true

// Cách 2 — Ghi đè nhưng bổ sung constructor thủ công
section('Cách 2 — Ghi đè nhưng bổ sung constructor thủ công');
RabbitD.prototype = {
  jumps: true,
  constructor: RabbitD
};
console.log("RabbitD.prototype.constructor === RabbitD:", RabbitD.prototype.constructor === RabbitD); // true

// Giữ lại constructor rất quan trọng khi chúng ta dùng nó để tạo object mới.
let rabbitD = new RabbitD();
let rabbitE = new rabbitD.constructor();
console.log("rabbitE.constructor === RabbitD:", rabbitE.constructor === RabbitD); // true

// Bài Tập 

// Bài tập 1 : Changing "prototype"

section('Bài tập 1 : Changing "prototype"');

function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit_a = new Rabbit();

console.log( rabbit_a.eats ); 
// true, vì thuộc tính được tìm thấy trong Rabbit.prototype


function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit_b = new Rabbit();

Rabbit.prototype.eats = false;

console.log( rabbit_b.eats ); 

// false, vì thuộc tính được tìm thấy trong Rabbit.prototype

function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit_c = new Rabbit();

delete rabbit_c.eats;

console.log( rabbit_c.eats ); 
// true, vì thuộc tính được tìm thấy trong Rabbit.prototype

function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit_d = new Rabbit();

delete Rabbit.prototype.eats;

console.log( rabbit_d.eats ); 
// undefined, vì thuộc tính đã bị xóa khỏi Rabbit.prototype

// Bài tập 2 : Create an object with the same constructor
section('Bài tập 2 : Create an object with the same constructor');

// xem file 1802-f.prototypes.md