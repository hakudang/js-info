"use strict";

// in ra html tag <h2> Map và Set trong JavaScript </h2>
document.write("<h2> Map và Set trong JavaScript </h2>");
document.write("<h3> Bài tập làm thêm </h3>");

function section(title) {
    console.log("\n====================");
    console.log(`===${title}===`);
    console.log("====================");
}

/* =========================================================
 * Bài tập 1 : Đếm tần suất phần tử MAP
 * ---------------------------------------------------------
 * Giải pháp: 
 * - Dùng Map để lưu trữ tần suất xuất hiện của từng phần tử.
 * - Duyệt mảng, với mỗi phần tử:
 *   - Nếu phần tử đã có trong Map, tăng giá trị đếm lên 1.
 *   - Nếu chưa có, thêm phần tử vào Map với giá trị đếm là 1. 
 * ---------------------------------------------------------
 * Ví dụ:
 * const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
 * ---------------------------------------------------------
 * Kết quả mong muốn:
 * Map { "apple" => 3, "banana" => 2, "orange" => 1 } 
 * =======================================================*/

section("Bài tập 1 : Đếm tần suất phần tử MAP");

// Hãy dùng Map để tạo bảng đếm:

// key = tên fruit
// value = số lần xuất hiện

// Answer here
(() => {
    const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
    let map = new Map();
    for (const f of fruits) {
        if (map.has(f)) {
            map.set(f, map.get(f) + 1);
        } else {
            map.set(f, 1);
        }
    }
    console.log("B1 freq:", map); // Map { 'apple' => 3, 'banana' => 2, 'orange' => 1 }   
    // Kết quả mong muốn:
    // Map { "apple" => 3, "banana" => 2, "orange" => 1 }
})();

/* =========================================================
 * Bài tập 2 : Lọc duy nhất SET
 * ---------------------------------------------------------
 * Giải pháp:
 * - Dùng Set để loại bỏ phần tử trùng lặp.
 * - Chuyển Set trở lại thành mảng (nếu cần).
 * ---------------------------------------------------------
 * Ví dụ:
 * const nums = [1,2,2,3,4,4,4,5];
 * ---------------------------------------------------------
 * Kết quả mong muốn:
 * [1,2,3,4,5]
 * =======================================================*/

section("Bài tập 2 : Lọc duy nhất SET");

(() => {
    const nums = [1, 2, 2, 3, 4, 4, 4, 5];
    // Answer here
    let set = new Set(nums);
    console.log("B2 unique:", [...set]);

    // Kết quả mong muốn
    // [1,2,3,4,5]
})();

/* =========================================================
 * Bài tập 3 : GroupBy theo city MAP
 * ---------------------------------------------------------
 * Giải pháp:
 * - Dùng Map để nhóm người theo city.
 * - Key = city, Value = mảng người ở city đó.
 * ---------------------------------------------------------
 * Ví dụ:
 * const users = [
 * {name:"An", city:"Tokyo"},
 * {name:"Binh", city:"Osaka"},
 * {name:"Chi", city:"Tokyo"},
 * {name:"Dung", city:"Osaka"},
 * {name:"Em", city:"Nagoya"},
 * ];
 * ---------------------------------------------------------
 * Kết quả mong muốn:
 * Map {
 *   "Tokyo" => [ {name:"An",city:"Tokyo"}, {name:"Chi",city:"Tokyo"} ],
 *   "Osaka" => [ {name:"Binh",city:"Osaka"}, {name:"Dung",city:"Osaka"} ],
 *   "Nagoya" => [ {name:"Em",city:"Nagoya"} ]
 * }
 * =======================================================*/

section("Bài tập 3 : GroupBy theo city MAP");

// Cho danh sách user:

const users = [
    { name: "An", city: "Tokyo" },
    { name: "Binh", city: "Osaka" },
    { name: "Chi", city: "Tokyo" },
    { name: "Dung", city: "Osaka" },
    { name: "Em", city: "Nagoya" },
];

// answer here

(() => {
    let userMap = new Map();
    for (let user of users) {
        if (!userMap.has(user.city)) userMap.set(user.city, []);
        userMap.get(user.city).push(user);
    }
    console.log(userMap);
})();

/* =========================================================
 * Bài tập 4 : Đảo ngược Map (value -> key)
 * Gợi ý: value luôn duy nhất.
 * ---------------------------------------------------------        
 * Giải pháp:
 * - Duyệt Map gốc, với mỗi cặp [key, value], thêm vào Map mới cặp [value, key].
 * - Giả sử giá trị ban đầu là duy nhất để làm key mới.
 * ---------------------------------------------------------
 * Ví dụ:
 * const map = new Map([
 *   ["a", 1],
 *   ["b", 2],
 *   ["c", 3],
 * ]);
 * ---------------------------------------------------------
 * Kết quả mong muốn:
 * Map { 1 => "a", 2 => "b", 3 => "c" }
 * =======================================================*/

section("Bài tập 4 : Đảo ngược Map (value -> key)");

const map = new Map([
    ["a", 1],
    ["b", 2],
    ["c", 3],
]);

// Answer here

function reversedMap(map) {
    let reversed = new Map();
    for (let [key, value] of map) {
        reversed.set(value, key);
    }
    return reversed;
}
console.log("B4 reversedMap:", reversedMap(map));

/* ===================================
* Bài tập 5 : Tập hợp: Union / Intersection / Difference (Set)
* -----------------------------------------
* Giải pháp:
* - Union: gộp hai Set rồi lọc trùng bằng Set mới.
* - Intersection: lọc phần tử của Set A mà cũng có trong Set B.
* - Difference: lọc phần tử của Set A mà không có trong Set B.
* -----------------------------------------
* Ví dụ:
* const A = new Set([1,2,3,4]);
* const B = new Set([3,4,5,6]);
* -----------------------------------------
* Kết quả mong muốn:
* union(A,B) => Set([1,2,3,4,5,6])
* intersection(A,B) => Set([3,4])
* difference(A,B) (A\B) => Set([1,2])
* -----------------------------------------
* ===================================*/

section("Bài tập 5 : Tập hợp: Union / Intersection / Difference (Set)");

// Cho 2 Set:
const A = new Set([1, 2, 3, 4]);
const B = new Set([3, 4, 5, 6]);

// Hãy tạo:

// union(A,B) => Set([1,2,3,4,5,6])
// intersection(A,B) => Set([3,4])
// difference(A,B) (A\B) => Set([1,2])

// Answer here

function bai5(a, b) {
    // Union: gộp rồi Set lọc trùng
    const union = (a, b) => new Set([...a, ...b]);
    // Intersection: lấy phần chung
    const intersection = (a, b) => new Set([...a].filter(x => b.has(x)));
    // Difference A\B: phần thuộc A nhưng không thuộc B
    const difference = (a, b) => new Set([...a].filter(x => !b.has(x)));
    return { union: union(a, b), intersection: intersection(a, b), difference: difference(a, b) };
}

console.log("B5 union:", bai5(A, B).union);
console.log("B5 intersection:", bai5(A, B).intersection);
console.log("B5 difference:", bai5(A, B).difference);

/* =========================================================
 * Bài tập 6 : Kiểm tra trùng lặp nhanh (Set)
 * ---------------------------------------------------------
 * Bài toán: viết hàm hasDuplicates(arr) để kiểm tra mảng arr có phần tử trùng lặp hay không.
 * - Trả về true nếu có trùng lặp, false nếu không.
 * ---------------------------------------------------------
 * Giải pháp:
 * - Tạo Set từ mảng.
 * - So sánh size của Set với length của mảng.
 * - Nếu size < length => có trùng lặp.
 * ---------------------------------------------------------
// Ví dụ:
// hasDuplicates([1,2,3]) // false
// hasDuplicates([1,2,2,3]) // true
* =======================================================*/

section("Bài tập 6 : Kiểm tra trùng lặp nhanh (Set)");

function hasDuplicates(arr) {
    let set = new Set(arr);
    if (set.size < arr.length) return true
    return false
}
console.log(hasDuplicates([1, 2, 3])); // false
console.log(hasDuplicates([1, 2, 2, 3])); // true

/* ======================================
 * Bài tập 7 : LRU Cache mini (Map)
 * --------------------------------------
 * Tạo lớp LRUCache với các method:
 * - constructor(limit): khởi tạo cache với giới hạn kích thước limit.
 * - get(key): lấy giá trị theo key, hoặc -1 nếu không tồn tại. Cập nhật key thành mới nhất.
 * - set(key, value): thêm cặp key-value vào cache. Nếu cache vượt quá limit, xoá phần tử cũ nhất.
 * --------------------------------------
 * Giải pháp:
 * - Dùng Map để lưu trữ cặp key-value.
 * - Map giữ thứ tự chèn, nên phần tử đầu tiên là cũ nhất.
 * - Khi get(key), nếu tồn tại, lấy giá trị, xoá key khỏi Map và thêm lại để cập nhật thành mới nhất.
 * - Khi set(key, value), nếu key đã tồn tại, xoá nó trước khi thêm lại. Nếu vượt limit, xoá phần tử đầu tiên.
 * --------------------------------------
 * Ví dụ sử dụng:
 * const cache = new LRUCache(2);
 * cache.set("a", 1);
 * cache.set("b", 2);
 * cache.get("a");      // 1  (a thành mới nhất)
 * cache.set("c", 3);    // b bị loại
 * cache.has("b");      // false
 * ======================================*/

section("Bài tập 7 : LRU Cache mini (Map)");

class LRUCache {
    constructor(limit = 3) {
        this.limit = limit;
        this.map = new Map();
    }
    set(key, value) {
        if (this.map.has(key)) {
            this.map.delete(key);
        }
        this.map.set(key, value);
        if (this.map.size > this.limit) {
            let first = this.map.keys().next().value;
            this.map.delete(first);
        }
        return this.map;
    }
    get(key) {
        if (!this.map.has(key)) return -1;
        const value = this.map.get(key);
        this.map.delete(key);
        this.map.set(key, value);
        return value;
    }
    has(key) {
        return this.map.has(key);
    }
    clear() {
        this.map.clear();
    }
}



const cache = new LRUCache(2);

console.log(cache.set("a", 1));
console.log(cache.set("b", 2));
console.log(cache.get("a"));      // 1  (a thành mới nhất)
console.log(cache.set("c", 3));    // b bị loại
console.log(cache.has("b"));      // false

/* =========================================================
 * Bài tập 8 : Đếm số từ khác nhau (Set)
 * ---------------------------------------------------------
 * Bài toán:
 * - Viết hàm countUniqueWords(text) để đếm số từ khác nhau trong chuỗi text.
 * - Tách từ bằng dấu cách.
 * - Không phân biệt hoa thường.
 * =======================================================
 * Giải pháp:
 * - Chuyển chuỗi về chữ thường.
 * - Tách chuỗi thành mảng từ.
 * - Dùng Set để lọc từ duy nhất.
 * - Trả về kích thước của Set.
 * 
 * ---------------------------------------------------------
 * Ví dụ:
 * countUniqueWords("hello world hello JS world") 
 * ---------------------------------------------------------
 * Kết quả mong muốn:
 * 3
 * =======================================================*/

section("Bài tập 8 : Đếm số từ khác nhau (Set)");

const text = "hello world hello JS world";

function countUniqueWords(text) {
    let arrText = text.toLowerCase().split(' ');
    let setText = new Set(arrText);
    return setText.size;
}
console.log("B8 unique word count:", countUniqueWords(text));

/* =========================================================
 * Bài tập 9 :  Nhóm anagram (Map)
 * ---------------------------------------------------------
 * Bài toán:
 * - Viết hàm groupAnagrams(words) để nhóm các từ anagram lại với nhau.
 * - Trả về mảng các nhóm từ anagram.
 * =======================================================
 * Giải pháp:
 * - Dùng Map để nhóm từ.
 * - Key = từ đã sắp xếp chữ cái.
 * ---------------------------------------------------------
 * Ví dụ:
 * groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"])
 * Kết quả:
 * [ ["eat", "tea", "ate"],
 *   ["tan", "nat"],
 *   ["bat"] ]
 * =======================================================*/

section("Bài tập 9 : Nhóm anagram (Map)");

// answer here
let words = ["eat", "tea", "tan", "ate", "nat", "bat"];

function groupAnagrams(words) {
    let map = new Map();
    for (let word of words) {
        let key = word.toLowerCase().split('').sort().join('');
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(word);
    }
    return map.values();
}

console.log(groupAnagrams(words));

/* =========================================================
* Bài tập 10 : Top K frequency (Map)
* ---------------------------------------------------------
* Bài toán:
* - Viết hàm topKFrequent(words, k) để tìm k từ xuất hiện nhiều nhất trong mảng words.
* - Trả về mảng k từ đó, sắp xếp theo tần suất giảm dần.
*----------------------------------------------------------
* Giải pháp:
* - Dùng Map để đếm tần suất từ.
* - Chuyển Map thành mảng [word, count], sắp xếp theo count giảm dần.
* - Lấy k phần tử đầu tiên.
* ---------------------------------------------------------
* Ví dụ:
* const nums = [1,1,1,2,2,3,3,3,3,4];
* const k = 2;
* Kết quả: [3,1] (3 xuất hiện 4 lần, 1 xuất hiện 3 lần)
* =======================================================*/

section("Bài tập 10 : Top K frequency (Map)");

const nums = [1, 1, 1, 2, 2, 3, 3, 3, 3, 4];
const k = 2;

function topKFrequent(nums, k) {
    let freq = new Map();
    for (const n of nums) {
        freq.set(n, (freq.get(n) || 0) + 1);
    }
    const topK = [...freq.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, k)
        .map(([num]) => num); // chỉ lấy num - thành phần thứ 1, bỏ count 
    return topK;
}
console.log("B10 top K frequent:", topKFrequent(nums, k));
