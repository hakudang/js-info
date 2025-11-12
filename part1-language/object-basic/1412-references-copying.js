/** file: 1411-references-copying.js 
 * Giới thiệu về tham chiếu và sao chép trong JavaScript
 * 1. Kiểu primative độc lập
 * 2. Đối với Object, biến lưu trữ tham chiếu đến vị trí trong bộ nhớ
 * 3. So sánh đối tượng
 * 4. Copy đối tượng nông - vòng lặp for..in, Object.assign
 * 5. Copy đối tượng sâu - Đối tượng bên trong đối tượng - structuredClone
 */

// in ra html tag <h2> Object Reference and Copying </h2>
document.write("<h2> Object Reference and Copying </h2>");

// 1. Kiểu primative ( 7 kiểu ) độc lập

let message = "Hello!";
let phrase = message;

console.log(phrase); // Hello!

phrase = "Hi!";
console.log(message); // Hello!

// 2. Đối với Object, biến lưu trữ tham chiếu đến vị trí trong bộ nhớ

let user = { name: "John" };
let admin = user; 

console.log(admin.name); // John

admin.name = "Pete";
console.log(user.name); // Pete 

// hai đối tượng trên cùng trỏ về một vị trí trong bộ nhớ

// 3. So sánh đối tượng

// 3.1 Hai đối tượng chỉ bằng nhau khi cùng tham chiếu đến một vị trí trong bộ nhớ
let a = {};
let b = a; // tham chiếu cùng vị trí trong bộ nhớ

console.log(a == b); // true
console.log(a === b); // true

// 3.2 hai đối tượng khác nhau dù có cùng nội dung
let x = {};
let y = {}; // hai đối tượng khác vị trí trong bộ nhớ

console.log(x == y); // false
console.log(x === y); // false

// 3.3. Đối tượng là hằng số, có thể cập nhật thuộc tính bên trong

const person = { name: "Alice" };
person.name = "Bob"; // cho phép
console.log(person.name); // Bob

// 4. Copy đối tượng nông - vòng lặp for..in, Object.assign

// 4.1 Copy đối tượng - vòng lặp for..in
// Nên dùng khi : Object nhỏ, đơn giản
let user2 = { name: "John2", age: 30 };
let clone2 = {}; // tạo đối tượng rỗng

// sao chép thuộc tính từ user2 sang clone
for (let key in user2) {
  clone2[key] = user2[key];
}

clone2.name = "Pete"; // thay đổi thuộc tính trong clone

console.log(user2); // { name: 'John2', age: 30 }
console.log(clone2); // { name: 'Pete', age: 30 }

// 4.2 Copy đối tượng nông - Phương thức Object.assign
// hoạt động tương tự Spread {...obj}

let user3 = { name: "John3", age: 30 };
let clone3 = Object.assign({}, user3); // tạo bản sao cú pháp : Object.assign(dest, ...sources)
clone3.name = "Pete2"; // thay đổi thuộc tính trong clone3

console.log(user3); // { name: 'John3', age: 30 }
console.log(clone3); // { name: 'Pete2', age: 30 }


// 4.3 Phương thức Object.assign - thêm thuộc tính
// Không copy sâu, các object con vẫn là reference

let user4 = { name: "John4" };
let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

Object.assign(user4, permissions1, permissions2);

console.log(user4); // { name: 'John4', canView: true, canEdit: true }

// khi dùng object.assign , nếu thuộc tính đã tồn tại thì sẽ bị ghi đè
let user5 = { name: "John5" };
Object.assign(user5, { name: "Pete5" });
console.log(user5); // { name: 'Pete5' }

//5. Copy đối tượng sâu - Đối tượng bên trong đối tượng - structuredClone
// Nên dùng khi : Dữ liệu thuần JSON, không có hàm
let user6 = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};
console.log(user6.sizes.height); // 182

// 5.1 Phương thức Object.assign - Copy nông 
// chỉ sao chép thuộc tính cấp cao nhất, không thể sao chép đối tượng lồng nhau

let clone6 = Object.assign({}, user6);
console.log(clone6.sizes === user6.sizes); // true - tham chiếu cùng vị trí trong bộ nhớ

// 5.2 structuredClone - Copy sâu

let user7 = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};
let clone7 = structuredClone(user7);
console.log(clone7.sizes === user7.sizes); // false - tham chiếu khác vị trí trong bộ nhớ