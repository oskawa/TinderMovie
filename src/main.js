import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import vueRouter from 'vue-router'
import Routes from './routes'

Vue.config.productionTip = false

Vue.use(vueRouter)

const router = new vueRouter({
  routes: Routes 
})


new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app')
