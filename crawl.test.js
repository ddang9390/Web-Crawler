import {test, expect} from "@jest/globals"

import { normalizeURL } from "./crawl"




let res1 = normalizeURL("https://blog.boot.dev/path/");
let res2 = normalizeURL("https://blog.boot.dev/path");
let res3 = normalizeURL("http://blog.boot.dev/path/");
let res4 = normalizeURL("http://blog.boot.dev/path");

let ans = "blog.boot.dev/path"

test('Testing normalize https:// url with /', () => {
    expect(res1).toBe(ans)
});

test('Testing normalize https:// url', () => {
    expect(res2).toBe(ans)
});

test('Testing normalize http:// url with /', () => {
    expect(res3).toBe(ans)
});

test('Testing normalize http:// url', () => {
    expect(res4).toBe(ans)
});
