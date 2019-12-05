// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import modal from '@/modal/Modal'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//自己写的样式
import './style/theme.css'
import './style/character.css'

//引入两个文件
import url from './api/requestUrl'
import http from './api/axios'

//挂载到VUE实例，以便全局使用
Vue.prototype.$url = url;
Vue.prototype.$http = http;


Vue.use(modal)
Vue.use(Antd)
// 注册element-ui
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  modal,
  echarts,
  components: { App },
  template: '<App/>',

})
