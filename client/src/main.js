import Vue from 'vue'

import App from './App.vue'
import router from './router'

import './config/sweetalert2'
import './config/toastification'
import './config/vueLoading'
import './config/vueselect'

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
