import Vue from 'vue'
import Router from 'vue-router'

import SearchAll from '@/views/SearchAPI/SearchAll'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'searchAll',
      component: SearchAll
    },
    {
      path: '/search-api/',
      name: 'searchAll',
      component: SearchAll
    }
  ]
})
