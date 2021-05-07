import { ipcRenderer } from 'electron'
import { createApp } from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import path from 'path'


console.log((window as any));
Object.assign(console, (window as any).log);
//log.transports.file.resolvePath = () => path.join(remote.app.getPath('userData'), 'logs/main.log');
//console.log(remote.app)
window.log.info("Funziona!")


createApp(App).use(i18n)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')


// Functional Tests


// Example #1. Worker
const piWorker = new Worker('./example/worker.ts', { type: 'module' });
piWorker.onmessage = event => {
   window.log.info('pi: ', event.data);
};
piWorker.postMessage(42);

// Exemple #2. Console Log override
console.log("Test Console Log!");