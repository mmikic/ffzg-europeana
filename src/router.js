import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'

import SearchAll from '@/views/SearchAPI/SearchAll'
import SearchFind from '@/views/SearchAPI/SearchFind'

import ResultAll from '@/views/ResultAPI/ResultAll'
import ResultFind from '@/views/ResultAPI/ResultFind'

import EntityAll from '@/views/EntityAPI/EntityAll'
import EntityFind from '@/views/EntityAPI/EntityFind'

import AnnotationAll from '@/views/AnnotationAPI/AnnotationAll'
import AnnotationFind from '@/views/AnnotationAPI/AnnotationFind'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/search-api',
      name: 'searchAll',
      component: SearchAll
    },
    {
      path: '/search-api/f/:id?',
      name: 'searchFind',
      component: SearchFind
    },
    {
      path: '/result-api',
      name: 'resultAll',
      component: ResultAll
    },
    {
      path: '/result-api/f/:id?',
      name: 'resultFind',
      component: ResultFind
    },
    {
      path: '/annotation-api',
      name: 'annotationAll',
      component: AnnotationAll
    },
    {
      path: '/annotation-api/f/:id?',
      name: 'annotationFind',
      component: AnnotationFind
    },
    {
      path: '/entity-api',
      name: 'entityAll',
      component: EntityAll
    },
    {
      path: '/entity-api/f/:id?',
      name: 'entityFind',
      component: EntityFind
    }
  ]
})
