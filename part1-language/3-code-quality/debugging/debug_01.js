/**
 * 
 * @file debug_01.js
 * Đặt breakpoint tại total = multiply(total, price);
 * Dùng step into F11 để vào trong hàm multiply và tìm bug
 */
"use strict";
function multiply(a, b) {
    //   return a + b; // BUG intentionally

    // fix bug
    return (a === 0 && b) || (b === 0 && a) || (a * b);

}

function calcTotal(prices) {
    let total = 0;

    prices.forEach(price => {
        total = multiply(total, price);
    });

    return total;
}

const result = calcTotal([2, 3, 4]);
console.log("Total:", result); // Expect 24 (2*3*4), but wrong result!
