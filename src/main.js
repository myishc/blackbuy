

//导入需要的模块/组件
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//设置路由地址
const routes=[

]

//实例路由对象
const router = {
  routes
}

//挂载路由
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
