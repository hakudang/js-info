/** 
 * Toán tử Optional Chaining (?.) - chuỗi tùy chọn
 * - sẽ dừng đánh giá nếu giá trị trước ?.là undefined hoặc null và trả về undefined.
 * - giúp tránh lỗi khi truy cập thuộc tính null, không tồn tại.
 * Cú pháp:
 * obj?.prop
 * obj?.[expr]
 * arr?.[index]
 * func?.(args)
 * Giải thích cú pháp:
 * - obj?.prop– trả về obj.prop nếu obj tồn tại, nếu không thì undefined.
 * - obj?.[prop]– trả về obj[prop] nếu obj tồn tại, nếu không thì undefined.
 * - obj.method?.()– gọi obj.method() nếu obj.method tồn tại, nếu không thì trả về undefined.
 * 1. Ví dụ về Optional Chaining (?.)
 * 2. Vì sao Javascript cần Optional Chaining?
 * 3. Lưu ý khi dùng Optional Chaining (?.)
 * 4. Ngắt mạch 
 * 5. Các biến thể khác: ?.(), ?.[]
 */

// Cách an toàn để truy cập thuộc tính của đối tượng lồng nhau 

let user = {}; // user không có thuộc tính address
// console.log(user.address.street); // Lỗi! Không thể đọc thuộc tính 'street' của undefined
console.log(user?.address?.street); // undefined , không lỗi

// document.querySelector('.elem') is null if there's no element
let html = document.querySelector('.elem')?.innerHTML;
console.log(html); // "<b>Hello</b> world!"

// 1. Vì sao Javascript cần Optional Chaining?
// có nhiều cách đạt mục đích như ?. nhưng cú pháp dài dòng và khó đọc

// Có 2 cách có thể đáp ứng được yêu cầu trên:
// ví dụ sau - luôn phải nhắc lại user2.address nhiều lần

// Cách 1: dùng từ toán tử 3 ngôi (ternary operator)
let user1 = {};
console.log(user1.address ? user1.address.street : undefined); // undefined , không lỗi

// Cách 2: dùng toán tử && (logical AND) 
let user2 = {};
console.log(user2.address && user2.address.street); // undefined , không lỗi

// dùng Optional Chaining (?.) ngắn gọn và dễ đọc hơn nhiều
let user3 = {};
console.log(user3?.address?.street); // undefined , không lỗi

// 2. Optional Chaining ?.

// value?.prop
// - hoạt động như value.prop, nếu value tồn tại,
// - nếu không (khi value là undefined/null) sẽ trả về undefined.

let user4 = { name: "John", };
// truy cập thuộc tính name nếu user4 tồn tại
console.log(user4?.name); // John

let user5 = null;
// truy cập thuộc tính name nếu user5 tồn tại
console.log(user5?.name); // undefined , không lỗi

// 3. Lưu ý khi dùng Optional Chaining (?.)

// 3.1 Không lạm dụng Optional Chaining (?.)

// ?.cú pháp cho phép tùy chọn giá trị trước nó, 
//   nhưng không tùy chọn giá trị sau đó.
let user6 = { name: "John", address: { street: "123 Main St" } };
console.log(user6?.address?.street); // không nên lạm dụng vì biết user6 luôn tồn tại 
console.log(user6.address?.street); // dùng đúng hơn

// Chúng ta chỉ nên sử dụng ?.khi có thể chấp nhận được việc thứ gì đó không tồn tại.
// Nếu không, hãy sử dụng cách tiếp cận khác để xử lý lỗi.

// 3.2 Biến trước ?.phải được khai báo

// user7?.address; // lỗi, vì user7 chưa được khai báo

// 4. Ngắt mạch 

let user8 = null;
let x = 0;
user8?.sayHi(x++); // user8 null hay undefined thì sayHi(x++) không thực hiện -> đoản mạch 
console.log(x); // 0, value not incremented

// 5. Các biến thể khác: ?.(), ?.[]

// 5.1 Gọi phương thức an toàn với ?.()
let userAdmin = {
  admin() {
    console.log("I am admin");
  }
};

let userGuest = {};

userAdmin.admin?.(); // I am admin
userGuest.admin?.(); // undefined -> ngắt mạch không work gì, không lỗi.

// 5.2 Truy cập phần tử mảng an toàn với ?.[]
let key = "firstName";

let user9 = {
  firstName: "John"
};

let user10 = null;

console.log( user9?.[key] ); // John
console.log( user10?.[key] ); // undefined

// 5.3 Optional Chaining ?. để đọc và xóa an toàn, nhưng không thể gán 

// xóa thuộc tính an toàn với ?.
let user11 = { name: "Alice" };
delete user11?.name; // hoạt động bình thường

// gán giá trị mới cho name với Optional Chaining ?.
console.log(user11.name); // undefined , vì đã bị xóa
user11?.name = "John"; // Lỗi cú pháp