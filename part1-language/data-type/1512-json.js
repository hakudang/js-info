/**  
 * JSON trong JavaScript
 * JSON là gì?
 * Định dạng dữ liệu chuẩn (RFC 4627), đa ngôn ngữ.
 * Dùng cặp hàm:
 * JSON.stringify(obj) → chuyển object thành chuỗi JSON.
 * JSON.parse(json) → chuyển chuỗi JSON thành object
 * Kiểu dữ liệu JSON hỗ trợ
 * - Object{}, Array[] 
 * - Primitive : String, Number, Boolean, null
 * - Không hỗ trợ: Function, Date, undefined, Symbol, BigInt
 * 1. JSON.stringify
 * 2. Nested object & lỗi vòng lặp
 * 3. Lọc hoặc chỉnh dữ liệu: replacer
 * 4. space – định dạng cho dễ nhìn
 * 5. JSON.parse() – chuyển chuỗi JSON về object
 * 6. reviver – tùy chỉnh khi parse
 * 7. Bài tập
 * - Bài tập 1  :  Chuyển đổi đối tượng thành JSON và ngược lại
 * - Bài tập 2 : Loại trừ các tham chiếu ngược
 */

"use strict";

// in ra tiêu đề
document.write("<h2> JSON trong JavaScript </h2>");

let user = {
    name: "John",
    age: 30,
    toString() {
        return `User: ${this.name}, ${this.age} years old`;
    }
};

// console.log(user.toString()); // User: John, 30 years old
console.log(user); // { name: 'John', age: 30, toString: [Function: toString] }

// 1. JSON.stringify

let student = {
    name: 'John',
    age: 30,
    isAdmin: false,
    courses: ['html', 'css', 'js'],
    spouse: null
};

let json = JSON.stringify(student);
console.log(typeof json); // string
console.log(json);
/* JSON-encoded object:
{
  "name":"John",
  "age":30,
  "isAdmin":false,
  "courses":["html","css","js"],
  "spouse":null
}
*/

console.log(JSON.stringify(1)); // "1"
console.log(JSON.stringify("test")); // ""test""
console.log(JSON.stringify(true)); // "true"
console.log(JSON.stringify([1, 2, 3])); // "[1,2,3]"
console.log(JSON.stringify(null)); // "null"

// 1.1 Khác biệt khi dùng JSON.stringify với các kiểu dữ liệu
// - Chuỗi & tên thuộc tính luôn dùng double quotes " 
// - ví dụ : 
// - { name: 'John' } → {"name":"John"}
// - age: 30 → "age":30

// 1.2 Bị bỏ qua khi chuyển đổi

let user2 = {
    sayHi() { // function bị bỏ qua
        console.log("Hello");
    },
    [Symbol("id")]: 123, // symbol bị bỏ qua
    age: undefined, // undefined bị bỏ qua
    name: "Alice" // chỉ còn lại thuộc tính name
};

console.log(JSON.stringify(user2)); // {"name":"Alice"}


// 2. Nested object & lỗi vòng lặp
// JSON.stringify xử lý được object lồng nhau:

let meetup = {
    title: "Conference",
    room: { number: 23, participants: ["john", "ann"] }
};
console.log(JSON.stringify(meetup));
/* JSON-encoded object:
{
  "title":"Conference",
  "room":{
    "number":23,
    "participants":["john","ann"]
    }
}
*/

// 2.1 Lỗi vòng lặp (circular reference)
// Khi object có tham chiếu vòng lặp, JSON.stringify sẽ báo lỗi
let room = { number: 23 };
let meetup2 = {
    title: "Conference",
    room: room
};
room.occupiedBy = meetup2; // tạo vòng lặp tham chiếu
// console.log(JSON.stringify(meetup2)); // Lỗi: TypeError: Converting circular structure to JSON

// 3. Lọc hoặc chỉnh dữ liệu: replacer

// cú pháp JSON.stringify(value, replacer, space)
// - replacer : array hoặc function để lọc hoặc biến đổi dữ liệu
// - space : number hoặc string, định dạng khoảng trắng (cho log dễ đọc)

// 3.1 Dùng mảng – chỉ giữ các key cho phép

let user3 = { name: "John", age: 25, role: "admin" };
console.log(JSON.stringify(user3, ["name", "age"]));
// {"name":"John","age":25}

// 3.2 Dùng hàm replacer
let room3 = { number: 23 };
let meetup3 = { title: "Conf", place: room3 };
room3.occupiedBy = meetup3;

let json3 = JSON.stringify(meetup, function (key, value) {
    if (key == "occupiedBy") return undefined; // bỏ key này
    return value;
});
console.log(json3); // {"title":"Conf","place":{"number":23}}

// 4. space – định dạng cho dễ nhìn
// JSON.stringify() tự động gọi obj.toJSON() nếu có.

let room4 = {
    number: 23,
    toJSON() {
        return this.number; // chỉ xuất ra số 23
    }
};


let meetup4 = {
    title: "Conference",
    room: room4
};

console.log(JSON.stringify(room4));   // 23
console.log(JSON.stringify(meetup4)); // {"title":"Conference","room":23}

// 6. JSON.parse() – chuyển chuỗi JSON về object

let str = '{"name":"John","age":30,"isAdmin":false}';
let user4 = JSON.parse(str);
console.log(user4); // { name: 'John', age: 30, isAdmin: false }

// 7. reviver – tùy chỉnh khi parse

// Giúp “hồi sinh” các giá trị đặc biệt (như Date).
// cú pháp : JSON.parse(text, reviver)
// - reviver là hàm(key, value) được gọi cho mỗi cặp key-value,
//   có thể biến đổi giá trị và trả về giá trị mới.

let str5 = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup5 = JSON.parse(str5, function (key, value) {
    if (key == "date") return new Date(value);
    return value;
});

console.log(meetup5);
// { title: 'Conference', date: 2017-11-30T12:00:00.000Z }
console.log(meetup5.date.getDate()); // 30

// 8. Bài tập 

// Bài tập 1  :  Chuyển đổi đối tượng thành JSON và ngược lại

let user6 = {
    name: "John Smith",
    age: 35
};

let parsedUser6 = JSON.parse(JSON.stringify(user6));
console.log(parsedUser6); // John Smith

// Bài tập 2 : Loại trừ các tham chiếu ngược

// Question :

// Chuyển đổi đối tượng meetup thành JSON.
// Loại trừ các tham chiếu ngược để tránh lỗi vòng lặp.

let room6 = {
    number: 23
};

let meetup6 = {
    title: "Conference",
    occupiedBy: [{ name: "John" }, { name: "Alice" }],
    place: room6
};

// circular references
room6.occupiedBy = meetup6;
meetup6.self = meetup6;

console.log(JSON.stringify(meetup6, function replacer(key, value) {
    /* your code */
    console.log(`${key} : ${value}`);
    if (key !== "" && value == meetup6) return undefined;
    return value;
}));

// Expected output:
// key:  value: [object Object]    // lần đầu, key === "", value là meetup6
// key: title value: Conference
// key: occupiedBy value: [object Object]
// key: 0 value: [object Object]
// key: name value: John
// key: 1 value: [object Object]
// key: name value: Alice
// key: place value: [object Object]
// key: number value: 23
// key: self value: [object Object]   // chính là meetup6 → bị loại bỏ


/* result should be:
{
  "title":"Conference",
  "occupiedBy":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
