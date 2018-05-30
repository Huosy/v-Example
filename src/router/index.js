import Vue from 'vue'
import Router from 'vue-router'
import { Picker } from 'mint-ui'
import Takephotos from '@/components/takephotos'

Vue.use(Router)
Vue.component(Picker.name, Picker)

export default new Router({
  routes: [
		{
      path: '/',
      name: 'Takephotos',
      component: Takephotos
    }
  ]
})