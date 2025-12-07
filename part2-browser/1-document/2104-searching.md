# Searching: getElement*, querySelector*

🎯 Mục đích

Khi không thể tìm DOM bằng parent/child/sibling, ta cần TÌM element ở bất kỳ đâu trong trang.

## 1️⃣ getElementById – tìm 1 element theo id

```html
<div id="elem">Hello</div>
<script>
  let elem = document.getElementById('elem');
  elem.style.background = 'red';
</script>
```

- ✅ Nhanh
- ✅ Luôn trả 1 element (hoặc null)
- ❌ Chỉ dùng được với document
- ❌ id phải unique

🚫 Không nên dùng biến global theo id

```html
<div id="elem"></div>
<script>
  elem.style.background = 'red'; // ❌ dễ conflict
</script>
```

👉 Thực tế luôn dùng document.getElementById

## 2️⃣ querySelectorAll – linh hoạt nhất (CSS selector)
**Mục đích**: Tìm tất cả element khớp với CSS selector.

**Cú pháp** : document.querySelectorAll(css_selector)

**css_selector** là 1 chuỗi định nghĩa cách chọn element trong DOM, theo cú pháp của CSS. 
Cú pháp này rất mạnh mẽ và linh hoạt, cho phép chọn element theo class, id, thuộc tính, quan hệ cha-con, pseudo-class…

Ví dụ: 
- '.class' : chọn tất cả element có class tên là "class",
- '#id' : chọn element có id là "id",
- 'div > .class:first-child' : chọn element đầu tiên có class tên "class" là con trực tiếp của div…

```html
<ul>
  <li>The</li>
  <li>test</li>
</ul>
<ul>
  <li>has</li>
  <li>passed</li>
</ul>

<script>
  let items = document.querySelectorAll('ul > li:last-child');
  for (let li of items) {
    console.log(li); // <li>test</li>, <li>passed</li>
    console.log(li.innerHTML); // test, passed
  }
</script>
```
- ✅ Dùng CSS selector
- ✅ Gọi được trên document hoặc element
- ✅ Hỗ trợ pseudo-class (:last-child, :hover…)
- ❗ Trả về static collection (không auto-update)

## 3️⃣ querySelector – lấy element đầu tiên
Mục đích: Tương tự querySelectorAll, nhưng chỉ lấy element đầu tiên khớp selector.
Cú pháp: document.querySelector(css_selector)

```html
<div class="contents">
        <ul class="book">
            <li class="chapter">Chapter 1</li>
            <li class="chapter">Chapter 2</li>
        </ul>
    </div>

    <script>
        section("3️⃣ querySelector – lấy element đầu tiên");

        let chapter = document.querySelector('.chapter'); // LI, lấy element đầu tiên
        console.log(chapter); // <LI>Chapter 1</LI>
        
    </script>
```
- ✅ Giống querySelectorAll, nhưng chỉ lấy 1 element đầu tiên
- ✅ Rất hay dùng để tìm 1 element duy nhất
## 4️⃣ matches(css) – kiểm tra element có khớp selector?
**Mục đích** : Kiểm tra 1 element có khớp với selector CSS hay không.

**Cú pháp**: element.matches(css_selector)

```html
<a href="file.zip">Download</a>
<a href="page.html">View</a>

<script>
  for (let el of document.body.children) {
    if (el.matches('a[href$="zip"]')) { 
      console.log(el.href);
    }
  }
</script>
```


- ✅ Dùng khi lọc element trong loop
- ✅ Không tìm – chỉ check true / false

## 5️⃣ closest(css) – đi ngược lên cha gần nhất
**Mục đích** : Tìm ancestor (cha, ông, cụ…) gần nhất khớp với selector CSS.
**Cú pháp** : element.closest(css_selector)

```html
<div class="contents">
  <ul class="book">
    <li class="chapter">Chapter 1</li>
  </ul>
</div>

<script>
  let chapter = document.querySelector('.chapter');

  chapter.closest('.book');     // <ul>
  chapter.closest('.contents'); // <div>
  chapter.closest('h1');        // null
</script>
```

- ✅ Tìm ancestor gần nhất
- ✅ Rất hay dùng trong event delegation

## 6️⃣ getElementsBy* – cách cũ (nhưng vẫn gặp)
**Mục đích**: Tìm tất cả element theo tag name, class name hoặc name attribute.
**Cú pháp**: 
element.getElementsByTagName(tag_name)
element.getElementsByClassName(class_name)
element.getElementsByName(name_value)

Ví dụ:
```html
<table id="table">
  <input type="radio" value="young">
  <input type="radio" value="adult">
</table>

<script>
  let inputs = table.getElementsByTagName('input');
  for (let i of inputs) {
    console.log(i.value);
  }
</script>
```

- ✅ Trả về LIVE collection (DOM đổi → collection đổi)
- ❗ Không phải array
- ❗ Dễ lỗi nếu quên chữ s

🚫 Sai: `document.getElementsByTagName('input').value = 5; // ❌
`

✅ Đúng: `document.getElementsByTagName('input')[0].value = 5;`

## 7️⃣ Live vs Static Collection (rất quan trọng)
🔁 Live (tự update)
let divs = document.getElementsByTagName('div');

📌 Static (cố định)
let divs = document.querySelectorAll('div');

<div></div>
<script>
  let a = document.getElementsByTagName('div');
  let b = document.querySelectorAll('div');
</script>
<div></div>

<script>
  a.length // 2
  b.length // 1
</script>

✅ Bảng so sánh nhanh (nên nhớ)
Method	Tìm theo	Gọi trên element?	Live
querySelector	CSS	✅	❌
querySelectorAll	CSS	✅	❌
getElementById	id	❌	❌
getElementsByName	name	❌	✅
getElementsByTagName	tag	✅	✅
getElementsByClassName	class	✅	✅
✅ Kết luận thực tế (quan trọng)

👉 90% code hiện đại dùng:

document.querySelector()
document.querySelectorAll()


👉 getElementById vẫn OK khi:

form

modal

element duy nhất

👉 getElementsBy*:

gặp khi đọc code cũ

hiếm khi viết mới

🧠 Câu nhớ gọn

querySelector = chuẩn hiện đại
getElement = legacy / đặc thù*