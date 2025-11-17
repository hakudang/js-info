/**
 * Date và Time trong JavaScript
 * Xử lý với ngày tháng và thời gian 
 * 
 */

"use strict";

// in ra tiêu đề
document.write("<h2> Date và Time trong JavaScript </h2>");

// 1. Tạo đối tượng Date
// có 4 cách chính để tạo Date object 

// 1.1 new Date()
let now = new Date(); //　
console.log(now); // hiện tại

// 1.2 new Date(milliseconds) - tính từ 1/1/1970
let date1 = new Date(0); // thời điểm 1/1/1970
console.log(date1); // Thu Jan 01 1970 ...

let date2 = new Date(24 * 3600 * 1000); // 1 ngày sau 1/1/1970, tính bằng milliseconds
// 24 giờ x 3600 giây x 1000 milliseconds
console.log(date2); // Fri Jan 02 1970 ..

// giá trị âm là ngày trước 1970
let date3 = new Date(-24 * 3600 * 1000); // 1 ngày trước 1/1/1970
console.log(date3); // Wed Dec 31 1969 ..

// 1.3 new Date(dateString)
let date4 = new Date("1978-01-09");
console.log(date4); // Mon Jan 09 1978 ...

// 1.4 new Date(year, month, day, hours, minutes, seconds, milliseconds)
// lưu ý : month từ 0-11 (0 - Jan, 11 - Dec)
let date5 = new Date(1978, 0, 9, 15, 30, 30, 999); // 09 Jan 1978
console.log(date5); // Mon Jan 09 1978 ...

// 2. Truy cập các thành phần của Date

// 2.1 hàm get...

let date = new Date(); // hiện tại

console.log(date.getFullYear()); // năm, ví dụ 2025
console.log(date.getMonth()); // tháng từ 0-11
console.log(date.getDate()); // ngày trong tháng từ 1-31
console.log(date.getDay()); // ngày trong tuần từ 0-6 (0 - Chủ nhật)
console.log(date.getHours()); // giờ từ 0-23
console.log(date.getMinutes()); // phút từ 0-59
console.log(date.getSeconds()); // giây từ 0-59
console.log(date.getMilliseconds()); // milliseconds từ 0-999

// 2.2 Hàm giờ quốc tế UTC (Universal Time Coordinated)
// UTC - giờ quốc tế - trùng giờ với GMT, trùng giờ với giờ London (không tính giờ mùa hè)
console.log(date.getUTCFullYear());
console.log(date.getUTCMonth());
console.log(date.getUTCDay());
console.log(date.getUTCHours());
console.log(date.getUTCMinutes());
console.log(date.getUTCSeconds());

// Lấy timestamp và timezone
console.log(date.getTime()); // số milliseconds từ 1/1/1970 đến thời điểm hiện tại
console.log(date.getTimezoneOffset()); // chênh lệch phút so với UTC
// VD: nếu ở GMT+9 thì giá trị trả về là -540 (âm 9 giờ = -540 phút)

// Tính giờ GMT từ giờ địa phương
// Giải pháp : giờ GMT = giờ địa phương + timezoneOffset
// ví dụ :
// giờ Nhật Bản (JST) là GMT+9, ví dụ 12:00 trưa, giờ GMT là UTC+0 lúc 03:00 sáng

let jstDate = new Date("2025-11-15T12:00:00+09:00"); // giờ Nhật Bản
console.log("Giờ japan, GMT+9: " + jstDate);

let utcDate = new Date(jstDate.getTime() + jstDate.getTimezoneOffset() * 60000);
console.log("Giờ GMT: " + utcDate);

// 3. Thay đổi thành phần của Date

// 3.1 hàm set...
let today = new Date();
today.setHours(0, 0, 0, 0); // đặt giờ về 00:00:00.000
console.log(today);

// 3.2 Tự điều chỉnh khi vượt giới hạn
let someDate = new Date(2025, 11, 31); // tháng từ 0-11, 11 là Dec
console.log(someDate);
someDate.setDate(someDate.getDate() + 2); // cộng thêm 2 ngày
console.log(someDate); // 02 Jan 2026, tự động chuyển tháng và năm

// 4. Tính toán và đo thời gian 

// 4.1 sử dụng vòng lặp for để đo thời gian thực thi
let start = new Date(); // thời điểm bắt đầu
// some code
for (let i = 0; i < 1000000; i++) { }

let end = new Date(); // thời điểm kết thúc
console.log(`Thời gian thực thi vòng lặp: ${end - start} milliseconds`);

// 4.2 Sử dụng hàm Date.now() - nhanh hơn
let start2 = Date.now(); // thời điểm bắt đầu

// some code

let end2 = Date.now(); // thời điểm kết thúc
console.log(`Thời gian thực thi: ${end2 - start2} milliseconds`);

// 5. Date.parse() - đọc từ chuỗi 

// 5.1 Đọc ngày theo chuẩn ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ)

let ms = Date.parse("2025-12-31T23:59:59.999Z"); // Z là múi giờ UTC
console.log(ms); // số milliseconds từ 1/1/1970

let dateParsed = new Date(ms);
console.log(dateParsed); // Wed Dec 31 2025 ...

// 6. Một số đặc điểm cần lưu ý về Date
// - Date luôn chứa cả ngày và giờ
// - Tháng trong Date từ 0-11
// - Ngày trong tuần từ 0-6, 0 là Chủ nhật
// - Date tự động điều chỉnh khi vượt giới hạn
// - Có thể trừ 2 Date để lấy số milliseconds chênh lệch
// - Date.now() nhanh và tiện hơn new Date().getTime()
// - Độ chính xác cao hơn : performance.now()

// 7. Bài tập 

// Bài tập 1 : Tạo một ngày 

// Question : 
// Tạo một đối tượng Date cho ngày Feb 20,2012, 3:12am. Time zone là địa phương.

// Giải pháp : 
// - cách 1 : sử dụng chuỗi
// - cách 2 : sử dụng các tham số của hàm tạo Date

// Answer :
// cách 1
let testDate1 = new Date("2012-02-20T03:12:00");
console.log(testDate1); // Mon Feb 20 2012 ...
// cách 2
let testDate2 = new Date(2012, 1, 20, 3, 12); // tháng 1 là Feb
console.log(testDate2); // Mon Feb 20 2012 ...

// Bài tập 2 : Lấy thứ trong tuần

// Question : 
// Viết hàm getWeekDay(date) để trả về thứ trong tuần của date dưới dạng chuỗi ngắn:
// "CN", "T2", "T3", "T4", "T5", "T6", "T7".

// Giải pháp :
// - Sử dụng hàm getDay() để lấy số thứ trong tuần
// - Tạo mảng các chuỗi tương ứng với thứ trong tuần
// - Trả về chuỗi tương ứng

// Answer :

function getWeekDay(date) {
    let thu = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    let dayIndex = date.getDay();
    return thu[dayIndex];
}

// let dateTest = new Date(1978, 0, 9); // 09 Jan 1978
let dateTest = new Date("1978-01-09"); // 09 Jan 1978
console.log(getWeekDay(dateTest)); // T2

// Bài tập 3 : Lấy thứ trong tuần (phương án quốc tế)

// Question : 
// Viết hàm getLocalWeekDay(date) để trả về thứ trong tuần của date dưới dạng chuỗi ngắn:
// "SU", "MO", "TU", "WE", "TH", "FR", "SA".

// Giải pháp :
// - Sử dụng hàm getDay() để lấy số thứ trong tuần
// - Tạo mảng các chuỗi tương ứng với thứ trong tuần
// - Trả về chuỗi tương ứng

// Answer :

function getLocalWeekDay(date) {
    let days = { 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday", 7: "Sunday" };
    let dayIndex = date.getDay();
    if (dayIndex === 0) dayIndex = 7; // Chủ nhật là 7
    return days[dayIndex];
}
console.log(getLocalWeekDay(dateTest)); // Monday

// Bài tập 4 : 
// Question :
// Viết hàm getDateAgo(date, days) để trả về ngày tháng cách 'days' ngày so với 'date'.
// Ví dụ, nếu ngày là 20 Jan 2012 và days = 1 thì hàm sẽ trả về 19 Jan 2012.
// Nếu days = 2 thì trả về 18 Jan 2012.
// Nếu days = 365 thì trả về 20 Jan 2011.

// giải pháp :
// - Sử dụng hàm getDate() để lấy ngày trong tháng
// - Trừ đi số ngày 'days'
// - Sử dụng hàm setDate() để cập nhật ngày mới
// - Trả về ngày mới

// Answer :

function getDateAgo(date, days) {
    let dateAgo = new Date(date); // tạo bản sao của date
    return dateAgo.setDate(dateAgo.getDate() - days);
}

let someDateTest = new Date("2012-01-20"); // 20 Jan 2012

console.log(new Date(getDateAgo(someDateTest, 1))); // 19 Jan 2012
console.log(new Date(getDateAgo(someDateTest, 2))); // 18 Jan 2012
console.log(new Date(getDateAgo(someDateTest, 365))); // 20 Jan 2011

// Bài tập 5 : Lấy ngày cuối cùng của tháng

// Question :
// Viết hàm getLastDayOfMonth(year, month) để trả về ngày cuối cùng của tháng trong năm 'year' và tháng 'month'.    
// Ví dụ, getLastDayOfMonth(2012, 1) = 29 (tháng 2 năm 2012 có 29 ngày)

// Giải pháp :
// - Tạo đối tượng Date với ngày là 0 của tháng tiếp theo
// - Sử dụng hàm getDate() để lấy ngày trong tháng

// Answer :
function getLastDayOfMonth(year, month) {
    let date = new Date(year, month + 1, 0); // ngày 0 của tháng tiếp theo
    return date.getDate();
}
console.log(getLastDayOfMonth(2025, 1)); // 28, tháng 2 năm 2025 có 28 ngày
console.log(getLastDayOfMonth(2012, 1)); // 29, tháng 2 năm 2012 có 29 ngày

// Bài tập 6 : Tính số ngày giữa 2 ngày

// Question :
// Viết hàm getSecondsToday() để trả về số giây đã trôi qua từ đầu ngày đến thời điểm hiện tại.

// Giải pháp :

// Cách 1 
// - Tạo đối tượng Date cho thời điểm hiện tại
// - Tạo đối tượng Date cho đầu ngày (giờ 0:0:0)
// - Lấy hiệu số milliseconds giữa 2 thời điểm
// - Chuyển milliseconds sang giây

// Answer :
function getSecondsToday() {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let now = Date.now();
    return (Math.round((now - today) / 1000)); // số giây từ đầu ngày đến hiện tại
}

console.log(getSecondsToday()); // ví dụ 3600 (1 giờ)

// Cách 2 : sử dụng hàm getHours(), getMinutes(), getSeconds()
function getSecondsToday_v2() {
    let now = new Date();
    return now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
}

console.log(getSecondsToday_v2()); // ví dụ 3600 (1 giờ)

// Bài tập 7 : Tính số giây đến ngày mai

// Question :
// Viết hàm getSecondsToTomorrow() để trả về số giây còn lại đến ngày mai.  

// Giải pháp :

// Cách 1 :
// - Tạo đối tượng Date cho thời điểm hiện tại
// - Tạo đối tượng Date cho ngày mai (giờ 0:0:0)
// - Lấy hiệu số milliseconds giữa 2 thời điểm
// - Chuyển milliseconds sang giây

// Answer :

function getSecondsToTomorrow() {
    let now = new Date();
    let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    return Math.round((tomorrow - now) / 1000);
}
console.log(`số giây từ hiện tại tới cuối ngày: ${getSecondsToTomorrow()}`);

// Cách 2 : sử dụng hàm getHours(), getMinutes(), getSeconds()
// - Tính số giây đã trôi qua trong ngày
// - Lấy tổng số giây trong ngày trừ đi số giây đã trôi qua
function getSecondsToTomorrow_v2() {
    let now = new Date();
    let secondsPassed = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    let totalSecondsInDay = 24 * 3600;
    return totalSecondsInDay - secondsPassed;
}
console.log(`số giây từ hiện tại tới cuối ngày: ${getSecondsToTomorrow_v2()}`);

// Bài tập 8 : Định dạng ngày

// Question :
// Viết hàm formatDate(date) để định dạng ngày theo các quy tắc sau:
// - Nếu trong vòng 1 giây: "bây giờ"
// - Nếu trong vòng 1 phút: "X giây trước"
// - Nếu trong vòng 1 giờ: "X phút trước"
// - Ngày hôm qua: "hôm qua lúc HH:MM"
// - Còn lại: "DD.MM.YY HH:MM"
// Với HH:MM là giờ và phút với hai chữ số, thêm số 0 nếu cần thiết.

// Giải pháp :
// - Tính hiệu số milliseconds giữa thời điểm hiện tại và date
// - Chuyển sang giây, phút, giờ để so sánh
// - Định dạng ngày theo quy tắc đã cho
// - Sử dụng hàm padStart(2, '0') để định dạng HH:MM

// Answer :

function formatDate(date) {
    let now = new Date();
    let diffMs = now - date;
    let diffSec = Math.round(diffMs / 1000);
    let diffMin = Math.round(diffSec / 60);
    let diffHour = Math.round(diffMin / 60);
    if (diffSec < 1) {
        return "bây giờ";
    } else if (diffMin < 1) {
        return `${diffSec} giây trước`;
    } else if (diffHour < 1) {
        return `${diffMin} phút trước`;
    } else {
        let yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
        if (date.getFullYear() === yesterday.getFullYear() &&
            date.getMonth() === yesterday.getMonth() &&
            date.getDate() === yesterday.getDate()) {
            return `hôm qua lúc ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        }
    }
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear().toString().slice(-2)} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

console.log(formatDate(new Date(new Date - 1))); // "bây giờ"
console.log(formatDate(new Date(new Date - 30 * 1000))); // "30 giây trước"
console.log(formatDate(new Date(new Date - 5 * 60 * 1000))); // "5 phút trước"
console.log(formatDate(new Date(new Date - 86400 * 1000))); // "hôm qua lúc HH:MM"
console.log(formatDate(new Date(2016, 11, 31, 20, 0))); // "31.12.16 20:00"

