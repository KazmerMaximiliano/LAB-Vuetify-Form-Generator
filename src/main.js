import Vue from 'vue'
import App from './App.vue'

import FormGenerator from './components/FormGenerator';
import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'
Vue.component('form-generator', FormGenerator);

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
