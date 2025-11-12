/** @file 
 * Vòng lặp trong JavaScript
 * 1. Vòng lặp While
 * 2. Vòng lặp Do...While
 * 3. Vòng lặp For
 * 4. Ngắt vòng lặp - break
 * 5. Bỏ qua một lần lặp - continue
 * 
 */

"use strict";

// in ra html tag <h2>Loops </h2>
document.write("<h2>Loops</h2>");

// in ra html tag <h3> While </h3>
document.write("<h3> 1. While </h3>");
document.write("<h3> 2. Do While </h3>");
document.write("<h3> 3. For </h3>");

// 1. Vòng lặp While

// cú pháp : while (điều kiện) { khối lệnh }
// đặc điểm :
// - kiểm tra điều kiện trước mỗi lần lặp, nếu đúng thì thực hiện khối lệnh bên trong vòng lặp, nếu sai thì dừng vòng lặp

let i = 1;
while (i <= 3) { // lặp lại khối mã bên trong cho đến khi điều kiện sai 
    console.log(i); // in ra 1,2,3
    i++;
}

let j = 3;
while (j) { // lặp lại khối mã bên trong cho đến khi điều kiện sai (j chuyển về false khi j = 0)
    console.log(j); // in ra 3,2,1
    j--;
}

let k = 3;
while (k) console.log(k--); // in ra 3,2,1 , vì chỉ có 1 câu lệnh bên trong vòng lặp nên không cần dấu ngoặc nhọn {}

// 2. Vòng lặp Do...While

// cú pháp : do { khối lệnh } while (điều kiện) ;
// đặc điểm :
// - thực hiện khối lệnh bên trong vòng lặp trước, sau đó kiểm tra điều kiện, nếu đúng thì tiếp tục lặp, nếu sai thì dừng vòng lặp
// - ít được sử dụng hơn while
let m = 0;
do {
    console.log(m); // in ra 0,1,2
    m++; // tăng m lên 1, khi m = 3 , điều kiện sai và dừng vòng lặp
} while (m < 3);

// 3. Vòng lặp For

// cú pháp : for (khởi tạo biến ; điều kiện lặp ; biểu thức tăng ) { khối lệnh }
// đặc điểm :
// - khởi tạo biến chỉ thực hiện 1 lần duy nhất ở đầu vòng lặp
// - điều kiện lặp được kiểm tra trước mỗi lần lặp, nếu đúng thì thực hiện khối lệnh bên trong vòng lặp, nếu sai thì dừng vòng lặp
// - biểu thức tăng được thực hiện sau mỗi lần lặp
// - bỏ gán giá trị khởi tạo và biểu thức tăng -> tương đương với vòng lặp while
for (let n = 0; n < 3; n++) { // khởi tạo biến n = 0 ; điều kiện lặp n < 3 ; tăng n lên 1 sau mỗi lần lặp
    console.log(n); // in ra 0,1,2
}

// khai báo biến bên ngoài vòng lặp
let p = 0;
for (let p = 0; p < 3; p++) { // biến p bên trong vòng lặp là biến cục bộ, không ảnh hưởng đến biến p bên ngoài vòng lặp
    console.log(p); // in ra 0,1,2
}
console.log(p); // 0 , biến p bên ngoài vòng lặp không bị ảnh hưởng

// bỏ gán giá trị khởi tạo và biểu thức tăng -> tương đương với vòng lặp while
let q = 0;
for (; q < 3;) {
    console.log(q); // in ra 0,1,2
    q++;
}

// 4. Ngắt vòng lặp - break

for (let r = 0; r < 10; r++) {
    if (r === 5) {
        break; // dừng vòng lặp khi r = 5
    }
    console.log(r); // in ra 0,1,2,3,4
}

// 5. Bỏ qua một lần lặp - continue

for (let s = 0; s < 10; s++) {
    if (s % 2 === 0) {
        continue; // bỏ qua các số chẵn
    }
    console.log(s); // in ra 1,3,5,7,9
}

// Bài tập 
// bài tập 1
let i2 = 3;

while (i2) {
    console.log(i2--); // 3,2,1
}

// bài tập 2
let i3 = 0;
while (++i3 < 5) console.log(i3); // 1,2,3,4

// bài tập 3
let i4 = 0;
while (i4++ < 5) console.log(i4); // 1,2,3,4,5

// bài tập 4
for (let i5 = 0; i5 < 5; i5++) console.log(i5); // 0,1,2,3,4

// bài tập 5
for (let i5 = 0; i5 < 5; ++i5) console.log(i5); // 0,1,2,3,4

// bài tập 6
// Sử dụng for vòng lặp để xuất ra các số chẵn từ 2 đến 10
for (let i6 = 2; i6 <= 10; i6 += 2) console.log(i6); // 2,4,6,8,10

// bài tập 7
// Thay thế "for" bằng "while"
for (let i = 0; i < 3; i++) {
    console.log(`number ${i}!`);
}

let i7 = 0;
while (i7 < 3) {
    console.log(`number ${i7}!`);
    i7++;
}

// bài tập 8
// Lặp lại cho đến khi đầu vào chính xác
let input;
do {
    input = prompt("Nhập số lớn hơn 100?", 0);
} while (input <= 100 && input); // nếu num = null  thì null <= 100 là true , nên tiếp tục lặp 

// bài tập 9
// Đầu ra số nguyên tố -> chỉ chia hết cho 1 và chính nó
// n > 1 là số nguyên tố nếu nó không thể chia hết cho bất kỳ số nào ngoại trừ 1 và n
// 1 (đặc biệt, không được xem là số nguyên tố), 4 (chia cho 2), 6 (chia cho 2 và 3), 9 (chia cho 3)
let n = 10;
nextPrime:
for (let i = 2; i <= n; i++) { // lặp từ 2 đến n
    for (let j = 2; j < i; j++) { // lặp từ 2 đến j = i-1
        if (i % j === 0) continue nextPrime; // nếu i chia hết cho j thì không phải số nguyên tố, tiếp tục với i tiếp theo
    }
    console.log(i); // in ra số nguyên tố -> 2,3,5,7
}