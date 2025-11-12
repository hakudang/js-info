/** file math_other.js
 *  trả về các số nguyên tố nhỏ hơn n
 *  @param {number} n
 *  @returns {Array} mảng các số nguyên tố nhỏ hơn n
 */

// ví dụ hàm khác để test unit code trong mocha-lab 

// function showPrimes(n) {
//     const primes = [];
//     for (let i = 2; i < n; i++) {
//         let isPrime = true; 
//         for (let j = 2; j < i; j++) {
//             if (i % j == 0) {
//                 isPrime = false;
//                 break;
//             }
//         }
//         if (isPrime) {
//             console.log(i); // in ra số nguyên tố
//         }   
//     }
//     return primes;
// }

/*
// v0 – ban đầu
export function showPrimes(n) {
    // tạm để trống, để thấy test fail (RED)
}
*/

// v1 – thuật toán thật
// export function showPrimes(n) {
//     const primes = [];
//     nextPrime:
//     for ( let i = 2; i < n ; i++) {
//         for ( let j = 2; j < i ; j++) {
//             if ( i % j == 0 ) continue nextPrime;
//         }
//         primes.push(i);
//     }
//     return primes;  
// }

/*
// v2 – hoàn thiện
export function showPrimes(n) {
    if (n < 2 || !Number.isInteger(n)) return [];
    const primes = [];
    for (let i = 2; i < n; i++) {
        if (!isPrime(i)) continue;
        primes.push(i);
    }
    return primes;
}
// hàm phụ kiểm tra số nguyên tố
const isPrime = (num) => {
    for (let i = 2; i < num; i++) {
        if (num % i === 0) return false;
    }
    return true;
}
*/

/** 
 *  tra về tổng con lớn nhất trong mảng arr
 *  @param {Array} arr mảng số
 *  @returns {number} tổng con lớn nhất trong mảng arr
 */

// v0 - getMaxSubSum(arr)
// export function getMaxSubSum(arr) {
//     // tạm để trống, để thấy test fail (RED)
// }

// v1 - thuật toán thật
export function getMaxSubSum(arr) {
    let maxSum = 0;
    for (let i = 0; i < arr.length; i++) {
        let sumFixedStart = 0;
        for (let j = i; j < arr.length; j++) {
            sumFixedStart += arr[j];
            maxSum = Math.max(maxSum, sumFixedStart);
        }
    }
    return maxSum;
}