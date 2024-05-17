import { crawlPage } from "./crawl.js";

function main(){
    const args = process.argv.slice(2);

    if (args.length < 1 || args.length > 1){
        console.log("Please include just one argument");
    }
    else{
        args.forEach(val => {
            crawlPage(val);

        });
    }
}

main();