import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import router from './router';
import '@mdi/font/css/materialdesignicons.css'

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const pinia = createPinia();

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  }
});

createApp(App)
  .use(pinia)
  .use(router)
  .use(vuetify) 
  .mount('#app');