
# MÔ TẢ DỰ ÁN
Dự án này sử dụng Mocha và Chai để kiểm thử đơn vị cho một hàm tính lũy thừa trong JavaScript.
Hàm `pow(x, n)` trả về giá trị của `x` mũ `n`, trong đó `x` là cơ số và `n` là số mũ nguyên không âm.

# Mục tiêu & Quy ước

Yêu cầu: pow(x, n) trả về x^n, với n là số nguyên ≥ 0.

Quy ước biên:

n < 0 hoặc n không nguyên → trả NaN.

n === 0 → trả 1 (kể cả x = 0, chọn quy ước 0^0 = 1 như đa số môi trường lập trình).

Phong cách test: BDD với Mocha + Chai (expect).

# HƯỚNG DẪN CHẠY DỰ ÁN

## I - KHỞI TẠO DỰ ÁN VỚI MOCHA VÀ CHAI
1. Tạo thư mục dự án và cài đặt phụ thuộc:
   ```
   mkdir mocha-lab && cd mocha-lab
   npm init -y
   npm i -D mocha chai sinon c8
   ```
2. Cấu trúc thư mục :
mocha-lab/
├─ src/
│  └─ math.js
├─ test/
│  └─ math.test.js
└─ package.json

3. Cấu hình `package.json` để thêm script chạy test:
```
{
  "type": "module",
  "devDependencies": {
    "c8": "^10.1.3",
    "chai": "^6.2.0",
    "mocha": "^11.7.4",
    "sinon": "^21.0.0"
  },
    "scripts": {
    "test": "mocha --recursive",
    "test:watch": "mocha --recursive --watch",
    "coverage": "c8 mocha --recursive"
  }
}
```
## II - RED - VIẾT SPEC TỐI THIỂU 

test/math.test.js (v1)

```
import { expect } from "chai";
import { pow } from "../src/math.js";

describe("pow()", () => {
  it("2^3 = 8", () => {
    expect(pow(2, 3)).to.equal(8);
  });

  it("5^0 = 1", () => {
    expect(pow(5, 0)).to.equal(1);
  });
});

```
src/math.js (v1 – tạm rỗng để thấy RED)

```
export function pow(x, n) {
  // tạm để trống, để thấy test fail (RED)
}
```
Chạy:

```
npm test
```
👉 Kỳ vọng: Fail (đỏ). Đây là “R” đầu tiên trong Red–Green–Refactor.

## III - RED - GREEN tạm: CODE “ăn gian” ĐỂ HIỂU VÒNG LẶP TDD  
src/math.js (v2 – cheat để biến test xanh)
```
export function pow(x, n) {
  if (n === 0) return 1;
  return 8; // cố tình cheat để thấy tầm quan trọng của test mở rộng
}

```
Chạy:

```
npm test
```
👉 Kết quả: Pass (xanh). Nhưng ta biết code chưa đúng tổng quát.

## IV - RED - MỞ RỘNG TEST ĐỂ BẮT CODE SAI

test/math.test.js (v2 – thêm case)
```
import { expect } from "chai";
import { pow } from "../src/math.js";

describe("pow()", () => {
  it("2^3 = 8", () => {
    expect(pow(2, 3)).to.equal(8);
  });

  it("5^0 = 1", () => {
    expect(pow(5, 0)).to.equal(1);
  });

  it("3^4 = 81", () => {
    expect(pow(3, 4)).to.equal(81);
  });
});

```
Chạy:

```
npm test
```
👉 Fail (đỏ). Đúng như mong đợi — test đang “dạy” code của bạn.

## V - GREEN - VIẾT CODE ĐÚNG - LOOP NHÂN DỒN 
src/math.js (v3 – thuật toán thật)
```
export function pow(x, n) {
  if (n === 0) return 1;
  let result = 1;
  for (let i = 0; i < n; i++) {
    result *= x;
  }
  return result;
}

```
Chạy:

```
npm test
```
👉 Pass. Bây giờ đã đúng với 3 case.

## VI - REFINE TEST - SINH NHIỀU CASE TĂNG TỰ TIN
test/math.test.js (v3 – table-driven cho mũ 3)
```
import { expect } from "chai";
import { pow } from "../src/math.js";

describe("pow()", () => {
  it("2^3 = 8", () => {
    expect(pow(2, 3)).to.equal(8);
  });

  it("5^0 = 1", () => {
    expect(pow(5, 0)).to.equal(1);
  });

  it("3^4 = 81", () => {
    expect(pow(3, 4)).to.equal(81);
  });

  describe("mũ 3 (tạo theo bảng)", () => {
    const cases = [1, 2, 3, 4, 5];
    for (const x of cases) {
      it(`${x}^3 = ${x * x * x}`, () => {
        expect(pow(x, 3)).to.equal(x * x * x);
      });
    }
  });
});
```
Chạy:

``` 
npm test
```
👉 Vẫn Pass. Coverage tăng.

## VII - RED - ĐƯA VÀO RÀNG BUỘC NGHIỆP VỤ ( n âm / không nguyên) 
v4 – biên n không hợp lệ
```
import { expect } from "chai";
import { pow } from "../src/math.js";

describe("pow()", () => {
  // ... các test cũ

  it("n âm → NaN", () => {
    expect(Number.isNaN(pow(2, -1))).to.equal(true);
  });

  it("n không nguyên → NaN", () => {
    expect(Number.isNaN(pow(2, 1.5))).to.equal(true);
  });

  it("0^0 = 1 (quy ước trong code)", () => {
    expect(pow(0, 0)).to.equal(1);
  });
});

```
Chạy:

```
npm test
```
👉 Fail (đỏ), vì implementation thuật toán math.js chưa chặn.

## VIII - GREEN - CẬP NHẬT CODE ĐỂ THỎA RÀNG BUỘC MỚI
src/math.js (v4 – hoàn thiện)
```
export function pow(x, n) {
  // biên: n âm hoặc không nguyên → NaN
  if (n < 0 || !Number.isInteger(n)) return NaN;

  // quy ước mũ 0
  if (n === 0) return 1;

  let result = 1;
  for (let i = 0; i < n; i++) {
    result *= x;
  }
  return result;
}

```
Chạy:

```
npm test
```
👉 Pass. Đây là phiên bản “đúng nghiệp vụ” theo spec đã nêu.

## IX - REFRACTOR nhẹ cho “self-descriptive”
src/math.js
```
// v5 – code “tự mô tả” hơn một chút
export function pow(x, n) {
  if (!isValidExponent(n)) return NaN;
  if (n === 0) return 1;

  let result = 1;
  for (let i = 0; i < n; i++) result *= x;
  return result;
}
const isValidExponent = (n) => Number.isInteger(n) && n >= 0;
```


# MÔ TẢ HÀM `pow(x, n)`
Hàm `pow(x, n)` nhận hai tham số:   
- `x`: số cơ sở (có thể là số nguyên hoặc số thực)  
- `n`: số mũ (phải là số nguyên không âm)
Hàm trả về giá trị của `x` mũ `n`. Nếu `n` là số âm hoặc không phải số nguyên, hàm sẽ trả về `NaN`.
Ví dụ:
```javascript   
pow(2, 3); // Trả về 8
pow(5, 0); // Trả về 1
pow(3, 4); // Trả về 81
// mũ 3 (tạo theo bảng)
pow(1, 3); // Trả về 1
pow(2, 3); // Trả về 8
pow(3, 3); // Trả về 27
pow(4, 3); // Trả về 64
pow(5, 3); // Trả về 125
// biên n không hợp lệ
pow(2, -1); // Trả về NaN
pow(2, 1.5); // Trả về NaN
pow(0, 0); // Trả về 1 (theo quy ước)
```
# LƯU Ý
Đảm bảo rằng bạn đã cài đặt Node.js và npm trên máy tính của mình để
có thể chạy dự án này.  
# TÀI LIỆU THAM KHẢO
- [Mocha Documentation](https://mochajs.org/)
- [Chai Documentation](https://www.chaijs.com/) 
# 
# CẤU TRÚC VÀ NỘI DUNG TẬP TIN
- `src/math.js`: Chứa định nghĩa của hàm `pow(x, n).
- `test/math.test.js`: Chứa các bài kiểm thử sử dụng Mocha và Chai để kiểm tra tính đúng đắn của hàm `pow(x, n)`.
- `package.json`: Quản lý các phụ thuộc và tập lệnh chạy kiểm thử.      

Kết quả cuối cùng
```
/**
 * file : math.js
 * Trả về x mũ n
 * @param {*} x  số cơ sở
 * @param {*} n  số mũ
 * @returns {number} x mũ n
 */
// v5 – code “tự mô tả” hơn một chút
export function pow(x, n) {
  if (!isValidExponent(n)) return NaN;
  if (n === 0) return 1;

  let result = 1;
  for (let i = 0; i < n; i++) result *= x;
  return result;
}
const isValidExponent = (n) => Number.isInteger(n) && n >= 0;
```

```
/** file : math.test.js
 * Tự động kiểm tra hàm pow(x, n) trong math.js
 * 1. Cài đặt Mocha và Chai
 * 2. Viết Unit Test cho hàm pow(x, n)
 */

// v4 
import { expect } from "chai";
import { pow } from "../src/math.js";

describe("pow()", () => {
    it("2^3 = 8", () => {
        expect(pow(2, 3)).to.equal(8);
    });

    it("5^0 = 1", () => {
        expect(pow(5, 0)).to.equal(1);
    });

    it("3^4 = 81", () => {
        expect(pow(3, 4)).to.equal(81);
    });

    describe("mũ 3 (tạo theo bảng)", () => {
        const cases = [1, 2, 3, 4, 5];
        for (const x of cases) {
            it(`${x}^3 = ${x * x * x}`, () => {
                expect(pow(x, 3)).to.equal(x * x * x);
            });
        }
    });

    it("n âm -> NaN", () => {
        expect(Number.isNaN(pow(2, -1))).to.be.true;
    });

    it("n không phải số nguyên -> NaN", () => {
        expect(Number.isNaN(pow(2, 1.5))).to.be.true;
    });

    it(" 0^0 = 1 ( quy ước trong code)", () => {
        expect(pow(0, 0)).to.equal(1);
    });
});
```