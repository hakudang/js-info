# Prototypal Inheritance

Trong lập trình, ta thường muốn tạo một object mới dựa trên object có sẵn, nhưng không muốn copy lại code → chỉ muốn mở rộng.
JavaScript hỗ trợ điều này thông qua Prototypal Inheritance.

## 1. [[Prototype]] – thuộc tính ẩn của mọi object

Mỗi object trong JS có một thuộc tính ẩn tên [[Prototype]], trỏ đến một object khác, hoặc null.

Khi bạn truy cập một thuộc tính mà object không có → JavaScript tự động tìm trong prototype.

## 2. Thiết lập prototype bằng __proto__
```js
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

rabbit.__proto__ = animal; // sets rabbit.[[Prototype]] = animal
```

Giờ rabbit sẽ tìm thuộc tính trong animal nếu không có:
```js
alert( rabbit.eats ); // true
alert( rabbit.jumps ); // true
```
## 3. Prototype dùng để đọc, không dùng để ghi

Nếu kế thừa phương thức:
```js
let animal = {
  eats: true,
  walk() {
    alert("Animal walk");
  }
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

rabbit.walk(); // Animal walk
```

Nhưng nếu bạn ghi đè:
```js
rabbit.walk = function() {
  alert("Rabbit! Bounce-bounce!");
};

rabbit.walk(); // Rabbit! Bounce-bounce!
```

→ Việc ghi không chạm vào prototype.

## 4. Prototype chain – chuỗi kế thừa

Prototype có thể dài nhiều tầng:
```js
let animal = { eats: true, walk() { alert("Animal walk"); } };
let rabbit = { jumps: true, __proto__: animal };
let longEar = { earLength: 10, __proto__: rabbit };

longEar.walk(); // Animal walk
alert(longEar.jumps); // true
```

Tìm thuộc tính → JS lần lượt tìm:
`longEar → rabbit → animal → Object.prototype → null.`

## 5. Quy tắc & giới hạn

Không được tạo vòng lặp prototype

`__proto__` phải là object hoặc null

Mỗi object chỉ có 1 prototype duy nhất

## 6. `__proto__` không phải `[[Prototype]]`

`__proto__` là getter/setter, còn `[[Prototype]]` là thuộc tính nội bộ.
Dù vậy, bạn vẫn có thể dùng `__proto__` trong JS hiện đại.

## 7. Setter/Getter vẫn hoạt động khi kế thừa
```js
let user = {
  name: "John",
  surname: "Smith",

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
};

let admin = {
  __proto__: user,
  isAdmin: true
};

alert(admin.fullName); // John Smith
admin.fullName = "Alice Cooper";

alert(admin.fullName); // Alice Cooper
alert(user.fullName);  // John Smith
```

Ghi chú cực quan trọng:
📌 `this` luôn là object đang gọi, không phải `prototype`.

## 8. Ví dụ minh họa giá trị của this trong phương thức kế thừa
```js
let animal = {
  walk() {
    if (!this.isSleeping) {
      alert(`I walk`);
    }
  },
  sleep() {
    this.isSleeping = true;
  }
};

let rabbit = {
  name: "White Rabbit",
  __proto__: animal
};

rabbit.sleep();

alert(rabbit.isSleeping); // true
alert(animal.isSleeping); // undefined
```

→ Phương thức được chia sẻ, nhưng state thì không chia sẻ.

## 9. for…in liệt kê cả thuộc tính kế thừa
```js
let animal = { eats: true };
let rabbit = { jumps: true, __proto__: animal };

alert(Object.keys(rabbit)); // jumps  (chỉ own properties)

for(let prop in rabbit) alert(prop); // jumps, eats
```

Muốn lọc thuộc tính riêng của object:
```js

for(let prop in rabbit) {
  let isOwn = rabbit.hasOwnProperty(prop);

  if (isOwn) alert(`Our: ${prop}`);
  else alert(`Inherited: ${prop}`);
}
```

`hasOwnProperty` được kế thừa từ `Object.prototype`.

## 10. Các hàm như Object.keys, Object.values không lấy thuộc tính kế thừa

Chúng chỉ lấy own properties, không đụng vào prototype.

## 🎯 Summary – Tóm tắt cực gọn

- Mọi object có thuộc tính ẩn [[Prototype]].
- Nếu không tìm thấy property → JS tìm trong prototype.
- Ghi/xóa property chỉ ảnh hưởng lên object hiện tại.
- `this` luôn là object trước dấu chấm.
- `for…in` liệt kê cả thuộc tính kế thừa; `Object.keys/values` không liệt kê.
- Prototype chain có thể dài, nhưng không được tạo vòng.

## 11. Bài tập

### Bài 1 : Working with prototype

Dưới đây là đoạn code tạo hai object rồi thay đổi chúng.
Những giá trị nào sẽ được hiển thị trong quá trình chạy?
```js
let animal = {
  jumps: null
};
let rabbit = {
  __proto__: animal,
  jumps: true
};

alert( rabbit.jumps ); // ? (1)

delete rabbit.jumps;

alert( rabbit.jumps ); // ? (2) 

delete animal.jumps;

alert( rabbit.jumps ); // ? (3)
```

Bạn cần đưa ra 3 câu trả lời.

#### Solution:

(1) true – vì rabbit có thuộc tính jumps riêng.

(2) null – sau khi xóa thuộc tính jumps của rabbit, JS tìm trong prototype animal, thấy giá trị null.

(3) undefined – sau khi xóa thuộc tính jumps của animal, JS không tìm thấy thuộc tính này ở đâu nữa.

### Bài 2 : Searching algorithm

Bài tập gồm hai phần.

Cho các object sau:
```js
let head = {
  glasses: 1
};

let table = {
  pen: 3
};

let bed = {
  sheet: 1,
  pillow: 2
};

let pockets = {
  money: 2000
};
```

Dùng __proto__ để gán prototype sao cho đường tìm kiếm thuộc tính sẽ đi theo thứ tự:
pockets → bed → table → head.

Ví dụ:
pockets.pen phải trả về 3 (tìm thấy ở table)
bed.glasses phải trả về 1 (tìm thấy ở head)

Trả lời câu hỏi:
Lấy glasses bằng pockets.glasses nhanh hơn hay head.glasses nhanh hơn?
(Nếu cần thì benchmark.)

#### Solution 1:
```js
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
```
#### Solution 2:
`pockets.glasses` và `head.glasses` đều mất cùng thời gian để truy cập, vì cả hai đều phải đi qua cùng một chuỗi prototype.

### Bài tập 3 : Where does it write?

Ta có rabbit kế thừa từ animal.

Khi ta gọi rabbit.eat(), object nào sẽ nhận thuộc tính full:
animal hay rabbit?
```js
let animal = {
  eat() {
    this.full = true;
  }
};

let rabbit = {
  __proto__: animal
};

rabbit.eat();
```

#### Solution:
`this` trong phương thức eat() tham chiếu đến object gọi phương thức, tức là rabbit.
Do đó, thuộc tính full sẽ được thêm vào object rabbit.

### Bài tập 4 : Why are both hamsters full?

Ta có hai con hamster: speedy và lazy, cả hai đều kế thừa từ object hamster.

Khi ta cho một con ăn, con còn lại cũng bị đầy bụng. Tại sao?
Làm sao sửa lỗi này?
```js
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// This one found the food
speedy.eat("apple");
alert( speedy.stomach ); // apple

// This one also has it, why? fix please.
alert( lazy.stomach ); // apple
```

#### Solution :
Khi ta cho một con ăn, con còn lại cũng bị đầy bụng vì cả hai con hamster đều chia sẻ cùng một thuộc tính stomach trong prototype hamster. Do đó, khi một con thêm thức ăn vào stomach, con còn lại cũng thấy thay đổi đó.

Để sửa lỗi này, mỗi con hamster nên có thuộc tính stomach riêng, không chia sẻ với prototype. Ví dụ:
```js
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster,
  stomach: []
};

let lazy = {
  __proto__: hamster,
  stomach: []
};
```