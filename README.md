# JavaScript Learning Lab (javascript.info roadmap)

Repo này dùng để ghi lại quá trình học JavaScript theo lộ trình trên **https://javascript.info/**.  
Tổ chức theo ba phần chính:

- **Part 1**: The JavaScript Language  
- **Part 2**: Browser: Document, Events, Interfaces  
- **Part 3**: Additional Articles

Mỗi bài được đặt trong thư mục riêng gồm `index.html` và `main.js` (khi cần).


## 📁 Folder Structure
```
js-info/
│
├─ README.md # note toàn bộ
├─ part1-language/
│    ├─ 2-fundamentals/
│    │    ├─ index.html
│    │    ├─ 1210-if-condition.js
│    │    ├─ 1211-logical-operattors.js
│    │    ├─ ...
├─ ...
```

> Note: Folder sẽ được bạn bổ sung dần theo tiến trình học.


## ⚙️ Cách chạy bài học

### Browser (khuyến khích)
- Cài VSCode extension Live Server
- Mở thư mục bài → `index.html` → Run Live Server

### Node (cho bài Part 1 không cần DOM)


## ✍️ Quy ước file cho mỗi bài

### `index.html`
Dùng khi bài cần tương tác browser/DOM

node main.js

```
html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>JS Lab</title>
</head>
<body>
  <script type="module" src="./main.js"></script>
</body>
</html>
```
main.js
// Code thực hành
console.log("Hello JS Lab");


## Qui ước Git commit message

```bash
feat(docs): add DB definition draft
fix(docs): update validation rules
docs: refine use case flow
```
feat = 新規追加  
fix = 修正
docs = ドキュメント改善のみ
---