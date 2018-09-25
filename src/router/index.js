import Vue from 'vue'
import Router from 'vue-router'
import Root from '@/components/vc_Root'
import convert from '@/components/videoConverter/convert'
import converted from '@/components/videoConverter/converted'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      component: Root
    },
    {
      path: '/convert',
      name: 'convert',
      component: convert
    },
    {
      path: '/converted',
      name: 'converted',
      component: converted
    }
  ]
})
