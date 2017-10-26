<template>
	<section class="gameBox">
		<div class="main" ref="gameBox">
			<!-- 抓杆 -->
			<div class="rod" ref="rod">
				<!-- 抓杆的柄 -->
				<div class="rod_handle_container" ref="rod_handle_container">
					<div class="rod_handle" v-for="i in rod_length"></div>
				</div>
				<!-- 盖子 -->
				<div class="rod_lid">
					<img src="~@/assets/rod/hooktu02.png" class="rod_lid_img">
				</div>
				<!-- 爪子 -->
				<div class="rod_paws">
					<div class="rod_paw_l" ref="rod_paw_l">
						<img src="~@/assets/rod/hooktu03.png" class="rod_paw_l_img">
					</div>
					<div class="rod_paw_r" ref="rod_paw_r">
						<img src="~@/assets/rod/hooktu04.png" class="rod_paw_r_img">
					</div>
				</div>
			</div>
			<!-- 底盘装娃娃 -->
			<div class="underpan" ref="underpan">
				<div class="shadowContainer">
					<div class="shadow" ref="shadow"></div>
				</div>
				<img src="~@/assets/wawa/wawa-tu.png" class="img wawa wawa_1">
				<img src="~@/assets/wawa/wawa-tu.png" class="img wawa wawa_2">
				<img src="~@/assets/wawa/wawa-tu.png" class="img wawa wawa_3">
				<img src="~@/assets/wawa/wawa-tu.png" class="img wawa wawa_4">
				<img src="~@/assets/wawa/wawa-tu.png" class="img wawa wawa_5">
				<img src="~@/assets/wawa/wawa-tu.png" class="img wawa wawa_6">
			</div>
		</div>
		<div class="wawaji_subTop"></div>
		<div class="wawaji_subLeft">
			<img :src="light_img" class="wawaji_top_light">
		</div>
		<div class="wawaji_subRight">
			<img :src="light_img" class="wawaji_top_light">
		</div>
		<div class="wawaji_subBottom"></div>
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
				light_img_index: 1
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
			},
			init() {
				let self = this;

				window.GameBox = function GameBox() {
					
				}
				GameBox.prototype.getHeight = function() {
					return $(self.$refs.gameBox).css('height');
				}
			},
			changeLightImg() {
				setInterval(() => {
					this.light_img_index = (this.light_img_index + 1) % 3 === 0 ? 3 : (this.light_img_index + 1) % 3 ;
				}, 2000);
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
					$(this.$refs.shadow).css('top', '-=1px');
				}
			},
			move_Front() {
				if(this.$store.state.rod.moveToFront === 'can') {
					$(this.$refs.shadow).css('top', '+=1px');
				}
			},
			grab() {
				let $shadow =  $(this.$refs.underpan).find('.shadow');
				let shadowLeft = $shadow.css('left').slice(0, $shadow.css('left').length - 2) * 1 + $shadow.css('width').slice(0, $shadow.css('width').length - 2) / 2;
				let shadowBottom = $shadow.css('bottom').slice(0, $shadow.css('bottom').length - 2);

				let $wawas = $(this.$refs.underpan).find('.wawa');
				for(let i = 0, j = $wawas.length; i < j; i++) {
					let $wawa = $wawas.eq(i);
					let wawaLeft = $wawa.css('left').slice(0, $wawa.css('left').length - 2) * 1 + $wawa.css('width').slice(0, $wawa.css('width').length - 2) / 2;
					let wawaBottom = $wawa.css('bottom').slice(0, $wawa.css('bottom').length - 2);
					
					// 判斷阴影的下边中点的位置与娃娃图片的下边中点的位置是否在一定范围内
					let distance = Math.sqrt(Math.pow((wawaLeft - shadowLeft), 2) + Math.pow((wawaBottom - shadowBottom), 2));
					console.log(distance);

					let phoneWidth = document.documentElement.clientWidth; 
					let level1 = 0;
					let level2 = 0;
					let level3 = 0;
					if(phoneWidth <= 410) {
						level1 = 20;
						level2 = 23;
						level3 = 25;
					}else {
						level1 = 23;
						level2 = 28;
						level3 = 32;
					}


					if(distance < level1) {
						// 准确抓到，有90%的概率向后台请求抓起概率
						// level表示抓取的准确度，在抓取失败时准确度越高能抓起的高度越高；catch表示能否完全抓起，由后台控制
						htsBus.$emit('grabing', {
							level: 1,
							catch: true,
							$obj: $wawa
						});
						return;
					} else if(distance < level2) {
						// 较准确抓到，有70%的概率向后台请求抓起概率
						htsBus.$emit('grabing', {
							level: 2,
							catch: true,
							$obj: $wawa
						});
						return;
					} else if(distance < level3) {
						// 较准确抓到，有50%的概率向后台请求抓起概率
						htsBus.$emit('grabing', {
							level: 3,
							catch: false,
							$obj: $wawa
						});
						return;
					}
				}

				// 完全没抓到
				htsBus.$emit('grabing', {
					level: 4,
					catch: false,
					$obj: null
				});
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
					$(this.$refs.rod).css('transform', 'scale(' + val.scale + ',' + val.scale + ')');
				},
				deep: true
			},
			grabWaWa: {
				handler: function (val, oldVal) {
					if(val.grabWaWa === true) {
						let n = 0;
						let interval = setInterval(() => {
							n += 1;
							$(this.$refs.rod_paw_l).css({
								'transform': 'rotate(-' + n + 'deg)'
							});
							$(this.$refs.rod_paw_r).css({
								'transform': 'rotate(' + n + 'deg)'
							});

							if(n >= 16) {
								clearInterval(interval);
							}
						}, 125);
					}

					if(val.grabWaWa === false) {
						let n = 16;
						let interval = setInterval(() => {
							n -= 1;
							$(this.$refs.rod_paw_l).css({
								'transform': 'rotate(-' + n + 'deg)'
							});
							$(this.$refs.rod_paw_r).css({
								'transform': 'rotate(' + n + 'deg)'
							});

							if(n <= 0) {
								clearInterval(interval);
							}
						}, 125);
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
		}
	}
</script>

<style scoped lang="less">
	.gameBox {
		width: 100%;
		height: 63%;
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
			width: 28px;
			height: 100%;
			background-image: url('~@/assets/bg/box-left.png');
			background-repeat: repeat;
			background-position: left;
			background-size: cover;
		}

		.wawaji_subRight {
			position: absolute;
			z-index: 8;
			right: 0;
			width: 28px;
			height: 100%;
			background-image: url('~@/assets/bg/box-right.png');
			background-repeat: repeat;
			background-position: right;
			background-size: cover;
		}

		.wawaji_top_light {
			width: 40px;
			height: 90%;
			margin-left: -6px;
		}

		.wawaji_subBottom {
			position: absolute;
			z-index: 7;
			bottom: 10px;
			width: 100%;
			height: 45px;
			background-image: url('~@/assets/bg/box-bottom.png');
			background-repeat: repeat;
			background-position: center;
			background-size: cover;
		}

		.maskBottom {
			position: absolute;
			z-index: 2;
			bottom: 0;
			width: 100%;
			height: 1.85rem;
			background-color: #f26fa5;
		}

		.main {
			position: absolute;
			top: 25px;
			left: 28px;
			right: 28px;
			bottom: 25px;
			background-color: #34ccdd;
			background-image: url('~@/assets/bg/house.jpg');
			background-repeat: no-repeat;
			background-position: center;
			background-size: cover;
		}

		.rod {
			position: relative;
			z-index: 5;
			left: 80px;
			margin-top: -50px;

			.rod_handle {
				width: 5px;
				height: 1px;
				background-image: url('~@/assets/rod/hooktu01.jpg');
				background-position: center;
				background-size: contain;
			}

			.rod_lid_img {
				width: 2rem;
				height: 1.5rem;
				margin-left: -0.95rem;	
			}

			.rod_paws {
				width: 2.7rem;;
				height: 4rem;
				margin-left: -1.3rem;
				overflow: hidden;
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
				width: 0.8rem;
				height: 1.4rem;
			}

			.rod_paw_r_img {
				width:0.8rem;
				height: 1.4rem;
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
					left: 52px;
					top: 3rem;
					width: 2.5rem;
					height: 2.5rem;
					border-radius: 50%;
					background-color: rgba(0, 0, 0, 0.3);
					transform:rotateX(125deg);
					-webkit-transform:rotateX(125deg);
				}
			}

			.img {
				width: 2.5rem;
				height: 3.5rem;
			}

			.wawa {
				position: absolute;
			}

			.wawa_1 {
				top: 2.3rem;
				left: 4rem;
				z-index: 6;
				-ms-transform:scale(1.1, 1.1); 
				-webkit-transform: scale(1.1, 1.1); 
				transform: scale(1.1, 1.1); 
			}

			.wawa_2 {
				top: 2.3rem;
				left: 7rem;
				z-index: 6;
				-ms-transform:scale(1.1, 1.1); 
				-webkit-transform: scale(1.1, 1.1); 
				transform: scale(1.1, 1.1); 
			}

			.wawa_3 {
				top: 2.3rem;
				left: 10rem;
				z-index: 6;
				-ms-transform:scale(1.1, 1.1); 
				-webkit-transform: scale(1.1, 1.1); 
				transform: scale(1.1, 1.1); 
			}

			.wawa_4 {
				top: 0;
				left: 3.5rem;
			}

			.wawa_5 {
				top: 0;
				left: 6rem;
			}

			.wawa_6 {
				top: 0;
				left: 8.5rem;
			}
		}

	}
</style>