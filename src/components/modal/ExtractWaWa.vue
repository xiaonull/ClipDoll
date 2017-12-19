<template>
	<section class="extractWaWa" v-if="show">
		<div class="pannel">
			<div class="title">
				<img src="~@/assets/modal/close.png" class="img_close" @click="close">
			</div>
			<div class="main">
				<div class="header">
					<h2>提取娃娃</h2>
					<p>请确认提取数量</p>
				</div>
				<div class="item" v-for="item in receiptWaWas" :key="item.goods_id">
					<div class="left">
						<span class="name">{{item.name}}</span>
					</div>
					<div class="right">
						<div class="minusBtn" @click="minus(item.rucksack_id, item.goods_id, item.num)"></div>
						<div class="numBtn">
							<div class="num">{{item.num}}</div>
						</div>
						<div class="plusBtn" @click="add(item.rucksack_id, item.goods_id, item.num)"></div>
					</div>
				</div>
			</div>
			<div class="next">
				<div class="text">
					提取两个娃娃包邮哦~
				</div>
				<img src="~@/assets/modal/an-ico17.png" class="nextImg" @click="next">
			</div>
			<div class="payPannel" v-if="showPayPannel">
				<div class="payPannel_main">
					<p class="text1">需要支付99金币作为邮费</p>
					<p class="text2">（一次提取2个娃娃包邮哦~）</p>
				</div>
				<div class="coin">
					<img src="~@/assets/modal/gold-ico.png" class="icon">
					<span>金币余额：{{userGold}}</span>
				</div>
				<div class="bottom">
					<div class="payBtn" @click="toPay">
						<img src="~@/assets/modal/an-ico15.png" class="img">
					</div>
					<div class="continueBtn" @click="close">
						<img src="~@/assets/modal/an-ico16.png" class="img">
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				showPayPannel: false
			}
		},
		methods: {
			close() {
				this.showPayPannel = false;
				this.$store.commit('modal/setExtractWaWa', false);
			},
			minus(rucksack, goods_id, num) {
				if(num <= 0) {
					return;
				}

				this.$store.commit('modal/setReceiptWaWas', {
					type: 'minus',
					rucksack: rucksack,
					goods_id: goods_id,
				});
			},
			add(rucksack, goods_id, num) {
				this.$store.commit('modal/setReceiptWaWas', {
					type: 'add',
					rucksack: rucksack,
					goods_id: goods_id,
				});
			},
			next() {
				if(this.$store.state.modal.receiptWaWas.length <= 0) {
					this.$store.commit('modal/setMsg', {
						msg: '请先选择要提取的娃娃',
						display: true
					});
					let t = setTimeout(() => {
						this.$store.commit('modal/resetMsg');
						clearTimeout(t);
					}, 2000);
					return;
				}

				if((this.$store.state.modal.receiptWaWas.length >= 2 || this.$store.state.modal.receiptWaWas[0].num >= 2)) {
					this.$store.commit('modal/setReceiptInfo', {
						showReceiptInfo: true
					});
					this.close();
				}else {
					this.showPayPannel = true;
				}

			},
			toPay() {
				if(!(this.$store.state.modal.receiptWaWas.length >= 2 || this.$store.state.modal.receiptWaWas[0].num >= 2)) {
					if(this.$store.state.info.userGold < 99) {
						this.$store.commit('modal/setMsg', {
							msg: '金币不足，请充值',
							display: true
						});
						let t = setTimeout(() => {
							this.$store.commit('modal/resetMsg');
							clearTimeout(t);
						}, 2000);
						return;
					}
				}

				this.$store.commit('modal/setReceiptInfo', {
					showReceiptInfo: true
				});
				this.close();
			}
		},
		computed: {
			show() {
				return this.$store.state.modal.showExtractWaWa;
			},
			receiptWaWas() {
				return this.$store.state.modal.receiptWaWas;
			},
			userGold() {
				return this.$store.state.info.userGold;
			}
		}
	}
</script>

<style scoped lang="less">
	.extractWaWa {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 30;

		.pannel {
			position: absolute;
			width: 90%;
			height: 80%;
			top: 10%;
			left: 50%;
			margin-left: -45%;

			.title {
				text-align: center;

				.img_close {
					position: absolute;
					top: 0.2rem;
					right: 0.2rem;
					width: 1.5rem;
					height: 1.5rem;
					z-index: 30;
				}

			}

			.header {
				text-align: center;
				color: #7e4d27;
				border-bottom: 1px dotted #c19f85;
				padding-bottom: 0.2rem;
				margin: 0 0.5rem 0.3rem 0.5rem;

				h2 {
					font-size: 0.9rem;
					font-weight: 500;
				}

				p {
					font-size: 0.5rem;
					color: #c19f85;
					margin-top: 0.2rem;
				}
			}

			.main {
				width: 90%;
				height: 86%;
				left: 5%;
				position: absolute;
				top: 4.5%;
				background-color: #fdffed;
				border-radius: 0.5rem;
				padding-top: 1.3rem;
				overflow-y: scroll;

				.item {
					height: 1.5rem;
					line-height: 1.5rem;
					margin: 0 0.5rem 0.3rem 0.5rem;
					padding-bottom: 0.2rem;
					border-bottom: 1px dotted #c19f85;

					.left {
						width: 50%;
						float: left;
						height: 1.5rem;
						line-height: 1.5rem;
						text-align: center;
					}

					.right {
						width: 50%;
						float: left;
						height: 1.5rem;
						line-height: 1.5rem;
						overflow: hidden;
						padding-top: 0.15rem;
						text-align: right;

						.minusBtn {
							display: inline-block;
							width: 1rem;
							height: 1rem;
							background-image: url('~@/assets/modal/minus.png');
							background-size: 100% 100%;
						}

						.numBtn {
							display: inline-block;
							width: 2rem;
							height: 1rem;
							line-height: 1rem;
							background-color: #e9dec0;
							border-radius: 0.2rem;
							border: 2px solid #e0c9b7;
							position: relative;
							top: 2px;
							text-align: center;

							.num {
								position: absolute;
								width: 2rem;
								height: 1rem;
								top: 0;
								left: 0;
							}
						}

						.plusBtn {
							display: inline-block;
							width: 1rem;
							height: 1rem;
							background-image: url('~@/assets/modal/add.png');
							background-size: 100% 100%;
						}
					}
				}
			}

			.next {
				position: absolute;
				bottom: 0;
				left: 50%;
				margin-left: -2.5rem;
				display: block;
				width: 5rem;
				height: 1.8rem;
				border-radius: 0.7rem;

				.text {
					position: absolute;
					bottom: 2rem;
					left: -0.2rem;
					width: 5.5rem;
					height: 1.8rem;
					line-height: 1.5rem;
					background-image: url('~@/assets/modal/dialog-box.png');
					background-size: 100% 100%;
					color: #7e4d27;
					font-size: 0.5rem;
					text-align: center;
				}

				.nextImg {
					width: 100%;
					height: 100%;
					border-radius: 0.7rem;
				}
			}
		}

		.payPannel {
			position: absolute;
			top: 45%;
			left: 50%;
			z-index: 35;
			width: 12rem;
			height: 6rem;
			margin-left: -6rem;
			margin-top: -3rem;
			background-image: url('~@/assets/modal/dialog-box01.png');
			background-size: 100% 100%;

			.payPannel_main {
				margin-top: 1.2rem;
				text-align: center;

				.text1 {
					color: #7e4d27;
					font-size: 0.6rem;
				}

				.text2 {
					color: #F63F4E;
					font-size: 0.5rem;
				}
			}

			.coin {
				height: 1.5rem;
				line-height: 1.5rem;
				color: #7e4d27;

				.icon {
					display: inline-block;
					margin-left: 2.5rem;
					margin-right: 0.2rem;
					width: 1rem;
					height: 1rem;
					position: relative;
					top: 0.3rem;
				}
			}

			.bottom {
				position: absolute;
				bottom: -0.2rem;
				left: 2rem;
				width: 8rem;
				height: 1.5rem;

				.payBtn {
					width : 2.8rem;
					height: 1.2rem;
					float: left;

					.img {
						width: 100%;
						height: 100%;
					}
				}

				.continueBtn {
					width : 2.8rem;
					height: 1.2rem;
					float: right;

					.img {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
</style>