/**
 * câu lệnh và toán tử điều kiện if
 * 
 * @file 
 * If Condition
 *  - 1. if 
 *  - 2. Chuyển đổi kiểu Boolean
 *  - 3. Mệnh đề “else”
 *  - 4. Mệnh đề else if và else
 *  - 5. Toán tử điều kiện '?' nhị phân
 *  - 6. Nhiều '?'
 */

"use strict";
// in ra html tag <h2>If Condition</h2>
document.write("<h2>If Condition</h2>");

// 1. if 
// let year = prompt('What is this year ?', 2025);
let year = 2025
// if (year == 2025) console.log(`You are right `);

// thực thi nhiều hơn 1 câu lệnh
if (year == 2025) {
    console.log(`You are right `);
    console.log("You so smart");
}

// 2. Chuyển đổi kiểu Boolean

// 0, string "", null, undefined, và NaN trong Boolean đều chuyển thành false -> là sai 
// Các giá trị khác trở thành true -> đúng

// 2.1 Các điều kiện sai đều không được thực hiện như ví dụ sau

if (0) { // 0 is falsy
    //   ...
}

// 2.2 mệnh đề điều kiện luôn như sau
if (1) { // 1 is truthy
    //   ...
}

// 3. Mệnh đề “else”

// let year1 = prompt('What is this year ?', 2025);
let year1 = 2025

if (year1 == 2025) {
    console.log('You guessed it right!');
} else {
    console.log('How can you be so wrong?'); // any value except 2015
}


// 4. Mệnh đề else if và else
let year2 = prompt('What is this year ?', 2025);

if (year2 < 2025) {
    alert('Too early...');
} else if (year2 > 2025) {
    alert('Too late');
} else {
    alert('Exactly!');
}

// 5. Toán tử điều kiện '?'

// 5.1 dùng ?
// ví dụ 1
let accessAllowed;
let age = prompt("How old are you ?", "");

// if (age > 18) {
//     accessAllowed = true;
// } else {
//     accessAllowed = false;
// }
// console.log(accessAllowed);

// chuyển sang dùng ?
// accessAllowed = ( age > 18 ) ? true: false ;

// Hoặc có thể như sau, vì kết quả của toán tử boolean trả về true hay false
// accessAllowed = ( age > 18 )

// console.log(accessAllowed);

//6. Nhiều '?'

let message = (age < 3) ? "Hi, baby !" :
    (age < 18) ? "Hello !" :
        (age < 100) ? "Greetings !" :
            "What an unusual age !";

alert(message);

// 5.2 dùng if 
let accessAllowed1;
let age1 = prompt("How old are you ?", "");
let message1
if (age1 < 3) {
    message = "Hi, baby !";
} else if (age1 < 18) {
    message = "Hello !";
} else if (age1 < 100) {
    message = "Greetings !";
} else {
    "What an unusual age !";
}
alert(message1);

// TASK
// task 1 
if ("0") {  // true
    console.log('Hello');
}

// task 2
let value = prompt("What's the “official” name of JavaScript?", "ECMAScript");
if (value == "ECMAScript") {
    alert("Right")
} else {
    alert("You don’t know? ECMAScript!")
}

// task 3

let value1 = prompt("input a number", 0);
if (value1 > 0) {
    console.log(1);
} else if (value1 < 0) {
    console.log(-1);
} else {
    console.log(0);
}

// task 4 - Rewrite 'if' into '?'

// let result;

// if (a + b < 4) {
//   result = 'Below';
// } else {
//   result = 'Over';
// }
let result = (a + b < 4) ? 'Below' : 'Over'
console.log(result);

// task 5 - Rewrite 'if..else' into '?'

// let message;

// if (login == 'Employee') {
//   message = 'Hello';
// } else if (login == 'Director') {
//   message = 'Greetings';
// } else if (login == '') {
//   message = 'No login';
// } else {
//   message = '';
// }

let message2 = (login == 'Employee') ? 'Hello' :
    (login == 'Director') ? 'Greetings' :
        (login == '') ? 'No login' :
            ''