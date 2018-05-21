import Vue from 'vue'
import Router from 'vue-router'
import Takephotos from '@/components/takephotos'

Vue.use(Router)

export default new Router({
  routes: [
		{
      path: '/',
      name: 'Takephotos',
      component: Takephotos
    }
  ]
})