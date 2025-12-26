# Decorators trong JavaScript
## 1️⃣ Decorator là gì? (bản chất)

Decorator = một wrapper function
- → bọc quanh function gốc
- → thay đổi / bổ sung hành vi
- → không sửa code gốc

👉 Tư duy PM/Architect:

Function làm việc chính, decorator thêm feature.

## 2️⃣ Ví dụ kinh điển: Transparent Caching
Function gốc (CPU nặng, kết quả ổn định)
```js
function slow(x) {
  // there can be a heavy CPU-intensive job here
  alert(`Called with ${x}`);
  return x;
}
```
Decorator thêm cache (KHÔNG đụng vào slow)
```js
function cachingDecorator(func) {
  let cache = new Map();

  return function(x) {
    if (cache.has(x)) {    
      return cache.get(x);
    }

    let result = func(x);  

    cache.set(x, result);  
    return result;
  };
}

slow = cachingDecorator(slow);
```
Kết quả
```
alert( slow(1) );         // tính thật
alert( "Again: " + slow(1) ); // lấy từ cache
```
Ý nghĩa cốt lõi

- slow vẫn làm việc cũ
- Cache là tính năng bổ sung
- Có thể tái sử dụng decorator cho nhiều function khác

## 3️⃣ Vấn đề lớn: method + this bị mất
Case lỗi (rất hay gặp)
```js
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    alert("Called with " + x);
    return x * this.someMethod(); // (*)
  }
};

worker.slow = cachingDecorator(worker.slow);

alert( worker.slow(2) ); // ❌ Error
```
Nguyên nhân
```js
let result = func(x); // gọi func không có context
```

➡️ this === undefined
➡️ this.someMethod() crash

## 4️⃣ Giải pháp: func.call – truyền context
call là gì?
```js
func.call(context, arg1, arg2, ...)
```

➡️ gọi function

➡️ ép this = context

Fix decorator bằng call
```js
function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    let result = func.call(this, x); // 🔑 truyền this
    cache.set(x, result);
    return result;
  };
}
```
Kết quả
```js
worker.slow = cachingDecorator(worker.slow);

alert( worker.slow(2) ); // OK
```
Luồng this (rất quan trọng)

1. worker.slow(2)
2. wrapper được gọi với this = worker
3. func.call(this, x) → this vẫn là worker
4. Method gốc hoạt động bình thường

## 5️⃣ Forwarding nhiều tham số (multi-args)
Bài toán
```js
slow(min, max)
```

Cache theo tổ hợp tham số, không phải từng giá trị đơn.

Decorator tổng quát (giữ code gốc)
```js
function cachingDecorator(func, hash) {
  let cache = new Map();
  return function() {
    let key = hash(arguments); // (*)
    if (cache.has(key)) {
      return cache.get(key);
    }

    let result = func.call(this, ...arguments); // (**)

    cache.set(key, result);
    return result;
  };
}

function hash(args) {
  return args[0] + ',' + args[1];
}

worker.slow = cachingDecorator(worker.slow, hash);
```

Hai điểm mấu chốt

- arguments → gom toàn bộ tham số
- func.call(this, ...arguments) → forward cả context + args

## 6️⃣ call vs apply (chuẩn PM + Dev)
**call**
```
func.call(context, arg1, arg2)
```
**apply**
```
func.apply(context, argsArray)
```
**Tương đương**
```
func.call(context, ...args);
func.apply(context, args);
```
**Dùng khi nào?**
| Trường hợp      | Dùng  |
| --------------- | ----- |
| Có sẵn array    | apply |
| Có args rời     | call  |
| Forward generic | apply |

👉 Forwarding chuẩn
```js
let wrapper = function() {
  return func.apply(this, arguments);
};
```

## 7️⃣ Method borrowing (mượn hàm)
Vấn đề
```js
arguments.join(); // ❌ Error
```



Giải pháp: mượn join
```js
function hash() {
  alert( [].join.call(arguments) ); // 1,2
}
```
**Bản chất**

- [].join dùng this[index]
- arguments là array-like
- → join hoạt động được

👉 Kỹ thuật này gọi là method borrowing

## 8️⃣ Decorator & function properties (cảnh báo)
```js
func.someProp ❌ bị mất sau khi decorate
```

Vì:

- Decorator trả về wrapper
- Wrapper ≠ function gốc

👉 Nếu cần giữ properties → dùng Proxy (advanced topic)

## 9️⃣ Tổng kết ngắn gọn (đúng chất hệ thống)

**Decorator**

- Wrapper bọc function
- Thêm feature
- Không sửa code gốc

**call / apply**

- Giữ this
- Forward arguments

**Forwarding chuẩn**
```js
func.apply(this, arguments);
```
**Method borrowing**
```js
[].method.call(arrayLike)
```

🔚 CÂU CHỐT (nhìn xa)
```
Decorator = Aspect
call/apply = dây dẫn this
Forwarding = giữ nguyên hành vi gốc
```

Không hiểu đoạn này →
❌ Viết decorator sai
❌ Mất this
❌ Bug ngầm, khó debug