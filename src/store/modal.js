let interval;

export default {
	state: {
		Msg: {
			msg: '11',
			display: false
		},
		showSelectWawaJi: false,
		showBackpack: false,
		showReceiptInfo: false,
		receiptID: {
			rucksack_id: 0,
			goods_id: 0
		},
		showRecharge: false,
		showTask: false,
		showPlayerShow: false,
		showPublishShow: false,
		showBubble: false,
		bubble_luckValue: 0,
		showGift: false,
		showCatch: false,
		countDown: {
			show: false,
			count: 20
		},
		showSetting: false,
		showNoticeBoard: false,
		showLoginReward: false,
		showHelp: false,
		showShare: false,
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
		setSelectWawaJi(state, data) {
			state.showSelectWawaJi = data.showSelectWawaJi;
		},
		setBackpack(state, data) {
			state.showBackpack = data.showBackpack;
		},
		setReceiptInfo(state, data) {
			state.showReceiptInfo = data.showReceiptInfo;
		},
		setReceiptID(state, data) {
			state.receiptID.rucksack_id = data.rucksack_id;
			state.receiptID.goods_id = data.goods_id;
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
		},
		setbubble_luckValue(state, data) {
			state.showBubble = data.showBubble;
			if(data.bubble_luckValue) {
				state.bubble_luckValue = data.bubble_luckValue;
			}
		},
		setGift(state, data) {
			state.showGift = data.showGift;
		},
		setCatch(state, data) {
			state.showCatch = data.showCatch;
		},
		setCountDown(state, data) {
			if(data.show || data.show === false) {
				state.countDown.show = data.show;
			}
			if(data.count || data.count === 0) {
				state.countDown.count = data.count;
			}
		},
		setSetting(state, data) {
			state.showSetting = data.showSetting;
		},
		setNoticeBoard(state, data) {
			state.showNoticeBoard = data.showNoticeBoard;
		},
		setLoginReward(state, data) {
			state.showLoginReward = data.showLoginReward;
		},
		setHelp(state, data) {
			state.showHelp = data.showHelp;
		},
		setShare(state, data) {
			state.showShare = data.showShare;
		}
	},

	actions: {
		startCountDown(context) {
			clearInterval(interval);
			return new Promise((resolve, reject) => {
				interval = setInterval(() => {
					if(context.state.countDown.count <= 0) {
						context.commit('setCountDown', {
							show: false,
							count: 20
						});
						clearInterval(interval);
						resolve();
					}else {
						context.commit('setCountDown', {
							count: context.state.countDown.count - 1
						});
					}
				}, 1000);
			});
		}
	}
}