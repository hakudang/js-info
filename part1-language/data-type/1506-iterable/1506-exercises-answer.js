// iterable-exercises.js
// =====================
// Tổng hợp 10 bài tập về Iterable trong JavaScript
// Mỗi bài đều kèm lời giải + chú thích chi tiết.

// Để log ngăn nắp

function section(title) {
  console.log("\n====================");
  console.log(title);
  console.log("====================");
}

/* =========================================================
 * BÀI 1. KIỂM TRA ITERABLE
 * ---------------------------------------------------------
 * Yêu cầu: Dùng `Symbol.iterator in value` (ý tưởng) để
 * in ra các giá trị là iterable.
 *
 * Lưu ý:
 * - Toán tử `in` chỉ dùng được với object (không dùng trực tiếp với primitive).
 * - Vì vậy với primitive (string, number, ...) ta bọc bằng Object(value).
 * =======================================================*/

section("Bài 1 - Kiểm tra iterable");

let values1 = [
  [1, 2, 3],
  "hello",
  new Set([1, 2, 3]),
  new Map(),
  123,
  { a: 1, b: 2 },
];

for (let v of values1) {
  // Bọc bằng Object(v) để tránh lỗi với primitive
  let wrapper = Object(v);
  // Kiểm tra xem trong object (kể cả prototype chain) có Symbol.iterator không
  let isIter = Symbol.iterator in wrapper;
  if (isIter) {
    console.log("Iterable:", v);
  } else {
    console.log("Not iterable:", v);
  }
}

/* =========================================================
 * BÀI 2. DUYỆT ITERATOR THỦ CÔNG
 * ---------------------------------------------------------
 * Cho: let arr = ["a", "b", "c"];
 * - Lấy iterator: arr[Symbol.iterator]()
 * - Dùng .next() để duyệt từng phần tử (không dùng for..of)
 * =======================================================*/

section("Bài 2 - Duyệt iterator thủ công");

let arr2 = ["a", "b", "c"];

// Lấy iterator
let it2 = arr2[Symbol.iterator]();

// Mỗi lần gọi next() trả về { value, done }
console.log(it2.next()); // { value: 'a', done: false }
console.log(it2.next()); // { value: 'b', done: false }
console.log(it2.next()); // { value: 'c', done: false }
console.log(it2.next()); // { value: undefined, done: true }

/* =========================================================
 * BÀI 3. DÙNG for..of VỚI NHIỀU LOẠI ITERABLE
 * ---------------------------------------------------------
 * Duyệt:
 *   let str = "ABC";
 *   let set = new Set([10, 20, 30]);
 *   let map = new Map([["x", 1], ["y", 2]]);
 *
 * Output:
 *   A B C
 *   10 20 30
 *   x=1
 *   y=2
 * =======================================================*/

section("Bài 3 - for..of với nhiều loại iterable");

let str3 = "ABC";
let set3 = new Set([10, 20, 30]);
let map3 = new Map([
  ["x", 1],
  ["y", 2],
]);

let line = "";
for (let ch of str3) {
  line += ch + " ";
}
console.log(line.trim()); // A B C

line = "";
for (let num of set3) {
  line += num + " ";
}
console.log(line.trim()); // 10 20 30

for (let [key, value] of map3) {
  console.log(`${key}=${value}`);
}

/* =========================================================
 * BÀI 4. TẠO ITERABLE ĐƠN GIẢN BẰNG Symbol.iterator
 * ---------------------------------------------------------
 * Tạo đối tượng:
 *   let range = { from: 1, to: 5 };
 * Và làm cho nó dùng được for..of:
 *   for (let num of range) console.log(num); // 1 2 3 4 5
 * =======================================================*/

section("Bài 4 - Tạo iterable range (from..to)");

let range4 = {
  from: 1,
  to: 5,
  // Khi for..of bắt đầu, JS sẽ gọi method này
  [Symbol.iterator]() {
    // Trả về iterator object
    let current = this.from;
    let last = this.to;

    return {
      // next() phải trả về { value, done }
      next() {
        if (current <= last) {
          return { value: current++, done: false };
        }
        return { value: undefined, done: true };
      },
    };
  },
};

for (let num of range4) {
  console.log(num); // 1 2 3 4 5
}

/* =========================================================
 * BÀI 5. TẠO ITERATOR THỦ CÔNG
 * ---------------------------------------------------------
 * Viết hàm makeIterator(array) trả về iterator có .next():
 *
 * let it = makeIterator(["JS", "Python", "Go"]);
 * it.next() -> { value: "JS", done: false } ...
 * =======================================================*/

section("Bài 5 - Hàm makeIterator(array)");

function makeIterator(array) {
  let index = 0;

  return {
    // Iterator chuẩn: chỉ cần method next()
    next() {
      if (index < array.length) {
        let result = { value: array[index], done: false };
        index++;
        return result;
      } else {
        return { value: undefined, done: true };
      }
    },
  };
}

let myIterator5 = makeIterator(["JS", "Python", "Go"]);

console.log(myIterator5.next());
console.log(myIterator5.next());
console.log(myIterator5.next());
console.log(myIterator5.next());

/* =========================================================
 * BÀI 6. ITERABLE THEO DÃY FIBONACCI (TỚI 1000)
 * ---------------------------------------------------------
 * Tạo object fibonacci dùng for..of:
 *
 * for (let n of fibonacci) console.log(n);
 * // 1, 1, 2, 3, 5, 8, ... tới khi > 1000 thì dừng
 * =======================================================*/

section("Bài 6 - Iterable Fibonacci (<= 1000)");

let fibonacci6 = {
  [Symbol.iterator]() {
    let prev = 0,
      curr = 1;

    return {
      next() {
        if (curr > 1000) {
          // Khi vượt 1000 thì done: true => for..of dừng
          return { value: undefined, done: true };
        }
        // Fibonacci: cập nhật cặp (prev, curr)
        [prev, curr] = [curr, prev + curr];
        return { value: prev, done: false };
      },
    };
  },
};

for (let n of fibonacci6) {
  console.log(n);
}

/* =========================================================
 * BÀI 7. ITERABLE TẠO BẢNG CỬU CHƯƠNG
 * ---------------------------------------------------------
 * Tạo hàm multiplicationTable(n) trả về iterable:
 *
 * for (let line of multiplicationTable(2)) console.log(line);
 *
 * 2 x 1 = 2
 * 2 x 2 = 4
 * ...
 * 2 x 10 = 20
 * =======================================================*/

section("Bài 7 - Iterable bảng cửu chương");

function multiplicationTable(n) {
  return {
    [Symbol.iterator]() {
      let i = 1;
      let max = 10;
      return {
        next() {
          if (i <= max) {
            const line = `${n} x ${i} = ${n * i}`;
            i++;
            return { value: line, done: false };
          }
          return { value: undefined, done: true };
        },
      };
    },
  };
}

for (let line7 of multiplicationTable(2)) {
  console.log(line7);
}

/* =========================================================
 * BÀI 8. KẾT HỢP ITERABLE VỚI Array.from
 * ---------------------------------------------------------
 * Tạo range như bài 4, rồi:
 *
 * let arr = Array.from(range, x => x * 2);
 * console.log(arr); // [6, 8, 10, 12, 14]  (với from=3,to=7)
 *
 * Ý nghĩa:
 * - Array.from() sẽ tự động gọi iterator của object.
 * - Tham số thứ 2 là mapFn giống Array.prototype.map.
 * =======================================================*/

section("Bài 8 - Array.from(range, mapFn)");

let range8 = {
  from: 3,
  to: 7,
  [Symbol.iterator]() {
    let current = this.from;
    let last = this.to;
    return {
      next() {
        if (current <= last) {
          return { value: current++, done: false };
        }
        return { value: undefined, done: true };
      },
    };
  },
};

// Dùng Array.from để biến iterable thành mảng, kèm mapFn x => x * 2
let arr8 = Array.from(range8, (x) => x * 2);
console.log(arr8); // [6, 8, 10, 12, 14]

/* =========================================================
 * BÀI 9. DUYỆT NGƯỢC CHUỖI
 * ---------------------------------------------------------
 * Tạo iterable reverseString(str):
 *
 * for (let ch of reverseString("hello")) console.log(ch);
 * // o, l, l, e, h
 *
 * Ý tưởng:
 * - [Symbol.iterator]() tạo iterator đếm index ngược.
 * =======================================================*/

section("Bài 9 - Iterable duyệt ngược chuỗi");

function reverseString(str) {
  return {
    [Symbol.iterator]() {
      let index = str.length - 1;
      return {
        next() {
          if (index >= 0) {
            const ch = str[index];
            index--;
            return { value: ch, done: false };
          }
          return { value: undefined, done: true };
        },
      };
    },
  };
}

for (let ch of reverseString("hello")) {
  console.log(ch);
}

/* =========================================================
 * BÀI 10. CUSTOM ITERABLE VÔ HẠN (DỪNG BẰNG break)
 * ---------------------------------------------------------
 * Tạo iterable countFrom(start):
 *
 * for (let n of countFrom(5)) {
 *   console.log(n);
 *   if (n > 10) break; // tự dừng bằng break
 * }
 *
 * Ý tưởng:
 * - Iterator không có điều kiện dừng bên trong (về mặt logic).
 * - Vòng lặp bên ngoài dùng break để dừng.
 * - Đây là "lazy sequence": chỉ sinh giá trị khi cần.
 * =======================================================*/

section("Bài 10 - Iterable vô hạn countFrom(start)");

function countFrom(start) {
  return {
    [Symbol.iterator]() {
      let current = start;
      return {
        next() {
          // Không có điều kiện dừng bên trong => "vô hạn"
          return { value: current++, done: false };
        },
      };
    },
  };
}

for (let n of countFrom(5)) {
  console.log(n);
  if (n > 10) break; // dừng tay ở ngoài
}
