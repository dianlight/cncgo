import { createApp } from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'


createApp(App).use(i18n)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')


// Functional Tests


// Example #1. Worker
const piWorker = new Worker('./example/worker.ts', { type: 'module' });
//console.log(piWorker);
//const piWorker_ = new Worker(piWorker);
piWorker.onmessage = event => {
  console.log('pi: ' + event.data);
};
piWorker.postMessage(42);  