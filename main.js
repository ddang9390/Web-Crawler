import { crawlPage } from "./crawl.js";
import { printReport } from "./report.js";

async function main(){
    const args = process.argv.slice(2);

    if (args.length < 1 || args.length > 2){
        console.log("Please include one or two arguments");
    }
    else{
        const pages = await crawlPage(args[0], args[1])
        printReport(pages);
    }
}

main();