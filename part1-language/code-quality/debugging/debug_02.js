/**
*  @file debug_02.js
*  Hiểu sự khác biệt giữa step into (F11) và step over (F10) 
*  - Đặt breakpoint tại const s1 = square(a);
*  - Test 2 scenario:
*       - Step Over (F10)
*       - Step Into (F11)
*       - Quan sát call stack và giá trị biến
*/

function square(n) {
  return n * n;
}

function sumOfSquares(a, b) {
  const s1 = square(a);
  const s2 = square(b);
  return s1 + s2;
}

console.log(sumOfSquares(3, 4)); // Expect 25
