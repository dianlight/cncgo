const ctx: Worker = self as any;

addEventListener('message', event => {
    console.log(event);
    ctx.postMessage("3.1421");
});