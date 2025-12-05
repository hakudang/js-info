// closure-exercises.js
// 10 bài closure + lời giải chi tiết + chú thích

"use strict";

/* -------------------------------------------------------
 * Bài 1 – makeCounter()
 * ----------------------------------------------------- */
function makeCounter() {
  // count là biến local của makeCounter
  // Hàm trả về bên dưới sẽ "đóng gói" (close over) count
  let count = 0;

  return function () {
    // mỗi lần gọi counter() thì dùng lại count cũ
    count++;
    return count;
  };
}

// Demo
(() => {
  const c1 = makeCounter();
  const c2 = makeCounter();

  console.log("B1 c1:", c1(), c1(), c1()); // 1 2 3
  console.log("B1 c2:", c2(), c2());       // 1 2 (độc lập)
})();


/* -------------------------------------------------------
 * Bài 2 – createCounter(start) với inc/dec
 * ----------------------------------------------------- */
function createCounter(start = 0) {
  let count = start;

  return {
    inc() {
      count++;
      return count;
    },
    dec() {
      count--;
      return count;
    },
    get() {
      return count;
    }
  };
}

// Demo
(() => {
  const c = createCounter(10);
  console.log("B2:", c.inc(), c.inc(), c.dec()); // 11 12 11
})();


/* -------------------------------------------------------
 * Bài 3 – makeSecret(initial)
 * ----------------------------------------------------- */
function makeSecret(initial) {
  let value = initial; // giữ kín trong closure

  return {
    get() {
      return value;
    },
    set(v) {
      value = v;
    }
  };
}

// Demo
(() => {
  const s = makeSecret(123);
  console.log("B3 get:", s.get()); // 123
  s.set(999);
  console.log("B3 get:", s.get()); // 999
})();


/* -------------------------------------------------------
 * Bài 4 – createTodo()
 * ----------------------------------------------------- */
function createTodo() {
  const tasks = []; 
  // tasks là mảng private, không trả thẳng ra ngoài

  return {
    add(task) {
      tasks.push(task);
    },
    list() {
      // trả về bản copy để tránh bị mutate từ bên ngoài
      return tasks.slice();
    },
    remove(task) {
      const idx = tasks.indexOf(task);
      if (idx !== -1) tasks.splice(idx, 1);
    }
  };
}

// Demo
(() => {
  const todo = createTodo();
  todo.add("Learn JS");
  todo.add("Sleep");
  console.log("B4 list:", todo.list()); // ["Learn JS","Sleep"]
})();


/* -------------------------------------------------------
 * Bài 5 – byField(field)
 * ----------------------------------------------------- */
function byField(field) {
  // field được giữ lại trong closure
  return function (a, b) {
    // so sánh theo field động
    return a[field] > b[field] ? 1 : -1;
  };
}

// Demo
(() => {
  const users = [
    { name: "John", age: 20 },
    { name: "Pete", age: 18 },
    { name: "Ann", age: 19 }
  ];

  users.sort(byField("name"));
  console.log("B5 sort name:", users.map(u => u.name)); // Ann, John, Pete

  users.sort(byField("age"));
  console.log("B5 sort age:", users.map(u => u.age));  // 18,19,20
})();


/* -------------------------------------------------------
 * Bài 6 – logger(prefix)
 * ----------------------------------------------------- */
function logger(prefix) {
  return function (msg) {
    console.log(prefix, msg);
  };
}

// Demo
(() => {
  const warning = logger("[WARNING]");
  warning("Disk low"); // [WARNING] Disk low
})();


/* -------------------------------------------------------
 * Bài 7 – memoize(fn)
 * ----------------------------------------------------- */
function memoize(fn) {
  const cache = new Map(); // private cache

  return function (...args) {
    // tạo key đơn giản bằng JSON (đủ dùng cho bài tập)
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Demo
(() => {
  function slowSquare(n) {
    console.log("Computing...");
    return n * n;
  }

  const cached = memoize(slowSquare);
  console.log("B7:", cached(5)); // Computing... 25
  console.log("B7:", cached(5)); // 25
})();


/* -------------------------------------------------------
 * Bài 8 – once(fn)
 * ----------------------------------------------------- */
function once(fn) {
  let called = false;
  let result;

  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args); // gọi hàm gốc lần đầu
    }
    return result; // các lần sau trả lại kết quả cũ
  };
}

// Demo
(() => {
  const init = once(() => {
    console.log("Run");
    return 42;
  });

  console.log("B8:", init()); // Run, 42
  console.log("B8:", init()); // 42 (không Run nữa)
})();


/* -------------------------------------------------------
 * Bài 9 – createIdGenerator(prefix)
 * ----------------------------------------------------- */
function createIdGenerator(prefix = "") {
  let id = 0;

  return function () {
    id++;
    return prefix + id;
  };
}

// Demo
(() => {
  const genUserId = createIdGenerator("USER_");
  console.log("B9:", genUserId(), genUserId()); // USER_1 USER_2

  const genOrderId = createIdGenerator("ORDER_");
  console.log("B9:", genOrderId()); // ORDER_1 (độc lập)
})();


/* -------------------------------------------------------
 * Bài 10 – Fix makeArmy
 * ----------------------------------------------------- */
// Cách sửa chuẩn nhất: dùng let trong vòng lặp
function makeArmyFixed() {
  const shooters = [];

  for (let i = 0; i < 10; i++) {
    // mỗi vòng lặp có binding i riêng (block scope)
    shooters.push(function () {
      console.log(i);
    });
  }

  return shooters;
}

// Demo
(() => {
  const army = makeArmyFixed();
  console.log("B10:");
  army[0](); // 0
  army[1](); // 1
  army[9](); // 9
})();

/*
  Ghi chú:
  - Phiên bản lỗi dùng var => i là 1 biến duy nhất cho cả vòng lặp.
  - Các shooter closure đều trỏ tới cùng 1 i.
  - Khi bạn gọi sau vòng lặp, i đã = 10 => tất cả in 10.
  - Dùng let hoặc IIFE để tạo “bản sao i” cho mỗi closure.
*/
