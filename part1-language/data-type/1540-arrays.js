/** 
 * Kiểu mảng Array trong JavaScript
 * Array là kiểu dữ liệu đặc biệt dùng để lưu danh sách có thứ tự (ordered collection).
 * Khác với Object, mảng được tối ưu để quản lý dữ liệu theo vị trí (chỉ số).
 * Mỗi phần tử có index bắt đầu từ 0.
 * Mảng có thể chứa mọi loại dữ liệu: số, chuỗi, object, function, v.v.
 * 
 * 1. Khai báo mảng
 * 2. Truy cập phần tử mảng
 * 3. Thêm, xóa phần tử mảng
 * 4. Chiều dài mảng
 * 5. Mảng là đối tượng đặc biệt
 * 6. Duyệt mảng
 * 7. Mảng đa chiều
 * 8. Chuyển đổi giữa mảng và chuỗi
 * 9. So sánh mảng
 * 10. Hiệu năng
 * 11. Bài tập
 */

"use strict";

// in ra html tag <h2> Arrays </h2>
document.write("<h2> Arrays </h2>");

// 1 . Khai báo mảng
let arr1 = []; // cách khai báo mảng rỗng phổ biến nhất
let arr2 = new Array(); // cách khai báo mảng rỗng ít dùng hơn
let fruits = ["Apple", "Banana", "Orange"]; // khai báo mảng với các phần tử

// ⚠️ new Array(2) tạo mảng rỗng có độ dài 2, không phải [2].

// 2. Truy cập phần tử mảng

// 2.1 Truy cập 
fruits[0] ; // "Apple" , truy cập phần tử đầu tiên
fruits[fruits.length - 1] ; // "Orange" , truy cập phần tử cuối cùng    
fruits.at(-1); // "Orange" , truy cập phần tử cuối cùng (ES2022)

// 2.2 Thay phần tử
fruits[1] = "Mango"; // thay "Banana" thành "Mango"
console.log(fruits); // ["Apple", "Mango", "Orange"]

// 2.3 Thêm vào cuối mảng
fruits.push("Pineapple"); // thêm "Pineapple" vào cuối mảng
console.log(fruits); // ["Apple", "Mango", "Orange", "Pineapple"

// 3. Thêm, xóa mảng

// 3.1 thêm vào cuối mảng - push()
fruits.push("Grapes");
console.log(fruits); // ["Apple", "Mango", "Orange", "Pineapple", "Grapes"]

// 3.2 thêm đầu mảng - unshift()
fruits.unshift("Strawberry");
console.log(fruits); // ["Strawberry", "Apple", "Mango", "Orange", "Pineapple", "Grapes"]

// 3.3 xóa cuối mảng - pop()
let lastFruit = fruits.pop(); // xóa "Grapes"
console.log(fruits); // ["Strawberry", "Apple", "Mango", "Orange", "Pineapple"]

// 3.4 xóa đầu mảng - shift()
let firstFruit = fruits.shift(); // xóa "Strawberry"
console.log(fruits); // ["Apple", "Mango", "Orange", "Pineapple"]

// 4. Chiều dài mảng

fruits.length = 2; // cắt mảng còn 2 phần tử
console.log(fruits); // ["Apple", "Mango"]
fruits.length = 0;  // xóa toàn bộ 
console.log(fruits); // []

// 5. Mảng là đối tượng đặc biệt
// Có thể thêm thuộc tính vào mảng giống như đối tượng
// nhưng không nên làm vậy vì không ảnh hưởng đến độ dài mảng và các phương thức mảng
let arr3 = [1,2,3,4,5 ];
arr3.test = 5; // thêm thuộc tính test cho mảng
console.log(arr3); // [ 1, 2, 3, 4, 5, test: 5 ]
console.log(arr3.length); // 5 - độ dài mảng không bị ảnh hưởng bởi thuộc tính thêm vào

// 6. Duyệt mảng - vòng lặp for

for (let i = 0; i < arr3.length; i++) {
    console.log(arr3[i]);
}

// for hiện đại, rút gọn nhưng không thể break hoặc continue
for (let fruit of fruits) {
    console.log(fruit);
}

// 7. Mảng đa chiều
let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
console.log(matrix[1][1]); // 5 , truy cập phần tử hàng 2, cột 2

// 8. Chuyển đổi giữa mảng và chuỗi

// 8.1 mảng thành chuổi - nối các phần tử với dấu phẩy
[1,2,3].toString(); // "1,2,3"

// 8.2 Mảng cộng với chuổi 
[1,2,3] + 1 ; // "1,2,31" , mảng được chuyển thành chuỗi rồi nối với "1"

// 9. So sánh mảng 

// 9.1 không sử dụng == hoặc === để so sánh mảng
// mỗi mảng là một đối tượng riêng biệt trong bộ nhớ

[1,2,3] === [1,2,3]; // false , vì so sánh tham chiếu
[] === []; // false , vì so sánh tham chiếu

// 9.2 so sánh cần duyệt từng phần tử
function arraysEqual(arrA, arrB) {
    if (arrA.length !== arrB.length) return false;
    for (let i = 0; i < arrA.length; i++) {
        if (arrA[i] !== arrB[i]) return false;
    }
    return true;
}
console.log(arraysEqual([1,2,3], [1,2,3])); // true
console.log(arraysEqual([1,2,3], [1,2,4])); // false

// 10. Hiệu năng

// 10.1 Push / Pop xử lý nhanh 
// 10.2 Shift / Unshift xử lý chậm vì phải dịch chuyển tất cả phần tử
// 10.3 Tránh thêm các thuộc tính hoặc chỉ số rời rạc 
let arr4 = [];
arr4[99999] = 1; // tạo mảng thưa thớt, rất chậm và tốn bộ nhớ

// 11. Bài tập
// Bài tập 1
// Question: Mảng có thể sao chép ? Đoạn mã sau sẽ hiển thị gì ?
let fruits2 = ["Apples", "Pear", "Orange"];

// push a new value into the "copy"
let shoppingCart = fruits2;
shoppingCart.push("Banana");

// what's in fruits?
console.log ( fruits2.length ); // ? -> 4 , vì shoppingCart và fruits cùng tham chiếu đến một mảng
// Bài tập 2 - Các phép toán mảng 

// Question: Chúng ta hãy thử 5 phép toán mảng.

// Tạo một mảng styles với các mục “Jazz” và “Blues”.
// Thêm “Rock-n-Roll” vào cuối.
// Thay thế giá trị ở giữa bằng "Classics". Mã của bạn để tìm giá trị ở giữa sẽ hoạt động với bất kỳ mảng nào có độ dài lẻ.
// Tách giá trị đầu tiên của mảng và hiển thị nó.
// Thêm Rap và Reggae vào đầu mảng.

// Answer:
// Jazz, Blues
// Jazz, Blues, Rock-n-Roll
// Jazz, Classics, Rock-n-Roll
// Classics, Rock-n-Roll
// Rap, Reggae, Classics, Rock-n-Roll

let styles = ["Jazz", "Blues"];
styles.push("Rock-n-Roll");  // ["Jazz", "Blues", "Rock-n-Roll"]
styles[Math.floor((styles.length - 1) / 2)] = "Classics"; // ["Jazz", "Classics", "Rock-n-Roll"]
console.log(styles.shift()); // "Jazz" , mảng còn ["Classics", "Rock-n-Roll"]
styles.unshift("Rap", "Reggae"); // ["Rap", "Reggae", "Classics", "Rock-n-Roll"]

// Bài tập 3 - gọi trong ngữ cảnh mảng 
// Question: Kết quả thế nào ? tại sao ?
let arr5 = ["a", "b"];

arr5.push(function() {
  console.log( this );
});

arr5[0] ; // "a"
arr5[1] ; // "b"
arr5[2](); // ? -> hiển thị "a,b,function() { alert(this); }"
// vì this trong hàm tham chiếu đến arr5

// Bài tập 4 - Tổng đầu vào 
// Question: viết hàm sumInput()thực hiện:

// Yêu cầu người dùng nhập giá trị bằng cách sử dụng promptvà lưu trữ các giá trị trong mảng.
// Kết thúc việc hỏi khi người dùng nhập giá trị không phải số, chuỗi rỗng hoặc nhấn “Hủy”.
// Tính toán và trả về tổng các phần tử trong mảng.
// PS: Số  0 là một số hợp lệ, vui lòng không dừng nhập số 0.

// Answer:
function sumInput() {
    let numbers = [];   
    while (true) {
        let value = prompt("Nhập một số:", 0);
        if (value === null || value === "" || !isFinite(value)) break;
        numbers.push(+value); // dấu + để chuyển chuỗi sang số
    }
    let sum = 0;
    for (let number of numbers) {
        sum += number;
    }
    return sum;
}
console.log("Tổng các số đã nhập: " + sumInput()); 



// Bài tập 5 - tìm mảng con tối đa 

// Question: 
// Đầu vào là một mảng số, ví dụ arr = [1, -2, 3, 4, -9, 6]:
// Nhiệm vụ là: tìm mảng con liền kề arrcó tổng số phần tử lớn nhất.
// Viết hàm getMaxSubSum(arr)trả về tổng đó.

// Answer :
// phương pháp 
// - duyệt mảng, với mỗi phần tử tính tổng các phần tử tiếp theo :
// - nếu tổng lớn hơn maxSum thì cập nhật maxSum
function getMaxSubSum(arr) {
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
console.log( getMaxSubSum([-1, 2, 3, -9]) ); // 5
console.log( getMaxSubSum([2, -1, 2, 3, -9]) ); // 6
console.log( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
console.log( getMaxSubSum([-2, -1, 1, 2]) ); // 3
console.log( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
console.log( getMaxSubSum([1, 2, 3]) ); // 6
