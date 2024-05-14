import {test, expect} from "@jest/globals"

import { normalizeURL, getURLsFromHTML } from "./crawl"


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


let htmlres1 = getURLsFromHTML('<html><body><a href="/path"><span>Go to Boot.dev</span></a><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a><a href="https://other.com"><span>Go to Boot.dev</span></a></body></html>', "https://blog.boot.dev")

test('Testing getting urls from html', () => {
    expect(htmlres1).toStrictEqual(["https://blog.boot.dev/path", "https://blog.boot.dev/", "https://other.com/"])
});
