/**
 * Created by Eric on 9/6/2018.
 */
import "babel-polyfill";
import assert from "assert";
import fetch from "node-fetch";
import renderer from "react-test-renderer";
import React from "react";
describe('Array', () => {
    describe('#indexOf()', () => {
        it('should return -1 when the value is not present', () => {
            assert.equal([1,2,3].indexOf(4), -1);
        });
    });
});
// jest test, with npm run jest
let url;
describe("fetch resources", () => {
    beforeAll(() => {
        url = "https://jsonmock.hackerrank.com/api/movies/search/?Title=spiderman";
    });
    test("should fetch resource", async() => {
        const result = await fetch(url).then(res => res.json());
        expect(result.page).toBeGreaterThan(0);
    });
    test("fetch many resources", async() => {
        const requests = [];
        for(let i = 0; i < 10; i ++) requests.push(fetch(url).then(res => res.json()));
        const results = await Promise.all(requests);
        expect(results.every(_ => _.total > 0)).toBe(true);
    });
});
const MyComp = props => {
    return (<div>
        {props.content}
    </div>);
};
describe("quick snapShot for react component", () => {
    const myComp = renderer.create(
        <MyComp content={"hello"}/>
    );
    expect(myComp.toJSON()).toMatchSnapshot();
});
