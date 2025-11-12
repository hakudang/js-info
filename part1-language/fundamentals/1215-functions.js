/** @file 
 *  Functions
 *  - 1. Định nghĩa hàm
 *      - Khai báo hàm
 *      - Hàm với biến cục bộ
 *  - 2. Hàm với biến toàn cục
 *  - 3. Hàm với đối số
 *  - 4. Hàm với đối số mặc định
 *  - 5. Hàm với toán tử nullish coalescing ??
 *  - 6. Hàm với return
 *  - 7. Bài tập
 *  - 7.1 Hàm trả về sớm
 *  - 7.2 Đặt tên cho hàm
 *  - 7.3 Chia hàm phức tạp thành các hàm nhỏ hơn
 * @example
 */

"use strict";
// in ra html tag <h2>Functions</h2>
document.write("<h2>Functions</h2>");


// 1. Hàm
// 1.1 Định nghĩa

// cú pháp : 
// function tên_hàm(đối_số_1, đối_số_2, ...) {
//      khối_lệnh
//      return giá_trị_trả_về; (không bắt buộc)
// }
// đặc điểm :
// - tên_hàm: tên của hàm, tuân theo quy tắc đặt tên biến trong JavaScript
// - đối_số: các giá trị được truyền vào hàm khi gọi hàm, có thể có nhiều đối số hoặc không có đối số nào
// - khối_lệnh: các câu lệnh thực hiện công việc của hàm
// - return: từ khóa dùng để trả về giá trị từ hàm, nếu không có return thì hàm sẽ trả về undefined

// 1.2 Khai báo

function showMessage() {
    console.log("Hello, world !");
}
// gọi hàm
showMessage(); // in ra Hello, world   !

// 2. Hàm với biến cục bộ 
function showMessage2() {
    let message = "Hello, I'm JavaScript!"; // biến cục bộ
    console.log(message);
}

showMessage2(); // in ra Hello, I'm JavaScript!

// 3. Hàm với biến toàn cục 
let userName = "Alice"; // biến toàn cục
function showMessage3() {
    let message = "Hello, " + userName + "!"; // sử dụng biến toàn cục
    console.log(message);
}

showMessage3(); // in ra Hello, Alice!

function showMessage4() {
    userName = "Bob"; // thay đổi biến toàn cục
    let message = "Hello, " + userName + "!";
    console.log(message);
}
console.log(userName); // in ra Alice
showMessage4(); // in ra Hello, Bob!

// 4. Hàm với đối số
function showMessage5(from, text) {
    console.log(from + ": " + text);
}

showMessage5("Alice", "Hello!"); // in ra Alice: Hello!
showMessage5("Bob", "What's up?"); // in ra Bob: Hi there!

function showMessage(from, text) {
    from = '*' + from + '*'; // make "from" look nicer
    console.log(from + ': ' + text);
}

let from = "Ann";
showMessage(from, "Hello"); // in ra *Ann*: Hello

// the value of "from" is the same, the function modified a local copy
console.log(from); // in ra Ann

// 5. Hàm với đối số mặc định

// 5.1 khai báo giá trị mặc định cho đối số 
function showMessage6(from, text = "no text given") {
    console.log(from + ": " + text);
}
showMessage6("Alice"); // in ra Alice: no text given
showMessage6("Bob", "Hello!"); // in ra Bob: Hello!

// 5.2 đối số undefined sẽ kích hoạt giá trị mặc định
function showMessage7(text) {
    if (text === undefined) {
        text = "empty message";
    }
    console.log(text);
}
showMessage7(); // in ra empty message

// 6. Hàm với toán tử nullish coalescing ??
function showCount(count) {
    // if count is undefined or null, show "unknown"
    console.log(count ?? "unknown");
}
showCount(0); // in ra 0
showCount(null); // in ra unknown
showCount(); // in ra unknown -> undefined kích hoạt giá trị mặc định

// 7. Hàm với return

// 7.1 Hàm trả về giá trị
function sum(a, b) {
    return a + b; // trả về tổng của a và b
}
let result = sum(2, 3);
console.log(result); // in ra 5

// 7.2 Hàm trả về sớm
function checkAge(age) {
    if (age >= 18) {
        return true; // trả về sớm nếu age >= 18
    } else {
        return false;
    }
}

let age = prompt("How old are you?", 18);
if (checkAge(age)) {
    console.log("Access granted");
} else {
    console.log("Access denied - you are too young!");
}

// 7.3 Đặt tên cho hàm
// - Hàm hành động, thường bắt đầu bằng động từ như: show..., get..., calculate..., create...
// - Hàm trả về giá trị, thường bắt đầu bằng từ: get..., calculate..., is..., has...
// - Tên hàm nên rõ ràng và mô tả chính xác chức năng của hàm

// 7.4 Nếu chức năng của hàm quá phức tạp, hãy chia nó thành các hàm nhỏ hơn

function showPrimes(n) {
    nextPrime: for (let i = 2; i < n; i++) {

        for (let j = 2; j < i; j++) {
            if (i % j == 0) continue nextPrime;
        }

        console.log(i); // a prime
    }
}
showPrimes(10); // in ra 2,3,5,7

function isPrime(n) {
    for (let i = 2; i < n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}
function showPrimes2(n) {
    for (let i = 2; i < n; i++) {
        if (isPrime(i)) {
            console.log(i); // in ra số nguyên tố
        }
    }
}

// Bài tập

// bài tập 1 - không bắt buộc dùng else  
function checkAge_1(age) {
    if (age > 18) {
        return true;
    } else {
        // ...
        return console.log('Did parents allow you?');
    }
}

function checkAge_2(age) {
    if (age > 18) {
        return true;
    }
    // ...
    return console.log('Did parents allow you?');
}

checkAge_1(16); // hỏi 'Did parents allow you?'
checkAge_2(16); // hỏi 'Did parents allow you?'

// bài tập 2 - sử dụng sử dụng '?' hoặc '||'

function checkAge_3(age) {
    if (age > 18) {
        return true;
    } else {
        return console.log('Did parents allow you?');
    }
}

checkAge_3(16); // hỏi 'Did parents allow you?'

// Viết lại để thực hiện tương tự nhưng không có if, trong một dòng. Tạo hai biến thể của checkAge:
// - Sử dụng toán tử dấu hỏi? , toán tử hai ngôi
// - Sử dụng OR||

function checkAge_4(age) {
    return (age > 18) ? true : console.log('Did parents allow you?'); // không khuyến cáo vì khó đọc
}
checkAge_4(16); // hỏi 'Did parents allow you?'

function checkAge_5(age) {
    return (age > 18) || console.log('Did parents allow you?');  // không khuyến cáo vì khó đọc
}
checkAge_5(16); // hỏi 'Did parents allow you?'

// bài tập 3 - Viết hàm min(a, b) trả về số nhỏ hơn trong hai số a và b
function min(a, b) {
    return (a < b) ? a : b;
}
min(2, 5); // 2
min(3, -1); // -1
min(1, 1); // 1

// bài tập 4 - Viết hàm pow(x, n) trả về x mũ n (xⁿ). Sử dụng phép nhân bình thường trong hàm.
function pow(x, n) {
    let result = 1; 
    for (let i = 0; i < n; i++) {
        result *= x;
    }
    return result;
}
console.log( pow(2, 3) ); // 8
console.log( pow(3, 4) ); // 81
console.log( pow(1, 100) ); // 1