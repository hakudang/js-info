# DOM Tree
## 1. Mọi thứ trong HTML đều là node

```
<!DOCTYPE HTML>
<html>
<head>
  <title>About elk</title>
</head>
<body>
  The truth about elk.
</body>
</html>
```

DOM Tree tương ứng:
```
Document
 ├── doctype HTML
 └── html
     ├── head
     │   ├── title
     │   │   └── "About elk"
     └── body
         └── "The truth about elk."

```
✅ Tag → element node

✅ Text → text node (#text)

✅ Root luôn là <html>

## 2. DOM node là object → có thể sửa bằng JS


```js
document.body.style.background = 'red';

setTimeout(() => {
  document.body.style.background = '';
}, 3000);

```

Một số thuộc tính DOM thường gặp:
- innerHTML – HTML bên trong node
- textContent – text thuần
- offsetWidth – độ rộng (px)

## 3. Text node & khoảng trắng rất quan trọng
Xuống dòng và dấu cách cũng là text node.

```html
<head>
  <title>About elk</title>
</head>

```
👉 Trước `<title>` vẫn có text node chứa newline + space.

📌 Ngoại lệ:
- Space / newline trước <head> → bị bỏ qua
- Nội dung sau </body> → tự động đưa vào trong body

## 4. Trình duyệt tự sửa HTML lỗi (autocorrection)
HTML thiếu thẻ vẫn được browser sửa khi tạo DOM.

Ví dụ HTML lỗi:
```html
<p>Hello
<li>Mom
<li>Dad
```
DOM thực tế:
```
BODY
 ├── P
 │    └── #text "Hello"
 ├── LI → "Mom"
 ├── LI → "Dad"
```
✅ Browser tự đóng thẻ, tự sinh cấu trúc hợp lệ

## 5. <table> luôn có <tbody> trong DOM
```html
<table>
  <tr><td>1</td></tr>
</table>
```
DOM thực tế:
```
TABLE
 └── TBODY
      └── TR
           └── TD
                └── #text "1"
```
⚠️ <tbody> luôn tồn tại trong DOM, dù HTML không viết

→ Đây là bẫy phổ biến khi query table bằng JS.

## 6. Không chỉ có element & text node
Ngoài ra còn có:
### Comment node
```html
<!-- comment -->
```
### DOM
```cpp
#comment "comment"
```
### DocumentType node

👉 Comment không hiển thị nhưng vẫn nằm trong DOM
### Doctype & document

- `<!DOCTYPE>` cũng là node

document là **node gốc**, entry point vào DOM

## 7. Thực tế: thường dùng 4 loại node

Trong 12 loại node của DOM spec, 90% công việc chỉ dùng 4:
| Node       | Ý nghĩa      |
| ---------- | ------------ |
| `document` | Cả trang     |
| Element    | Thẻ HTML     |
| Text       | Nội dung chữ |
| Comment    | Chú thích    |

## 8. Dùng DevTools để xem DOM

### Cách phổ biến:

- Chuột phải → Inspect
- Tab Elements

**DevTools:**

- Ẩn text node rỗng để dễ nhìn
- Hiển thị tree DOM rõ ràng

👉 Click icon 🔍 để chọn element trực tiếp trên page

## 9. Kết nối Elements ↔ Console (rất hay dùng)
- $0 → element đang chọn
- $1, $2 → element đã chọn trước đó
ví dụ:
```js
$0.style.background = 'red';
```
👉 Đổi màu element đang inspect

Ngược lại:

```js
inspect(document.body);
```
👉 Chuyển tab console sang Elements

## 10. Tóm tắt tư duy DOM Tree (cực quan trọng)

- HTML ≠ DOM
- DOM là cấu trúc cây object
- Mọi thứ trong HTML → đều có node
- Browser tự sửa HTML lỗi trước khi tạo DOM
- JS thao tác DOM, không thao tác HTML text