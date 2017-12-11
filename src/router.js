import VueRouter from 'vue-router'
import Vue from 'vue'

import Index from './components/Index.vue'
import Show from './components/Show.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/articles/:id',
      name: 'show',
      component: Show
    },
  ],
})
