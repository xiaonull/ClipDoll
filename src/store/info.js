export default {
	state: {
		userGold: 0,
		wawaJiGold: 0,
		luckyValue: 0,
		startGame: false,
		wawa_position: {
			left: 0,
			bottom: 0,
			zIndex: 0
		},
		wawa_id: 0,
		bgm: true,
		has_receiveTask: false
	},

	mutations: {
		setUserGold(state, value) {
			state.userGold = value;
		},
		setWawaJiGold(state, value) {
			state.wawaJiGold = value;
		},
		setLuckyValue(state, value) {
			state.luckyValue = value;
		},
		setStartGame(state, value) {
			state.startGame = value;
		},
		setWawa_position(state, data) {
			state.wawa_position.left = data.left;
			state.wawa_position.bottom = data.bottom;
			state.wawa_position.zIndex = data.zIndex;
			// console.log(data)
		},
		setWawa_id(state, data) {
			state.wawa_id = data.id;
		},
		setBgm(state, value) {
			state.bgm = value;
		},
		setHasReceiveTask(state, value) {
			state.has_receiveTask = value;
		}
	},

	actions: {
		
	}
}