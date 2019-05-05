

//导入vue的模块
import Vue from 'vue'
//导入头部底部公共样式
import './assets/statics/site/css/style.css'
Vue.config.productionTip = false

//导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//导入组件
import App from './App.vue'
import index from './components/index.vue'
import details from './components/details.vue'
//导入vue-router
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//设置路由地址
const routes=[
  {path: '/', redirect: '/index'},
  {path: '/index', component: index},
  {path: '/details/:id', component: details}
]

//实例路由对象
const router = new VueRouter({
  routes
}) 
//抽取通用模块到vue原型
import axios from 'axios'
import moment from "moment";
Vue.prototype.$axios = axios
Vue.prototype.$moment = moment
//设置基地址
axios.defaults.baseURL  = 'http://111.230.232.110:8899'

//挂载路由
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
