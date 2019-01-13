const chai = require("chai");
const expect = chai.expect;
describe("Mocha Test", () => {
    let syncFnError, asyncFnError;
    before(() => {
        syncFnError = new Error("syncFn failed");
        asyncFnError = new Error("asyncFn failed");
        // runs before all tests in this block
    });

    after(() => {
        // runs after all tests in this block
    });

    beforeEach(() => {
        // runs before each test in this block
    });

    afterEach(() => {
        // runs after each test in this block
    });

    it("should calculate the correct answer", () => {
        expect(1 + 1).to.equal(2);
    });

    const syncFn = () => {
        throw new Error();
    };

    const asyncFn = async() => {
        throw asyncFnError;
    };

    it("should throw error in sync fn", () => {
        expect(syncFn).to.throw();
    });

    it("should throw error in async fn", async() => {
        return new Promise(async(resolve, reject) => {
            try {
                await asyncFn();
                resolve();
            } catch (e){
                reject(e);
            }
        }).catch(e => expect(e).to.equal(asyncFnError));
    });
});
