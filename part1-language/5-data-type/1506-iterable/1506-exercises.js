"use strict";

// in ra html tag <h2> ITERABLE </h2>
document.write("<h2> ITERABLE</h2>");
document.write("<h3> BÀI TẬP THÊM </h3>");

function section(title) {
    console.log("\n====================");
    console.log(title);
    console.log("====================");
}

/*****************************
 * BÀI TẬP 1 : Bài 1. Kiểm tra iterable
 *****************************
 * Giải pháp tổng hợp
 * duyệt và kiểm tra từng giá trị trong mảng values
 * - iterable (Map, Set, Array, String, custom iterable )
 * - primitive
 * - array-like
 * - plain object
 * MÔ TẢ: 
 * Viết hàm isIterable, isArrayLike, isPlainObject, isMap, isSet, isPrimitive
 * Viết hàm classify để phân loại giá trị trong mảng values
*/

section("Bài 1 - Kiểm tra iterable");

//  Cách kiểm tra iterable object 
// Kiểm tra object có phải iterable không bằng cách kiểm tra có phương thức [Symbol.iterator] hay không

function isIterable(obj) {
    return obj != null && typeof obj[Symbol.iterator] === 'function';
}


// Cách kiểm tra array-like object
// Kiểm tra object có phải array-like không bằng cách kiểm tra 
// có thuộc tính length và chỉ số từ 0 đến length - 1
function isArrayLike(obj) {
    return obj != null && typeof obj === 'object' && typeof obj.length === 'number' &&
        obj.length >= 0 && Number.isInteger(obj.length);
}

// Cách kiểm tra Plain Object ( bình thường )
// - Kiểm tra object không phải iterable hoặc array-like, Map, Set
// - có cặp key-value thông thường

function isPlainObject(obj) {
    return obj != null && typeof obj === 'object' &&
        !isIterable(obj) && !isArrayLike(obj) && !(obj instanceof Map) && !(obj instanceof Set);
}

// Cách kiểm tra Map và Set
// Kiểm tra object có phải Map hoặc Set không bằng toán tử instanceof

function isMap(obj) {
    return obj instanceof Map;
}

function isSet(obj) {
    return obj instanceof Set;
}

// Cách kiểm tra Primitive 
function isPrimitive(value) {
    return value === null || (typeof value !== 'object' && typeof value !== 'function');
}

let values = [
    [1, 2, 3],
    "hello",
    new Set([1, 2, 3]),
    new Map(),
    123,
    { 0: "hello", 1: "world", length: 2 },
    { name: "Alice", age: 30 }
]

/*
for (let value of values) {
    if (isIterable(value)) {
        if (isMap(value)) {
            console.log(`Iterable - Map: ${JSON.stringify(Array.from(value))}`);
        } else if (isSet(value)) {
            console.log(`Iterable - Set: ${JSON.stringify(Array.from(value))}`);
        } else {
            console.log(`Iterable - Other: ${(JSON.stringify(value))}`);
        }
    } else if (isArrayLike(value)) {
        console.log(`Array-like: ${JSON.stringify(value)}`);
    } else if (isPlainObject(value)) {
        console.log(`Plain Object: ${JSON.stringify(value)}`);
    } else {
        console.log(`Primitive: ${JSON.stringify(value)}`);
    }
}
*/

// cải tiến in giá trị iterable

// const arr = [1, 2, 3];
// const str5 = "hello";
// const set = new Set([1, 2, 3]);
// const map = new Map();

// console.log(Symbol.iterator in arr); // true
// console.log(Symbol.iterator in str5); // lỗi  , vì String là primitiv, không là object
// console.log(Symbol.iterator in set); // true
// console.log(Symbol.iterator in map); // true
// console.log(Symbol.iterator in { a: 1, b: 2 }); // false


function classify(value) {
    // iterable (Map, Set, Array, String, custom iterable )
    if (isIterable(value)) {
        if (typeof value === 'string') return `${value}: Iterable - String / Primitive`;
        if (isMap(value)) return `${JSON.stringify(Array.from(value))}: Iterable - Map`;
        if (isSet(value)) return `${JSON.stringify(Array.from(value))}: Iterable - Set`;
        return `${JSON.stringify(value)}: Iterable - Plain`;
    }
    // primitive
    if (isPrimitive(value)) return `${value}: Primitive`;
    // array-like
    if (isArrayLike(value)) return `${JSON.stringify(value)}: Array-like`;
    // plain object
    if (isPlainObject(value)) return "Plain Object";
    return "Other";
}

console.log(values.map(classify));

/*****************************
 * BÀI 2: Duyệt iterable thủ công
 *****************************
*/
// Giải pháp :
// - Lấy iterator từ iterable bằng cách gọi iterable[Symbol.iterator]()
// - Sử dụng vòng lặp while để gọi next() cho đến khi done là true
section("Bài 2 - Duyệt iterable thủ công");

let arr = ["a", "b", "c"];
let iterator2 = arr[Symbol.iterator]();
while (true) {
    let result = iterator2.next();
    if (result.done) break;
    console.log(result.value); // a b c
}

/*****************************
 * BÀI 3: Dùng for..of với nhiều loại iterable
 * 
 *****************************
*/

section("Bài 3 - for..of với nhiều loại iterable");

let str3 = "ABC";
let set3 = new Set([10, 20, 30]);
let map3 = new Map([["x", 1], ["y", 2]]);

// for..of với String trả về ký tự
let str = "";
for (let char of str3) {
    str += char;
}
console.log(str.trim()); // ABC

// for..of với Set trả về giá trị
let arrSet = [];
for (let value of set3) {
    arrSet.push(value);
}
console.log(arrSet); // [10, 20, 30]

// for..of với Map trả về mảng [key, value]
let arrMap = [];
for (let [key, value] of map3) {
    arrMap.push(`${key}=${value}`);
}
console.log(arrMap); // ['x=1', 'y=2']

/*****************************
 * BÀI 4: Tự xây iterable Range (from..to)
 * 
 *****************************
 */

// * Giải pháp: 
//  * Định nghĩa phương thức [Symbol.iterator]() trả về iterator object
//  * - return { value, done } trong phương thức next()

section("Bài 4 - Tự xây iterable Range (from..to)");

let range3 = {
    from: 1, // không phải đk cần
    to: 5,
    [Symbol.iterator]() { // điều kiện để trở thành iterable
        let current = this.from; // không phải đk cần
        let last = this.to;
        return { // trả về iterator object
            next() { // điều kiện để trở thành iterator
                if (current <= last) {
                    return { value: current++, done: false }; // trả về value cho for..of và done
                } else {
                    return { value: undefined, done: true };
                }
            }
        };
    }
};

let result = [];
for (let num of range3) {
    result.push(num);
}
console.log(result); // [1, 2, 3, 4, 5]

/*****************************
 * Bài tập 5 : Tạo iterator thủ công 
 * 
 *****************************/

// Viết hàm makeIterator(array) tạo iterator object có phương thức next()

// Giải pháp :  
// - Hàm makeIterator(array) trả về iterator object
// - iterator object có phương thức next() trả về { value, done }
// - Sử dụng biến trạng thái bên trong iterator object để theo dõi vị trí hiện tại
// - Khi gọi next(), trả về phần tử hiện tại và cập nhật vị trí

section("Bài 5 - Tạo iterator thủ công ");

function makeIterator(array) {
    let index = 0;
    return { // trả về iterator object
        next() { // điều kiện cần để trở thành iterator
            if (index < array.length) {
                let str = array[index++];
                return { value: str, done: false };
            } else {
                return { value: undefined, done: true }; // kết thúc iterator
            }
        },
        [Symbol.iterator]() { // điều kiện cần để trở thành iterable
            return this; // trả về chính nó - iterator cũng là iterable
        }
    };

}

let myIterator = makeIterator(["JS", "Python", "Go"]);

console.log(myIterator.next()); // { value: "JS", done: false }
console.log(myIterator.next()); // { value: "Python", done: false }
console.log(myIterator.next()); // { value: "Go", done: false }
console.log(myIterator.next()); // { value: undefined, done: true }


/*****************************
 * Bài tập 6 : Iterable theo số Fibonacci
 * Tạo object fibonacci có thể duyệt bằng for..of, 
 * trả ra dãy số Fibonacci tới khi đạt 1000
 *****************************/

// Giải pháp :
// - Tạo object fibonacci có phương thức [Symbol.iterator]() trả về iterator
// - iterator có phương thức next() trả về số Fibonacci tiếp theo
// - Sử dụng biến trạng thái bên trong iterator để theo dõi hai số Fibonacci gần nhất
// - Khi số Fibonacci tiếp theo vượt quá 1000, trả về done: true

// Kết quả 
// 1, 1, 2, 3, 5, 8, 13, ...

section("Bài 6 - Iterable Fibonacci (<= 1000)");

let fibonacci = {
    [Symbol.iterator]() { // trở thành iterable
        let prev = 0, curr = 1;
        return {
            next() { // trở thành iterator
                if (curr > 1000) return { done: true };
                [prev, curr] = [curr, prev + curr];
                return { value: prev, done: false }; // trả về value cho for..of lấy
            }
        };
    }
};

let arrFibonacci = [];
for (let n of fibonacci) {
    arrFibonacci.push(n);
}
console.log("B6 - Fibonacci array:", arrFibonacci);

/*****************************
 * Bài tập 7 : Iterable tạo bảng cửu chương
 * Tạo hàm multiplicationTable(n) trả về iterable
 * In ra bảng cửu chương của n từ 1 đến 10
 *****************************/

// Giải pháp :
// - Tạo hàm multiplicationTable(n) trả về object iterable
// - object iterable có phương thức [Symbol.iterator]() trả về iterator
// - iterator có phương thức next() trả về chuỗi biểu diễn phép nhân tiếp theo
// - Sử dụng biến trạng thái bên trong iterator để theo dõi số lần nhân hiện tại
// - Khi số lần nhân vượt quá 10, trả về done: true

section("Bài 7 - Iterable bảng cửu chương");

function multiplicationTable(n) {
    return {
        [Symbol.iterator]() { // trở thành iterable
            let i = 1;
            return {
                next() { // trở thành iterator để dùng trong for..of
                    if (i > 10) return { done: true }; // kết thúc iterator
                    let line = `${n} x ${i} = ${n * i}`;
                    i++;
                    return { value: line, done: false }; // value trả về ở next() và được for..of lấy ra
                }
            };
        }
    };
}

for (let line of multiplicationTable(8)) {
    console.log(line);
    // 8 x 1 = 8
    // 8 x 2 = 16
    // ...
    // 8 x 10 = 80
}

/*****************************
 * Bài tập 8 : Iterable với Sử dụng Array.from
 * Mục đích : hiểu Array.from() tự động gọi iterator bên trong iterable object
 * 
 * *****************************/

// Giải pháp :
// - Tạo object iterable với phương thức [Symbol.iterator]() trả về iterator
// - Sử dụng Array.from() để chuyển iterable thành mảng
// - Kiểm tra kết quả mảng có đúng các giá trị từ iterator trả về không

section("Bài 8 - Sử dụng Array.from với iterable ");

// let range = { from: 3, to: 7, ... };
let range5 = {
    from: 3,
    to: 7,
    [Symbol.iterator]() { // trở thành iterable
        let current = this.from;
        let last = this.to;
        return {
            next() { // trở thành iterator
                if (current <= last) {
                    return { value: current++, done: false }; // trả về value cho Array.from lấy

                } else {
                    return { done: true }; // kết thúc iterator
                }
            }
        }
    }
};
// Sử dụng Array.from để chuyển iterable thành mảng, có mapFn nhân đôi giá trị
let arr5 = Array.from(range5, x => x * 2);
console.log(arr5); // [6, 8, 10, 12, 14]


/***********************************
 * Bài tập 9 : Duyệt ngược chuỗi
 * 
 ***********************************/

// Giải pháp :
// - Tạo hàm reverseString(str) trả về object iterable
// - Gợi ý: custom Symbol.iterator để đếm ngược index

section("Bài 9 - Duyệt ngược chuỗi");

function reverseString(str) {
    return {
        [Symbol.iterator]() { // trở thành iterable
            let index = str.length - 1;
            return {
                next() { // trở thành iterator
                    if (index >= 0) {
                        const char = str[index];
                        index--;
                        return { value: char, done: false }; // trả về ký tự hiện tại
                    }
                    return { value: undefined, done: true };
                }
            };
        }
    };
}
let arrStr = [];
// let str9 = Array.from(reverseString("hello")).join('');
// console.log("B9 - Reverse String:", str9);

for (let char of reverseString("hello")) arrStr.push(char);
console.log(arrStr.join('')); // "olleh"

/***********************************
 * Bài tập 10 : Duyệt ngược chuỗi
 * Custom iterable vô hạn (có thể dừng bằng break)
 ***********************************/

// Giải pháp :
// - Tạo hàm countFrom(start) trả về object iterable
// - object iterable có phương thức [Symbol.iterator]() trả về iterator
// - iterator có phương thức next() trả về số tiếp theo
// - Sử dụng biến trạng thái bên trong iterator để theo dõi số hiện tại

section("Bài 10 - Custom iterable vô hạn (dừng bằng break)");

function countFrom(start) {
    return {
        [Symbol.iterator]() { // trở thành iterable
            let current = start;
            return {
                next() { // trở thành iterator
                    return { value: current++, done: false }; // luôn trả về done: false vì vô hạn
                }
            }
        }
    }
}
for (let n of countFrom(5)) {
    console.log(n);
    if (n > 10) break; // tự dừng bằng break
}