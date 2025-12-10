# 1702. Setters và Getters trong JavaScript

## 1. Hai loại property trong object
### ✅ Data property (loại quen thuộc)
```js
let user = {
  name: "John",
  age: 25
};
```

- Lưu giá trị trực tiếp
- Đọc / ghi thẳng

### ✅ Accessor property (getter / setter)
- Không lưu giá trị
- Là function chạy khi đọc / ghi
- Nhưng nhìn từ ngoài như property bình thường

## 2. Getter & Setter là gì?

Cú pháp cơ bản:
```js
let obj = {
  get propName() {
    // chạy khi obj.propName được đọc
  },

  set propName(value) {
    // chạy khi obj.propName = value
  }
};
```
## 3. Getter – tạo property “ảo” để đọc

Ví dụ: tạo `fullName` từ `name + surname`
```js
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
};

alert(user.fullName); // John Smith
```

🔑 Điểm quan trọng

- user.fullName không phải function
- Nhưng khi đọc → getter chạy ngầm
- Không copy dữ liệu → luôn sync

## 4. Getter-only → không cho gán
```js
let user = {
  get fullName() {
    return `...`;
  }
};

user.fullName = "Test"; // Error
```

- ✔ Có getter
- ❌ Không có setter → không được gán

## 5. Setter – cho phép ghi và xử lý logic
```js
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
};

user.fullName = "Alice Cooper";

alert(user.name);    // Alice
alert(user.surname); // Cooper
```

- ✅ fullName là **virtual property**
  - Readable
  - Writable
## 6. Accessor Descriptor với `defineProperty`
Accessor không có `value`, `writable`
→ chỉ có `get`, `set`
```js
let user = {
  name: "John",
  surname: "Smith"
};

Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.name} ${this.surname}`;
  },

  set(value) {
    [this.name, this.surname] = value.split(" ");
  }
});

alert(user.fullName); // John Smith
```

🚨 Lỗi nghiêm trọng nếu trộn

```js
Object.defineProperty({}, 'prop', {
  get() { return 1 },
  value: 2 // ❌ Error
});
```

👉 Một property chỉ là

- data property hoặc
- accessor property

KHÔNG BAO GIỜ là cả hai

## 7. Getter / Setter để kiểm soát dữ liệu (best practice)

Ví dụ: **validate input**
```js
let user = {
  get name() {
    return this._name;
  },

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short, need at least 4 characters");
      return;
    }
    this._name = value;
  }
};

user.name = "Pete";
alert(user.name); // Pete

user.name = ""; // Name is too short...
```

🔑 Tư duy:

- Giá trị thật → _name
- Property công khai → name
- _ = internal (quy ước, không cấm)

## 8. Dùng getter để giữ backward compatibility
Ban đầu:
```js
function User(name, age) {
  this.name = name;
  this.age = age;
}
```
Sau này đổi design (`age` → `birthday`):
```js
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
}
```

⚠ Nhưng code cũ vẫn dùng `age`

✅ Giải pháp: getter age

```js
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    }
  });
}

let john = new User("John", new Date(1992, 6, 1));

alert(john.birthday);
alert(john.age);
```

🎯 Đỉnh cao của getter

- Không sửa code cũ
- Không duplicate dữ liệu
- Logic tập trung tại 1 chỗ

## 9. Tổng kết ngắn gọn (cần nhớ)

✅ Getter / Setter dùng khi:
- Muốn property tính toán
- Muốn validate
- Muốn ẩn dữ liệu
- Muốn giữ tương thích code cũ
🚫 Không dùng khi:
- Chỉ cần lưu giá trị đơn giản
- Không cần xử lý gì thêm

🧠 Câu chốt:
- **Getter/Setter biến property thành API – không còn là biến đơn thuần**

## Tóm lược 
- JS hỗ trợ hai loại thuộc tính trong object:
 1. Data property (thuộc tính dữ liệu)
     - Là thuộc tính thông thường có giá trị cụ thể
     - Có thể đọc và ghi trực tiếp
    - Ví dụ: obj.prop = value; let val = obj.prop;
 
2. Accessor property (thuộc tính truy cập)
  - Là thuộc tính ảo không lưu trữ giá trị trực tiếp
  - Được định nghĩa thông qua các hàm getter và setter
  - Khi truy cập hoặc gán giá trị, các hàm này sẽ được gọi
 - Ví dụ:
    + Getter: lấy giá trị thông qua hàm
    + Setter: gán giá trị thông qua hàm
 - Lợi ích của Accessor property:
    + Cho phép kiểm soát việc truy cập và gán giá trị
    + Thực hiện các thao tác bổ sung khi giá trị được lấy hoặc thay đổi
    + Giúp ẩn chi tiết triển khai bên trong object

- Setters và Getters là các phương thức đặc biệt
  cho phép chúng ta định nghĩa các thuộc tính ảo (virtual properties)
  trong các đối tượng JavaScript.
- Chúng giúp kiểm soát việc truy cập và gán giá trị cho các thuộc tính
  thông qua các hàm thay vì truy cập trực tiếp.
- Điều này rất hữu ích để thực hiện các phép tính, kiểm tra dữ liệu
  hoặc thực hiện các hành động phụ khi thuộc tính được truy cập hoặc thay đổi.