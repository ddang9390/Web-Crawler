import {JSDOM} from 'jsdom';

export { normalizeURL, getURLsFromHTML, crawlPage };

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

async function crawlPage(baseURL, currentURL = baseURL, pages = {}){
    let url1 = new URL(baseURL);
    let url2 = new URL(currentURL);

    if(url1.hostname != url2.hostname){
        return pages;
    }
    let curr = normalizeURL(currentURL);
    if(curr in pages){
        pages[curr]++;
        return pages;
    }
    else{
        pages[curr] = 1;
    }
    let URLs = [];

    let resp;
    try{
        resp = await fetch(currentURL);
    } catch (error){
        console.log(currentURL + " " + error);
        return;
    }
    if (resp.status >= 400){
        console.log(currentURL + " " + "Could not access page");
        return;
    }
    if (!resp.headers.get("content-type").includes("text/html")){
        console.log(currentURL + " " + "Could not read contents");
        return;
    }

    URLs = getURLsFromHTML(await resp.text(), currentURL);

    for(const url of URLs){
        await crawlPage(baseURL, url, pages);
    }

    return pages;

}
