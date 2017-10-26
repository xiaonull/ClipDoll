import Vue from 'vue';
import Vuex from 'vuex';
import rod from './rod.js';
import modal from './modal.js';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		rod: {
			namespaced: true,
			state: rod.state,
			mutations: rod.mutations,
			actions: rod.actions
		},
		modal: {
			namespaced: true,
			state: modal.state,
			mutations: modal.mutations,
			actions: modal.actions
		}
	}
})