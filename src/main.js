import Vue from 'vue'
import router from './router.js'
import App from './App.vue'
import './assets/style.css'
import store from './store'
import 'babel-core/register'
import 'babel-polyfill'

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
