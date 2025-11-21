/**  
 * file : 1560-iterables.js
 * Giới thiệu về Iterables trong JavaScript
 * Iterables không phải là kiểu dữ liệu mà là một giao thức được tạo từ ES6 trở đi.
 * ES6 định nghĩa: 
 * - Một đối tượng là Iterable nếu nó có phương thức [Symbol.iterator]().
 * - Khi gọi obj[Symbol.iterator](), nó phải trả về Iterator object : có phương thức next(), return { value, done }.
 * 
 * for..of, ...spread, Array.from()… đều dựa trên giao thức này để lặp qua các phần tử của Iterable.
 * Bất kỳ dữ liệu nào tuân theo chuẩn iterable đều có thể sử dụng các cấu trúc lặp này : 
 * mảng, chuỗi, Map, Set, ...
 * 
 * LÝ THUYẾT 
 * 1. Cách hoạt động bên trong for..of với iterable
 * 2. Ứng dụng minh họa
 * 3. Thêm phương thức [Symbol.iterator]() vào đối tượng để nó trở thành iterable
 * 4. Sử dụng Spread operator với iterable
 * 5. Chuỗi cũng có thể lặp lại được
 * 6. Gọi iterator thủ công
 * 7. Array.from Chuyển bất kỳ iterable hoặc array-like (giả mảng) → thành Array 
 * 7.1 Từ Array-Like thành array
 * 7.2 Từ iterable thành array
 * 7.3 Gọi Array.from có tham số mapFn ( hàm map)
 * 
 */

// in ra tiêu đề
document.write("<h2>1560 - Iterables trong JavaScript </h2>");

// trước ES6 
const str = "Hello";
for (i = 0; i < str.length; i++) {
    console.log(str[i]); // H e l l o
}
// từ ES6 trở đi, chuỗi là iterable
for (const char of str) console.log(char); // H e l l o

// 1.  Cách hoạt động bên trong for..of với iterable

// - Gọi range[Symbol.iterator]() → lấy đối tượng iterator
// - Gọi liên tục iterator.next()
// - next() mỗi lần trả về { value, done }
// - Khi done: true, vòng lặp kết thúc

// 2. Ứng dụng minh họa

// có 1 đối tượng không phải mảng nhưng muốn chạy for..of chạy được

let range = {
    from: 1,
    to: 5
};
// chạy for..of trên đối tượng range sẽ lỗi
// for (let num of range) {
//     console.log(num); // Lỗi: range is not iterable
// }

// 3. Thêm phương thức [Symbol.iterator]() vào đối tượng để nó trở thành iterable

range[Symbol.iterator] = function () {
    // thiết lập biến trạng thái ban đầu
    return {
        current: this.from,
        last: this.to,
        next() {
            if (this.current <= this.last) {
                return { value: this.current++, done: false };
            } else {
                return { done: true };
            }
        }
    };
};

// sử dụng for..of để lặp qua các giá trị trong range
for (let num of range) {
    console.log(num); // 1, 2, 3, 4, 5
}

// Cải tiến code ngắn hơn
let range2 = {
    from: 1,
    to: 5,
    [Symbol.iterator]() {
        this.current = this.from;
        return this;
    },
    next() {
        return this.current <= this.to ?
            { value: this.current++, done: false } :
            { done: true };
    }
};

// sử dụng for..of để lặp qua các giá trị trong range2
for (let num of range2) {
    console.log(num); // 1, 2, 3, 4, 5
}

// 4. Sử dụng Spread operator với iterable
const chars = [..."Hello"];
console.log(chars); // ['H', 'e', 'l', 'l', 'o']

// 5. Chuỗi cũng có thể lặp lại được

// 5.1 chuỗi thường 
for (let char of "Hello") {
    console.log(char); // H e l l o
}
// 5.2 Chuỗi với ký tự đặc biệt
for (let char of "𝒳😂") {
    console.log(char); // 𝒳 😂
}

// 6. Gọi iterator thủ công

let str2 = "Hello";
let iterator = str2[Symbol.iterator]();
while (true) {
    let result = iterator.next();
    if (result.done) break;
    console.log(result.value); // H e l l o
}

// 7. Array.from Chuyển bất kỳ iterable hoặc array-like (giả mảng) → thành Array real

// 7.1 Từ Array-Like thành array
let arrayLike = {
    0: "Hello",
    1: "World",
    length: 2
};
let arr2 = Array.from(arrayLike);
console.log(arr2); // ['Hello', 'World']
arr2.pop();
console.log(arr2); // ['Hello']

// 7.2 Từ iterable thành array

let arr3 = Array.from(range2);
console.log(arr3); // [1, 2, 3, 4, 5]

// 7.3 Gọi Array.from có tham số mapFn ( hàm map)

// cú pháp: Array.from(arrayLike, mapFn, thisArg)
// arrayLike : iterable hoặc array-like, (ví dụ: arguments, NodeList, Set, Map, hoặc iterable object
// mapFn : hàm sẽ được gọi trên mỗi phần tử để tạo thành phần tử mới trong mảng kết quả
// thisArg : giá trị sử dụng làm this khi gọi hàm mapFn

let arr4 = Array.from(range2, num => num * num);
console.log(arr4); // [1, 4, 9, 16, 25]