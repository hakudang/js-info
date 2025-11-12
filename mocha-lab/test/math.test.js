/** file : math.test.js
 * Tự động kiểm tra hàm pow(x, n) trong math.js
 * 1. Cài đặt Mocha và Chai
 * 2. Viết test cases
 */

/* 
// v1
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
*/

/* 
// v2 – thêm case
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
*/

/* 
// v3 – table-driven cho mũ 3
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
*/

/*
// v4 – biên n không hợp lệ
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
*/