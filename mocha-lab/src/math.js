/**
 * file : math.js
 * Trả về x mũ n
 * @param {*} x  số cơ sở
 * @param {*} n  số mũ
 * @returns {number} x mũ n
 */

// // v1 – tạm rỗng để thấy RED
// export function pow(x, n) {
//   // tạm để trống, để thấy test fail (RED)
// }

// // v2 – GREEN tạm: Code “ăn gian” để hiểu vòng lặp TDD
// export function pow(x, n) {
//   if (n === 0) return 1;
//   return 8; // cố tình cheat để thấy tầm quan trọng của test mở rộng
// }

/*
// v3 – thuật toán thật
export function pow(x, n) {
  if (n === 0) return 1;
  let result = 1;
  for (let i = 0; i < n; i++) {
    result *= x;
  }
  return result;
}
*/

/*
// v4 – hoàn thiện
export function pow(x, n) {
    // biên: n âm hoặc không nguyên → NaN
    if (n < 0 || !Number.isInteger(n)) return NaN; 
    // quy ước mũ 0
    if (n === 0) return 1;
    let result = 1;
    for (let i = 0; i < n; i++) {
        result *= x;
    }
    return result;
}
*/

/*
// v5 – code “tự mô tả” hơn một chút
export function pow(x, n) {
  if (!isValidExponent(n)) return NaN;
  if (n === 0) return 1;

  let result = 1;
  for (let i = 0; i < n; i++) result *= x;
  return result;
}
const isValidExponent = (n) => Number.isInteger(n) && n >= 0;
*/