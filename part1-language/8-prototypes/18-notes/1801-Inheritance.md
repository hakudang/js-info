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