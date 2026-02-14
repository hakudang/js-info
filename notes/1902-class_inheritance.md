
# Class Inheritance trong JavaScript

Tài liệu này **giữ lại đầy đủ các ví dụ gốc**, nhưng sắp xếp lại theo luồng học dễ hiểu để nắm chắc Class Inheritance trong JavaScript.

---

## 1. Class inheritance là gì?

**Inheritance (kế thừa)** = một class mới mở rộng class cũ.

- Class con dùng lại code của class cha.
- Có thể thêm hoặc sửa hành vi.

### Ví dụ gốc: Class cha `Animal`

```js
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} stands still.`);
  }
}

let animal = new Animal("My animal");
```

---

## 2. Dùng `extends` để kế thừa

Cú pháp:

```js
class Child extends Parent
```

### Ví dụ gốc: Rabbit kế thừa Animal

```js
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }
}

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.hide(); // White Rabbit hides!
```

**Ý nghĩa**

- Rabbit có method riêng (`hide`)
- Đồng thời kế thừa method của Animal (`run`, `stop`)

---

## 3. Bên trong `extends` hoạt động như thế nào?

JavaScript dùng prototype chain:

```
rabbit object
   ↓
Rabbit.prototype
   ↓
Animal.prototype
```

Khi gọi:

```js
rabbit.run()
```

JS tìm theo thứ tự:

1. rabbit object
2. Rabbit.prototype
3. Animal.prototype (tìm thấy run)

---

## 4. Any expression is allowed after extends

Không chỉ class — bất kỳ expression nào trả về class đều dùng được.

### Ví dụ gốc

```js
function f(phrase) {
  return class {
    sayHi() { alert(phrase); }
  };
}

class User extends f("Hello") {}

new User().sayHi(); // Hello
```

---

## 5. Overriding method (ghi đè method)

Class con có thể viết lại method của class cha.

```js
class Rabbit extends Animal {
  stop() {
    // method này thay cho stop() của Animal
  }
}
```

---

## 6. Dùng `super` để gọi method cha

Thường không muốn thay hoàn toàn — chỉ mở rộng hành vi.

### Ví dụ gốc (Rabbit tự hide khi stop)

```js
class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  run(speed) {
    this.speed = speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }

  stop() {
    this.speed = 0;
    alert(`${this.name} stands still.`);
  }

}

class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }

  stop() {
    super.stop(); // gọi method cha
    this.hide();  // thêm hành vi
  }
}

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5);
rabbit.stop();
```

---

## 7. Arrow functions không có `super`

Arrow function dùng `super` từ scope bên ngoài.

### Ví dụ chạy được

```js
class Rabbit extends Animal {
  stop() {
    setTimeout(() => super.stop(), 1000);
  }
}
```

### Ví dụ lỗi

```js
setTimeout(function() { super.stop() }, 1000);
// Error
```

---

## 8. Constructor inheritance (chỗ dễ sai nhất)

### Nếu class con KHÔNG có constructor

JS tự tạo:

```js
class Rabbit extends Animal {
  constructor(...args) {
    super(...args);
  }
}
```

---

### Ví dụ gốc bị lỗi

```js
class Rabbit extends Animal {

  constructor(name, earLength) {
    this.speed = 0;
    this.name = name;
    this.earLength = earLength;
  }

}

let rabbit = new Rabbit("White Rabbit", 10);
// Error: this is not defined
```

### Vì sao?

Class con **không tự tạo `this`**.  
Nó phải gọi constructor cha trước.

---

### Cách đúng

```js
class Rabbit extends Animal {

  constructor(name, earLength) {
    super(name);
    this.earLength = earLength;
  }

}

let rabbit = new Rabbit("White Rabbit", 10);
alert(rabbit.name); // White Rabbit
alert(rabbit.earLength); // 10
```

---

## 9. Overriding class fields (điểm dễ gây nhầm)

### Ví dụ gốc

```js
class Animal {
  name = 'animal';

  constructor() {
    alert(this.name); // (*)
  }
}

class Rabbit extends Animal {
  name = 'rabbit';
}

new Animal(); // animal
new Rabbit(); // animal
```

### Giải thích

Thứ tự khởi tạo:

1. constructor cha chạy
2. sau đó field của class con mới được tạo

→ constructor cha chỉ thấy field của cha.

---

## 10. So sánh với method override

### Ví dụ gốc

```js
class Animal {
  showName() {
    alert('animal');
  }

  constructor() {
    this.showName();
  }
}

class Rabbit extends Animal {
  showName() {
    alert('rabbit');
  }
}

new Animal(); // animal
new Rabbit(); // rabbit
```

Method override hoạt động như mong đợi.

---

## 11. Super internals & [[HomeObject]] (ý chính)

JavaScript gắn internal property:

```
[[HomeObject]]
```

cho mỗi method được khai báo theo cú pháp method.

Nhờ đó:

```js
super.method()
```

biết phải đi lên prototype nào.

---

### Vì sao không dùng this.__proto__?

Ví dụ (rút gọn từ ví dụ gốc):

```js
this.__proto__.eat.call(this)
```

sẽ gây loop vô hạn khi prototype chain dài hơn.

---

## 12. Ví dụ super hoạt động đúng nhờ [[HomeObject]]

```js
let animal = {
  name: "Animal",
  eat() {
    alert(`${this.name} eats.`);
  }
};

let rabbit = {
  __proto__: animal,
  name: "Rabbit",
  eat() {
    super.eat();
  }
};

let longEar = {
  __proto__: rabbit,
  name: "Long Ear",
  eat() {
    super.eat();
  }
};

longEar.eat(); // Long Ear eats.
```

---

## 13. Method có super không nên copy

### Ví dụ gốc

```js
let animal = {
  sayHi() {
    alert(`I'm an animal`);
  }
};

let rabbit = {
  __proto__: animal,
  sayHi() {
    super.sayHi();
  }
};

let plant = {
  sayHi() {
    alert("I'm a plant");
  }
};

let tree = {
  __proto__: plant,
  sayHi: rabbit.sayHi
};

tree.sayHi(); // I'm an animal (!)
```

**Lý do**

- Method nhớ [[HomeObject]] cũ
- super đi sai chain.

---

## 14. Methods vs function properties

### Sai (không có [[HomeObject]])

```js
let animal = {
  eat: function() {
    // ...
  }
};

let rabbit = {
  __proto__: animal,
  eat: function() {
    super.eat();
  }
};

rabbit.eat(); // Error
```

Phải dùng:

```js
eat() { ... }
```

---

## 15. Summary (tóm tắt nhanh)

### Kế thừa

```js
class Child extends Parent
```

→ Child kế thừa method của Parent.

---

### Constructor

- Nếu override constructor:
  - phải gọi `super()` trước `this`.

---

### Override method

```js
super.method()
```

để gọi method cha.

---

### Arrow function

- Không có `this` và `super` riêng.
- Dùng context bên ngoài.

---

### Field vs Method

- Method override hoạt động ngay.
- Field của class con chỉ init **sau super()**.

---

### Internals

- super hoạt động nhờ `[[HomeObject]]`.
- Không nên copy method có super giữa object.

---

## 16. Ghi chú thực tế

Inheritance rất mạnh nhưng:

```
composition > inheritance
```

trong nhiều kiến trúc hiện đại vì dễ maintain hơn khi project lớn.

---
