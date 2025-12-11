# 1701. Property flags và descriptors trong JavaScript
## 1. Property trong JS không chỉ là key–value

Trước đây ta nghĩ:
```js
user.name = "John";
```

Thực tế, mỗi property có 4 thứ:
- value
- writable
- enumerable
- configurable

Ba cái sau gọi là property flags.

## 2. Ba property flags là gì?
| Flag           | Ý nghĩa                                             |
| -------------- | --------------------------------------------------- |
| `writable`     | Có cho gán giá trị mới không                        |
| `enumerable`   | Có xuất hiện trong `for..in`, `Object.keys()` không |
| `configurable` | Có xoá được &  đổi flag được không                |

👉 Tạo property theo cách thường → cả 3 = true.

## 3. Xem flag bằng getOwnPropertyDescriptor
```js
let user = {
  name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert(JSON.stringify(descriptor, null, 2));
```

Kết quả:
```
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
```

🔑 Descriptor = snapshot đầy đủ của property

## 4. Tạo / chỉnh flag bằng defineProperty
```
let user = {};

Object.defineProperty(user, "name", {
  value: "John"
});
```

👉 Khi tạo mới mà không khai báo flag
→ mặc định tất cả = false
```
{
  "value": "John",
  "writable": false,
  "enumerable": false,
  "configurable": false
}
```

⚠ Đây là lỗi rất hay gặp của người mới.

## 5. Non-writable (readonly)
```js
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  writable: false
});

user.name = "Pete"; // Error
```

- ✅ Đọc được
- ❌ Không ghi được

📌 Non-strict mode: không báo lỗi, nhưng cũng không thay đổi

## 6. Non-enumerable (ẩn khỏi vòng lặp)

Ví dụ mặc định:
```js
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};

for (let key in user) alert(key); 
// name, toString
```

Ẩn `toString`:
```js
Object.defineProperty(user, "toString", {
  enumerable: false
});

for (let key in user) alert(key); 
// name
```

📌 `enumerable:false` cũng không xuất hiện trong `Object.keys()`

## 7. Non-configurable (khóa vĩnh viễn)

Ví dụ kinh điển: `Math.PI`
```js
let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');

alert(JSON.stringify(descriptor, null, 2));
```
```
{
  "value": 3.141592653589793,
  "writable": false,
  "enumerable": false,
  "configurable": false
}
```

Hệ quả:
```js
Math.PI = 3;                 // Error
delete Math.PI;              // Error
Object.defineProperty(Math, "PI", { writable: true }); // Error
```

🚫 Non-configurable = không quay đầu lại được

## 8. configurable:false nhưng writable:true thì sao?
```js
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  configurable: false
});

user.name = "Pete"; // ✅ được
delete user.name;   // ❌ lỗi
```

📌 `configurable:false`

- ❌ Không xoá
- ❌ Không đổi flag
- ✅ Vẫn đổi value nếu writable:true

## 9. “Khoá cứng” như hằng số

```js
Object.defineProperty(user, "name", {
  writable: false,
  configurable: false
});
```

👉 Kết quả:

- Không sửa
- Không xoá
- Không redefine

Giống **Math.PI**

## 🔹 Luật ngoại lệ DUY NHẤT

✅ Chỉ có thể:
```
writable: true → false
```
- ❌ Không thể ngược lại
- ❌ Không thể khi đã configurable:false

10️⃣ defineProperties – set nhiều property cùng lúc
```js
Object.defineProperties(user, {
  name: { value: "John", writable: false },
  surname: { value: "Smith", writable: false }
});
```

📌 Rõ ràng – gọn – dùng khi khởi tạo object chuẩn chỉnh

### 1. Clone object không mất flag

❌ Clone thường:
```js
for (let key in user) {
  clone[key] = user[key];
}
```

✅ Clone giữ nguyên flag:
```js
let clone = Object.defineProperties(
  {},
  Object.getOwnPropertyDescriptors(obj)
);
```

→ Dùng khi viết library / framework

### 2. Khoá object ở mức toàn cục
| Method              | Hiệu lực             |
| ------------------- | -------------------- |
| `preventExtensions` | Cấm thêm property    |
| `seal`              | Cấm thêm + xoá       |
| `freeze`            | Cấm thêm + xoá + sửa |

Object.freeze(obj);
Object.isFrozen(obj); // true

📌 Dùng ít, nhưng rất quan trọng khi viết code an toàn

✅ Tóm tắt nhớ nhanh

- Descriptor = DNA của property
- writable → sửa được không
- enumerable → có lộ ra vòng lặp không
- configurable → có xoá / redefine được không
- configurable:false = đường một chiều
- Clone chuẩn → phải copy descriptor

🧠 Câu chốt

**Property flags cho phép JS tạo ra readonly, hidden, constant, immutable property mà nhìn từ ngoài vẫn “rất bình thường”.**