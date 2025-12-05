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

function section(title) {
    console.log("\n====================");
    console.log(`===${title}===`);
    console.log("====================");
}

// 1. Hai giải pháp tính lũy thừa
/*=========================================================
* Viết hàm pow(x, n) tính x mũ n
* ---------------------------------------------------------
* Question :
* Viết hàm pow(x, n) tính x mũ n (x^n).
* ---------------------------------------------------------
* Giải pháp 1 : Dùng vòng lặp
* Giải pháp 2 : Dùng đệ quy
* ---------------------------------------------------------
* Ví dụ :
* pow(2, 2) = 4
* pow(2, 3) = 8
* pow(2, 4) = 16
* =======================================================*/

section("1. Hai giải pháp tính lũy thừa");

// 1.1 Tính lữy thừa Dùng vòng lặp (iterative)

// giải pháp : dùng vòng lặp
// khởi tạo biến result = 1
// dùng vòng lặp từ 0 đến n - 1, nhân x vào result
// trả về result

section("1.1 Giải pháp dùng vòng lặp");

function pow(x, n) {
    let result = 1;
    for (let i = 0; i < n; i++) result *= x;
    return result;
}

console.log(pow(2, 3)); // 8

// 1.2 Dùng đệ quy (recursion)

// giải pháp : đệ quy
// điều kiện dừng : n == 1
// bước đệ quy :    
// pow(x, n) = x * pow(x, n - 1)

section("1.2 Giải pháp dùng đệ quy");

function powRecursion(x, n) {
    // điều kiện dừng
    if (n === 1) {
        return x;
    } else {
        return x * powRecursion(x, n - 1); // gọi lại chính nó
    }
}

console.log(powRecursion(2, 3)); // 8

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

// Run

// Context 1: pow(2, 3)
// Context 2: pow(2, 2)
// Context 3: pow(2, 1)

// kết quả cuối cùng 8, stack trống sau khi hoàn thành
// Lưu ý : mỗi lần đệ quy = thêm 1 context -> tốn bộ nhớ.
// Quá nhiều đệ quy, ví dụ hàng nghìn lần -> stack tràn (stack overflow).

// 3. Đệ quy vs vòng lặp

// vòng lặp

/*
function pow(x, n) {
    let result = 1;
    for (let i = 0; i < n; i++) result *= x;
    return result;
}
*/

// -> chỉ có 1 context, tiết kiệm bộ nhớ hơn
// đệ quy : ngắn gọn, dễ hiểu hơn, nhưng mỗi lần gọi thêm 1 stack frame

// 4. Ứng dụng đệ quy: Duyệt cấu trúc lồng nhau

/*=========================================================
* Bài toán :
* Tính tổng lương của tất cả nhân viên trong công ty,
* công ty có cấu trúc nhiều cấp với các phòng ban lồng nhau.
* ---------------------------------------------------------
* Giải pháp :
* - Nếu là mảng nhân viên, tính tổng lương trong mảng
* - Nếu là object phòng ban, gọi đệ quy cho từng phòng ban con và cộng kết quả
* ---------------------------------------------------------
* Ví dụ :
* let company = {
*   sales: [{ name: "Alice", salary: 1000 },
*   { name: "Bob", salary: 1500 }
*   ],
*   development: {
*     sites: [{ name: "Charlie", salary: 2000 },
*     { name: "David", salary: 2500 }
*     ],
*     internals: [{ name: "Eve", salary: 1300 }]
*   }
* };
* kết quả kỳ vọng :
* sumSalaries(company) = 1000 + 1500 + 2000 + 2500 + 1300 = 8300
* Thứ tự gọi hàm 
* sumSalaries(company)
* = sumSalaries(company.sales) + sumSalaries(company.development)
* = 2500 + (sumSalaries(development.sites) + sumSalaries(development.internals))
* = 2500 + (4500 + 1300) = 8300
* =======================================================*/

section("4. Ứng dụng đệ quy: Duyệt cấu trúc lồng nhau");

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

// department có thể là array hoặc object
function sumSalaries(department) {
    if (Array.isArray(department)) {
        return department.reduce((sum, worker) => { return sum + worker["salary"] }, 0);
    } else {
        let sum = 0;
        for (let subDep of Object.values(department)) {
            sum += sumSalaries(subDep);
        }
        return sum;
    }
}

console.log(sumSalaries(company)); // 8300

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

/* =========================================================
 * BÀI TẬP 1. Viết hàm sumTo(n) tính tổng số từ 1 đến n 
 * ---------------------------------------------------------
 * Question :
 * Viết hàm tính tổng các số từ 1 đến n.
 * ---------------------------------------------------------\
 * Giải pháp 1 : Dùng vòng lặp
 * - Khởi tạo biến sum = 0
 * - Dùng vòng lặp từ 1 đến n, cộng dồn i vào sum
 * - Trả về sum
 * Giải pháp 2 : Dùng đệ quy
 * - Điều kiện dừng : n == 1
 * - Bước đệ quy : sumTo(n) = n + sumTo(n - 1)
 * Giải pháp 3 : Dùng công thức toán học
 * - sum = n * (n + 1) / 2
 * ---------------------------------------------------------
 * Ví dụ:
 * sumTo(1) = 1
 * sumTo(2) = 2 + 1 = 3
 * sumTo(3) = 3 + 2 + 1 = 6
 * sumTo(4) = 4 + 3 + 2 + 1 = 10
 * ...
 * sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050
 * =======================================================*/

section("Bài 1 - Hàm sumTo(n) tính tổng số từ 1 đến n");

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
    return n * (n + 1) / 2;
}
console.log(sumToMath(3)); // 6

/* =========================================================
 * BÀI TẬP 2. Viết hàm factorial(n) tính giai thừa n!
 * ---------------------------------------------------------
 * Question :
 * Viết hàm tính giai thừa của một số nguyên dương n là tích của tất cả các số nguyên dương từ 1 đến n.
 * ---------------------------------------------------------
 * Giải pháp 1 : Dùng đệ quy
 * - factorial(n) = n * factorial(n - 1)
 * Giải pháp 2 : Dùng vòng lặp
 * - Khởi tạo biến result = 1
 * - Dùng vòng lặp từ 2 đến n, nhân dồn i vào result
 * - Trả về result
 * ---------------------------------------------------------
 * Ví dụ : 5! = 5 × 4 × 3 × 2 × 1 = 120
 * ---------------------------------------------------------
 * =======================================================*/

section("Bài 2 - Hàm factorial(n) tính giai thừa n!");

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

/* =========================================================
 * BÀI TẬP 3. Viết hàm fib(n) trả về số Fibonacci thứ n
 * ---------------------------------------------------------
 * Bài toán :
 * Dãy Fibonacci là một chuỗi các số mà mỗi số là tổng của hai số trước đó.
 * Dãy bắt đầu từ 0 và 1, vì vậy các số Fibonacci đầu tiên
 * ---------------------------------------------------------
 * Giải pháp :
 * - Dùng đệ quy
 * - Dùng vòng lặp
 * ---------------------------------------------------------
 * ví dụ :
 * Fn = Fn-1 + Fn-2
 * 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
 * fib(0) = 0
 * fib(1) = 1
 * fib(2) = 1
 * fib(3) = 2
 * fib(4) = 3
 * =======================================================*/

section("Bài 3 - Hàm fib(n) trả về số Fibonacci thứ n");

// Giải pháp 1 dùng đệ quy

section("Bài 3 - Giải pháp 1 dùng đệ quy")

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

section("Bài 3 - giải pháp 2 dùng vòng lặp")

function fibLoop(n) {
    let a = 0, b = 1;
    for (let i = 0; i < n; i++) {
        // let temp = a;
        // a = b;
        // b = temp + b;
        [a, b] = [b, a + b]; // dùng destructuring assignment
    }
    return a;
}
console.log(fibLoop(3)); // 2
console.log(fibLoop(7)); // 13

/*=========================================================
* BÀI TẬP 4. Xuất linked list
* ---------------------------------------------------------
* Question :
* Viết hàm printList(list) để in ra các phần tử của linked list theo thứ tự.
* ---------------------------------------------------------
* Giải pháp :
* - Dùng vòng lặp While
* - Dùng đệ quy
* ---------------------------------------------------------
* Ví dụ :
* let list = {
*   value: 1,
*   next: {
*     value: 2,
*     next: {
*       value: 3,
*       next: {
*         value: 4,
*         next: null
*       }
*     }
*   }
* };
* printList(list);
* Output :
* 1
* 2
* 3
* 4
* =======================================================*/

section("Bài tập 4 - Xuất linked list");

let linkedList = {
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

section("Bài tập 4 - Giải pháp dùng vòng lặp While");

function printListLoop(list) {
    let tmp = list;
    while (tmp) {
        console.log(tmp.value);
        tmp = tmp.next;
    }
}
printListLoop(linkedList);

// Giải pháp dùng đệ quy

section("Bài tập 4 - Giải pháp dùng đệ quy");

function printListRecursion(list) {
    console.log(list.value);
    if (list.next) {
        printListRecursion(list.next);
    }
}
printListRecursion(linkedList);

/* =========================================================
 * BÀI TẬP 5. Xuất linked list theo thứ tự ngược lại
 * ---------------------------------------------------------
 * Question :
 * Viết hàm printListReverse(list) để in ra các phần tử của linked list theo thứ tự ngược lại.
 * ---------------------------------------------------------
 * Giải pháp 1 : dùng đệ quy
 * - Gọi đệ quy cho phần tử next trước
 * - In giá trị value sau khi gọi đệ quy
 * Giải pháp 2 : dùng vòng lặp và mảng phụ
 * - Dùng vòng lặp để duyệt linked list, lưu giá trị value vào mảng phụ
 * - Dùng vòng lặp ngược để in giá trị từ mảng phụ
 * ---------------------------------------------------------
 * Ví dụ :
 * let list = {
 *   value: 1,
 *   next: {
 *     value: 2,
 *     next: {
 *       value: 3,
 *       next: {
 *         value: 4,
 *         next: null
 *       }
 *     }
 *   }
 * };
 * printListReverse(list);
 * Output :
 * 4
 * 3
 * 2
 * 1
 * =======================================================*/

section("Bài tập 5 - Xuất linked list theo thứ tự ngược lại");

// Giải pháp 1 : dùng đệ quy
function printListReverse(list) {
    if (list.next) {
        printListReverse(list.next);
    }
    console.log(list.value);
}
printListReverse(linkedList);

// Giải pháp 2 : dùng vòng lặp và mảng phụ
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
printListReverseLoop(linkedList);