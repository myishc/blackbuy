

//导入需要的模块
import Vue from 'vue'
import VueRouter from 'vue-router'
//导入头部底部公共样式
import './assets/statics/site/css/style.css'
//导入组件
import App from './App.vue'
import index from './components/index.vue'


Vue.config.productionTip = false
Vue.use(VueRouter)

//设置路由地址
const routes=[
  {path: '/index', component: index}
]

//实例路由对象
const router = new VueRouter({
  routes
}) 

//挂载路由
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
