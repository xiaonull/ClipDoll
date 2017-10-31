<template>
	<section class="recharge" v-if="show">
		<div class="pannel">
			<div class="title">
				<img src="~@/assets/modal/box-bt01.png" class="img_title">
				<img src="~@/assets/modal/close.png" class="img_close" @click="close">
			</div>
			<div class="content">
				<div class="list">
					<div class="item" v-for="item in rechargeData" :key="item.id">
						<img src="~@/assets/modal/gold-ico02.png" class="icon">
						<span class="num">{{item.coin_num}}<span class="green" v-if="item.award_num !== 0">+{{item.award_num}}</span>金币</span>
						<img src="~@/assets/modal/buy-ico.png" class="img_buy" @click="buyGold(item.id)">
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
			buyGold(id) {
				let option = {
					url: 'api/pay/' + id + '?token=' + sessionStorage.token,
					type: 'GET',
					success: function(result, status, xhr) {
						console.log(result);
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
		background-color: rgba(0, 0, 0, 0.3);
		z-index: 20;
		text-align: center;

		.pannel {
			position: absolute;
			width: 95%;
			height: 58%;
			top: 20%;
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
				width: 90%;
				height: 77%;
				margin-left: 5%;
				margin-top: 0.2rem;
				background-color: #f2cd5b;
				border-radius: 1rem;
				overflow-y: scroll;

				.list {
					padding: 0.6rem 0.5rem 0 0.5rem;
					height: 93%;

					.item {
						position: relative;
						width: 100%;
						height: 1.8rem;
						line-height: 1.8rem;
						background-color: #ffe7ab;
						border-radius: 3rem;
						margin-bottom: 0.6rem;
						text-align: left;

						.icon {
							display: inline-block;
							width: 1.1rem;
							height: 1.4rem;
							margin-left: 0.7rem;
							position: relative;
							top: 0.2rem;
						}

						.num {
							display: inline-block;
							font-size: 0.8rem;
							color: #62370B;
							font-weight: 500;
							position: relative;
							top: -0.3rem;
							margin-left: 0.3rem;

							.green {
								color: #598C09;
							}
						}

						.img_buy {
							display: inline-block;
							width: 3rem;
							height: 1.2rem;
							position: absolute;
							right: 0.5rem;
							top: 0.33rem;
						}
					}
				}

			}

		}
	}
</style>


