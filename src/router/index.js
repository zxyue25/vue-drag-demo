import Vue from 'vue'
import Router from 'vue-router'
import Clone from '@/pages/clone'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Clone',
      component: Clone
    }
  ]
})
