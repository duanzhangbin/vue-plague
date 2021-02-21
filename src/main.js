import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import request from './utils/request'
import store from './store'
import VueAMap from 'vue-amap'

Vue.config.productionTip = false

//挂在全局
Vue.prototype.$http = request;

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '74d381663a95e7f964efc5b75a8e35a0',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation', 'AMap.Geocoder'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})

new Vue({
  router,
  store,

  render: h => h(App),
}).$mount('#app')
