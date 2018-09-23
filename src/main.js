import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import VueTruncate from 'vue-truncate-filter'
import locale from 'element-ui/lib/locale/lang/en'

import 'element-ui/lib/theme-chalk/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style.scss'

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })
Vue.use(VueTruncate)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
