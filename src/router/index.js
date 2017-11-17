import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Entry from '@/components/Entry'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/index',
		component: Index
	}, {
		path: '/login',
		component: Login
	}, {
		path: '/entry',
		component: Entry
	}]
})
