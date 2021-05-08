
import { LogFunctions } from "electron-log"
import { GetElectronProcessType } from 'electron-process-type';

const _worker: Worker = self as any;

//if (GetElectronProcessType() === 'worker') {   
    Object.assign(console, {
        run(type: string, ...params: Transferable[]): void {
            let cache: any[] = [];
            _worker.postMessage({
                id: "Log", type, process: GetElectronProcessType(), data: JSON.stringify(params, (key, value) => {
                    if (typeof value === 'object' && value !== null) {
                        // Duplicate reference found, discard key
                        if (cache.includes(value)) return;
          
                        // Store value in our collection
                        cache.push(value);
                    }
                    return value;
                })
            });
            cache = []; // Enable garbage collection
        },
        log(...params: Transferable[]): void {
            (this as any).run("log", ...params);
        },
        debug(...params: Transferable[]): void {
            (this as any).run("debug", ...params);
        },
        info(...params: Transferable[]): void {
            (this as any).run("info", ...params);
        },
        warn(...params: Transferable[]): void {
            (this as any).run("warn", ...params);
        },
        error(...params: Transferable[]): void {
            (this as any).run("error", ...params);
        },
        silly(...params: Transferable[]): void {
            (this as any).run("silly", ...params);
        },
        verbose(...params: Transferable[]): void {
            (this as any).run("verbose", ...params);
        }
    } as LogFunctions);
//}

export default _worker