# Array Exercises (10 bài)
Tất cả bài đều dùng JavaScript thuần. Hãy tự viết lời giải trước khi xem file `exercises.js`.

---

## 1) Tính tổng các phần tử
Cho `arr = [1,2,3,4,5]`. Tính tổng:
- Bằng vòng lặp thường hoặc `for...of`
- Bằng `reduce()`

**Kỳ vọng:** `15`

---

## 2) Lọc số chẵn
Cho `nums = [10, 15, 22, 33, 40]`. Lọc ra các số chẵn.

**Kỳ vọng:** `[10, 22, 40]`

---

## 3) Nhân đôi giá trị
Cho `arr = [1,2,3]`. Trả về mảng mới, mỗi phần tử nhân đôi.

**Kỳ vọng:** `[2,4,6]`

---

## 4) Tìm phần tử lớn nhất
Cho `arr = [5, 2, 8, 1, 9]`. Tìm phần tử lớn nhất:
- Với `Math.max(...arr)`
- Với `reduce()`

**Kỳ vọng:** `9`

---

## 5) Kiểm tra điều kiện phần tử
Cho `ages = [18, 25, 12, 40]`.
- Có ai < 18 không? (dùng `some()`)
- Tất cả đều >= 18? (dùng `every()`)

**Kỳ vọng:** `true` và `false`

---

## 6) Làm phẳng mảng lồng
Cho `arr = [1, [2,3], [4,[5,6]]]`.
- Dùng `flat(Infinity)`
- Hoặc viết đệ quy bằng `reduce()`

**Kỳ vọng:** `[1,2,3,4,5,6]`

---

## 7) Xoá phần tử trùng lặp
Cho `arr = [1,2,3,2,4,1,5]`. Loại bỏ trùng lặp:
- Dùng `Set`
- Hoặc `filter()` + `indexOf`

**Kỳ vọng:** `[1,2,3,4,5]`

---

## 8) Đếm số lần xuất hiện
Cho `fruits = ["apple","banana","apple","orange","banana","apple"]`. Trả về object đếm số lần xuất hiện.

**Kỳ vọng:** `{ apple: 3, banana: 2, orange: 1 }`

---

## 9) Sắp xếp mảng object theo tuổi tăng dần
Cho:
```js
let users = [
  { name: "John", age: 30 },
  { name: "Alice", age: 25 },
  { name: "Bob", age: 28 }
];
```
Sắp xếp theo `age` tăng dần. Không làm thay đổi mảng gốc.

**Kỳ vọng:** `[Alice(25), Bob(28), John(30)]`

---

## 10) Chuyển danh sách thành chuỗi
Cho `names = ["John", "Alice", "Bob"]`. Ghép lại thành chuỗi cách nhau bởi dấu phẩy và khoảng trắng.

**Kỳ vọng:** `"John, Alice, Bob"`
