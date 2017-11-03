<template>
	<section class="luckValue">
		<div class="left">
			<img src="~@/assets/luckValue/gold-ico.png" class="goldIcon">
			<span class="goldNum">{{wawaJiGold}}</span>
		</div>
		<div class="right">
			<p class="info">幸运值 : {{luckyValue}}/100</p>
			<div class="value" ref="barValue">
				<div class="bubble" ref="bubble" v-show="show">
					<div class="rule">
						<p class="rule1">幸运值+{{bubble_luckValue}}</p>
						<p class="rule2">满100时必中</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				// show: false
			}
		},
		computed: {
			wawaJiGold() {
				return this.$store.state.info.wawaJiGold;
			},
			luckyValue() {
				// console.log(this.$store.state.info.luckyValue)
				if(this.$store.state.info.luckyValue < 70) {
					let len = 9.2 * (this.$store.state.info.luckyValue / 100);
					$(this.$refs.barValue).css('width', len + 'rem');
					$(this.$refs.bubble).css('right', '-4rem');
				}else {
					let len = 9.2 * (this.$store.state.info.luckyValue / 100);
					$(this.$refs.barValue).css('width', len + 'rem');
					$(this.$refs.bubble).css('right', '-1rem');
				}
				
				return this.$store.state.info.luckyValue;
			},
			show() {
				return this.$store.state.modal.showBubble;
			},
			bubble_luckValue() {
				return this.$store.state.modal.bubble_luckValue;
			}
		},
		mounted() {
			let len = 9.3 * (this.$store.state.info.luckyValue / 100);
			$(this.$refs.barValue).css('width', len + 'rem');
		}
	}
</script>

<style scoped lang="less"> 
	.luckValue {
		height: 8rem;
		position: relative;
		z-index: 2;
		background-color: #f26fa5;

		.left {
			display: inline-block;
			width: 2.5rem;
			height: 1rem;
			background-image: url('~@/assets/luckValue/gold-bg.png');
			background-size: contain;
			background-repeat: no-repeat;
			margin: 0.1rem 0 0 1.3rem;

			.goldIcon {
				display: inline-block;
				width: 0.8rem;
				height: 0.8rem;
				position: relative;
				top: 0.1rem;
				margin-left: 0.2rem;
			}

			.goldNum {
				font-size: 0.65rem;
				color: #fff;
				position: relative;
				top: -0.05rem;
			}
		}

		.right {
			display: inline-block;
			width: 9.5rem;
			height: 1rem;
			background-image: url('~@/assets/luckValue/price-bg.png');
			background-size: 9.5rem 1rem;
			background-repeat: no-repeat;
			position: relative;
			top: 0.2rem;
			margin-left: 0.3rem;

			.info {
				float: right;
				color: #000;
				font-weight: 600;
				font-size: 0.6rem;
				position: relative;
				z-index: 10;
				top: 0.08rem;
				right: 0.5rem;
			}

			.value {
				width: 0rem;
				height: 0.7rem;
				margin-top: 0.13rem;
				margin-left: 0.1rem;
				border-radius: 1rem;
				background-image: url('~@/assets/luckValue/price.jpg');
				filter:alpha(opacity=50);  
				/* -moz-opacity: 0.5;  
				-khtml-opacity: 0.5;  
				opacity: 0.5; */
				position: relative;

				.bubble {
					width: 6.3rem;
					height: 4.7rem;
					background-image: url('~@/assets/luckValue/frame-box.png');
					background-size: cover;
					background-repeat: no-repeat;
					position: absolute;
					top: -4.5rem;
					right: -4rem;
					z-index: 2;
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
</style>