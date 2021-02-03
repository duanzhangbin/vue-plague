import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import request from './utils/request'
import store from './store'

Vue.config.productionTip = false

//挂在全局
Vue.prototype.$http = request;

new Vue({
  router,
  store,

  render: h => h(App),
}).$mount('#app')
