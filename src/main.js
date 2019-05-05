

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
import vipCenter from './components/vipCenter.vue'
import userCenter from './components/userCenter.vue'
import dealOrder from './components/dealOrder.vue'
import orderDetail from './components/orderDetail.vue'
//导入vue-router
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//设置路由地址
const routes=[
  {path: '/', redirect: '/index'},
  {path: '/index', component: index},
  {path: '/details/:id', component: details},
  {path: '/vipCenter', component: vipCenter,
  //嵌套路由
    children: [
      {path: '', redirect: 'userCenter'},
      {path: 'userCenter', component: userCenter},
      {path: 'dealOrder', component: dealOrder},
      {path: 'orderDetail', component: orderDetail}
    ]
  },
]

//实例路由对象
const router = new VueRouter({
  routes
}) 
//抽取通用模块到vue原型
import axios from 'axios'
Vue.prototype.$axios = axios
//设置基地址
axios.defaults.baseURL  = 'http://111.230.232.110:8899'
//定义全局过滤器
import moment from "moment"
Vue.filter('formatTime', value=>{
    return moment(value).format('YYYY年MM月DD日')
})
//挂载路由
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
