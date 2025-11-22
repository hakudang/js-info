# 10 bài tập luyện Map & Set trong JavaScript

> Mục tiêu: hiểu rõ Map/Set, key any type, tính duy nhất, thao tác tập hợp, và vài pattern thực tế (count, group, cache).

---

## Bài 1. Đếm tần suất phần tử (Map)
Cho mảng:
```js
const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
```
Hãy dùng **Map** để tạo bảng đếm:
- key = tên fruit
- value = số lần xuất hiện

Kết quả mong muốn:
```js
Map { "apple" => 3, "banana" => 2, "orange" => 1 }
```

---

## Bài 2. Lọc phần tử duy nhất (Set)
Cho mảng số:
```js
const nums = [1,2,2,3,4,4,4,5];
```
Dùng **Set** để loại trùng và trả về mảng mới:
```js
[1,2,3,4,5]
```

---

## Bài 3. Gộp dữ liệu theo key (groupBy với Map)
Cho danh sách user:
```js
const users = [
  {name:"An", city:"Tokyo"},
  {name:"Binh", city:"Osaka"},
  {name:"Chi", city:"Tokyo"},
  {name:"Dung", city:"Osaka"},
  {name:"Em", city:"Nagoya"},
];
```
Nhóm user theo `city` bằng **Map**:
- key = city
- value = mảng user thuộc city đó

---

## Bài 4. Đảo ngược Map (value -> key)
Cho Map:
```js
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
```
Tạo Map mới đảo ngược:
```js
Map { 1 => "a", 2 => "b", 3 => "c" }
```
**Gợi ý:** value luôn duy nhất.

---

## Bài 5. Union / Intersection / Difference (Set)
Cho 2 Set:
```js
const A = new Set([1,2,3,4]);
const B = new Set([3,4,5,6]);
```
Hãy tạo:
- `union(A,B)` => Set([1,2,3,4,5,6])
- `intersection(A,B)` => Set([3,4])
- `difference(A,B)` (A\B) => Set([1,2])

---

## Bài 6. Kiểm tra trùng lặp nhanh
Viết hàm:
```js
hasDuplicates(arr)
```
Trả `true` nếu arr có phần tử trùng, `false` nếu tất cả duy nhất.  
Dùng **Set**.

Ví dụ:
```js
hasDuplicates([1,2,3]) // false
hasDuplicates([1,2,2,3]) // true
```

---

## Bài 7. LRU Cache mini bằng Map (mức nâng cao)
Tạo class `LRUCache(limit)`:
- `get(key)` trả value và đưa key lên “mới nhất”
- `set(key, value)` thêm/cập nhật.
- Nếu vượt `limit` thì xóa phần tử “cũ nhất”.

Ví dụ:
```js
const cache = new LRUCache(2);
cache.set("a",1);
cache.set("b",2);
cache.get("a");      // 1  (a thành mới nhất)
cache.set("c",3);    // b bị loại
cache.has("b");      // false
```

---

## Bài 8. Đếm số từ khác nhau
Cho string:
```js
const text = "hello world hello JS world";
```
Dùng **Set** để đếm số từ **khác nhau**.

Kết quả: `3` (hello, world, JS)

---

## Bài 9. Nhóm anagram (Map + sort key)
Cho mảng:
```js
const words = ["listen","silent","enlist","hello","ohlle","world"];
```
Nhóm các từ là anagram với nhau.
Gợi ý: key = chữ cái sort của word.

Kết quả mong muốn dạng:
```js
[
  ["listen","silent","enlist"],
  ["hello","ohlle"],
  ["world"]
]
```

---

## Bài 10. Top K phần tử xuất hiện nhiều nhất (Map)
Cho:
```js
const nums = [1,1,1,2,2,3,3,3,3,4];
const k = 2;
```
Trả về `k` phần tử xuất hiện nhiều nhất.  
Kết quả: `[3,1]` (3 xuất hiện 4 lần, 1 xuất hiện 3 lần)

---

Chúc bạn luyện vui. Làm xong thì tự sửa/biến tấu input để test thêm nhé.
