import _worker from "@/utils/exWorker.worker"

addEventListener('message', _event => {
    console.error("[IN WARKER] Event:",process,_worker);
    _worker.postMessage("3.14211921");
});


