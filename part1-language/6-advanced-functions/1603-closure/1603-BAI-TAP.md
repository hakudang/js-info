# Closure Exercises (10 bài – tăng dần độ khó)

> Mục tiêu: rèn luyện hiểu đúng closure = function + lexical environment “nhớ” biến ngoài tại thời điểm tạo.

---

## Bài 1 – Bộ đếm cơ bản (counter)

Viết hàm `makeCounter()` tạo ra một counter độc lập:

```js
const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

Yêu cầu:
- Mỗi lần gọi `makeCounter()` tạo một counter **độc lập**, không ảnh hưởng nhau.

---

## Bài 2 – Counter tăng/giảm

Tạo hàm `createCounter(start)` trả về object có `inc()` và `dec()`:

```js
const c = createCounter(10);
console.log(c.inc()); // 11
console.log(c.inc()); // 12
console.log(c.dec()); // 11
```

Yêu cầu:
- Không cho phép truy cập trực tiếp biến đếm từ bên ngoài.

---

## Bài 3 – Secret variable (get/set)

Viết `makeSecret(initial)`:

```js
const secret = makeSecret(123);

console.log(secret.get()); // 123
secret.set(999);
console.log(secret.get()); // 999
```

Yêu cầu:
- `initial` được lưu kín bên trong.
- Chỉ thay đổi được qua `set`.

---

## Bài 4 – Mini todo bằng closure

Viết `createTodo()`:

```js
const todo = createTodo();

todo.add("Learn JS");
todo.add("Sleep");

console.log(todo.list()); 
// ["Learn JS", "Sleep"]
```

Yêu cầu:
- Không được lộ mảng tasks ra ngoài (không trả về reference trực tiếp).

---

## Bài 5 – byField(field) cho sort

Cho mảng users:

```js
const users = [
  { name: "John", age: 20 },
  { name: "Pete", age: 18 },
  { name: "Ann", age: 19 }
];
```

Viết `byField(field)` để dùng:

```js
users.sort(byField("name"));
users.sort(byField("age"));
```

Yêu cầu:
- `byField` trả về comparator function.

---

## Bài 6 – Logger có prefix

Viết `logger(prefix)`:

```js
const warning = logger("[WARNING]");
warning("Disk low"); 
// [WARNING] Disk low
```

Yêu cầu:
- prefix được “nhớ” bằng closure, không truyền lại mỗi lần gọi.

---

## Bài 7 – Memoize (cache kết quả)

Cho hàm nặng:

```js
function slowSquare(n) {
  console.log("Computing...");
  return n * n;
}
```

Viết `memoize(fn)`:

```js
const cached = memoize(slowSquare);

console.log(cached(5)); // Computing..., 25
console.log(cached(5)); // 25 (không log "Computing...")
```

Yêu cầu:
- Cache theo tham số đầu vào.
- Dùng Map là tốt nhất.

---

## Bài 8 – once() wrapper

Viết `once(fn)` để fn chỉ chạy đúng 1 lần:

```js
const init = once(() => console.log("Run"));
init(); // Run
init(); // nothing
```

Yêu cầu:
- Trả về result của lần chạy đầu tiên cho các lần sau.

---

## Bài 9 – Generator ID theo prefix

Viết `createIdGenerator(prefix)`:

```js
const genUserId = createIdGenerator("USER_");
console.log(genUserId()); // USER_1
console.log(genUserId()); // USER_2
```

Yêu cầu:
- Mỗi generator độc lập.
- Prefix cố định theo generator.

---

## Bài 10 – Fix makeArmy (shooter bug)

Cho code lỗi:

```js
function makeArmy() {
  let shooters = [];

  for (var i = 0; i < 10; i++) {
    shooters.push(function() {
      console.log(i);
    });
  }

  return shooters;
}

const army = makeArmy();
army[0](); // tất cả in 10
```

Hãy sửa để:

```js
army[0](); // 0
army[1](); // 1
...
army[9](); // 9
```

Yêu cầu:
- Sửa bằng closure (đúng bản chất), không hack.
