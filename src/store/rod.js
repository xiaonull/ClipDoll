import {Phone} from '@/js/phoneAdaptation.js';
let phone = new Phone();

export default {
	state: {
		handle_length: 100,
		handle_downLength: 0,
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
		// 夹子夹紧后的位置，用来判断夹子合拢的角度
		rod_paw_EndPosition: {
			left: 0,
			right: 0
		}
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
		setHandle_downLength(state, val) {
			state.handle_downLength = val;
		},
		setRod_paw_EndPosition(state, data) {
			state.rod_paw_EndPosition = data;
		},
		grabUp(state) {
			if(state.handle_length > 100) {
				state.handle_length -= 1;
			}
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
			if(state.position.scale >= 0.945) {
				if(state.position.left < phone.getWidth() - 120 || state.position.scale > 0.96) {
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
		},
	},

	actions: {
		grabDown(context) {
			let gameBox = new GameBox();
			let h = gameBox.getHeight().slice(0, gameBox.getHeight().length - 2);


			let downL = 0;
			// if(context.state.position.scale > 1 && context.state.position.scale <= 1.058) {
			// 	downL = h - 225;
			// 	if(h > 400) {
			// 		downL = h - 230;
			// 	}
			// 	if(h > 420) {
			// 		downL = h - 235;
			// 	}
			// 	if(h > 440) {
			// 		downL = h - 240;
			// 	}
			// 	if(h > 450) {
			// 		downL = h - 245;
			// 	}
			// }else {
			// 	downL = h - 275;
			// 	if(h > 400) {
			// 		downL = h - 280;
			// 	}
			// 	if(h > 420) {
			// 		downL = h - 285;
			// 	}
			// 	if(h > 440) {
			// 		downL = h - 290;
			// 	}
			// 	if(h > 450) {
			// 		downL = h - 295;
			// 	}
			// }

			if(context.state.position.scale > 1.023) {
				context.commit('setLayer', 8);
			}

			downL = context.state.handle_downLength;


			return new Promise((resolve, reject) => {
				let n = 0;
				let intervalDowm = setInterval(() => {
					context.commit('grabDown');
					n++;
					if(n >= downL) {
						clearInterval(intervalDowm);

						resolve();
					}
				}, 10);
			});
		},
		// 完全夹起娃娃（如果夹中娃娃的话）
		grabUp(context, $obj) {
			let gameBox = new GameBox();
			let h = gameBox.getHeight().slice(0, gameBox.getHeight().length - 2);
			let downL = 0;
			let wawaUp = 0;
			// if(context.state.position.scale > 1 && context.state.position.scale <= 1.058) {
			// 	downL = h - 225;
			// 	if(h > 400) {
			// 		downL = h - 230;
			// 	}
			// 	if(h > 420) {
			// 		downL = h - 235;
			// 	}
			// 	if(h > 440) {
			// 		downL = h - 240;
			// 	}
			// 	if(h > 450) {
			// 		downL = h - 245;
			// 	}
			// }else {
			// 	downL = h - 275;
			// 	if(h > 400) {
			// 		downL = h - 280;
			// 	}
			// 	if(h > 420) {
			// 		downL = h - 285;
			// 	}
			// 	if(h > 440) {
			// 		downL = h - 290;
			// 	}
			// 	if(h > 450) {
			// 		downL = h - 295;
			// 	}
			// }

			downL = context.state.handle_downLength;
			
			return new Promise((resolve, reject) => {
				let intervalUp = setInterval(() => {
					context.commit('grabUp');
					
					if($obj) {
						wawaUp++;
						$obj.css('marginBottom', wawaUp + 'px');

						shake($obj);
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
			// console.log($current_wawa)
			// console.log(option.$obj)
			if($current_wawa === null) {
				angle = 0;
			}else if($current_wawa[0] != option.$obj[0]) {
				angle = 0;
			}

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
					wawaUpHeight = h - 250;
					wawaDownHeight = h - 250;
				}else {
					downL = h - 240;
					wawaUpHeight = h - 270;
					wawaDownHeight = h - 270;
				}				
			}else if(option.level === 2) {
				if(context.state.position.scale > 1 && context.state.position.scale <= 1.058) {
					downL = h - 200;
					wawaUpHeight = h - 260;
					wawaDownHeight = h - 260;
				}else {
					downL = h - 240;
					wawaUpHeight = h - 290;
					wawaDownHeight = h - 290;
				}
			}else if(option.level === 3) {
				if(context.state.position.scale > 1 && context.state.position.scale <= 1.058) {
					downL = h - 200;
					wawaUpHeight = h - 270;
					wawaDownHeight = h - 270;
				}else {
					downL = h - 240;
					wawaUpHeight = h - 310;
					wawaDownHeight = h - 310;
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

					// 摇晃动画
					if(option.$obj) {
						shake(option.$obj, option.$rod_lid, option.$rod_paws);
					}
					
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
						
						option.$obj.css('transform', 'rotate(' + 0 + 'deg)');

						resolve();
					}
				}, 20);
			});

			function wawaDown(wawaDown_) {
				let i = setInterval(() => {
					if(wawaDown_ > 0) {
						wawaDown_ -= 2;
						option.$obj.css('marginBottom', wawaDown_ + 'px');
					}else {
						clearInterval(i);
					}
				}, 1);
			}

		}
	}
}

let interval;
let angle = 0;
let rod_angle = 0;
let direction = 'left';
let $current_wawa = null;


function shake($wawa, $rod_lid, $rod_paws) {
	$current_wawa = $wawa;
	if(direction === 'left') {
		angle += 0.35;
		rod_angle += 0.03;
		$wawa.css('transform', 'rotate(' + angle + 'deg)');
		// $rod_lid.css('transform', 'rotate(' + rod_angle + 'deg)');
		// $rod_paws.css('transform', 'rotate(' + rod_angle + 'deg)');
		if(angle >= 15) {
			direction = 'right';
		}
	}else if(direction === 'right') {
		angle -= 0.35;
		rod_angle -= 0.03;
		$wawa.css('transform', 'rotate(' + angle + 'deg)');
		// $rod_lid.css('transform', 'rotate(' + rod_angle + 'deg)');
		// $rod_paws.css('transform', 'rotate(' + rod_angle + 'deg)');
		if(angle <= -15) {
			direction = 'left';
		}
	}
}