import { ipcRenderer } from 'electron'
import { createApp } from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import ElectronLog from 'electron-log'
import { GetElectronProcessType } from 'electron-process-type';
import { ExWorker } from "@/utils/exWorker";


Object.assign(console, (window as any).log);
window.log.info("Funziona!")

/*
process.on('unhandledRejection', (error) => {
  window.log.error(error)
})
*/

createApp(App).use(i18n)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')

// ********************* Functional Tests ******************************* 


// Example #1. Worker
const piWorker = new ExWorker(new Worker('@/example/pi.worklet.ts', { type: 'module' }));
piWorker.onmessage = event => {
  if (event.data.id !== 'Log')
    window.log.info('pi: ', event.data,window.log);
};
piWorker.postMessage(42);

// Exemple #2. Console Log override
console.log("Test Console Log!",GetElectronProcessType());