<template>
	<section class="selectWawaJi" v-if="show">
		<img src="~@/assets/modal/cat.png" class="catImg">
		<div class="pannel">
			<div class="title">
				<img src="~@/assets/modal/close.png" class="img_close" @click="close">
			</div>
			<div class="main">
				<div class="item" :class="{item_L : index % 2 === 0, item_R : index % 2 === 1}" v-for="(item, index) in wawajiList" :key="item.id">
					<div class="wawaImg" @click="selectWawaji(item.id)">
						<img :src="'http://' + item.pic" class="img">
						<img :src="'http://' + item.tag_icon" class="tag_icon">
					</div>
					<div class="info">
						<h2 class="name">{{item.name}}</h2>
						<p class="text">{{item.coin}}金币/次 约{{item.spec}}厘米</p>
					</div>
				</div>
				<img src="~@/assets/modal/an-ico04.png" class="changeOtherWawaJi" @click="changeOtherWawaJi">
			</div>
		</div>
	</section>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				wawajiList: []
			}
		},
		mounted() {
			this.loadData();
		},
		computed: {
			show() {
				return this.$store.state.modal.showSelectWawaJi;
			}
		},
		methods: {
			close() {
				this.$store.commit('modal/setSelectWawaJi', {
					showSelectWawaJi: false
				});
			},
			loadData() {
				let option = {
					url: 'api/dollmachine?token=' + sessionStorage.token,
					type: 'GET',
					success: function(result, status, xhr) {
						if(result.code === 1) {
							this.wawajiList = result.data.slice(0, 4);
						}
					}.bind(this)
				};

				myAjax(option);
			},
			changeOtherWawaJi() {
				this.loadData();
			},
			selectWawaji(id) {
				let option = {
					url: 'api/selectdm/' + id + '?token=' + sessionStorage.token,
					type: 'GET',
					success: function(result, status, xhr) {
						if(result.code === 1) {
							htsBus.$emit('setCurrentWaWaList', result.data);
							this.$store.commit('info/setLuckyValue', result.lucky);
							this.$store.commit('info/setWawaJiGold', result.coin);
							this.close();
						}
					}.bind(this)
				};

				myAjax(option);
			}
		}
	}
</script>

<style scoped lang="less">
	.selectWawaJi {
		position: absolute;
		width: 100%;
		height: 100%;
		/* background-color: rgba(0, 0, 0, 0.3); */
		z-index: 20;

		.catImg {
			display: block;
			width: 40%;
			height: 16.7%;
			position: absolute;
			z-index: 21;
			top: 0;
			left: 50%;
			margin-left: -20%;
		}

		.pannel {
			position: absolute;
			width: 95%;
			height: 82%;
			top: 14.5%;
			left: 50%;
			margin-left: -47.5%;
			background-image: url('~@/assets/modal/box-bg03.png');
			background-size: 100% 100%;
			background-position: center;

			.title {
				text-align: center;

				.img_close {
					position: absolute;
					top: -0.2rem;
					right: -0.25rem;
					width: 1.5rem;
					height: 1.5rem;
					z-index: 30;
				}

			}

			.main {
				width: 90%;
				height: 86%;
				left: 5%;
				position: absolute;
				top: 4.5%;
				background-color: #fffada;
				border-radius: 0.5rem;
				padding-top: 1rem;
				overflow: hidden;

				.item {
					display: inline-block;
					width: 40%;
					height: 6.3rem;
					margin-bottom: 1rem;

					.wawaImg {
						position: relative;
						width: 100%;
						height: 4.5rem;
						background-color: #fff;
						border: 1px solid #ADADAD;
						border-radius: 0.5rem;

						.img {
							width: 80%;
							height: 80%;
							margin: 10% 10% 15% 10%;;
						}

						.tag_icon {
							position: absolute;
							width: 2rem;
							height: 0.8rem;
							top: 0.2rem;
							right: 0;
						}
					}

					.info {
						text-align: center;

						.name {
							font-size: 0.6rem;
							color: #b9a728;
							margin-top: 0.2rem;
						}

						.text {
							font-size: 0.4rem;
							color: #949393;
						}
					}
				}

				.item_L {
					float: left;
					margin-left: 7%;
				}

				.item_R {
					float: right;
					margin-right: 7%;
				}

				.changeOtherWawaJi {
					display: block;
					width: 5.5rem;
					height: 2rem;
					position: absolute;
					left: 50%;
					margin-left: -2.75rem;
					bottom: 0.5rem;
				}
			}
		}
	}
</style>

