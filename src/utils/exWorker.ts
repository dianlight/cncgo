
//import { LogFunctions } from "electron-log"
//import { GetElectronProcessType } from 'electron-process-type';

//import { transports } from "electron-log";
import path from "path"

export class ExWorker implements Worker {
    constructor(private _worker: Worker) {
        try {
            this._worker.addEventListener('message', event => {
                if (event.data.id === 'Log') {
                    (window.log as any).run(event.data.type, event.data.process, ...JSON.parse(event.data.data));
                }
            });
            this.proxyValue('onmessage');
            this.proxyValue('onmessageerror');
            this.proxyValue('onerror');
        } catch (error){
            console.error(error);
        }
    }

    private proxyValue(key: string): any {
        Reflect.defineProperty(this, key, {
            set(value) {
                console.log("Target is:", this);
                (this as any)._worker[key] = value;
            },
            get() {
                return (this as any)._worker[key];
            }
        })
    }

    getWorker(): Worker {
        return this._worker as Worker;
    }
    
    onmessage: ((this: Worker, ev: MessageEvent<any>) => any) | null = null;

    onmessageerror: ((this: Worker, ev: MessageEvent<any>) => any) | null = null;

    onerror: ((this: AbstractWorker, ev: ErrorEvent) => any) | null = null;

    postMessage(message: any, transfer: Transferable[]): void;
    postMessage(message: any, options?: PostMessageOptions): void;
    postMessage(message: any, options?: any) {
        this._worker?.postMessage(message,options)
    }

    terminate(): void {
        this._worker?.terminate()
    }

    addEventListener<K extends keyof WorkerEventMap>(type: K, listener: (this: Worker, ev: WorkerEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: any, listener: any, options?: any) {
        this._worker?.addEventListener(type, listener, options);
    }
    removeEventListener<K extends keyof WorkerEventMap>(type: K, listener: (this: Worker, ev: WorkerEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: any, listener: any, options?: any) {
        this._worker?.removeEventListener(type, listener, options);
    }
    dispatchEvent(event: Event): boolean {
        return this._worker?.dispatchEvent(event) || false;
    }
}
