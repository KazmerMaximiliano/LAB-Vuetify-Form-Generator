import Vue from 'vue';
import Vuetify from 'vuetify';
import es from 'vuetify/lib/locale/es';

import '@babel/polyfill'
import 'vuetify/dist/vuetify.min.css';
import '@fortawesome/fontawesome-free/css/all.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#2196F3',
        secondary: '#9C27B0',
        accent: '#03A9F4',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
    lang: {
      locales: { es },
      current: 'es',
    },
  icons: {
    iconfont: 'fa',
  },
});
