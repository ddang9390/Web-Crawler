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

function crawlPage(url){
    fetch(url).then(resp =>{
        if (resp.status >= 400){
            console.log("Could not access page");
            return;
        }
        if (resp.headers.get("content-type").split(";")[0] != "text/html"){
           console.log("Could not read contents");
           return;
        }
        return resp.body;
    }).then((rb) => {
        const reader = rb.getReader();

        return new ReadableStream({
        start(controller) {
            // The following function handles each data chunk
            function push() {
            // "done" is a Boolean and value a "Uint8Array"
            reader.read().then(({ done, value }) => {
                // If there is no more data to read
                if (done) {
                console.log("done", done);
                controller.close();
                return;
                }
                // Get the data and send it to the browser via the controller
                controller.enqueue(value);
                // Check chunks by logging to the console
                console.log(done, value);
                push();
            });
            }

            push();
        },
        });
    })
    .then((stream) =>
        // Respond with our stream
        new Response(stream, { headers: { "Content-Type": "text/html" } }).text(),
    )
    .then((result) => {
        // Do things with result
        console.log(result);
    });

}
