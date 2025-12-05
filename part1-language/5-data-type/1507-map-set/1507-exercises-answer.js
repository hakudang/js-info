// exercises.js — 10 bài Map & Set (kèm lời giải + chú thích)
// Chạy bằng Node hoặc dán vào Console browser.

// =======================
// Bài 1. Đếm tần suất (Map)
// =======================
(function bai1() {
  const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];

  // Dùng Map để đếm
  const freq = new Map();
  for (const f of fruits) {
    // Nếu chưa có thì get() ra undefined, ta dùng || 0
    freq.set(f, (freq.get(f) || 0) + 1);
  }

  console.log("B1 freq:", freq); // Map { 'apple' => 3, 'banana' => 2, 'orange' => 1 }
})();


// =======================
// Bài 2. Lọc duy nhất (Set)
// =======================
(function bai2() {
  const nums = [1,2,2,3,4,4,4,5];

  // Set tự loại trùng
  const uniqueSet = new Set(nums);

  // Biến lại thành array
  const uniqueArr = [...uniqueSet];

  console.log("B2 unique:", uniqueArr); // [1,2,3,4,5]
})();


// =======================
// Bài 3. GroupBy theo city (Map)
// =======================
(function bai3() {
  const users = [
    {name:"An", city:"Tokyo"},
    {name:"Binh", city:"Osaka"},
    {name:"Chi", city:"Tokyo"},
    {name:"Dung", city:"Osaka"},
    {name:"Em", city:"Nagoya"},
  ];

  const groupMap = new Map();

  for (const u of users) {
    if (!groupMap.has(u.city)) {
      groupMap.set(u.city, []); // khởi tạo mảng chứa user cho city này
    }
    groupMap.get(u.city).push(u); // thêm user vào đúng nhóm
  }

  console.log("B3 groupMap:", groupMap);
})();


// =======================
// Bài 4. Đảo ngược Map (value -> key)
// =======================
(function bai4() {
  const map = new Map([
    ["a", 1],
    ["b", 2],
    ["c", 3],
  ]);

  const reversed = new Map();

  for (const [k, v] of map) {
    reversed.set(v, k);
  }

  console.log("B4 reversed:", reversed); // Map { 1 => 'a', 2 => 'b', 3 => 'c' }
})();


// =======================
// Bài 5. Union / Intersection / Difference (Set)
// =======================
(function bai5() {
  const A = new Set([1,2,3,4]);
  const B = new Set([3,4,5,6]);

  // Union: gộp rồi Set lọc trùng
  const union = (a,b) => new Set([...a, ...b]);

  // Intersection: lấy phần chung
  const intersection = (a,b) => new Set([...a].filter(x => b.has(x)));

  // Difference A\B: phần thuộc A nhưng không thuộc B
  const difference = (a,b) => new Set([...a].filter(x => !b.has(x)));

  console.log("B5 union:", union(A,B));               
  console.log("B5 intersection:", intersection(A,B));
  console.log("B5 difference:", difference(A,B));    
})();


// =======================
// Bài 6. Kiểm tra trùng lặp nhanh (Set)
// =======================
(function bai6() {
  function hasDuplicates(arr) {
    // Nếu size của Set < length của arr => có trùng
    return new Set(arr).size !== arr.length;
  }

  console.log("B6:", hasDuplicates([1,2,3]));    
  console.log("B6:", hasDuplicates([1,2,2,3]));  
})();


// =======================
// Bài 7. LRU Cache mini (Map)
// =======================
(function bai7() {
  class LRUCache {
    constructor(limit = 3) {
      this.limit = limit;
      this.map = new Map();
    }

    get(key) {
      if (!this.map.has(key)) return undefined;

      const value = this.map.get(key);

      // Đưa key lên “mới nhất”: xóa rồi set lại để nằm cuối Map
      this.map.delete(key);
      this.map.set(key, value);

      return value;
    }

    set(key, value) {
      if (this.map.has(key)) {
        // Nếu có rồi, xóa trước để update vị trí
        this.map.delete(key);
      }
      this.map.set(key, value);

      // Nếu vượt limit, xóa phần tử cũ nhất
      if (this.map.size > this.limit) {
        const oldestKey = this.map.keys().next().value; // key đầu tiên
        this.map.delete(oldestKey);
      }
    }

    has(key) {
      return this.map.has(key);
    }
  }

  const cache = new LRUCache(2);
  cache.set("a",1);
  cache.set("b",2);
  console.log("B7 get a:", cache.get("a")); 
  cache.set("c",3); 
  console.log("B7 has b:", cache.has("b")); 
  console.log("B7 final map:", cache.map);  
})();


// =======================
// Bài 8. Đếm số từ khác nhau (Set)
// =======================
(function bai8() {
  const text = "hello world hello JS world";

  const words = text.split(/\s+/); 
  const uniqueWords = new Set(words);

  console.log("B8 unique word count:", uniqueWords.size); 
  console.log("B8 words:", [...uniqueWords]); 
})();


// =======================
// Bài 9. Nhóm anagram (Map)
// =======================
(function bai9() {
  const words = ["listen","silent","enlist","hello","ohlle","world"];

  const groups = new Map();

  for (const w of words) {
    const key = w.split("").sort().join("");

    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(w);
  }

  const result = [...groups.values()];
  console.log("B9 anagram groups:", result);
})();


// =======================
// Bài 10. Top K frequency (Map)
// =======================
(function bai10() {
  const nums = [1,1,1,2,2,3,3,3,3,4];
  const k = 2;

  const freq = new Map();
  for (const n of nums) {
    freq.set(n, (freq.get(n) || 0) + 1);
  }

  const topK = [...freq.entries()]
    .sort((a,b) => b[1] - a[1])
    .slice(0, k)
    .map(([num]) => num);

  console.log("B10 topK:", topK); 
})();
