export default {
	state: {
		Msg: {
			msg: '11',
			display: false
		},
		showBackpack: false,
		showRecharge: false,
		showTask: false,
		showPlayerShow: false,
		showPublishShow: false
	},

	mutations: {
		setMsg(state, data) {
			if(data.msg) {
				state.Msg.msg = data.msg;
			}
			if(data.display) {
				state.Msg.display = data.display
			}			
		},
		resetMsg(state) {
			state.Msg.msg = '';
			state.Msg.display = false;
		},
		setBackpack(state, data) {
			state.showBackpack = data.showBackpack;
		},
		setRecharge(state, data) {
			state.showRecharge = data.showRecharge;
		},
		setTask(state, data) {
			state.showTask = data.showTask;
		},
		setPlayerShow(state, data) {
			state.showPlayerShow = data.showPlayerShow;
		},
		setPublishShow(state, data) {
			state.showPublishShow = data.showPublishShow;
		}
	},

	actions: {
		
	}
}