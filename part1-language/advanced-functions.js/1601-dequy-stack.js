/** 
 * ĐỆ QUY - Recursion Stack trong javaScript
 * Recursion (đệ quy) là khi một hàm tự gọi lại chính nó để 
 * giải quyết một bài toán phức tạp bằng cách chia nhỏ thành 
 * các bài toán cùng dạng nhưng đơn giản hơn.
 * 1. Hai giải pháp tính lũy thừa
 *   - Dùng vòng lặp (iterative)
 *   - Dùng đệ quy (recursion)
 * 2. Stack và Execution Context
 * 3. Đệ quy vs vòng lặp
 * 4. Ứng dụng đệ quy: Duyệt cấu trúc lồng nhau
 * 5. Recursive Data Structures (Cấu trúc đệ quy)
 * 6. Bài tập
 *  - Bài tập 1 : Viết hàm sumTo(n) tính tổng số từ 1 đến n
 *  - Bài tập 2 : Viết hàm factorial(n) tính giai thừa n!
 *  - Bài tập 3 : Viết hàm fib(n) trả về số Fibonacci thứ n
 *  - Bài tập 4 : Xuất linked list
 *  - Bài tập 5 : Xuất linked list theo thứ tự ngược lại 
 */


"use strict";
// in ra tiêu đề
document.write("<h2> Đệ Quy Stack trong JavaScript </h2>");


// 1. Hai giải pháp tính lũy thừa

// 1.1 Dùng vòng lặp (iterative)

pow(2, 2); // 4
pow(2, 3); // 8
pow(2, 4); // 16

function pow(x, n) {
    let result = 1;
    for (let i = 0; i < n; i++) result *= x;
    return result;
}

console.log(pow(2, 3)); // 8

// 1.2 Dùng đệ quy (recursion)

function powRecursion(x, n) {
    // điều kiện dừng
    if (n === 1) {
        return x;
    } else {
        return x * powRecursion(x, n - 1); // gọi lại chính nó
    }
}

console.log(powRecursion(2, 3)); // 8

// Giải thích
// pow(2, 3)
// = 2 * pow(2, 2)
// = 2 * (2 * pow(2, 1))
// = 2 * (2 * 2) = 8
// Base case : n == 1
// Recursive step : pow(x, n) = x * pow(x, n - 1)

// 2. Stack và Execution Context

// Khi hàm được gọi, JavaScript tạo Execution Context (nơi lưu biến, vị trí dòng code, this...).
// Mỗi lần đệ quy gọi chính nó:
// Context hiện tại bị tạm dừng và đưa vào stack.
// Hàm con chạy → tạo context mới.
// Khi hàm con kết thúc → context con bị xóa → quay lại context cha.

// Stack hoạt động như sau :
// 1️⃣ pow(2, 3) gọi pow(2, 2)
// 2️⃣ pow(2, 2) gọi pow(2, 1)
// 3️⃣ pow(2, 1) trả 2
// 4️⃣ pow(2, 2) = 2 * 2 = 4
// 5️⃣ pow(2, 3) = 2 * 4 = 8

// Khi chạy

// Context 1: pow(2, 3)
// Context 2: pow(2, 2)
// Context 3: pow(2, 1)

// kết quả cuối cùng 8, stack trống sau khi hoàn thành
// Lưu ý : mỗi lần đệ quy = thêm 1 context -> tốn bộ nhớ.
// Quá nhiều đệ quy, ví dụ hàng nghìn lần -> stack tràn (stack overflow).

// 3. Đệ quy vs vòng lặp

// vòng lặp

// function pow(x, n) {
//     let result = 1;
//     for (let i = 0; i < n; i++) result *= x;
//     return result;
// }

// -> chỉ có 1 context, tiết kiệm bộ nhớ hơn
// đệ quy : ngắn gọn, dễ hiểu hơn, nhưng mỗi lần gọi thêm 1 stack frame

// 4. Ứng dụng đệ quy: Duyệt cấu trúc lồng nhau
// Ví dụ tính tổng lương trong công ty có cấu trúc nhiều cấp

// Ý tưởng giải pháp:
// - Nếu là mảng nhân viên, tính tổng lương trong mảng
// - Nếu là object phòng ban, gọi đệ quy cho từng phòng ban con và cộng kết quả
// -> một bài toán lớn được tách thành nhiều bài toán nhỏ cùng kiểu
let company = {
    sales: [{ name: "Alice", salary: 1000 },
    { name: "Bob", salary: 1500 }
    ],
    development: {
        sites: [{ name: "Charlie", salary: 2000 },
        { name: "David", salary: 2500 }
        ],
        internals: [{ name: "Eve", salary: 1300 }]
    }
};

function sumSalaries(department) {
    if (Array.isArray(department)) {
        // trường hợp mảng nhân viên -> tính tổng lương trong mảng
        return department.reduce((sum, worker) => sum + worker.salary, 0);
    } else {
        // trường hợp object phòng ban -> đệ quy cho từng phòng ban con
        let sum = 0;
        for (let subdep of Object.values(department)) {
            sum += sumSalaries(subdep); // gọi đệ quy
        }
        return sum;
    }
}

console.log(sumSalaries(company)); // 8300

// Thứ tự gọi hàm 
// sumSalaries(company)
// = sumSalaries(company.sales) + sumSalaries(company.development)
// = 2500 + (sumSalaries(development.sites) + sumSalaries(development.internals))
// = 2500 + (4500 + 1300) = 8300

// 5. Recursive Data Structures (Cấu trúc đệ quy)

// Cấu trúc dữ liệu tư định nghĩa bởi chính nó 
// ví dụ : linked list 

let list = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: null
        }
    }
};

// Có thể thêm/ xóa phần tử mà không cần sắp xếp lại như mảng
// ví dụ, thêm phần tử vào đầu danh sách
list = { value: "new item", next: list };

// console.log(list.value); // new item
// console.log(list.next.value); // 1
// console.log(list.next.next.value); // 2
// console.log(list.next.next.next.value); // 3

// ví dụ, xóa phần tử sau phần đầu

list.next = list.next.next; // xóa phần tử 2
// console.log(list.next.value); // 3

// 6. Bài tập

// Bài tập 1 : Viết hàm sumTo(n) tính tổng số từ 1 đến n

// Question : 
// Viết hàm tính tổng các số từ 1 đến n.

// sumTo(1) = 1
// sumTo(2) = 2 + 1 = 3
// sumTo(3) = 3 + 2 + 1 = 6
// sumTo(4) = 4 + 3 + 2 + 1 = 10
// ...
// sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050

// Giải pháp 1 : Dùng vòng lặp
function sumToLoop(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

console.log(sumToLoop(3)); // 6

// Giải pháp 2 : Dùng đệ quy 
// sum = n + sumTo(n - 1)
function sumToRecursion(n) {
    if (n === 1) { 
        return 1;
    } else {
        return n + sumToRecursion(n - 1);
    }
}

console.log(sumToRecursion(3)); // 6
// Giải pháp 3 : Dùng công thức toán học
// sum = n * (n + 1) / 2
function sumToMath(n) {
    return n * (n + 1 ) / 2;
}
console.log(sumToMath(3)); // 6

// Bài tập 2 : Viết hàm factorial(n) tính giai thừa n!

// Question : 
// Giai thừa của một số nguyên dương n là tích của tất cả các số nguyên dương từ 1 đến n.
// Ví dụ : 5! = 5 × 4 × 3 × 2 × 1 = 120

// Cách 1 : Giải pháp dùng đệ quy
// factorial(n) = n * factorial(n - 1)

function factorial(n) {
    if (n === 1 || n === 0) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}
console.log(factorial(5)); // 120

// Cách 2 : Giải pháp dùng vòng lặp
function factorialLoop(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
console.log(factorialLoop(5)); // 120

// Bài tập 3 : Viết hàm fib(n) trả về số Fibonacci thứ n

// Question : 
// Dãy Fibonacci là một chuỗi các số mà mỗi số là tổng của hai số trước đó.
// Dãy bắt đầu từ 0 và 1, vì vậy các số Fibonacci đầu tiên là:
// Fn = Fn-1 + Fn-2
// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
// fib(0) = 0
// fib(1) = 1
// fib(2) = 1

// Giải pháp 1 dùng đệ quy
function fib(n) { 
    /* your code */ 
    if (n <= 1) {
        return n;
    } else {
        return fib(n - 1) + fib(n - 2);
    }
}

console.log(fib(3)); // 2
console.log(fib(7)); // 13
// console.log(fib(40)); // 102334155


// giải pháp 2 dùng vòng lặp
function fibLoop(n) {
    let a = 0, b = 1;   
    for (let i = 0; i < n; i++) {
        let temp = a;
        a = b;
        b = temp + b;
    }
    return a;
}

// Bài tập 4 : Xuất linked list

// Question :
// Viết hàm printList(list) để in ra các phần tử của linked list theo thứ tự.

let list2 = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

// Giải pháp dùng vòng lặp While 
function printListLoop(list) {
    let tmp = list;
    while (tmp) {
        console.log(tmp.value);
        tmp = tmp.next;
    }
}
printListLoop(list2);

// Giải pháp dùng đệ quy
function printListRecursion(list) {
    console.log(list.value);
    if (list.next) {
        printListRecursion(list.next);
    }
}
printListRecursion(list2);

// Bài tập 4 : Xuất linked list theo thứ tự ngược lại

// Question :
// Viết hàm printListReverse(list) để in ra các phần tử của linked list theo thứ tự ngược lại.

// Giải pháp dùng đệ quy
function printListReverse(list) {
    if (list.next) {
        printListReverse(list.next);
    }
    console.log(list.value);
}
printListReverse(list2);

// Giải pháp dùng vòng lặp và mảng phụ
function printListReverseLoop(list) {
    let arr = [];
    let tmp = list;
    while (tmp) {
        arr.push(tmp.value);
        tmp = tmp.next;
    }
    for (let i = arr.length - 1; i >= 0; i--) {
        console.log(arr[i]);
    }
}
printListReverseLoop(list2);