import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import VueSplit from 'vue-split-panel';
Vue.use(VueSplit);

import './components/FormGenerator/FormGenerator';

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
