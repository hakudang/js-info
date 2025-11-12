/**
 * file debug_03.js
 * Vòng lặp vô tình bị sai
 * Đặt breakpoint trong while
 * Quan sát vì sao code bị kẹt
 * Step Over vài lần để cảm nhận infinite loop
 * Fix bug 
 * 
 */
"use strict";
function countdown(n) {
  while (n >= 0) {
    console.log(n);
    // BUG: missing decrement
    // n--;
    n--;
  }
}

countdown(5);