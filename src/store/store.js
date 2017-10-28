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


window.myAjax = function(option) {
	let domainName = 'http://baby.quwin.cn/';
	// return;

	if(!sessionStorage.token || sessionStorage.token === null || sessionStorage.token === '') {
		getToken()
		.then(() => {
			send();
		})
		.catch((err) => {
			console.log(err);
		});	;
	}else {
		send();
	}

	function send() {
		$.ajax({
			url: domainName + option.url,
			type: option.type || 'GET',
			data: option.data,
			dataType: option.dataType,
			contentType: option.contentType,
			processData: option.processData,
			cache: option.cache,
			success: function(result, status, xhr) {

				option.success(result, status, xhr);  	
			},
			beforeSend: function(xhr) {
				if(option.beforeSend) {
					option.beforeSend(xhr);
				}
			},
			complete : function(xhr){

				if(option.complete) {
					option.complete(xhr);
				}
			},
			error: function() {

			}
		});
	}
};


function getToken() {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: 'http://baby.quwin.cn/api/user',
			type: 'GET',
			success: function(result, status, xhr) {
				sessionStorage.token = result.token;
				resolve();
			},
			error: function() {

			}
		});
	});
}