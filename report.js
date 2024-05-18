export {printReport}

function printReport(pages){
    console.log("Starting report");

    let sortedPages = Object.entries(pages).sort(function(a, b){
        return b[1] - a[1];
    });
    
    sortedPages.forEach(page => {
        if(page[1] > 1){
            console.log(`Found ${page[1]} internal links to ${page[0]}`);
        }
        else{
            console.log(`Found ${page[1]} internal link to ${page[0]}`);
        }
    })

    
}