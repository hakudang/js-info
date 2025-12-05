/**
 * exercises.js
 * 10 bài tập về Array kèm lời giải + chú thích.
 * Chạy file bằng Node: `node exercises.js`
 */

/* =========================
 * 1) Tính tổng các phần tử
 * ========================= */
(() => {
  const arr = [1, 2, 3, 4, 5];

  // Cách 1: for...of
  let sum1 = 0;
  for (const n of arr) sum1 += n;

  // Cách 2: reduce
  const sum2 = arr.reduce((acc, n) => acc + n, 0);

  console.log("B1 - sum(for..of):", sum1); // 15
  console.log("B1 - sum(reduce):", sum2);  // 15
})();


/* =================
 * 2) Lọc số chẵn
 * ================= */
(() => {
  const nums = [10, 15, 22, 33, 40];

  // filter giữ lại phần tử thoả n % 2 === 0
  const evens = nums.filter(n => n % 2 === 0);

  console.log("B2 - evens:", evens); // [10, 22, 40]
})();


/* ======================
 * 3) Nhân đôi giá trị
 * ====================== */
(() => {
  const arr = [1, 2, 3];

  // map trả về mảng mới, mỗi phần tử * 2
  const doubled = arr.map(x => x * 2);

  console.log("B3 - doubled:", doubled); // [2, 4, 6]
})();


/* ============================
 * 4) Tìm phần tử lớn nhất
 * ============================ */
(() => {
  const arr = [5, 2, 8, 1, 9];

  // Cách 1: Math.max + spread
  const max1 = Math.max(...arr);

  // Cách 2: reduce
  const max2 = arr.reduce((m, n) => (n > m ? n : m), -Infinity);

  console.log("B4 - max(Math.max):", max1); // 9
  console.log("B4 - max(reduce):", max2);    // 9
})();


/* ======================================
 * 5) Kiểm tra điều kiện phần tử (some/every)
 * ====================================== */
(() => {
  const ages = [18, 25, 12, 40];

  // Có ai < 18 không?
  const hasUnder18 = ages.some(a => a < 18);

  // Tất cả đều >= 18?
  const allAdult = ages.every(a => a >= 18);

  console.log("B5 - hasUnder18:", hasUnder18); // true
  console.log("B5 - allAdult:", allAdult);     // false
})();


/* =====================================
 * 6) Làm phẳng mảng lồng (flatten)
 * ===================================== */
(() => {
  const arr = [1, [2, 3], [4, [5, 6]]];

  // Cách 1: flat(Infinity)
  const flat1 = arr.flat(Infinity);

  // Cách 2: đệ quy với reduce
  const flatDeep = (a) =>
    a.reduce((res, x) => res.concat(Array.isArray(x) ? flatDeep(x) : x), []);

  const flat2 = flatDeep(arr);

  console.log("B6 - flat(Infinity):", flat1); // [1,2,3,4,5,6]
  console.log("B6 - flat(reduce):", flat2);   // [1,2,3,4,5,6]
})();


/* ===================================
 * 7) Xoá phần tử trùng lặp (unique)
 * =================================== */
(() => {
  const arr = [1, 2, 3, 2, 4, 1, 5];

  // Cách 1: Set
  const unique1 = [...new Set(arr)];

  // Cách 2: filter + indexOf (giữ phần tử đầu tiên)
  const unique2 = arr.filter((v, i) => arr.indexOf(v) === i);

  console.log("B7 - unique(Set):", unique1);     // [1,2,3,4,5]
  console.log("B7 - unique(filter):", unique2);  // [1,2,3,4,5]
})();


/* ======================================
 * 8) Đếm số lần xuất hiện (frequency map)
 * ====================================== */
(() => {
  const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];

  // Dùng reduce để tạo object đếm
  const counter = fruits.reduce((acc, f) => {
    acc[f] = (acc[f] || 0) + 1;
    return acc;
  }, {});

  // Tuỳ chọn: dùng Map nếu muốn
  const counterMap = fruits.reduce((m, f) => m.set(f, (m.get(f) || 0) + 1), new Map());

  console.log("B8 - count(object):", counter);             // { apple: 3, banana: 2, orange: 1 }
  console.log("B8 - count(Map):", Object.fromEntries(counterMap)); // tương đương object  { apple: 3, banana: 2, orange: 1 }
})();


/* ================================================
 * 9) Sắp xếp mảng object theo tuổi (không mutate gốc)
 * ================================================ */
(() => {
  const users = [
    { name: "John", age: 30 },
    { name: "Alice", age: 25 },
    { name: "Bob", age: 28 }
  ];

  // copy trước khi sort để không mutate mảng gốc
  const sorted = [...users].sort((a, b) => a.age - b.age);

  console.log("B9 - sorted by age asc:", sorted);
  // [{name:'Alice',age:25}, {name:'Bob',age:28}, {name:'John',age:30}]
  console.log("B9 - original:", users); // vẫn giữ nguyên
})();


/* ==================================
 * 10) Ghép danh sách thành chuỗi
 * ================================== */
(() => {
  const names = ["John", "Alice", "Bob"];

  const s = names.join(", ");

  console.log("B10 - joined:", s); // "John, Alice, Bob"
})();

