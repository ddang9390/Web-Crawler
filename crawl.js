export { normalizeURL };

function normalizeURL(url){
    const myURL = new URL(url); 
    let path = myURL.host + myURL.pathname

    if(path.slice(-1) == "/"){
        path = path.slice(0, path.length-1);
    }
    return path;
}