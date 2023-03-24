// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
Vue.use(ElementUI, { locale })

import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
Vue.prototype.$http = axios
// 引入公共JS
import "@/assets/iconfont/iconfont.css";
import '../static/css/ckeditor.css';
import '../static/css/index.css';
Vue.config.productionTip = false

import Empty from '@/components/Empty/empty.vue'


Vue.component("Empty", Empty);//全局自定义组件
import xss from 'xss'
// 定义全局XSS解决方法
Object.defineProperty(Vue.prototype, '$xss', {
  value: xss
})

// 引入全局工具类
import prototype from './utils/prototype'
Vue.use(prototype)

Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})
import { MessageBox,Message } from 'element-ui';

Vue.prototype.$message = function (msg) {
  Message(msg)
}
Vue.prototype.$message = function(msg){
  return Message({
    message:msg,
    duration:2500
  })

}
Vue.prototype.$message.success = function (msg) {
  return Message.success({
    message: msg,
    duration: 2500
  })
}
Vue.prototype.$message.warning = function (msg) {
  return Message.warning({
    message: msg,
    duration: 2500
  })
}
// import { Loading, Message } from "element-ui";
// Vue.use(Loading)
// Vue.use(Message)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  //需要将store和vue实例进行关联，这里将其传递进去
  store,
  components: { App },
  template: '<App/>'
})
