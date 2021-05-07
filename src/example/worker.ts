//import log from "electron-log"

const ctx: Worker = self as any;
//Object.assign(console, log.functions);

addEventListener('message', event => {
//    log.debug(event);
    ctx.postMessage("3.1421");
});

