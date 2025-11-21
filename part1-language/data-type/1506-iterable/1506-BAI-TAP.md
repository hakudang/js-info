## Bài 1. Kiểm tra iterable -> đã làm OK

Viết code để kiểm tra xem các giá trị sau có phải là iterable không:

let values = [
  [1, 2, 3],
  "hello",
  new Set([1, 2, 3]),
  new Map(),
  123,
  { a: 1, b: 2 }
];


👉 Dùng:

Symbol.iterator in value


để in ra những giá trị là iterable.

##  Bài 2. Duyệt iterable thủ công

Cho:
```
let arr = ["a", "b", "c"];
```

Hãy:

Lấy iterator bằng 
``` arr[Symbol.iterator]()```

Dùng .next() để duyệt từng giá trị thủ công (không dùng for..of)

In ra kết quả từng bước.

##  Bài 3. Dùng for..of với nhiều loại iterable

Hãy duyệt qua:
```
let str = "ABC";
let set = new Set([10, 20, 30]);
let map = new Map([["x", 1], ["y", 2]]);
```

Kết quả mong muốn:
```
A B C
10 20 30
x=1
y=2
```
🟡 Mức trung bình: Tuỳ biến iterable

##  Bài 4. Tạo iterable đơn giản bằng Symbol.iterator

Tạo đối tượng range như sau:
```
let range = {
  from: 1,
  to: 5
};
```

Thêm vào nó phương thức ```[Symbol.iterator]()``` để có thể dùng:

``` for (let num of range) console.log(num);```
// Output: 1 2 3 4 5

##  Bài 5. Tạo iterator thủ công

Viết hàm makeIterator(array) trả về một iterator object có phương thức .next().

``` 
let myIterator = makeIterator(["JS", "Python", "Go"]);

console.log(myIterator.next()); // { value: "JS", done: false }
console.log(myIterator.next()); // { value: "Python", done: false }
console.log(myIterator.next()); // { value: "Go", done: false }
console.log(myIterator.next()); // { value: undefined, done: true }
```

🔵 Mức nâng cao: Tuỳ biến logic duyệt
## Bài 6. Iterable theo số Fibonacci

Tạo object fibonacci có thể duyệt bằng for..of, trả ra dãy số Fibonacci tới khi đạt 1000:
```
1, 1, 2, 3, 5, 8, 13, ...
```

Gợi ý:
```
let fibonacci = {
  [Symbol.iterator]() {
    let prev = 0, curr = 1;
    return {
      next() {
        if (curr > 1000) return { done: true };
        [prev, curr] = [curr, prev + curr];
        return { value: prev, done: false };
      }
    };
  }
};
```
## Bài 7. Iterable tạo bảng cửu chương

Tạo một iterable multiplicationTable(n) in ra:
```
2 x 1 = 2
2 x 2 = 4
...
2 x 10 = 20
```

với ```for..of (let line of multiplicationTable(2))```.

## Bài 8. Kết hợp iterable với Array.from

Tạo một iterable range như bài 4, sau đó chuyển nó thành array:
```
let range = { from: 3, to: 7, ... };
let arr = Array.from(range, x => x * 2);
console.log(arr); // [6, 8, 10, 12, 14]
```

👉 Bài này giúp bạn hiểu Array.from() tự động gọi iterator của object.

## Bài 9. Duyệt ngược chuỗi

Tạo iterable reverseString(str) để có thể:
```
for (let ch of reverseString("hello")) console.log(ch);
// o, l, l, e, h
```

Gợi ý: custom [Symbol.iterator]() để đếm ngược index.

## Bài 10. Custom iterable vô hạn (có thể dừng bằng break)

Tạo một iterable countFrom(start) trả về số liên tiếp:
```
for (let n of countFrom(5)) {
  console.log(n);
  if (n > 10) break; // dừng tay
}
```

Đây là cách tạo lazy sequence — chỉ sinh phần tử khi cần.