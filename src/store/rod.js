import {Phone} from '@/js/phoneAdaptation.js';
let phone = new Phone();

export default {
	state: {
		handle_length: 100,
		position: {
			left: 80,
			scale: 1
		},
		layer: {
			zIndex: 5
		},
		action: {
			grabWaWa: false
		},
		moveToLeft: 'can',
		moveToRight: 'can',
		moveToBehind: 'can',
		moveToFront: 'can',
	},

	mutations: {
		grabDown(state) {
			state.handle_length += 1;
		},
		grabWaWa(state) {
			state.action.grabWaWa = true;
		},
		release(state) {
			state.action.grabWaWa = false;
		},
		grabUp(state) {
			state.handle_length -= 1;
		},
		move_Left(state) {
			if(state.position.left >= 40) {
				state.moveToLeft = 'can';
				state.position.left -= 1;
			}else {
				state.moveToLeft = 'cannot';
			}
		},
		move_Right(state) {
			if(state.position.left <= phone.getWidth() - 85) {
				if(state.position.scale > 0.98 || state.position.left <  phone.getWidth() - 110) {
					state.moveToRight = 'can';
					state.position.left += 1;	
					// console.log(state.position.left)
				}else {
					state.moveToRight = 'cannot';
				}
			}else {
				state.moveToRight = 'cannot';
			}
		},
		move_Behind(state) {
			if(state.position.scale >= 0.965) {
				if(state.position.left < phone.getWidth() - 110 || state.position.scale > 0.98) {
					state.moveToBehind = 'can';
					state.position.scale -= 0.001;
				}else {
					state.moveToBehind = 'cannot';
				}
				// console.log(state.position.scale)
			}else {
				state.moveToBehind = 'cannot';
			}
		},
		move_Front(state) {
			if(state.position.scale <= 1.045) {
				state.moveToFront = 'can';
				state.position.scale += 0.001;
				// console.log(state.position.scale);
			}else {
				state.moveToFront = 'cannot';
			}
		},
		setLayer(state, zIndex) {
			state.layer.zIndex = zIndex;
		}
	},

	actions: {
		grabDown(context) {
			let gameBox = new GameBox();
			let h = gameBox.getHeight().slice(0, gameBox.getHeight().length - 2);
			let downL = 0;
			if(context.state.position.scale > 1 && context.state.position.scale <= 1.058) {
				downL = h - 200;
			}else {
				downL = h - 240;
			}
			if(context.state.position.scale > 1.023) {
				context.commit('setLayer', 8);
			}
			return new Promise((resolve, reject) => {
				let n = 0;
				let intervalDowm = setInterval(() => {
					context.commit('grabDown');
					n++;
					if(n >= downL) {
						clearInterval(intervalDowm);

						resolve();
					}
				}, 20);
			});
		},
		// 完全夹起娃娃（如果夹中娃娃的话）
		grabUp(context, $obj) {
			let gameBox = new GameBox();
			let h = gameBox.getHeight().slice(0, gameBox.getHeight().length - 2);
			let downL = 0;
			let wawaUp = 0;
			if(context.state.position.scale > 1 && context.state.position.scale <= 1.058) {
				downL = h - 200;
			}else {
				downL = h - 240;
			}
			return new Promise((resolve, reject) => {
				let intervalUp = setInterval(() => {
					context.commit('grabUp');
					
					if($obj) {
						wawaUp++;
						$obj.css('marginBottom', wawaUp + 'px');
					}

					downL--;
					if(downL <= 0) {
						clearInterval(intervalUp);

						resolve();
					}
				}, 20);
			});
		},
		grabUpButFail(context, option) {
			// alert('option.level: ' + option.level);
			// console.log(option.$obj)
			let gameBox = new GameBox();
			let h = gameBox.getHeight().slice(0, gameBox.getHeight().length - 2);
			let downL = 0;
			let wawaUp = 0;
			let wawaDown_ = 0;
			let wawaUpHeight = 0;
			let wawaDownHeight = 0;
			let wawaDownFlag = true;
			if(option.level === 1) {
				if(context.state.position.scale > 1 && context.state.position.scale <= 1.058) {
					downL = h - 200;
					wawaUpHeight = h - 240;
					wawaDownHeight = h - 240;
				}else {
					downL = h - 240;
					wawaUpHeight = h - 260;
					wawaDownHeight = h - 260;
				}				
			}else if(option.level === 2) {
				if(context.state.position.scale > 1 && context.state.position.scale <= 1.058) {
					downL = h - 200;
					wawaUpHeight = h - 250;
					wawaDownHeight = h - 250;
				}else {
					downL = h - 240;
					wawaUpHeight = h - 280;
					wawaDownHeight = h - 280;
				}
			}else if(option.level === 3) {
				if(context.state.position.scale > 1 && context.state.position.scale <= 1.058) {
					downL = h - 200;
					wawaUpHeight = h - 260;
					wawaDownHeight = h - 260;
				}else {
					downL = h - 240;
					wawaUpHeight = h - 300;
					wawaDownHeight = h - 300;
				}
			}

			return new Promise((resolve, reject) => {
				let intervalUp = setInterval(() => {
					context.commit('grabUp');
					
					if(option.$obj && wawaUpHeight > 0) {
						wawaDown_++;
						// console.log(wawaDown_)
						option.$obj.css('marginBottom', wawaDown_ + 'px');
					}

					downL--;
					wawaUpHeight--;
					
					if(wawaUpHeight <= 0 && wawaDownFlag) {
						// context.commit('release');
						
						//因为jq的animate与css发生冲突，所以不使用animate函数
						// option.$obj.animate({
						// 	marginTop: '0'
						// }, 2000, () => {
						// 	option.$obj.css('marginTop', '0px');
						// });
						wawaDownFlag = false;
						wawaDown(wawaDown_);
					}
					
					if(downL <= 0) {
						clearInterval(intervalUp);

						resolve();
					}
				}, 20);
			});

			function wawaDown(wawaDown_) {
				let i = setInterval(() => {
					if(wawaDown_ > 0) {
						wawaDown_--;
						option.$obj.css('marginBottom', wawaDown_ + 'px');
					}else {
						clearInterval(i);
					}
				}, 20);
			}

		}
	}
}