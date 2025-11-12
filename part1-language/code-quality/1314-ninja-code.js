/** file : 1314-ninja-code.js 
 * “Ninja code” trong bài là CHÂM BIẾM về những đoạn code khó hiểu, khó bảo trì
 * Mục đích là giúp người đọc nhận ra tầm quan trọng của việc viết code rõ ràng, dễ hiểu
 * Giúp người đọc tránh viết “ninja code” trong thực tế
 * 1. Ninja code - code khó hiểu
 * 2. Lý do tránh ninja code
 * 3. Tại sao nguy hiểm
 * 4. Cách “giải độc” để code chuẩn
 * 5. Checklist khi review code
 * 5.1 Tên biến/hàm có nói “cái gì” và “tại sao” không? (không chỉ “kiểu gì”)
 * 5.2 Có hàm is* | check* | find* nào bị lén làm thêm hành động không?
 * 5.3 Có nested ternary hoặc biểu thức quá 1 dòng khó đọc không?   
 * 5.4 Có reuse biến đổi ý nghĩa giữa function/vòng lặp không?
 * 5.5 Prefix động từ có nhất quán theo nhóm hành vi không?
 * 5.6 Có shadow biến cùng tên ở phạm vi trong/ngoài không? 
 */

"use strict";

document.write("<h2>Ninja Code - Code khó hiểu và khó bảo trì</h2>");

// 1. Ninja code - code khó hiểu
// Ví dụ 1: Ninja code - code khó hiểu  

function f1(a, b) {
    return a && b ? a * b : a || b ? a + b : 0;
}

// Giải thích code trên:
// - Hàm f1 nhận hai tham số a và b
// - Nếu cả a và b đều đúng (truthy), trả về tích của a và b
// - Nếu chỉ một trong hai đúng, trả về tổng của a và b
// - Nếu cả hai đều sai (falsy), trả về 0
// Tuy nhiên, cách viết này rất khó hiểu và không rõ ràng
// Người đọc phải phân tích kỹ mới hiểu được ý nghĩa của hàm

// sửa thành code rõ ràng hơn
function f1Clear(a, b) {
    if (a && b) {
        return a * b;
    } else if (a || b) {
        return a + b;
    } else {
        return 0;
    }
}

// ví dụ 2 : Ninja code - code khó bảo trì

i = i ? i < 0 ? Math.max(0, len + i) : i : 0;

// Giải thích code trên:
// - Nếu i là falsy (null, undefined, 0, v.v.), gán i = 0
// - Nếu i là số âm, gán i = max(0, len + i)
// - Nếu i là số dương, giữ nguyên i
// Tuy nhiên, cách viết này rất khó hiểu và khó bảo trì
// Người đọc phải phân tích kỹ mới hiểu được ý nghĩa của đoạn code

// Rõ ràng
function normalizeIndex(i, len) {
    if (i == null) return 0;
    if (i < 0) return Math.max(0, len + i);
    return i;
}

i = normalizeIndex(i, len);

//2. Lý do tránh ninja code

// Tránh code 

// - Tối đa ngắn gọn: nhét logic vào 1 dòng, lồng toán tử 3 ngôi chồng chéo.

// - Đặt tên mơ hồ: a,b,c; data,value,item; str,num; thêm số data1,data2…

// - Viết tắt loạn xạ: ua, brsr, lst…

// - Dùng biến na ná nhau: date vs data để đánh lừa sự chú ý.

// - Đồng nghĩa khác prefix: display/show/render/paint cho những thứ giống nhau; còn hai hàm khác hẳn lại dùng cùng prefix (print…).

// - Tái sử dụng biến lung tung, thay đổi ý nghĩa giữa chừng (đặc biệt trong vòng lặp).

// - Gạch dưới vô nghĩa: _x,__y mỗi nơi một kiểu.

// - Đặt tên “cho vui”: superElement, megaFrame… nhưng vô thông tin.

// - Che khuất biến ngoài bằng biến trong cùng tên (shadowing).

// - Rải side-effect vào hàm có vẻ “vô hại”: is*/check*/find* lại âm thầm ghi trạng thái, hoặc trả kiểu dữ liệu “dị”.

// 3. Tại sao nguy hiểm:

// - Tăng thời gian đọc hiểu và review, dễ bug khi fix nhỏ.

// - Làm unit test khó viết vì hành vi mập mờ, side-effect ẩn.

// - Giảm khả năng tái sử dụng; đội ngũ mới vào gần như “bó tay”.

// 3. Cách “giải độc” để code chuẩn:

// 3.1 Đặt tên nói lên Ý NGHĨA, không phải kiểu dữ liệu hay độ “ngầu”.

// - Tên biến/hàm mô tả mục đích và domain: remainingSeats, fetchUserProfile.

// - Dùng cùng một động từ cho cùng một nhóm hành vi: UI dùng render*, log dùng log*, gọi API dùng fetch*/load*.

// 3.2 Ưu tiên tính thuần (pure) và không side-effect bất ngờ.

// - checkPermission chỉ trả boolean hoặc Result rõ ràng, không thay đổi state.

// - Nếu cần side-effect, đặt tên lộ ý: validateEmailAndShowError.

// 3.3 Tách nhỏ, tuyến tính, tránh lồng ghép rối.

// - Mỗi hàm làm một việc; return sớm; bỏ “tam đoạn luận” 3-4 tầng.

// 3.4 Không shadow biến và không đổi “ý nghĩa” biến giữa chừng.

// - Nếu cần bản sao, đặt tên rõ: const cloned = deepClone(user).

// 3.5 Đồng nhất viết tắt.

// - Tốt nhất hạn chế viết tắt. Nếu buộc phải viết tắt, tạo glossary và lint rule.

// 3.6 Tự động hóa chất lượng.

// - ESLint + Prettier + TypeScript, bật rule: no-shadow, no-nested-ternary, consistent-return, eqeqeq, no-implicit-coercion.

// - Commit hook chạy lint + test.

// 4. Checklist khi review code

// 4.1 Tên biến/hàm có nói “cái gì” và “tại sao” không? (không chỉ “kiểu gì”)

// Bad: chỉ nói kiểu/đối tượng, không nói mục đích
const arr = getData();
function process(obj) { /* ... */ }

// Good: nói rõ nội dung và lý do tồn tại
const pendingOrders = fetchOrdersByStatus('pending');
function processRefundRequests(requests) { /* ... */ }

// 4.2 Có hàm is*/check*/find* nào bị lén làm thêm hành động không?

// Bad: check* nhưng lại ghi log + mutate state
function checkPermission(user) {
  auditLog.push({ userId: user.id, at: Date.now() });
  session.lastCheckUserId = user.id;
  return user.role === 'admin';
}

// Good: hàm kiểm tra thuần + hàm side-effect tách riêng
function hasAdminPermission(user) {
  return user.role === 'admin';
}
function recordPermissionAudit(user) {
  auditLog.push({ userId: user.id, at: Date.now() });
}

// 4.3 Có nested ternary hoặc biểu thức quá 1 dòng khó đọc không?

// Bad
const i = i0 ? (i0 < 0 ? Math.max(0, len + i0) : i0) : 0;

// Good
function normalizeIndex(i0, len) {
  if (i0 == null) return 0;
  if (i0 < 0) return Math.max(0, len + i0);
  return i0;
}
const i = normalizeIndex(i0, len);

// 4.4 Có reuse biến đổi ý nghĩa giữa function/vòng lặp không?

// Bad: 'total' vừa là tổng tiền, lát sau bị gán thành chuỗi đã format
let total = 0;
for (const item of cart) total += item.price;
total = `$${total.toFixed(2)}`;   // đổi ý nghĩa -> gây lỗi chỗ khác

// Good: đặt biến mới cho trình bày
let totalCents = 0;
for (const item of cart) totalCents += item.priceCents;
const totalLabel = formatCurrency(totalCents);

// 4.5 Prefix động từ có nhất quán theo nhóm hành vi không?

// Bad: hiển thị UI nhưng lẫn lộn display/show/render/paint
function displayUser(user) { /* ... */ }
function showToast(msg) { /* ... */ }
function renderError(err) { /* ... */ }
function paintModal(content) { /* ... */ }

// Good: thống nhất UI = render*, thông báo = notify*, tải dữ liệu = fetch*
function renderUserCard(user) { /* ... */ }
function renderErrorBanner(err) { /* ... */ }
function notifyToast(message) { /* ... */ }
async function fetchUser(id) { /* ... */ }

// 4.6 Có shadow biến cùng tên ở phạm vi trong/ngoài không?

// Bad: 'user' bên trong che khuất 'user' bên ngoài
const user = await authenticate();
function renderProfile() {
  const user = getDummyUser(); // shadow
  // ... dễ hiểu nhầm đang dùng user đã đăng nhập
}

// Good: đặt tên khác để tránh shadow
const currentUser = await authenticate();
function renderProfile() {
  const previewUser = getDummyUser();
  // ...
}
