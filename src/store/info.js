export default {
	state: {
		userGold: 0,
		wawaJiGold: 0,
		luckyValue: 0
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
		}
	},

	actions: {
		
	}
}