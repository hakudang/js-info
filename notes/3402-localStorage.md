# 📦 Web Storage API – localStorage & sessionStorage
## 1️⃣ Web Storage là gì?

`localStorage` và `sessionStorage` cho phép lưu key/value trong trình duyệt.

👉 Điểm quan trọng:

- Dữ liệu không gửi lên server
- Lưu được nhiều hơn cookies (≥ 5MB)
- Chỉ thao tác bằng JavaScript
- Bị ràng buộc theo origin (protocol + domain + port)

2️⃣ So sánh localStorage và sessionStorage
|            | localStorage                 | sessionStorage   |
| ---------- | ---------------------------- | ---------------- |
| Phạm vi    | Mọi tab cùng origin          | Chỉ trong 1 tab  |
| Tồn tại    | Sau khi đóng browser, reboot | Mất khi đóng tab |
| Refresh    | Còn                          | Còn              |
| Dung lượng | ≥ 5MB                        | ≥ 5MB            |

3️⃣ API chung

Cả hai có cùng API:
```js
setItem(key, value)
getItem(key)
removeItem(key)
clear()
key(index)
length
```

Hoạt động giống Map.

4️⃣ localStorage – lưu lâu dài
🔹 Đặc điểm

- Dùng chung giữa các tab cùng origin
- Không tự mất
- Phù hợp lưu: theme, token, setting, cache

🔹 Ví dụ gốc
```
localStorage.setItem('test', 1);
```

Mở lại trình duyệt:
```
alert( localStorage.getItem('test') ); // 1
```
🔹 Object-like access (không khuyến khích)
```
// set key
localStorage.test = 2;

// get key
alert( localStorage.test ); // 2

// remove key
delete localStorage.test;
```

⚠ Lý do không khuyến khích:

- Dễ đụng tên built-in (length, toString…)
- Không kích hoạt storage event

5️⃣ Duyệt dữ liệu trong storage
Cách chuẩn:
for(let i=0; i<localStorage.length; i++) {
  let key = localStorage.key(i);
  alert(`${key}: ${localStorage.getItem(key)}`);
}

Dùng for…in (phải lọc):
for(let key in localStorage) {
  if (!localStorage.hasOwnProperty(key)) {
    continue;
  }
  alert(`${key}: ${localStorage.getItem(key)}`);
}

Cách gọn nhất:
let keys = Object.keys(localStorage);
for(let key of keys) {
  alert(`${key}: ${localStorage.getItem(key)}`);
}

6️⃣ Chỉ lưu được string

Mọi value đều bị convert sang string:

localStorage.user = {name: "John"};
alert(localStorage.user); // [object Object]


👉 Lưu object bằng JSON:

localStorage.user = JSON.stringify({name: "John"});

// sometime later
let user = JSON.parse( localStorage.user );
alert( user.name ); // John


Debug toàn bộ storage:

alert( JSON.stringify(localStorage, null, 2) );

7️⃣ sessionStorage – lưu theo tab
🔹 Đặc điểm

Chỉ tồn tại trong tab hiện tại

Refresh vẫn còn

Đóng tab → mất

Tab khác → không thấy

🔹 Ví dụ gốc
sessionStorage.setItem('test', 1);


Refresh:

alert( sessionStorage.getItem('test') ); // after refresh: 1


Mở tab mới → null

8️⃣ Storage event – đồng bộ giữa các tab

Khi localStorage hoặc sessionStorage bị thay đổi → phát sinh storage event.

⚠ Chỉ kích hoạt ở window khác, không phải window tạo ra thay đổi.

🔹 Ví dụ gốc
window.onstorage = event => {
  if (event.key != 'now') return;
  alert(event.key + ':' + event.newValue + " at " + event.url);
};

localStorage.setItem('now', Date.now());


Event có:

event.key

event.oldValue

event.newValue

event.url

event.storageArea

👉 Cho phép các tab giao tiếp với nhau

9️⃣ Tóm tắt chuẩn kỹ sư

localStorage → lưu lâu dài

sessionStorage → lưu theo tab

Chỉ lưu string

Không gửi lên server

Dung lượng lớn

Có thể sync đa tab qua storage event

🎯 Kết luận ngắn gọn

Web Storage là cơ chế lưu dữ liệu phía trình duyệt, nhanh, đơn giản, không phụ thuộc server, phù hợp lưu state, setting, cache, session nhẹ.