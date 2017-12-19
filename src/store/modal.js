let interval;

export default {
	state: {
		Msg: {
			msg: '11',
			display: false
		},
		showColorfulMsg: false,
		showTips: false,
		showSelectWawaJi: false,
		showBackpack: false,
		showReceiptInfo: false,
		showExtractWaWa: false,
		receiptWaWas: [],
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
		setColorfulMsg(state, val) {
			state.showColorfulMsg = val;		
		},
		setTips(state, val) {
			state.showTips = val;		
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
		setExtractWaWa(state, val) {
			state.showExtractWaWa = val;
		},
		setReceiptInfo(state, data) {
			state.showReceiptInfo = data.showReceiptInfo;
		},
		setReceiptWaWas(state, data) {
			for(let i = 0, l = state.receiptWaWas.length; i < l; i++) {
				if(data.rucksack === state.receiptWaWas[i].rucksack_id && data.goods_id === state.receiptWaWas[i].goods_id) {
					if(data.type === 'add') {
						if(state.receiptWaWas[i].num >= state.receiptWaWas[i].total) {
							return;
						}

						state.receiptWaWas[i].num ++;
					}else {
						state.receiptWaWas[i].num --;
						if(state.receiptWaWas[i].num === 0) {
							state.receiptWaWas.splice(i, 1);
						}
					}
					// console.log(state.receiptWaWas);
					return;
				}
			}

			state.receiptWaWas.push({
				rucksack_id: data.rucksack,
				goods_id: data.goods_id,
				name: data.name,
				num: 1,
				total: data.total
			});

			// console.log(state.receiptWaWas);
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
			if(data.bubble_luckValue === 0 || data.bubble_luckValue) {
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