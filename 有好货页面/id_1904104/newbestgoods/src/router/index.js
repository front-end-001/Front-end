import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Recommend from '@/components/recommend'
import Fun from '@/components/fun'
import NewStore from '@/components/newstore'
import Found from '@/components/found'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend
    },
    {
      path: '/fun',
      name: 'fun',
      component: Fun
    },
    {
      path: '/newstore',
      name: 'newstore',
      component: NewStore
    },
    {
      path: '/found',
      name: 'found',
      component: Found
    }
  ]
})
