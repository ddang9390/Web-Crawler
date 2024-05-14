import {JSDOM} from 'jsdom';

export { normalizeURL, getURLsFromHTML };

function normalizeURL(url){
    const myURL = new URL(url); 
    let path = myURL.host + myURL.pathname

    if(path.slice(-1) == "/"){
        path = path.slice(0, path.length-1);
    }
    return path;
}

function getURLsFromHTML(htmlBody, baseURL){
    const dom = new JSDOM(htmlBody);

    let anchors = dom.window.document.querySelectorAll('a');
    let URLs = [];
    
    anchors.forEach(a => {
        URLs.push(new URL(a.getAttribute('href'), baseURL).href)
    });

    return URLs;
}