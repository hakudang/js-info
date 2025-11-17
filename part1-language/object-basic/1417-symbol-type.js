/**  
 * Kiểu dữ liệu Symbol
 * - Symbol là kiểu dữ liệu nguyên thủy mới được giới thiệu trong ES6.
 * - Nó được sử dụng để tạo ra các giá trị duy nhất và không thể thay thế.
 * - Symbol thường được sử dụng làm khóa cho các thuộc tính của đối tượng.
 * 1. Tạo Symbol
 * 2. Ứng dụng của Symbol
 * 3. Truy cập Symbol
 * 4. Global Symbol Registry
 * 5. So sánh Local Symbol và Global Symbol 
 * 6. Tùy chỉnh hành vi của các đối tượng thông qua các Symbol đặc biệt (Symbol.iterator, Symbol.toStringTag, v.v.)
 */

// 1. Tạo key cho object mà không bị trùng với key khác 
const id1 = Symbol("id");
const id2 = Symbol("id");

console.log(id1 === id2); // false , vì hai Symbol khác nhau dù có cùng mô tả "id"

const user = {
    name: "John",
    age: 30,
    [id1]: 12345, // sử dụng Symbol làm key cho thuộc tính id
    [id2]: 67890 // sử dụng Symbol làm key cho thuộc tính id khác
};
console.log(user.name); // John
console.log(user.age); // 30
console.log(user[id1]); // 12345
console.log(user[id2]); // 67890

// 2. Ẩn hoặc bảo vệ dữ liệu nội bộ của object (private-like properties)

for (let key in user) console.log(key); // name, age (không in ra id)
console.log(Object.keys(user)); // [ 'name', 'age' ] (không in ra id)

// 3. Truy cập Symbol
console.log(Object.getOwnPropertySymbols(user)); // [ Symbol(id) ]

// 4. Global Symbol Registry
const globalSym1 = Symbol.for("globalId");
const globalSym2 = Symbol.for("globalId");

console.log(globalSym1 === globalSym2); // true

// lấy Symbol qua tên
let globalSym3 = Symbol.for("name");
let globalSym4 = Symbol.for("id");

// lấy name qua Symbol
console.log(Symbol.keyFor(globalSym3)); // name
console.log(Symbol.keyFor(globalSym4)); // id

// 5. So sánh Local Symbol và Global Symbol 
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");
console.log(globalSymbol === localSymbol); // false

console.log(Symbol.keyFor(globalSymbol)); // name
console.log(Symbol.keyFor(localSymbol)); // undefined
console.log(localSymbol.description); // name

// 6. Tùy chỉnh hành vi của các đối tượng thông qua các Symbol đặc biệt (Symbol.iterator, Symbol.toStringTag, v.v.)
// Symbol đặc biệt (well-known symbols) này chính là 
// “công tắc bí mật” giúp bạn tùy chỉnh cách object hoạt động 
// với cú pháp mặc định của JS

// 6.1 Symbol.hasInstance
// Ý nghĩa:
// - Symbol.hasInstance là hook ẩn phía sau instanceof
// - Quy định khi nào một object được coi là “instance” của một hàm constructor — 
// tức là bạn có thể tùy chỉnh cách hoạt động của instanceof
// - Symbol.hasInstance là một method tĩnh đặc biệt (static method) 
// mà mỗi class có thể định nghĩa để tùy chỉnh kết quả của instanceof

class User { }
let u = new User();
console.log(u instanceof User); // true

// tùy chỉnh hành vi instanceof
class Student {
    // định nghĩa phương thức Symbol.hasInstance
    static [Symbol.hasInstance](obj) {
        return obj.role === "student"; // kiểm tra thuộc tính role
    }
};
let a = { role: "student" };
let b = { role: "teacher" };

console.log(a instanceof Student); // true
console.log(b instanceof Student); // false

// 6.2 Symbol.isConcatSpreadable
// Ý nghĩa:
// Xác định một object có được “trải phẳng” khi nối mảng (Array.prototype.concat) hay không.
let arr1 = [1, 2];
let arr2 = [3, 4];
let result1 = arr1.concat(arr2); // [1, 2, 3, 4]
console.log(result1); // [1, 2, 3, 4]

// tùy chỉnh 1 - object giống mảng để trải phẳng khi nối mảng
let arrLike = { 0: "a", 1: "b", length: 2 };
arrLike.isConcatSpreadable = true; // bật trải phẳng
console.log([1, 2].concat(arrLike)); // [1, 2, "a", "b"]

// tùy chỉnh 2 - mảng không trải phẳng khi nối mảng
let arr3 = ["x", "y"];
arr3.isConcatSpreadable = false; // tắt trải phẳng
console.log([1, 2].concat(arr3)); // [1, 2, ["x", "y"]]

// 6.3 Symbol.iterator
// Ý nghĩa:
// Xác định hàm trả về iterator cho object — cho phép object được duyệt bằng:
// for...of , spread syntax (...) , Array.from()

let range = {
    start: 1,
    end: 5,
    // định nghĩa phương thức Symbol.iterator
    [Symbol.iterator]() {
        let current = this.start;
        let last = this.end;
        return {
            next() {
                if (current <= last) {
                    return { value: current++, done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }
};
for (let num of range) {
    console.log(num); // 1, 2, 3, 4, 5
}

// 6.4 Symbol.toPrimitive
// Ý nghĩa:

// Cho phép bạn tùy chỉnh cách object chuyển sang giá trị nguyên thủy (string, number, default),
// khi dùng trong phép toán, +, ==, alert(), v.v.

let user2 = {
    name: "Alice",
    age: 25,
    [Symbol.toPrimitive](hint) {
        console.log("Hint:", hint);
        if (hint === "string") return this.name;
        if (hint === "number") return this.age;
        return `User(${this.name})`;
    }
};
console.log(String(user2)); // hint: string \n Alice
console.log(+user2); // hint: number \n 25
console.log(user2 + "!"); // hint: default \n User(Alice)!