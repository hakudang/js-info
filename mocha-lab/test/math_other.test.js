/** file : math_other.test.js 
 *  1. Tự động kiểm tra hàm showPrimes(n) trong math_other.js
 */

//1. Tự động kiểm tra hàm showPrimes(n) trong math_other.js

/*
import { expect } from "chai";
import { showPrimes } from "../src/math_other.js";

describe("showPrimes()", () => {
    // v0 – ban đầu
    it("số nguyên tố nhỏ hơn 10", () => {
        expect(showPrimes(10)).to.deep.equal([2, 3, 5, 7]);
    });
    it("số nguyên tố nhỏ hơn 20", () => {
        expect(showPrimes(20)).to.deep.equal([2, 3, 5, 7, 11, 13, 17, 19]);
    });

    // v1 – thêm case
    it("n nhỏ hơn 2", () => {
        expect(showPrimes(2)).to.deep.equal([]);
    });

    it("n là số âm", () => {
        expect(showPrimes(-5)).to.deep.equal([]);
    });
});

*/

import { expect } from "chai";
import { getMaxSubSum } from "../src/math_other.js";
describe("getMaxSubSum()", () => {
    // v0 - ban đầu
    it("[-1, 2, 3, -9]->5", () => {
        expect(getMaxSubSum([-1, 2, 3, -9])).to.deep.equal(5);
    }
    );
    it("[2, -1, 2, 3, -9]->6", () => {
        expect(getMaxSubSum([2, -1, 2, 3, -9])).to.deep.equal(6);
    }
    );
        it("[1, 2, 3]->6", () => {
        expect(getMaxSubSum([1, 2, 3])).to.deep.equal(6);
    }
    );
});