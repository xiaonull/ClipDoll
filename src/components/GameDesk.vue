<template>
	<section class="gameDesk">
		<div class="play">
			<div class="desk_left">
				<div class="startGame" v-if="!startGame">
					<div class="goldNumContainer">
						<img src="~@/assets/gameDesk/gold-ico.png" class="goldIcon">
						<span class="goldNum">{{wawaJiGold}}</span>
					</div>
					<div class="startGameImg" @click="start">
						<img src="~@/assets/gameDesk/go-ico.gif" class="img">
					</div>
				</div>
				<div class="controlMove" v-else>
					<div class="left">
						<div class="img img_l" @touchstart="left" @touchend="stopMove"></div>
						<!-- <img src="~@/assets/gameDesk/ico-left.png" class="img" @touchstart="left" @touchend="stopMove"> -->
					</div>
					<div class="center">
						<div class="top">
							<div class="img img_t" @touchstart="behind"  @touchend="stopMove"></div>
							<!-- <img src="~@/assets/gameDesk/ico-top.png" class="img" @touchstart="behind"  @touchend="stopMove"> -->
						</div>
						<div class="bottom">
							<div class="img img_b" @touchstart="front"  @touchend="stopMove"></div>
							<!-- <img src="~@/assets/gameDesk/ico-bottom.png" class="img" @touchstart="front"  @touchend="stopMove"> -->
						</div>
					</div>
					<div class="right">
						<div class="img img_r" @touchstart="right"  @touchend="stopMove"></div>
						<!-- <img src="~@/assets/gameDesk/ico-right.png" class="img" @touchstart="right"  @touchend="stopMove"> -->
					</div>
				</div>
			</div>
			<div class="desk_right">
				<div class="changeOther">
					<img src="~@/assets/gameDesk/change-zi.png" class="img" v-if="!startGame" @click="changeOther">
					<img src="~@/assets/gameDesk/grab-zi.png" class="img grab" v-else @click="grab">
				</div>
			</div>
		</div>
		<div class="info">
			<div class="left">
				<div class="user">
					<img src="~@/assets/gameDesk/re-ico.png" class="img">
					<span class="userName">{{nickname}}</span>
				</div>
				<div class="glod">
					<img src="~@/assets/gameDesk/gold-bg02.png" class="img img_bg">
					<img src="~@/assets/gameDesk/gold-ico.png" class="img_icon">
					<span class="glodNum"> X {{userGold}}</span>
				</div>
			</div>
			<div class="right">
				<div class="icon icon1" @click="openRecharge">
					<span class="text">充 值</span>
				</div>
				<div class="icon icon2" @click="openBackpack">
					<span class="text">背 包</span>
				</div>
				<div class="icon icon3" @click="openPlayerShow">
					<span class="text">玩家秀</span>
				</div>
				<div class="icon icon4">
					<span class="text" @click="openTask">任 务</span>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				nickname: '',
				startGame: false,
				grabState: false,
				interval: null
			}
		},
		computed: {
			wawaJiGold() {
				return this.$store.state.info.wawaJiGold;
			},
			userGold() {
				return this.$store.state.info.userGold;
			}
		},
		mounted() {
			this.bindEvevt();
			this.init();
		},
		methods: {
			bindEvevt() {
				htsBus.$on('grabing', (option) => {
					this.grabing(option);
				});
			},
			init() {
				let userData = JSON.parse(sessionStorage.userData);
				this.nickname = userData.username;
				this.$store.commit('info/setUserGold', userData.coin);
			},
			start() {
				// 判断金币够不够
				if(this.$store.state.info.userGold >= this.$store.state.info.wawaJiGold) {
					this.$store.commit('info/setUserGold', this.$store.state.info.userGold - this.$store.state.info.wawaJiGold);

					this.$store.commit('modal/setCountDown', {
						show: true,
						count: 20
					});

					this.$store.dispatch('modal/startCountDown')
					.then((data)  => {
						if(this.startGame === true && this.grabState === false) {
							clearInterval(this.interval);
							this.grabState = true;
							htsBus.$emit('grab');
						}
					})
					.catch(response => {
						console.log('error: ' + response);
					});

					this.$store.commit('info/setStartGame', true);
					this.startGame = true;
				}else {
					this.$store.commit('modal/setMsg', {
						msg: '金币不足，请充值',
						display: true
					});

					let t1 = setTimeout(() => {
						this.$store.commit('modal/resetMsg');
						clearTimeout(t1);
					}, 2000);
				}
			},
			left(event) {
				if(this.grabState === false) {
					let i = 0;
					this.interval = setInterval(() => {
						this.$store.commit('rod/move_Left');
						htsBus.$emit('move_Left');

						if(!$('.rod_bottom').hasClass('rod_bottom_animation_right')) {
							if($('.rod_bottom').hasClass('rod_bottom_animation_left')) {
								$('.rod_bottom').removeClass('rod_bottom_animation_left');
							}
							$('.rod_bottom').addClass('rod_bottom_animation_right');
						}else {
							// $('.rod_bottom').removeClass('rod_bottom_animation_right');
						}
					}, 10);
				}
				event.preventDefault();
			},
			behind(event) {
				if(this.grabState === false) {
					this.interval = setInterval(() => {
						this.$store.commit('rod/move_Behind');
						htsBus.$emit('move_Behind');
					}, 30);
				}
				event.preventDefault();
			},
			front(event) {
				if(this.grabState === false) {
					this.interval = setInterval(() => {
						this.$store.commit('rod/move_Front');
						htsBus.$emit('move_Front');
					}, 30);
				}
				event.preventDefault();
			},
			right(event) {
				if(this.grabState === false) {
					this.interval = setInterval(() => {
						this.$store.commit('rod/move_Right');
						htsBus.$emit('move_Right');

						if(!$('.rod_bottom').hasClass('rod_bottom_animation_left')) {
							if($('.rod_bottom').hasClass('rod_bottom_animation_right')) {
								$('.rod_bottom').removeClass('rod_bottom_animation_right');
							}
							$('.rod_bottom').addClass('rod_bottom_animation_left');
						}else {
							// $('.rod_bottom').removeClass('rod_bottom_animation_left');
						}
					}, 10);
				}
				event.preventDefault();
			},
			stopMove() {
				clearInterval(this.interval);
				if($('.rod_bottom').hasClass('rod_bottom_animation_left')) {
					$('.rod_bottom').removeClass('rod_bottom_animation_left');
				}
				if($('.rod_bottom').hasClass('rod_bottom_animation_right')) {
					$('.rod_bottom').removeClass('rod_bottom_animation_right');
				}
			},
			changeOther() {
				this.$store.commit('modal/setSelectWawaJi', {
					showSelectWawaJi: true
				});
			},
			grab() {
				if(this.grabState === false) {
					this.grabState = true;
					htsBus.$emit('grab');

					this.$store.commit('modal/setCountDown', {
						show: false,
						count: 20
					});
				}
			},
			grabing(option) {
				// console.log(option.level);

				// 将娃娃的阴影去掉
				if(option.$wawa_shadow) {
					option.$wawa_shadow.css('display', 'none');
				}

				
				// 抓不到娃娃
				if(option.level === 4) {
					this.$store.dispatch('rod/grabDown').then((data) => {
						return new Promise((resolve, reject) => {
							this.$store.commit('rod/grabWaWa');
							setTimeout(() => {
								// this.$store.commit('rod/release');
								resolve();
							}, 2000);
						});
					}).then((data) => {
						return this.$store.dispatch('rod/grabUp');
					}).then((data) => {
						this.grabed({
							failed: true
						});
					})
					.catch(response => {
						console.log('error: ' + response);
					});	
					return;
				}
				
				// 肯定会夹起娃娃，并且移动到出口处
				if(option.catch === true) {
					this.$store.dispatch('rod/grabDown').then((data) => {
						return new Promise((resolve, reject) => {
							this.$store.commit('rod/grabWaWa');
							setTimeout(() => {
								resolve();
							}, 2000);
						});
					}).then((data) => {
						return this.$store.dispatch('rod/grabUp', option.$obj);
					}).then((data) => {
						// 移动到出口处

						// 将娃娃的阴影去掉
						// if(option.$wawa_shadow) {
						// 	option.$wawa_shadow.css('display', 'none');
						// }

						return new Promise((resolve, reject) => {
							let moveLeft = 0;
							let interval = setInterval(() => {
								if(this.$store.state.rod.position.left > 45) {
									this.$store.commit('rod/move_Left');
									htsBus.$emit('move_Left');
									moveLeft--;
									option.$obj.css('marginLeft', moveLeft + 'px');
								}

								if(this.$store.state.rod.position.scale < 1.03) {
									this.$store.commit('rod/move_Front');
									htsBus.$emit('move_Front');
								}

								shake(option.$obj);

								if(this.$store.state.rod.position.left <= 45 && this.$store.state.rod.position.scale >= 1.03) {
									clearInterval(interval);
									resolve();
								}
							}, 10);

							// if(this.$store.state.rod.position.scale < 1) {
							// 	option.$obj.animate({width: '2.5rem', height: '3.7rem'}, 5000);
							// }
						});
					}).then((data) => {
						// 出口处掉娃娃
						return new Promise((resolve, reject) => {
							this.$store.commit('rod/release');
							let timeout = setTimeout(() => {
								option.$obj.css('zIndex', 4);

								option.$obj.animate({
									marginBottom: '-500px'
								}, 2000, () => {
									console.log(this.$store.state.info.wawa_position)
									setTimeout(() => {
										// option.$obj.css('left', this.$store.state.info.wawa_position.left);
										// option.$obj.css('bottom', this.$store.state.info.wawa_position.bottom);
										option.$obj.css('zIndex', this.$store.state.info.wawa_position.zIndex);
										option.$obj.css('marginBottom', 0);
										option.$obj.css('marginLeft', 0);
										option.$obj.css('transform', 'rotate(0deg)');

										if(option.$wawa_shadow) {
											option.$wawa_shadow.css('display', 'block');
										}
									}, 500);
								});

								clearTimeout(timeout);
							}, 200);

							let timeout2 = setTimeout(() => {
								resolve();
							}, 2000);
						});
					}).then((data) => {
						this.grabed({
							failed: false
						});
					})
					.catch(response => {
						console.log('error: ' + response);
					});	
				}
				
				// level表示抓取的准确度，在抓取失败时准确度越高能抓起的高度越高
				if(option.catch === false) {
					// 将娃娃的阴影去掉
					if(option.$wawa_shadow) {
						option.$wawa_shadow.css('display', 'none');
					}

					this.$store.dispatch('rod/grabDown').then((data) => {
						return new Promise((resolve, reject) => {
							this.$store.commit('rod/grabWaWa');
							setTimeout(() => {
								resolve();
							}, 2000);
						});
					}).then((data) => {
						return this.$store.dispatch('rod/grabUpButFail', option);
					}).then((data) => {
						this.grabed({
							failed: true
						});

						// 将娃娃的阴影显示
						if(option.$wawa_shadow) {
							option.$wawa_shadow.css('display', 'block');
						}
					})
					.catch(response => {
						console.log('error: ' + response);
					});	
				}
			},
			grabed(option) {
				// 复位
				new Promise((resolve, reject) => {
					let interval = setInterval(() => {
						if(this.$store.state.rod.position.left < 80) {
							this.$store.commit('rod/move_Right');
							htsBus.$emit('move_Right');
						}else if(this.$store.state.rod.position.left > 80) {
							this.$store.commit('rod/move_Left');
							htsBus.$emit('move_Left');
						}

						if(this.$store.state.rod.position.scale < 1) {
							this.$store.commit('rod/move_Front');
							htsBus.$emit('move_Front');
						}else if(this.$store.state.rod.position.scale > 1) {
							this.$store.commit('rod/move_Behind');
							htsBus.$emit('move_Behind');
						}
						
						// console.log(this.$store.state.rod.position.left + ':' + this.$store.state.rod.position.scale);
						// 这里容易出问题，需要优化
						if(this.$store.state.rod.position.left === 80 && (this.$store.state.rod.position.scale === 1.001 || this.$store.state.rod.position.scale === 1)) {
							clearInterval(interval);
							resolve();
						}

						let timeout = setTimeout(() => {
							clearInterval(interval);
							clearTimeout(timeout);
							resolve();
						}, 4000);

					}, 10);
				})
				.then((data) => {
					this.$store.commit('rod/setGrabWaWaX', -1);
					this.$store.commit('rod/setLayer', 5);
					this.$store.commit('info/setStartGame', false);
					htsBus.$emit('reset_expression');
					this.startGame = false;
					this.grabState = false;

					if(option && option.failed && option.failed === true) {
						this.$store.commit('rod/release');
						
						// this.$store.commit('modal/setMsg', {
						// 	msg: '好可惜抓取失败',
						// 	display: true
						// });

						this.$store.commit('modal/setColorfulMsg', true);
					}

					if(option && option.failed === false) {
						// this.$store.commit('modal/setMsg', {
						// 	msg: '恭喜抓到一个娃娃',
						// 	display: true
						// });

						// let t1 = setTimeout(() => {
						// 	this.$store.commit('modal/resetMsg');
						// 	clearTimeout(t1);
						// }, 2000);

						this.$store.commit('modal/setCatch', {
							showCatch: true
						});
						this.$store.commit('info/setLuckyValue', 0);
					}

					let t1 = setTimeout(() => {
						this.$store.commit('modal/resetMsg');

						this.$store.commit('info/setLuckyValue', parseInt(this.$store.state.modal.bubble_luckValue) + parseInt(this.$store.state.info.luckyValue));
						this.$store.commit('modal/setbubble_luckValue', {
							showBubble: true
						});

						let t2 = setTimeout(() => {
							this.$store.commit('modal/setbubble_luckValue', {
								showBubble: false,
								// bubble_luckValue: 0
							});
							clearTimeout(t2);
						}, 3000);

						clearTimeout(t1);
					}, 2000);	
				})
				.catch(response => {
					console.log('error: ' + response);
				});	
			},
			openRecharge() {
				if(this.startGame === false) {
					this.$store.commit('modal/setRecharge', {
						showRecharge: true
					});
				}
			},
			openBackpack() {
				if(this.startGame === false) {
					this.$store.commit('modal/setBackpack', {
						showBackpack: true
					});
				}
			},
			openTask() {
				if(this.startGame === false) {
					this.$store.commit('modal/setTask', {
						showTask: true
					});
				}
			},
			openPlayerShow() {
				if(this.startGame === false) {
					this.$store.commit('modal/setPlayerShow', {
						showPlayerShow: true
					});
				}
			}
		}
	}

	let interval;
	let angle = 0;
	let rod_angle = 0;
	let direction = 'left';
	let $current_wawa = null;


	function shake($wawa) {
		$current_wawa = $wawa;
		if(direction === 'left') {
			angle += 0.35;
			rod_angle += 0.03;
			$wawa.css('transform', 'rotate(' + angle + 'deg)');
			if(angle >= 15) {
				direction = 'right';
			}
		}else if(direction === 'right') {
			angle -= 0.35;
			rod_angle -= 0.03;
			$wawa.css('transform', 'rotate(' + angle + 'deg)');
			if(angle <= -15) {
				direction = 'left';
			}
		}
	}
</script>

<style scoped lang="less">
	.gameDesk {
		position: absolute;
		z-index: 2;
		width: 100%;
		height: 28%;
		bottom: 0;
		background-image: url('~@/assets/bg/desktop.png');
		background-size: cover;
		
		.play {
			overflow: hidden;

			.desk_left {
				float: left;

				.startGame {
					width: 8.7rem;
					height: 2.5rem;
					margin-left: 1.5rem;
					margin-top: 1rem;
					overflow: hidden;

					.goldNumContainer {
						display: inline-block;
						width: 2.5rem;
						height: 1.8rem;
						line-height: 1.8rem;
						float: left;
						margin-top: 0.2rem;
						background-image: url('~@/assets/gameDesk/gold-bg.png');
						background-size: 100% 100%;
						background-repeat: no-repeat;

						.goldIcon {
							display: inline-block;
							width: 0.8rem;
							height: 0.8rem;
							position: relative;
							top: 0.1rem;
							margin-left: 0.3rem;
						}

						.goldNum {
							font-size: 0.65rem;
							color: #fff;
							position: relative;
							top: -0.05rem;
						}
					}

					.startGameImg {
						display: inline-block;
						width: 5.8rem;
						height: 2.6rem;
						margin-top: -0.2rem;

						.img {
							width: 100%;
							height: 100%;
						}
					}
				}

				.controlMove {
					width: 6.5rem;
					height: 3.7rem;
					margin-left: 1.5rem;
					margin-top: 0.5rem;
					overflow: hidden;
					background-image: url('~@/assets/gameDesk/direction.png');
					background-size: 100% 100%;

					.left {
						float: left;
						width: 2rem;
						height: 100%;

						.img {
							width: 100%;
							height: 2rem;
							position: relative;
							top: 50%;
							margin-top: -1rem;
						}

						.img_l {
							/* background-image: url('~@/assets/gameDesk/ico-left.png'); */
							background-size: cover;
						}

					}

					.center {
						float: left;
						width: 2.3rem;
						height: 100%;

						.top {
							height: 50%;

							.img {
								width: 100%;
								height: 2rem;
								position: relative;
								top: 50%;
								margin-top: -1rem;
								margin-left: 0.4rem;
							}

							.img_t {
								/* background-image: url('~@/assets/gameDesk/ico-top.png'); */
								background-size: cover;
							}

						}
						
						.bottom {
							height: 50%;

							.img {
								width: 100%;
								height: 2rem;
								position: relative;
								top: 100%;
								margin-top: -1rem;
							}

							.img_b {
								/* background-image: url('~@/assets/gameDesk/ico-bottom.png'); */
								background-size: cover;
							}
						}
					}

					.right {
						float: left;
						width: 2rem;
						height: 100%;

						.img {
							width: 100%;
							height: 2rem;
							position: relative;
							top: 50%;
							margin-top: -1rem;
						}

						.img_r {
							/* background-image: url('~@/assets/gameDesk/ico-right.png'); */
							background-size: cover;
						}
					}
				}
			}

			.desk_right {
				float: right;

				.changeOther {
					width: 2.8rem;
					height: 2.2rem;
					background-image: url('~@/assets/gameDesk/grab-ico.png');
					background-size: 100% 100%;
					margin-right: 2rem;
					margin-top: 0.8rem;
					text-align: center;

					.img {
						display: inline-block;
						width: 60%;
						height: 30%;
						margin-top: 0.35rem;
					}

					.grab {
						width: 50%;
						height: 40%;
					}
				}
			}
		}
		
		.info {
			position: absolute;
			bottom: 0;
			overflow: hidden;
			height: 2.5rem;

			.left {
				float: left;
				width: 5.5rem;
				height: 2.5rem;

				.user {
					height: 1rem;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					color: #fff;

					.img {
						display: inline-block;
						width: 0.7rem;
						height: 0.7rem;
						margin: 0rem 0.2rem 0 0.5rem;
					}

					.userName {
						width: 2rem;
						position: relative;
						top: -0.15rem;
						font-size: 0.6rem;
						color: #fff;
					}
				}

				.glod {
					position: relative;
					height: 1.5rem;
					line-height: 1.5rem;
					text-align: center;

					.img_bg {
						display: inline-block;
						width: 85%;
						height: 1.1rem;
					}

					.img_icon {
						position: absolute;
						top: 0.2rem;
						left: 0.8rem;
						width: 0.7rem;
						height: 0.7rem;
					}

					.glodNum {
						position: absolute;
						top: -0.19rem;
						left: 1.9rem;
						font-size: 0.65rem;
						color: #e1ea2a;
					}
					
				}
			}

			.right {
				float: right;
				width: 9.5rem;
				height: 2rem;
				display: flex;
				padding: 0rem 0 0.2rem 0;

				.icon {
					flex: 1;
					text-align: center;
					height: 2rem;
					line-height: 2rem;
					font-size: 0.5rem;
					color: #fff;

					.text {
						
					}
				}

				.icon1 {
					background-image: url('~@/assets/gameDesk/chip-ico01.png');
					background-size: contain;
					background-repeat: no-repeat;
					background-position: center;
				}

				.icon2 {
					background-image: url('~@/assets/gameDesk/chip-ico02.png');
					background-size: contain;
					background-repeat: no-repeat;
					background-position: center;
				}

				.icon3 {
					background-image: url('~@/assets/gameDesk/chip-ico03.png');
					background-size: contain;
					background-repeat: no-repeat;
					background-position: center;
				}

				.icon4 {
					background-image: url('~@/assets/gameDesk/chip-ico04.png');
					background-size: contain;
					background-repeat: no-repeat;
					background-position: center;
				}
			}
		}
	}
</style>