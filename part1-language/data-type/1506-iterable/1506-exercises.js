"use strict";

// in ra html tag <h2> ITERABLE - BÀI TẬP THÊM </h2>
document.write("<h2> ITERABLE - BÀI TẬP THÊM </h2>");

/*****************************
 * BÀI TẬP 1 : Duyệt và kiểm tra kiểu giá trị trong mảng đặc biệt iterator và Array-like
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

let arr = ["a", "b", "c"];
let iterator2 = arr[Symbol.iterator]();
while (true) {
    let result = iterator2.next();
    if (result.done) break;
    console.log(result.value); // a b c
}

/*****************************
 * BÀI 3: Dùng for..of với nhiều loại iterable
 *****************************
*/
let str3 = "ABC";
let set3 = new Set([10, 20, 30]);
let map3 = new Map([["x", 1], ["y", 2]]);

for (let char of str3) {
    console.log(char); // A B C
}
for (let value of set3) {
    console.log(value); // 10 20 30
}
for (let [key, value] of map3) {
    console.log(`${key}=${value}`); // x=1  y=2
}

/*****************************
 * BÀI 4: Tự xây iterable Range (from..to)
 * 
 *****************************
 */

// * Giải pháp: 
//  * Định nghĩa phương thức [Symbol.iterator]() trả về iterator object
//  * - return { value, done } trong phương thức next()

let range3 = {
    from: 1,
    to: 5,
    [Symbol.iterator]() {
        // trả về iterator
        let current = this.from;
        let last = this.to;
        return {
            next() {
                if (current <= last) {
                    return { value: current++, done: false };
                } else {
                    return { value: undefined, done: true };
                }
            }
        };
    }
};


for (let num of range3) {
    console.log(num); // 1 2 3 4 5
}

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

function makeIterator(array) {
    let index = 0;
    return {
        next() { // điểm quan trọng để hàm trở thành iterator : có next()
            if (index < array.length) {
                // Cách 1: gọi next() trả về value và done
                // return { value: array[index++], done: false };

                // Cách 2: làm cho iterator trở thành iterable luôn
                let str = array[index++];
                return { value: `value: ${str}, done: false`, done: false };
            } else {
                // Cách 1: gọi next() trả về value và done
                // return { value: undefined, done: true };

                // Cách 2: làm cho iterator trở thành iterable luôn
                return { value: `value: undefined, done: true`, done: true };
            }
        },
        [Symbol.iterator]() {
            return this; // điểm quan trọng để hàm này trở thành iterable
        }
    };

}

let myIterator = makeIterator(["JS", "Python", "Go"]);

// Cách 1 : gọi next() thủ công
// console.log(myIterator.next()); // { value: "JS", done: false }
// console.log(myIterator.next()); // { value: "Python", done: false }
// console.log(myIterator.next()); // { value: "Go", done: false }
// console.log(myIterator.next()); // { value: undefined, done: true }

// Cách 2 : dùng for..of để duyệt iterator
for (let item of myIterator) {
    console.log(`${item}`); // item là giá trị value ở next () trả về
}

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

let fibonacci = {
    [Symbol.iterator]() {
        let prev = 0, curr = 1;
        return {
            next() {
                if (curr > 1000) return { done: true };
                [prev, curr] = [curr, prev + curr];
                return { value: prev, done: false };
            }
        };
    }
};

for (let n of fibonacci) {
    console.log(n); // 1, 1, 2, 3, 5, 8, ... tới khi > 1000 thì dừng
}

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

function multiplicationTable(n) {
    return {
        [Symbol.iterator]() { // điểm quan trọng để hàm này trở thành iterable -> gọi for ..of được
            let i = 1;
            return {
                next() { // điểm quan trọng để hàm trở thành iterator : có next()
                    if (i > 10) return { done: true };
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


// let range = { from: 3, to: 7, ... };
let range5 = {
    from: 3,
    to: 7,
    [Symbol.iterator]() { // đối tượng là iterable
        let current = this.from;
        let last = this.to;
        return {
            next() { // đối tượng là iterator
                if (current <= last) {
                    return { value: current++, done: false }; // trả về value cho Array.from lấy

                } else {
                    return { done: true };
                }
            }
        }
    }
};
let arr5 = Array.from(range5, x => x * 2);
console.log(arr5); // [6, 8, 10, 12, 14]


/***********************************
 * Bài tập 9 : Duyệt ngược chuỗi
 * 
 ***********************************/

// Giải pháp :
// - Tạo hàm reverseString(str) trả về object iterable
// - Gợi ý: custom Symbol.iterator để đếm ngược index
function reverseString(str) {
    return {
        [Symbol.iterator]() { // trở thành iterable
            let index = str.length - 1;
            return {
                next() { // trở thành iterator
                    if (index >= 0) {
                        const char = str[index];
                        index--;
                        return { value: char, done: false };
                    }
                    return { value: undefined, done: true };
                }
            };
        }
    };
}

for (let char of reverseString("hello")) console.log(char);
// o, l, l, e, h

/***********************************
 * Bài tập 10 : Duyệt ngược chuỗi
 * Custom iterable vô hạn (có thể dừng bằng break)
 ***********************************/

// Giải pháp :
// - Tạo hàm countFrom(start) trả về object iterable
// - object iterable có phương thức [Symbol.iterator]() trả về iterator
// - iterator có phương thức next() trả về số tiếp theo
// - Sử dụng biến trạng thái bên trong iterator để theo dõi số hiện tại

function countFrom(start) {
    return {
        [Symbol.iterator]() { // trở thành iterable
            let current = start;
            return {
                next() { // trở thành iterator
                    return { value: current++, done: false };
                }
            }
        }
    }
}
for (let n of countFrom(5)) {
    console.log(n);
    if (n > 10) break; // dừng tay
}