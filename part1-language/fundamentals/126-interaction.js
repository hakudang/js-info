/** @file 
 * alert, prompt, confirm
 * 
 */
"use strict";
// 1. alert
alert("Hello"); // Hiển thị hộp thoại cảnh báo với thông điệp "Hello

// 2. prompt
let age = prompt("How old are you?", 18); // Hiển thị hộp thoại yêu cầu nhập tuổi
alert(`You are ${age} years old!`); // You are 18 years old!

// 3. confirm
let isAdult = confirm("Are you an adult?");
alert(`User is adult: ${isAdult}`); // User is adult: true or false based on user input

// 4 task
// Create a web-page that asks for a name and outputs it
let name = prompt("What is your name?", "Guest");
alert(`Hello, ${name}!`); // Hello, Guest!