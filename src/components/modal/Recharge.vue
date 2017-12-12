<template>
	<section class="recharge" v-if="show">
		<img src="~@/assets/modal/cat-bg.png" class="catImg">
		<div class="pannel">
			<div class="title">
				<img src="~@/assets/modal/box-bt01.png" class="img_title">
				<img src="~@/assets/modal/close.png" class="img_close" @click="close">
			</div>
			<div class="content">
				<div class="list">
					<div class="item" v-for="item in rechargeData" :key="item.id">
						<img :src="'http://' + item.pic" class="icon">
						<span class="num">{{item.coin_num}}<span class="green" v-if="item.award_num !== 0">+{{item.award_num}}</span>金币</span>
						<div class="img_buy" @click="buyGold(item.id)">
							<span class="price">{{item.price + '元'}}</span>
						</div>
					</div>
					<!-- <div class="item">
						<img src="~@/assets/modal/gold-ico02.png" class="icon">
						<span class="num">100金币</span>
						<img src="~@/assets/modal/price-an01.png" class="img_buy" @click="buyGold(100, 9.9)">
					</div>
					<div class="item">
						<img src="~@/assets/modal/gold-ico03.png" class="icon">
						<span class="num">200<span class="green">+10 </span>金币</span>
						<img src="~@/assets/modal/price-an02.png" class="img_buy" @click="buyGold(210, 19.9)">
					</div>
					<div class="item">
						<img src="~@/assets/modal/gold-ico04.png" class="icon">
						<span class="num">400<span class="green">+40 </span>金币</span>
						<img src="~@/assets/modal/price-an03.png" class="img_buy" @click="buyGold(440, 39.9)">
					</div>
					<div class="item">
						<img src="~@/assets/modal/gold-ico05.png" class="icon">
						<span class="num">1000<span class="green">+120 </span>金币</span>
						<img src="~@/assets/modal/price-an04.png" class="img_buy" @click="buyGold(1120, 99.9)">
					</div> -->
				</div>
			</div>
		</div>
	</section>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				rechargeData: []
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				let option = {
					url: 'api/rechargeamount?token=' + sessionStorage.token,
					type: 'GET',
					success: function(result, status, xhr) {
						if(result.code === 1) {
							this.rechargeData = sort_rechargeData(result.data);
							// let arr = sort_rechargeData(result.data);
							// for(let i = 0, j = arr.length; i < j; i++) {
							// 	this.rechargeData.push(arr[i]);
							// }
						}
					}.bind(this)
				};

				myAjax(option);
			},
			close() {
				this.$store.commit('modal/setRecharge', {
					showRecharge: false
				});
			},
			// buyGold(coin, price) {
			// 	let option = {
			// 		url: 'api/pay?token=' + sessionStorage.token,
			// 		type: 'POST',
			// 		data: {
			// 			coin: coin,
			// 			price: price
			// 		},
			// 		success: function(result, status, xhr) {
			// 			console.log(result);
			// 			if(result.code === 1) {
			// 				window.location.assign(result.url);
			// 			}
			// 		}.bind(this)
			// 	};

			// 	myAjax(option);
			// }
			buyGold(id) {
				$(window).off('beforeunload');

				let option = {
					url: 'api/pay/' + id + '?token=' + sessionStorage.token,
					type: 'GET',
					success: function(result, status, xhr) {
						console.log(result);
						if(result.code === 1) {
							window.location.assign(result.url);
						}
					}.bind(this)
				};

				myAjax(option);
			}
		},
		computed: {
			show() {
				return this.$store.state.modal.showRecharge;
			}
		}
	}
	
	// 冒泡排序根据价格从小到大排序
	function sort_rechargeData(arr) {
		for(let i = 0, j = arr.length - 1; i < j; i++) {
			for(let i2 = 0, j2 = arr.length - 1; i2 < j2; i2++) {
				if(arr[i2].price > arr[i2 + 1].price) {
					// 交换位置，大的在后面
					var temp = arr[i2];
					arr[i2] = arr[i2 + 1];
					arr[i2 + 1] = temp;
				}
			}
		}

		return arr;
	}
</script>

<style scoped lang="less"> 
	.recharge {
		position: absolute;
		width: 100%;
		height: 100%;
		/* background-color: rgba(0, 0, 0, 0.3); */
		z-index: 20;
		text-align: center;

		.catImg {
			display: block;
			width: 95%;
			position: absolute;
			top: -3%;
			left: 50%;
			margin-left: -47.5%;
		}

		.pannel {
			position: absolute;
			z-index: 25;
			width: 95%;
			height: 65%;
			top: 27%;
			left: 50%;
			margin-left: -47.5%;
			background-image: url('~@/assets/modal/box-bg01.png');
			background-size: 100% 100%;
			background-position: center;

			.title {
				text-align: center;

				.img_title {
					display: inline-block;
					width: 9rem;
					margin-top: -0.8rem;
				}

				.img_close {
					position: absolute;
					top: -0.2rem;
					right: -0.25rem;
					width: 1.5rem;
					height: 1.5rem;
				}

			}

			.content {
				width: 86%;
				height: 77%;
				margin-left: 7%;
				margin-top: 0.2rem;
				background-color: #f2cd5b;
				border-radius: 0.3rem;
				overflow-y: hidden;

				.list {
					padding: 0.6rem 0.3rem 0 0.3rem;
					height: 93%;
					overflow-y: scroll;

					.item {
						position: relative;
						width: 100%;
						height: 2rem;
						line-height: 2rem;
						background-color: #ffe7ab;
						border-radius: 0.4rem;
						margin-bottom: 0.6rem;
						text-align: left;
						border: 1px solid #fff1c6;

						background-image: url('~@/assets/modal/price-bg.png');
						background-size: 100% 100%;
						margin-bottom: 0.5rem;

						.icon {
							display: inline-block;
							width: 2.3rem;
							height: 2.1rem;
							position: relative;
							top: 0.1rem;
							left: 0.1rem;
						}

						.num {
							display: inline-block;
							font-size: 0.6rem;
							color: #62370B;
							font-weight: 500;
							position: relative;
							top: -0.85rem;
							margin-left: 0.3rem;

							.green {
								color: #17a502;
							}
						}

						.img_buy {
							display: inline-block;
							width: 3.2rem;
							height: 1.35rem;
							line-height: 1.35rem;
							text-align: center;
							position: absolute;
							right: 0.5rem;
							top: 0.35rem;
							background-image: url('~@/assets/modal/priceBg.png');
							background-size: 100% 100%;

							.price {
								font-size: 0.6rem;
								color: #fff;
							}
						}
					}
				}

			}

		}
	}
</style>


