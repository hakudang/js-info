# Prototype methods & Objects without __proto__

## 1. Cách hiện đại để đọc/ghi prototype (khuyến nghị)

Việc dùng obj.`__proto__` để get/set prototype đã lỗi thời (Annex B). Thay vào đó dùng các hàm chuẩn:

- `Object.getPrototypeOf(obj) `→ trả về `[[Prototype]]`

- `Object.setPrototypeOf(obj, proto)` → đặt `[[Prototype]]`

Chỉ chấp nhận `__proto__` trong object literal: { `__proto__`: ... }

Ngoài ra có cách mạnh hơn:

`Object.create(proto[, descriptors]) `→ tạo object mới với proto làm `[[Prototype]]` và mô tả thuộc tính.
## 2. Object.create – tạo object với prototype mong muốn
```js
let animal = {
  eats: true
};

// create a new object with animal as a prototype
let rabbit = Object.create(animal); // same as {__proto__: animal}

alert(rabbit.eats); // true

alert(Object.getPrototypeOf(rabbit) === animal); // true

Object.setPrototypeOf(rabbit, {}); // change the prototype of rabbit to {}
```
Thêm thuộc tính bằng property descriptors
```js
let animal = {
  eats: true
};

let rabbit = Object.create(animal, {
  jumps: {
    value: true
  }
});

alert(rabbit.jumps); // true
```
## 3. Clone object đúng chuẩn (giữ prototype + descriptors)
```js
let clone = Object.create(
  Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj)
);
```

→ Bản sao chính xác: đủ enumerable/non-enumerable, data & getter/setter, và đúng `[[Prototype]]`.


## 4. Lịch sử ngắn gọn (vì sao có nhiều cách?)

Từ đầu: dùng `F.prototype` (constructor function).

2012: `Object.create` (tạo object với prototype).
`
2015: `Object.getPrototypeOf` / `Object.setPrototypeOf` (thay thế getter/setter `__proto__`).

2022: cho phép `{ __proto__: ... }` trong `literal`; không khuyến nghị dùng obj.`__proto__` getter/setter.

Lý do chính: __proto__ phá tối ưu, gây lỗi khó đoán.

## 5. Hiệu năng: đừng đổi prototype sau khi tạo

Thay đổi prototype “on-the-fly” bằng `Object.setPrototypeOf` hoặc `obj.__proto__`= rất chậm (phá tối ưu engine).
➡️ Thiết kế prototype ngay lúc tạo object, rồi giữ nguyên.

## 6. “Very plain” objects – object không có prototype

Dùng object như dictionary lưu key do người dùng nhập có thể dính bẫy `__proto__`.
Dùng Object, nếu khai báo thuộc tính với key "__proto__", ta sẽ không lưu được giá trị mong muốn.

Vấn đề với object thường
```js
let obj = {};

let key = prompt("What's the key?", "__proto__");
obj[key] = "some value";

alert(obj[key]); // [object Object], not "some value"!
```
→ `__proto__ `là accessor trên `Object.prototype`, không phải data property.

Giải pháp 1 (khuyến nghị): dùng Map
```js
let map = new Map();

let key = prompt("What's the key?", "__proto__");
map.set(key, "some value");

alert(map.get(key)); // "some value"
```
Giải pháp 2: object không prototype
```js
let obj = Object.create(null);
// or: obj = { __proto__: null }

let key = prompt("What's the key?", "__proto__");
obj[key] = "some value";

alert(obj[key]); // "some value"
```

→ Không có getter/setter __proto__, mọi key đều là data property.

Lưu ý: object kiểu này không có method built-in như toString:
```js
let obj = Object.create(null);

alert(obj); // Error (no toString)
```
Nhưng các hàm tĩnh của Object vẫn dùng được:
```js
let chineseDictionary = Object.create(null);
chineseDictionary.hello = "你好";
chineseDictionary.bye = "再见";
```
alert(Object.keys(chineseDictionary)); // hello,bye

## 7. Tóm tắt nhanh (cheat-sheet)

- Tạo object với prototype:

  - `{ __proto__: ... }` (literal)

  - `Object.create(proto[, descriptors])` (mạnh & chuẩn)

Clone chuẩn:
```js
Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj))
```

- Get/Set prototype (chuẩn):


  - `Object.getPrototypeOf(obj)`
  - `Object.setPrototypeOf(obj, proto)`

- Tránh dùng getter/setter `obj.__proto__`
- Không đổi prototype sau khi tạo nếu quan tâm hiệu năng
- Dictionary an toàn: Object.create(null) hoặc dùng Map

Nếu bạn muốn, tôi có thể làm sơ đồ so sánh:` F.prototype` vs `Object.create `vs `class`, hoặc đưa **best practices** chọn giải pháp theo từng tình huống.