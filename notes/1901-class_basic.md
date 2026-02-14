# 📘 JavaScript Class – Basic Syntax (Tóm lược có hệ thống)

## 1️⃣ Class là gì? (Hiểu đúng trước khi học cú pháp)

- Class là khuôn mẫu để tạo ra nhiều object cùng loại (user, product…)
- Class cung cấp:

  - State → thuộc tính (properties)
  - Behavior → hành vi (methods)

👉 Trong JavaScript:

`Class thực chất là một function đặc biệt, không phải khái niệm hoàn toàn mới.`

## 2️⃣ Cú pháp class cơ bản
Cú pháp tổng quát
```js
class MyClass {
  constructor() { ... }
  method1() { ... }
  method2() { ... }
}
```
- Dùng new MyClass() để tạo object
- constructor() tự động chạy khi new

**Ví dụ cơ bản (GIỮ NGUYÊN)**
```js
class User {


  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }

}

// Usage:
let user = new User("John");
user.sayHi();
```

📌 Khi new User("John"):

1. Tạo object mới
2. Chạy constructor
3. Gán this.name
4. Object có thể gọi method (sayHi)

## 3️⃣ Lưu ý QUAN TRỌNG: Không có dấu phẩy giữa các method

❌ Sai (dễ mắc):
```js
class User {
  constructor() {},
  sayHi() {}
}
```

✅ Đúng:
```js
class User {
  constructor() {}
  sayHi() {}
}
```

👉 Class không giống object literal

## 4️⃣ Class thực chất là gì?
Class là function
```js
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

alert(typeof User); // function
```

**Cách JS xử lý class**

constructor → thân function

Các method → User.prototype
```js
alert(User === User.prototype.constructor); // true
alert(User.prototype.sayHi);
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

👉 Object gọi method qua prototype chain

## 5️⃣ Class ≠ chỉ là syntactic sugar (nhưng gần như vậy)
**Viết lại class bằng function (GIỮ NGUYÊN)**
```js
function User(name) {
  this.name = name;
}

User.prototype.sayHi = function() {
  alert(this.name);
};

let user = new User("John");
user.sayHi();
```
**Khác biệt quan trọng của class**

| Điểm                        | Class    | Function       |
| --------------------------- | -------- | -------------- |
| Gọi không dùng `new`        | ❌ Error  | ✅ OK           |
| Strict mode                 | Luôn bật | Không bắt buộc |
| Method enumerable           | ❌        | ❌              |
| Có `[[IsClassConstructor]]` | ✅        | ❌              |

```js
User(); // Error: Class constructor User cannot be invoked without 'new'
```

## 6️⃣ Class Expression (ít dùng nhưng nên biết)
Class gán cho biến
```js
let User = class {
  sayHi() {
    alert("Hello");
  }
};
```
**Named Class Expression**
```js
let User = class MyClass {
  sayHi() {
    alert(MyClass);
  }
};

new User().sayHi();
alert(MyClass); // error
```

👉 Tên MyClass chỉ dùng trong class

Class tạo động
```js
function makeClass(phrase) {
  return class {
    sayHi() {
      alert(phrase);
    }
  };
}

let User = makeClass("Hello");
new User().sayHi(); // Hello
```

## 7️⃣ Getter / Setter trong class
```js
class User {

  constructor(name) {
    this.name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

}

let user = new User("John");
alert(user.name);

user = new User("");
```

👉 Getter / setter được gắn vào User.prototype

## 8️⃣ Computed method names
```js
class User {

  ['say' + 'Hi']() {
    alert("Hello");
  }

}

new User().sayHi();
```

👉 Giống object literal → dễ nhớ

## 9️⃣ Class Fields (thuộc tính khai báo trực tiếp)
```js
class User {
  name = "John";

  sayHi() {
    alert(`Hello, ${this.name}!`);
  }
}

new User().sayHi();
```
Điểm khác quan trọng
```js
class User {
  name = "John";
}

let user = new User();
alert(user.name); // John
alert(User.prototype.name); // undefined
```

👉 Class field nằm trên object, không nằm trên prototype

## 10️⃣ Bound methods với class fields (rất thực tế)
Vấn đề mất this
```js
class Button {
  constructor(value) {
    this.value = value;
  }

  click() {
    alert(this.value);
  }
}

let button = new Button("hello");
// this trong click() phụ thuộc cách gọi, không phải object tạo ra nó
setTimeout(button.click, 1000); // undefined
```

Giải pháp với class field arrow function
```js
class Button {
  constructor(value) {
    this.value = value;
  }
  click = () => {
    alert(this.value);
  }
}

let button = new Button("hello");
// this trong arrow function luôn bind đúng object tạo ra nó
setTimeout(button.click, 1000); // hello
```

👉 this luôn bind đúng object
👉 Rất hay dùng cho event handler

## 11️⃣ Tổng kết cú pháp class
```js
class MyClass {
  prop = value;

  constructor(...) { }

  method(...) { }

  get something(...) { }
  set something(...) { }

  [Symbol.iterator]() { }
}
```
Ghi nhớ nhanh

- Class = function + prototype
- Method → prototype
- Field → object
- Getter/setter → prototype

Arrow function field → auto bind this

## 🔚 KẾT LUẬN NGẮN GỌN

- Class giúp code dễ đọc – dễ tổ chức
- Không phải magic, chỉ là cú pháp chuẩn hóa
- Hiểu prototype → hiểu class
- Class fields & bound methods → rất thực dụng