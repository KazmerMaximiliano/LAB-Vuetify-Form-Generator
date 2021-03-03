import Vue from 'vue'

import formStore from './formStore'
Vue.prototype.$formGenerator = formStore;

import FormGenerator from './FormGenerator.vue';
Vue.component('form-generator', FormGenerator);