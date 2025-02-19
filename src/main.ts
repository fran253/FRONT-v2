import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import router from './router';
import '@mdi/font/css/materialdesignicons.css'

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives
});

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
  },
})

createApp(App)
  .use(router)
  .use(vuetify) 
  .mount('#app');
