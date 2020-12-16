import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/styles.css'
import Toasted from 'vue-toasted'

Vue.config.productionTip = false

Vue.use(Toasted, {
  duration: 4 * 1000,
  position: 'bottom-right'
})

let apiUrl = 'http://192.168.0.180:8000/'
if (process.env.NODE_ENV == 'production') {
  apiUrl = 'https://?/'
}

Vue.prototype.$staticUrl = apiUrl + 'media/'
Vue.prototype.$apiUrl = apiUrl + 'api/'

Vue.prototype.$http = axios.create({
  //  withCredentials: true,
  baseURL: Vue.prototype.$apiUrl
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
