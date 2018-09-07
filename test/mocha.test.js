/**
 * Created by Eric on 9/6/2018.
 */
const assert = require('assert');
describe('Array', () => {
    describe('#indexOf()', () => {
        it('should return -1 when the value is not present', () => {
            assert.equal([1,2,3].indexOf(4), -1);
        });
    });
});
