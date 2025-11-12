/** @file  
 * @title Cấu trúc mã
*/

// 1.Các tuyên bố trong JavaScript được phân tách bằng dấu chấm phẩy (;). Ví dụ:

// alert('Hello'); alert('World');

// alert('Hello'); 
// alert('World');

// 2.Dấu chấm phẩy

// Trong hầu hết các trường hợp, dấu chấm phẩy có thể được bỏ qua khi có ngắt dòng.

// alert('Hello')
// alert('World')

// 3. Trong hầu hết các trường hợp, ký tự xuống dòng ngụ ý dấu chấm phẩy. Nhưng "trong hầu hết các trường hợp" không có nghĩa là "luôn luôn"!
// Ví dụ:

// alert(3 +
//     1
//     + 2);

// 4. ví dụ đúng khi dùng dấu chấm phẩy
alert("Hello");
[1, 2].forEach(alert);

// 5. ví dụ sai khi dùng dấu chấm phẩy
alert("Hello")
[1, 2].forEach(alert);


// 2 câu trên thành câu : alert("Hello")[1, 2].forEach(alert); -> lỗi
