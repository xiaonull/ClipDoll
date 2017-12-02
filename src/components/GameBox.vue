<template>
	<section class="gameBox">
		<div class="main" ref="gameBox">
			<!-- 落口处 -->
			<div class="exit"></div>
			<!-- 抓杆 -->
			<div class="rod" ref="rod">
				<!-- 抓杆的柄 -->
				<div class="rod_handle_container" ref="rod_handle_container">
					<div class="rod_handle_top"></div>
					<div class="rod_handle" v-for="i in rod_length"></div>
				</div>
				<div class="rod_bottom">
					<!-- 盖子 -->
					<div class="rod_lid" ref="rod_lid">
						<img src="~@/assets/rod/hooktu02.png" class="rod_lid_img">
					</div>
					<!-- 爪子 -->
					<div class="rod_paws" ref="rod_paws">
						<div class="rod_paw_l" ref="rod_paw_l">
							<img src="~@/assets/rod/hooktu03.png" class="rod_paw_l_img">
						</div>
						<div class="rod_paw_r" ref="rod_paw_r">
							<img src="~@/assets/rod/hooktu04.png" class="rod_paw_r_img">
						</div>
					</div>
				</div>
			</div>
			<!-- 底盘装娃娃 -->
			<div class="underpan" ref="underpan">
				<div class="shadowContainer">
					<div class="shadow" ref="shadow"></div>
				</div>
				<!-- <img :src="'http://' + currentWaWaList[0].sc_pic" :class="currentWaWaList[0].id" class="img wawa wawa_1" v-if="currentWaWaList[0]">
				<div class="expression expression1" v-if="currentWaWaList[0] && showExpression === 1"><img src="~@/assets/bg/expression.png" class="img"></div>
				<div class="shadow1 shadowImg" v-if="currentWaWaList[0]"></div>
				<img :src="'http://' + currentWaWaList[1].sc_pic" :class="currentWaWaList[1].id" class="img wawa wawa_2" v-if="currentWaWaList[1]">
				<div class="expression expression2" v-if="currentWaWaList[1] && showExpression === 2"><img src="~@/assets/bg/expression.png" class="img"></div>
				<div class="shadow2 shadowImg" v-if="currentWaWaList[1]"></div>
				<img :src="'http://' + currentWaWaList[2].sc_pic" :class="currentWaWaList[2].id" class="img wawa wawa_3" v-if="currentWaWaList[2]">
				<div class="expression expression3" v-if="currentWaWaList[2] && showExpression === 3"><img src="~@/assets/bg/expression.png" class="img"></div>
				<div class="shadow3 shadowImg" v-if="currentWaWaList[2]"></div>
				<img :src="'http://' + currentWaWaList[3].sc_pic" :class="currentWaWaList[3].id" class="img wawa wawa_4" v-if="currentWaWaList[3]">
				<div class="expression expression4" v-if="currentWaWaList[3] && showExpression === 4"><img src="~@/assets/bg/expression.png" class="img"></div>
				<div class="shadow4 shadowImg" v-if="currentWaWaList[3]"></div>
				<img :src="'http://' + currentWaWaList[4].sc_pic" :class="currentWaWaList[4].id" class="img wawa wawa_5" v-if="currentWaWaList[4]">
				<div class="expression expression5" v-if="currentWaWaList[4] && showExpression === 5"><img src="~@/assets/bg/expression.png" class="img"></div>
				<div class="shadow5 shadowImg" v-if="currentWaWaList[4]"></div>
				<img :src="'http://' + currentWaWaList[5].sc_pic" :class="currentWaWaList[5].id" class="img wawa wawa_6" v-if="currentWaWaList[5]">
				<div class="expression expression6" v-if="currentWaWaList[5] && showExpression === 6"><img src="~@/assets/bg/expression.png" class="img"></div>
				<div class="shadow6 shadowImg" v-if="currentWaWaList[5]"></div> -->
				<div class="wawa_wrapper" :class="'wawa_' + (index + 1) + '_wrapper'" v-for="(item, index) in currentWaWaList" :key="item.id" :grabHeight="item.xdheight">
					<img :src="'http://' + item.sc_pic" :class="item.id" class="img wawa">
					<div class="expression" v-if="showExpression === (index + 1)"><img src="~@/assets/bg/expression.png" class="img"></div>
					<div class="shadowImg" v-if="currentWaWaList[0]"></div>
				</div>
			</div>
		</div>
		<div class="wawaji_subTop"></div>
		<div class="wawaji_subLeft">
			<img :src="light_img" class="wawaji_left_light">
		</div>
		<div class="gift" @click="openGift">
			<img src="~@/assets/bg/package-ico.png" class="img">
		</div>
		<div class="wawaji_subRight">
			<img :src="light_img" class="wawaji_right_light">
		</div>
		<div class="wawaji_subBottom">
			<div class="luckBar">
				<p class="info">幸运值 : {{luckyValue}}/100</p>
				<div class="value" ref="barValue">
					<div class="bubble" ref="bubble" v-show="showBubble">
						<div class="rule">
							<p class="rule1">幸运值+{{bubble_luckValue}}</p>
							<p class="rule2">满100时必中</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="maskBottom"></div>
	</section>
</template>

<script>
	import Rod from '../js/rod.js';
	
	export default {
		data() {
			return {
				left: this.$store.state.rod.position,
				scale: this.$store.state.rod.position,
				grabWaWa: this.$store.state.rod.action,
				layer: this.$store.state.rod.layer,
				light_img_index: 1,
				currentWaWaList: [],
				showExpression: 1
			}
		},
		mounted() {
			this.init();
			this.bindEvevt();
			this.changeLightImg();
		},
		computed: {
			light_img() {
				return './static/light/light0' + this.light_img_index + '.png';
			},
			rod_length() {
				return this.$store.state.rod.handle_length;
			},
			luckyValue() {
				if(this.$store.state.info.luckyValue < 80) {
					let len = 12.3 * (this.$store.state.info.luckyValue / 100);
					$(this.$refs.barValue).css('width', len + 'rem');
					$(this.$refs.bubble).css('right', '-4rem');
				}else {
					let len = 12.3 * (this.$store.state.info.luckyValue / 100);
					$(this.$refs.barValue).css('width', len + 'rem');
					$(this.$refs.bubble).css('right', '-1rem');
				}
				
				return this.$store.state.info.luckyValue;
			},
			showBubble() {
				return this.$store.state.modal.showBubble;
			},
			bubble_luckValue() {
				return this.$store.state.modal.bubble_luckValue;
			}
		},
		methods: {
			bindEvevt() {
				htsBus.$on('move_Left', () => {
					this.move_Left();
				});
				htsBus.$on('move_Right', () => {
					this.move_Right();
				});
				htsBus.$on('move_Behind', () => {
					this.move_Behind();
				});
				htsBus.$on('move_Front', () => {
					this.move_Front();
				});

				htsBus.$on('grab', () => {
					this.grab();
				});

				htsBus.$on('setCurrentWaWaList', (data) => {
					this.currentWaWaList = data;
				});
			},
			init() {
				let self = this;

				window.GameBox = function GameBox() {
					
				}
				GameBox.prototype.getHeight = function() {
					return $(self.$refs.gameBox).css('height');
				}

				window.getRod_paw_l_position = () => {
					let left = this.$store.state.rod.position.left + parseInt($(this.$refs.rod_paws).css('marginLeft').slice(0, $(this.$refs.rod_paws).css('marginLeft').length - 2));
					return left;
				}

				window.getRod_paw_r_position = () => {
					let left = this.$store.state.rod.position.left + parseInt($(this.$refs.rod_paws).css('marginLeft').slice(0, $(this.$refs.rod_paws).css('marginLeft').length - 2)) + parseInt($(this.$refs.rod_paws).css('width').slice(0, $(this.$refs.rod_paws).css('width').length - 2));
					
					return left;
				}
				
				let wawaJiData = JSON.parse(sessionStorage.initWaWaJi);
				this.currentWaWaList = wawaJiData.data;
				this.$store.commit('info/setWawaJiGold', wawaJiData.coin);
				this.$store.commit('info/setLuckyValue', wawaJiData.lucky);

				this.showExpressionX();
			},
			changeLightImg() {
				setInterval(() => {
					this.light_img_index = (this.light_img_index + 1) % 3 === 0 ? 3 : (this.light_img_index + 1) % 3 ;
				}, 1000);
			},
			showExpressionX() {
				setInterval(() => {
					let index = Math.floor(Math.random() * 6 + 1);
					this.showExpression = index;

					let t = setTimeout(() => {
						this.showExpression = 0;
						clearTimeout(t);
					}, 1500);
				}, 5000);
			},
			openGift() {
				if(this.$store.state.info.startGame === true) {
					return;
				}
				this.$store.commit('modal/setGift', {
					showGift: true
				});
			},
			move_Left() {
				if(this.$store.state.rod.moveToLeft === 'can') {
					$(this.$refs.shadow).css('left', '-=1px');
				}
			},
			move_Right() {
				if(this.$store.state.rod.moveToRight === 'can') {
					$(this.$refs.shadow).css('left', '+=1px');
				}
			},
			move_Behind() {
				if(this.$store.state.rod.moveToBehind === 'can') {
					$(this.$refs.shadow).css('bottom', '+=1px');
				}
			},
			move_Front() {
				if(this.$store.state.rod.moveToFront === 'can') {
					$(this.$refs.shadow).css('bottom', '-=1px');
				}
			},
			grab() {
				let $shadow =  $(this.$refs.shadow);
				let shadowLeft = $shadow.css('left').slice(0, $shadow.css('left').length - 2) * 1 + $shadow.css('width').slice(0, $shadow.css('width').length - 2) / 2;
				let shadowBottom = parseFloat($shadow.css('bottom').slice(0, $shadow.css('bottom').length - 2));

				let $wawas = $(this.$refs.underpan).find('.wawa_wrapper');
				for(let i = 0, j = $wawas.length; i < j; i++) {
					let $wawa_shadow = $(this.$refs.underpan).find('.shadowImg').eq(i);

					let $wawa = $wawas.eq(i);
					let wawaLeft = parseFloat($wawa.css('left').slice(0, $wawa.css('left').length - 2)) + parseFloat($wawa.css('width').slice(0, $wawa.css('width').length - 2)) / 2;
					let wawaBottom = parseFloat($wawa.css('bottom').slice(0, $wawa.css('bottom').length - 2));
					
					// 判斷阴影的下边中点的位置与娃娃图片的下边中点的位置是否在一定范围内
					let distance = Math.sqrt(Math.pow((wawaLeft - shadowLeft), 2) + Math.pow((wawaBottom - shadowBottom), 2));
					console.log(distance);

					let phoneWidth = document.documentElement.clientWidth; 
					let level1 = 0;
					let level2 = 0;
					let level3 = 0;
					if(phoneWidth <= 410) {
						level1 = 7;
						level2 = 8;
						level3 = 20;
					}else {
						level1 = 8;
						level2 = 10;
						level3 = 22;
					}
					
					if(distance < level3) {
						let grabHeight = $wawa.attr('grabHeight') / 100;

						let gameBox = new GameBox();
						let gameBoxH = gameBox.getHeight().slice(0, gameBox.getHeight().length - 2);
						let handle_downLength = gameBoxH - $wawa.css('bottom').slice(0, $wawa.css('bottom').length - 2) - parseInt($wawa.css('height').slice(0, $wawa.css('height').length - 2) * grabHeight) - $(this.$refs.rod).css('height').slice(0, $(this.$refs.rod).css('height').length - 2) + 32;

						this.$store.commit('rod/setHandle_downLength', handle_downLength);

						let wawa_l = parseInt($wawa.css('left').slice(0, $wawa.css('left').length - 2));
						let wawa_r = parseInt($wawa.css('left').slice(0, $wawa.css('left').length - 2)) + parseInt($wawa.css('width').slice(0, $wawa.css('width').length - 2));
						this.$store.commit('rod/setRod_paw_EndPosition', {
							left: wawa_l,
							right: wawa_r
						});

					}

					if(distance < level1) {
						// console.log('level1')
						this.isCatch(this.currentWaWaList[i].id)
						.then((data) => {
								// level表示抓取的准确度，在抓取失败时准确度越高能抓起的高度越高；catch表示能否完全抓起，由后台控制
								htsBus.$emit('grabing', {
									level: 1,
									catch: data,
									$obj: $wawa,
									$wawa_shadow: $wawa_shadow,
									$rod_lid: $(this.$refs.rod_lid),
									$rod_paws: $(this.$refs.rod_paws)
								});

								if(data) {
									this.$store.commit('info/setWawa_position', {
										left: $wawa.css('left'),
										bottom: $wawa.css('bottom'),
										zIndex: $wawa.css('zIndex')
									});
								}
							}, (err) => {

							})
						.catch((err) => {

						});
						
						return;
					} else if(distance < level2) {
						// console.log('level2')
						this.isCatch(this.currentWaWaList[i].id)
						.then((data) => {
								// level表示抓取的准确度，在抓取失败时准确度越高能抓起的高度越高；catch表示能否完全抓起，由后台控制
								htsBus.$emit('grabing', {
									level: 2,
									catch: data,
									$obj: $wawa,
									$wawa_shadow: $wawa_shadow,
									$rod_lid: $(this.$refs.rod_lid),
									$rod_paws: $(this.$refs.rod_paws)
								});

								if(data) {
									this.$store.commit('info/setWawa_position', {
										left: $wawa.css('left'),
										bottom: $wawa.css('bottom'),
										zIndex: $wawa.css('zIndex')
									});
								}
							}, (err) => {

							})
						.catch((err) => {

						});
						
						return;
					} else if(distance < level3) {
						// console.log('level3')
						this.isCatch(this.currentWaWaList[i].id)
						.then((data) => {
								// level表示抓取的准确度，在抓取失败时准确度越高能抓起的高度越高；catch表示能否完全抓起，由后台控制
								htsBus.$emit('grabing', {
									level: 3,
									catch: data,
									$obj: $wawa,
									$wawa_shadow: $wawa_shadow,
									$rod_lid: $(this.$refs.rod_lid),
									$rod_paws: $(this.$refs.rod_paws)
								});

								if(data) {
									this.$store.commit('info/setWawa_position', {
										left: $wawa.css('left'),
										bottom: $wawa.css('bottom'),
										zIndex: $wawa.css('zIndex')
									});
								}
							}, (err) => {

							})
						.catch((err) => {

						});
						
						return;
					}
				}

				this.lost()
				.then((data) => {
					// 完全没抓到
					let $wawa = $wawas.eq(0);
					let gameBox = new GameBox();
					let gameBoxH = gameBox.getHeight().slice(0, gameBox.getHeight().length - 2);
					let handle_downLength = gameBoxH - $wawa.css('bottom').slice(0, $wawa.css('bottom').length - 2) - parseInt($wawa.css('height').slice(0, $wawa.css('height').length - 2) * 2 / 3) - $(this.$refs.rod).css('height').slice(0, $(this.$refs.rod).css('height').length - 2) + 32;

					this.$store.commit('rod/setHandle_downLength', handle_downLength);

					this.$store.commit('rod/setRod_paw_EndPosition', {
						left: '-1',
						right: '-1'
					});

					htsBus.$emit('grabing', {
						level: 4,
						catch: false,
						$obj: null
					});
				}, (err) => {

				})
				.catch((err) => {

				});

			},
			isCatch(wawa_id) {
				return new Promise((resolve, reject) => {
					let option = {
						url: 'api/catchdoll/' + this.currentWaWaList[0].goods_cate_id + '/' + wawa_id + '?token=' + sessionStorage.token + '&iscatch=true',
						type: 'POST',
						success: function(result, status, xhr) {
							if(result.code === 1) {
								if(result.lucky === 'clear') {
									this.$store.commit('modal/setbubble_luckValue', {
										showBubble: false,
										bubble_luckValue: 0
									});	
									// this.$store.commit('info/setLuckyValue', 0);
								}else {
									this.$store.commit('modal/setbubble_luckValue', {
										showBubble: false,
										bubble_luckValue: result.lucky
									});	
								}

								if(result.data === 'get') {
									this.$store.commit('info/setWawa_id', {
										id: wawa_id
									});

									resolve(true);
								}else if(result.data === 'lost') {
									resolve(false);
								}
							}else {
								this.$store.commit('modal/setMsg', {
									msg: result.msg,
									display: true
								});

								let t = setTimeout(() => {
									this.$store.commit('modal/resetMsg');
									clearTimeout(t);
								}, 2000);

								reject();
							}
						}.bind(this)
					};

					myAjax(option);
				});
			},
			lost() {
				return new Promise((resolve, reject) => {
					let option = {
						url: 'api/catchdoll/' + this.currentWaWaList[0].goods_cate_id + '/0' + '?token=' + sessionStorage.token + '&iscatch=false',
						type: 'POST',
						success: function(result, status, xhr) {
							if(result.code === 1) {
								if(result.lucky === 'clear') {
									this.$store.commit('modal/setbubble_luckValue', {
										showBubble: false,
										bubble_luckValue: 0
									});	
									this.$store.commit('info/setLuckyValue', 0);
								}else {
									this.$store.commit('modal/setbubble_luckValue', {
										showBubble: false,
										bubble_luckValue: result.lucky
									});	
								}	

								if(result.data === 'get') {
									resolve(true);
								}else if(result.data === 'lost') {
									resolve(false);
								}
							}
						}.bind(this)
					};

					myAjax(option);
				});
			},
			randomWaWaPosition() {
				let $wawas = $(this.$refs.underpan).find('.wawa_wrapper');
				for(let i = 0, j = $wawas.length; i < j; i++) {
					let $wawa = $wawas.eq(i);
					if(i < 3) {
						let left;
						if(i === 0) {
							left = (Math.random() * 0.3 + 4).toFixed(2) + 'rem';
						}
						if(i === 1) {
							left = (Math.random() * 0.3 + 6).toFixed(2) + 'rem';
						}
						if(i === 2) {
							left = (Math.random() * 0.3 + 10).toFixed(2) + 'rem';
						}

						let bottom = Math.floor(Math.random() * 0.5 + 0.2) + 'rem';
						$wawa.css('left', left);
						$wawa.css('bottom', bottom);
					}else {
						let left;
						if(i === 3) {
							left = (Math.random() * 0.3 + 2.5).toFixed(2) + 'rem';
						}
						if(i === 4) {
							left = (Math.random() * 0.3 + 5.5).toFixed(2) + 'rem';
						}
						if(i === 5) {
							left = (Math.random() * 0.3 + 8.5).toFixed(2) + 'rem';
						}

						let bottom = (Math.floor(Math.random() * 1.2 + 2.2)).toFixed(2) + 'rem';
						$wawa.css('left', left);
						$wawa.css('bottom', bottom);
					}
				}
			}
		},
		watch: {
			left: {
				handler: function (val, oldVal) {
					$(this.$refs.rod).css('left', val.left);
				},
				deep: true
			},
			scale: {
				handler: function (val, oldVal) {
					// $(this.$refs.rod).css('transform', 'scale(' + val.scale + ',' + val.scale + ')');
				},
				deep: true
			},
			grabWaWa: {
				handler: function (val, oldVal) {
					// alert(this.$store.state.rod.rod_paw_EndPosition.left)
					// alert(getRod_paw_l_position())
					if(val.grabWaWa === true) {
						let n = 0;
						let rod_paw_l_EndPosition = this.$store.state.rod.rod_paw_EndPosition.left;
						let distance = 0;
						if(rod_paw_l_EndPosition === '-1') {
							distance = 20;
						}else {
							distance = rod_paw_l_EndPosition - getRod_paw_l_position() + 2;
						}

						let interval = setInterval(() => {

							n += 2;
							distance -= 2;
							// alert(distance)

							$(this.$refs.rod_paw_l).css({
								'transform': 'rotate(-' + n + 'deg)'
							});

							if(distance <= 0) {
								clearInterval(interval);
							}
						}, 40);
					}

					if(val.grabWaWa === true) {
						let n = 0;
						let rod_paw_r_EndPosition = this.$store.state.rod.rod_paw_EndPosition.right;
						let distance = 0;
						if(rod_paw_r_EndPosition === '-1') {
							distance = 20;
						}else {
							distance = getRod_paw_r_position() - rod_paw_r_EndPosition + 2;
						}

						let interval = setInterval(() => {

							n += 2;
							distance -= 2;
							// alert(distance)

							$(this.$refs.rod_paw_r).css({
								'transform': 'rotate(' + n + 'deg)'
							});

							if(distance <= 0) {
								clearInterval(interval);
							}
						}, 40);
					}

					if(val.grabWaWa === false) {
						let n = 5;
						let interval = setInterval(() => {
							n -= 2;
							$(this.$refs.rod_paw_l).css({
								'transform': 'rotate(-' + n + 'deg)'
							});
							$(this.$refs.rod_paw_r).css({
								'transform': 'rotate(' + n + 'deg)'
							});

							if(n <= 0) {
								clearInterval(interval);
							}
						}, 40);
					}
				},
				deep: true
			},
			layer: {
				handler: function (val, oldVal) {
					$(this.$refs.rod).css('zIndex', val.zIndex);
				},
				deep: true
			},
			currentWaWaList: {
				handler: function (val, oldVal) {
					setTimeout(() => {
						this.randomWaWaPosition();
					}, 0);
				},
				deep: true
			}, 
		}
	}
</script>

<style scoped lang="less">
	.gameBox {
		width: 100%;
		height: 71%;
		position: relative;
		background-color: #f26fa5;
		z-index: 2;
		overflow: hidden;

		.wawaji_subTop {
			position: absolute;
			z-index: 10;
			top: 0;
			width: 100%;
			height: 40px;
			background-image: url('~@/assets/bg/cover.png');
			background-repeat: no-repeat;
			background-position: bottom;
			background-size: cover;
		}

		.wawaji_subLeft {
			position: absolute;
			z-index: 8;
			left: 0;
			width: 0.9rem;
			height: 100%;
			background-image: url('~@/assets/bg/box-left.png');
			background-repeat: repeat;
			background-position: left;
			background-size: cover;

			.wawaji_left_light {
				width: 104%;
				height: 98%;
			}
		}

		.gift {
			width: 2.4rem;
			height: 3.4rem;
			background-image: url('~@/assets/bg/package-bg.png');
			background-size: 100% 100%;
			position: absolute;
			top: 50%;
			margin-top: -1.7rem;
			z-index: 10;

			.img {
				width: 80%;
				height: 70%;
				margin: 15% 10%;
			}
		}

		.wawaji_subRight {
			position: absolute;
			z-index: 8;
			right: 0;
			width: 0.9rem;
			height: 100%;
			background-image: url('~@/assets/bg/box-right.png');
			background-repeat: repeat;
			background-position: right;
			background-size: cover;

			.wawaji_right_light {
				width: 104%;
				height: 98%;
			}
		}

		.wawaji_subBottom {
			position: absolute;
			z-index: 7;
			bottom: 0.5rem;
			width: 100%;
			height: 0.8rem;
			line-height: 0.8rem;
			background-image: url('~@/assets/bg/box-bottom.png');
			background-repeat: repeat;
			background-position: center;
			background-size: cover;
			text-align: center;

			.luckBar {
				display: inline-block;
				width: 12.5rem;
				height: 0.8rem;
				background-image: url('~@/assets/luckValue/price-bg.png');
				background-size: 100% 100%;
				background-repeat: no-repeat;
				position: relative;

				.info {
					color: #000;
					font-weight: 600;
					font-size: 0.6rem;
					position: relative;
					z-index: 10;
				}

				.value {
					width: 0rem;
					height: 0.56rem;
					border-radius: 1rem;
					background-image: url('~@/assets/luckValue/price.jpg');
					filter:alpha(opacity=50);  
					position: relative;
					top: -0.68rem;
					left: 0.1rem;

					.bubble {
						width: 6.3rem;
						height: 4.7rem;
						background-image: url('~@/assets/luckValue/frame-box.png');
						background-size: cover;
						background-repeat: no-repeat;
						position: absolute;
						top: -4.5rem;
						right: -4rem;
						z-index: 10;
						text-align: center;

						.rule {
							margin-top: 1.3rem;
							line-height: 1rem;

							.rule1 {
								font-size: 0.7rem;
								color: #29ac07;
							}

							.rule2 {
								font-size: 0.6rem;
								font-weight: 500;
								color: #000;
							}
						}
					}
				}
			}
		}

		.maskBottom {
			position: absolute;
			z-index: 4;
			bottom: 0;
			width: 100%;
			height: 1.3rem;
			background-color: #f26fa5;
		}

		.main {
			position: absolute;
			top: 25px;
			left: 0.9rem;
			right: 0.9rem;
			bottom: 1rem;
			background-color: #34ccdd;
			background-image: url('~@/assets/bg/house.jpg');
			background-repeat: no-repeat;
			background-position: center;
			background-size: 100% 100%;

			.exit {
				width: 4.5rem;
				height: 4rem;
				position: absolute;
				left: 0;
				bottom: 0;
				background-image: url('~@/assets/bg/house01.png');
				background-size: 100% 100%;
				z-index: 3;
			}
		}

		.rod {
			position: relative;
			z-index: 5;
			left: 80px;
			margin-top: -50px;

			.rod_handle_top {
				position: relative;
				top: 52px;
				left: -0.65rem;
				width: 1.6rem;
				height: 0.65rem;
				background-image: url('~@/assets/rod/hook-ico01.png');
				background-size: 100% 100%;
			}

			.rod_handle {
				width: 5px;
				height: 1px;
				background-image: url('~@/assets/rod/hooktu01.jpg');
				background-position: center;
				background-size: contain;
			}

			.rod_bottom {
				margin-top: -0.05rem;
				transform-origin: 0 0;
			}

			.rod_bottom_animation_left {
				animation: shakeRod_left 2s;
			}

			.rod_bottom_animation_right {
				animation: shakeRod_right 2s;
			}

			@keyframes shakeRod_left {
				0% {
					transform: rotate(0deg);
				}
				5% {
					transform: rotate(12deg);
				}
				10% {
					transform: rotate(20deg);
				}
				15% {
					transform: rotate(12deg);
				}
				20% {
					transform: rotate(0deg);
				}
				25% {
					transform: rotate(-8deg);
				}
				30% {
					transform: rotate(-14deg);
				}
				40% {
					transform: rotate(-8deg);
				}
				50% {
					transform: rotate(0deg);
				}
				60% {
					transform: rotate(6deg);
				}
				70% {
					transform: rotate(10deg);
				}
				75% {
					transform: rotate(4deg);
				}
				80% {
					transform: rotate(0deg);
				}
				85% {
					transform: rotate(-4deg);
				}
				90% {
					transform: rotate(-6deg);
				}
				95% {
					transform: rotate(-4deg);
				}
				100% {
					transform: rotate(0deg);
				}
			}

			@keyframes shakeRod_right {
				0% {
					transform: rotate(0deg);
				}
				5% {
					transform: rotate(-12deg);
				}
				10% {
					transform: rotate(-20deg);
				}
				15% {
					transform: rotate(-12deg);
				}
				20% {
					transform: rotate(0deg);
				}
				25% {
					transform: rotate(8deg);
				}
				30% {
					transform: rotate(14deg);
				}
				40% {
					transform: rotate(8deg);
				}
				50% {
					transform: rotate(0deg);
				}
				60% {
					transform: rotate(-6deg);
				}
				70% {
					transform: rotate(-10deg);
				}
				75% {
					transform: rotate(-4deg);
				}
				80% {
					transform: rotate(0deg);
				}
				85% {
					transform: rotate(4deg);
				}
				90% {
					transform: rotate(6deg);
				}
				95% {
					transform: rotate(4deg);
				}
				100% {
					transform: rotate(0deg);
				}
			}

			.rod_lid {
				transform-origin: 50% 0;

				.rod_lid_img {
					position: relative;
					z-index: 3;
					width: 2.7rem;
					height: 1.5rem;
					margin-left: -1.32rem;	
				}
			}

			.rod_paws {
				width: 3.3rem;
				margin-left: -1.6rem;
				margin-top: -0.05rem;
				overflow: hidden;

				transform-origin: 50% 0;
			}

			.rod_paw_l {
				float: left;
				transform-origin: 100% 0;
				-ms-transform-origin: 100% 0;
				-webkit-transform-origin: 100% 0;
			}

			.rod_paw_r {
				float: right;
				transform-origin: 0 0;
				-ms-transform-origin: 0 0;
				-webkit-transform-origin: 0 0;
			}

			.rod_paw_l_img {
				margin-top: -0.05rem;
				width: 1.3rem;
				height: 2rem;
			}

			.rod_paw_r_img {
				margin-top: -0.05rem;
				width: 1.3rem;
				height: 2rem;
			}
		}

		.underpan {
			position: absolute;
			width: 100%;
			height: 6rem;
			bottom: 20px;
			overflow: visible;

			.shadowContainer {
				/* width: 2.5rem;
				height: 2.5rem;
				overflow: hidden; */

				.shadow {
					position: absolute;
					left: 38px;
					bottom: 0.9rem;
					width: 3.2rem;
					height: 1.9rem;
					background-image: url('~@/assets/bg/shadow.png');
					background-size: 100% 100%;
					filter:alpha(opacity=50);  
					-moz-opacity: 0.7;  
					-khtml-opacity: 0.7;  
					opacity: 0.7;

					/* border-radius: 50%;
					background-color: rgba(0, 0, 0, 0.3);
					transform:rotateX(125deg);
					-webkit-transform:rotateX(125deg); */
				}
			}

			.img {
				width: 2.5rem;
				height: 3.5rem;  
			}

			.wawa_wrapper {
				position: absolute;

				.img {
					position: relative;
				}

				.shadowImg {
					position: absolute;
					width: 2.5rem;
					height: 1.4rem;
					z-index: 1;
					background-image: url('~@/assets/bg/shadow.png');
					background-repeat: no-repeat;
					background-size: 98% 98%;
					filter:alpha(opacity=50);  
					-moz-opacity: 0.7;  
					-khtml-opacity: 0.7;  
					opacity: 0.7;
					bottom: -0.2rem;
					left: 0;
				}

				.expression {
					position: absolute;
					z-index: 7;
					width: 1.8rem;
					height: 1.5rem;
					top: -0.5rem;
					right: -0.5rem;

					.img {
						width: 100%;
						height: 100%;
					}
				}
			}

			.wawa_1_wrapper {
				/* bottom: 0.2rem;
				left: 4rem; */
				z-index: 6;
				
				.img {
					z-index: 6;
				}

			}

			.wawa_2_wrapper {
				/* bottom: 0.2rem;
				left: 7rem; */
				z-index: 6;
				
				.img {
					z-index: 6;
				}

			}

			.wawa_3_wrapper {
				/* bottom: 0.2rem;
				left: 10rem; */
				z-index: 6;
				
				.img {
					z-index: 6;
				}

			}

			.wawa_4_wrapper {
				/* bottom: 2.3rem;
				left: 3.5rem; */
				z-index: 2;
				
				.img {
					z-index: 2;
				}

			}

			.wawa_5_wrapper {
				/* bottom: 2.3rem;
				left: 6rem; */
				z-index: 2;
				
				.img {
					z-index: 2;
				}

			}

			.wawa_6_wrapper {
				/* bottom: 2.3rem;
				left: 8.5rem; */
				z-index: 2;
				
				.img {
					z-index: 2;
				}

			}
		}
	}
</style>