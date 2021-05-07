import { LogFunctions } from "electron-log"

interface Api {
    send (channel: string, data): void;
    receive (channel: string, func): void;
}

declare global {
    interface Window {
        log: LogFunctions
        api: Api
    }
}