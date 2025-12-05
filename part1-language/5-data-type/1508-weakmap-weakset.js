/**
 * WeakMap và WeakSet trong JavaScript
 * WeakMap - tương tự Map nhưng chỉ chấp nhận key là object và key là weakly held (yếu)
 * WeakSet - tương tự Set nhưng chỉ chứa các object và các object là weakly held
 * lý do sử dụng WeakMap và WeakSet:
 * - Giúp tránh rò rỉ bộ nhớ (memory leaks) khi làm việc với các object tạm thời
 * - Tự động dọn dẹp các entry khi object key không còn tham chiếu nào
 * - Thích hợp để lưu trữ dữ liệu tạm thời gắn với object mà không cần quản lý thủ công
 * - Hạn chế: không thể iterate được và không thể lấy kích thước (size)
 * 
 *  I. WeakMap trong JavaScript
 * II. WeakSet trong JavaScript
 * III. Bài tập ứng dụng với WeakMap và WeakSet
 * - Bài tập 1 : Ứng dụng WeakMap để Cache sao cho giảm chi phí CPU tính toán
 * - Bài tập 2  : Ứng dụng WeakMap để Cache độ dài chuỗi
 * - Bài tập 3  : Ứng dụng WeakMap để Cache kết quả xử lý DOM
 * - Bài tập 4 : Ứng dụng WeakSet theo dõi trạng thái xử lý đối tượng messages ( mail )
 * - Bài tập 5 : Ứng dụng WeakMap cải tiến thêm Date vào Object message ( mail ) đã đọc
 */

// I. WeakMap trong JavaScript
// Tương tự Map nhưng có một số điểm khác biệt quan trọng:  
// - Key bắt buộc là object, không chấp nhận primitive (string, number,…).
// - Khi object key bị xóa hoặc không còn tham chiếu nào, entry trong WeakMap bị giải phóng khỏi ram.
// - Không lấy size và  thể lặp / iterate được : for..of, keys(), values(), entries()).

let john = { name: "John" };
let weakMap = new WeakMap();
weakMap.set(john, "some value");

john = null; // Xóa tham chiếu đến object john
// Bây giờ entry trong weakMap sẽ bị xóa tự động khi bộ thu gom rác chạy
console.log(weakMap.has(john)); // false

// II.1 Ứng dụng: lưu dữ liệu “tạm” gắn với object mà không cần tự dọn dẹp.

// Use case 1: Lưu dữ liệu tạm (additional data)

// tạo biến map lưu user truy cập, có cấu trúc key: user object, value: số lần truy cập
// tạo hàm thêm user, đếm số lần truy cập

let visitsCountMap = new WeakMap();
function countUserVisit(user) {
    let count = visitsCountMap.get(user) || 0; // 
    visitsCountMap.set(user, count + 1);
}
let userA = { name: "Alice" };
let userB = { name: "Bob" };

// userA và userB truy cập 
countUserVisit(userA);
countUserVisit(userB);
console.log(visitsCountMap.get(userA)); // 1
console.log(visitsCountMap.get(userB)); // 1

// userA truy cập lại
countUserVisit(userA);
console.log(visitsCountMap); // WeakMap { { name: 'Alice' } => 2, { name: 'Bob' } => 1 }

// Xóa tham chiếu đến userA và userB -> entries trong WeakMap cũng bị xóa
userA = null;
userB = null;

console.log(visitsCountMap); // WeakMap {} - entries bị xóa khi Garbage collector thu gom rác


// Use case 2: Cache tạm thời

// sử dụng WeakMap để cache kết quả tính toán dựa trên object đầu vào

let cache = new WeakMap();

function process(obj) {
  if (!cache.has(obj)) {
    let result = /* ...tính toán... */ obj;
    cache.set(obj, result);
  }
  return cache.get(obj);
}

let data = { key: 1 };
process(data); 
data = null; // cache entry cũng biến mất

// II. WeakSet trong JavaScript

// Tương tự Set nhưng có một số điểm khác biệt quan trọng:
// - Chỉ chứa object, không có giá trị primitive.
// - Không có size, không iterate được: for..of, keys(), values(), entries() không hoạt động.
// - Dùng để lưu “fact” — kiểu như “object này đã được xử lý chưa”.

let visited = new WeakSet();

let dang = { name: "Dang" };
let pete = { name: "Pete" };

visited.add(dang);
visited.add(pete);
visited.add(dang); // không trùng, chỉ lưu 1 lần

console.log(visited.has(dang)); // true
console.log(visited.has({ name: "Dang" })); // false, object khác

console.log(visited); // WeakSet { { name: 'Dang' }, { name: 'Pete' } }
console.log(visited.size); // undefined

dang = null; // object bị xóa, entry tự biến mất


// III. Bài tập ứng dụng với WeakMap và WeakSet

// Bài tập 1 : Ứng dụng WeakMap để Cache sao cho giảm chi phí CPU tính toán
// Question :
// Viết hàm processData(obj) nhận vào một object,
// thực hiện một số tính toán tốn thời gian, giả sử chuyển đổi object thành chuỗi in hoa
// để nếu hàm được gọi lại với cùng một object, nó trả về kết quả đã cache thay vì tính toán lại.
// Điều này giúp tiết kiệm thời gian và tài nguyên khi xử lý các object lớn hoặc phức tạp.

// Giải pháp :
// Sử dụng WeakMap để cache kết quả tính toán dựa trên object đầu vào,


// Answer:

let cacheData = new WeakMap();

function processData(obj) {
    if (!cacheData.has(obj)) {
        console.log("Processing new object...");
        let result = JSON.stringify(obj).toUpperCase(); // ví dụ tốn CPU
        cacheData.set(obj, result);
    } else {
        console.log("Using cached result...");
    }
    return cacheData.get(obj);
}

let dataObj = { name: "John", age: 30 };

console.log(processData(dataObj));
// Processing new object... {"NAME":"JOHN","AGE":30}

console.log(processData(dataObj)); // sử dụng cache , trả về kết quả đã lưu không tính toán lại
// Using cached result... {"NAME":"JOHN","AGE":30}

cacheData.get(dataObj).typeof; // "string"

dataObj = null; // khi xóa object, cache entry cũng biến mất

// Bài tập 2  : Ứng dụng WeakMap để Cache độ dài chuỗi

// Question :

// Viết hàm getStringInfo(strObj) nhận vào một object strObj có thuộc tính text (một chuỗi).
// Hàm này trả về một object chứa thông tin về chuỗi: độ dài (len) và chuỗi viết hoa (upper).
// để nếu hàm được gọi lại với cùng một strObj, nó trả về kết quả đã cache thay vì tính toán lại.

// Giải pháp :
// sử dụng WeakMap để cache kết quả dựa trên strObj,

// Answer:
let lengthCache = new WeakMap();

function getStringInfo(strObj) {
    if (!lengthCache.has(strObj)) {
        console.log("Calculating string info...");
        let info = {
            len: strObj.text.length,
            upper: strObj.text.toUpperCase()
        };
        lengthCache.set(strObj, info);
    } else {
        console.log("Using cached string info...");
    }
    return lengthCache.get(strObj);
}

let strObj = { text: "hello" };
console.log(getStringInfo(strObj)); // { len: 5, upper: 'HELLO' }
console.log(getStringInfo(strObj)); // sử dụng cache

strObj = null; // cache entry cũng biến mất

//  Bài tập 3  : Ứng dụng WeakMap để Cache kết quả xử lý DOM

// Question :
// Viết hàm renderElement(element) nhận vào một phần tử DOM element,
// thực hiện một số thao tác render tốn thời gian. Ví dụ giả sử render là chuyển đổi phần tử thành chuỗi HTML.
// để nếu hàm được gọi lại với cùng một element, nó trả về kết quả đã cache thay vì render lại.
// và trả về kết quả render dưới dạng chuỗi HTML.

// Giải pháp : 
// Sử dụng WeakMap để cache kết quả render dựa trên element,

let renderCache = new WeakMap();

function renderElement(element) {
    if (!renderCache.has(element)) {
        console.log("Rendering element...");
        let rendered = `<div>${element.innerHTML}</div>`; // giả sử render tốn thời gian
        renderCache.set(element, rendered);
    } else {
        console.log("Using cached render...");
    }
    return renderCache.get(element);    
}

let div = document.createElement('div');
// div.innerHTML = "Hello World";
div.textContent = "Hello World";
div.style.color = "blue";
div.style.fontSize = "20px";

// Gắn nó vào body để hiển thị trên trang
document.body.appendChild(div);

console.log(renderElement(div)); // Rendering element...
console.log(renderElement(div)); // sử dụng cache

div.remove(); // gở khỏi DOM

div = null; // cache entry cũng biến mất

// Bài tập 4 : Ứng dụng WeakSet theo dõi trạng thái xử lý đối tượng messages ( mail )
// Question :
// 
// Viết hàm markAsRead(msg) để đánh dấu một object msg đã được đọc,
// và hàm isRead(msg) để kiểm tra xem object đó đã được đánh dấu hay chưa.

// Giải pháp :
// Sử dụng WeakSet để lưu trữ các object đã được đọc,

// Answer:

let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];

let readMessages = new WeakSet();

// hai message đầu tiên đã đọc
readMessages.add(messages[0]);
readMessages.add(messages[1]);

// đọc lại message đầu tiên 
readMessages.add(messages[0]); // không thêm trùng

let msg = messages[0];
// Trả lời câu hỏi. "Message 0 đã đọc chưa ?"
console.log("Message 0 read?", readMessages.has(msg)); // true

// Xóa message[0]  khỏi danh sách -> weakset cũng tự động xóa
messages.shift(); 


// Bài tập 5 : Ứng dụng WeakMap cải tiến thêm Date vào Object message ( mail ) đã đọc
// Question :
// Thêm Date vào message đã đọc
// Giải pháp :
// Sử dụng WeakMap để lưu trữ ngày đọc của từng message đã đọc,
let readMessagesDates = new WeakMap();

// đánh dấu message[0] đã đọc vào ngày hiện tại
readMessagesDates.set(messages[0], new Date(2017, 0, 9));
readMessagesDates.set(messages[1], new Date("2013-11-11"));
console.log("Message 0 read on: ", readMessagesDates.get(messages[0])); // Date object
console.log("Message 1 read on: ", readMessagesDates.get(messages[1])); // Date object