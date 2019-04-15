import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/iverbs-test',
      name: 'IverbsTest',

      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './components/IverbsTest.vue')
    },
    {
      path: '/sort-phrases',
      name: 'SortPhrasesPage',
      component: () => import( './components/SortTest/SortPhrasesPage.vue')
    },
    {
      path: '*',
      redirect: {name: 'home'}
    },
  ]
})