/** @file 
 * Switch case statement
 * 1. Cú pháp
 * 2. Break thông thường
 * 3. Không dùng break
 * 4. Biểu thức điều kiện
 */

"use strict";

// in ra html tag <h2>The Switch statement </h2>
document.write("<h2>The Switch statement </h2>");
// cú pháp : 
// switch (biểu thức) {
//     case giá_trị_1:
//         khối_lệnh_1
//         break;
//     case giá_trị_2:  
//         khối_lệnh_2
//         break;
//     ...
//     default:
//         khối_lệnh_mặc_định
// }
// đặc điểm :
// - biểu thức được so sánh với các giá trị trong các case
// - nếu biểu thức khớp với giá trị trong case nào thì thực hiện khối lệnh bên trong case đó
// - nếu không có case nào khớp thì thực hiện khối lệnh trong default (nếu có)
// - từ khóa break dùng để thoát khỏi switch, nếu không có break thì sẽ tiếp tục thực hiện các case bên dưới cho đến khi gặp break hoặc hết switch

let a = 2 + 2;
// 1. break thông thường
// Cách dùng thông thường vói break để thoát khỏi switch
switch (a) {
    case 3:
        console.log('Too small');
        break;
    case 4:
        console.log('Exactly!');
        break;
    case 5:
        console.log('Too large');
        break;
    default:
        console.log("I don't know such values");
}  // in ra Exactly!

//  2. Không dùng break
// sẽ tiếp tục thực hiện các case bên dưới cho đến khi gặp break hoặc hết switch
switch (a) {
    case 3: // nếu a = 3
        console.log('Too small');
    case 4: // nếu a = 4
        console.log('Exactly!');
    case 5: // nếu a = 5
        console.log('Too large');
    default: // nếu a không khớp với bất kỳ case nào ở trên
        console.log("I don't know such values");
}   // in ra Exactly! , Too large , I don't know such values -> vì không có lệnh break để thoát khỏi switch
// không in ra Too small vì a không bằng 3
// in ra Exactly! vì a = 4 , sau đó tiếp tục in ra các lệnh bên dưới cho đến khi hết switch


// 3. biểu thức điều kiện
// bất kỳ biểu thức nào cũng có thể được sử dụng trong switch case , không nhất thiết phải là số hoặc chuỗi
let x = "1";
let y = 0;

switch (+x) { // chuyển x sang kiểu số, vì x là chuỗi "1" nên +x là số 1
    case y + 1:
        console.log("this runs, because +x is 1, exactly equals y+1");
        break;

    default:
        console.log("this doesn't run");
}

// Kiểu nghiêm ngặt trong switch case
let arg = prompt("Enter a value?");
switch (arg) {
    case '0':
    case '1':
        console.log('One or zero');
        break;

    case '2':
        console.log('Two');
        break;

    case 3: // chú ý: kiểu số 3 không khớp với chuỗi '3'
        console.log('Never executes!');
        break;
    default:
        console.log('An unknown value');
} // nếu nhập '0' hoặc '1' in ra One or zero , nếu nhập '2' in ra Two , nếu nhập 3 in ra An unknown value vì 3 không khớp với chuỗi '3'

// Bài tập
// bài tập 1 chuyển code switch thành if..else

let browser = prompt('Enter your browser name ?', "Chrome");
// switch (browser) {
//     case 'Edge':
//         console.log("You've got the Edge!");
//         break;

//     case 'Chrome':
//     case 'Firefox':
//     case 'Safari':
//     case 'Opera':
//         console.log('Okay we support these browsers too');
//         break;

//     default:
//         console.log('We hope that this page looks ok!');
// }

if (browser == 'Edge') {
    console.log("You've got the Edge!");
} else if (browser == 'Chrome'
    || browser == 'Firefox'
    || browser == 'Safari'
    || browser == 'Opera') {
    console.log('Okay we support these browsers too');
} else {
    console.log('We hope that this page looks ok!');
}

// bài tập 2 chuyển code if..else thành switch

let n = +prompt('input the value of b ', '');

// if (n == 0) {
//   console.log( 0 );
// }
// if (n == 1) {
//   console.log( 1 );
// }

// if (n == 2 || n == 3) {
//   console.log( '2,3' );
// }

switch (n) {
    case 0:
        console.log(0);
        break;
    case 1:
        console.log(1);
        break;
    case 2:
    case 3:
        console.log('2,3');
        break;
}
