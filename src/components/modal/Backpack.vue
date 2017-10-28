<template>
	<section class="backpack" v-if="show">
		<div class="pannel">
			<div class="title">
				<img src="~@/assets/modal/box-bt05.png" class="img_title">
				<img src="~@/assets/modal/close.png" class="img_close" @click="close">
			</div>
			<div class="tabs">
				<div class="tab" @click="change('myWaWa')">
					<img src="~@/assets/modal/menu-bg01.png" class="img" v-if="active === 'myWaWa'">
					<img src="~@/assets/modal/menu-bg02.png" class="img" v-else>
					<span class="text">我的娃娃</span>
				</div>
				<div class="tab" @click="change('extractRecords')">
					<img src="~@/assets/modal/menu-bg02.png" class="img" v-if="active === 'myWaWa'">
					<img src="~@/assets/modal/menu-bg01.png" class="img" v-else>
					<span class="text">提取记录</span>
				</div>
			</div>
			<div class="content" v-if="active === 'myWaWa'">
				<div class="list">
					<div class="item" :class="{item1:index%3===0, item2:index%3===1, item3:index%3===2}" v-for="(item, index) in myWaWaList" :key="index">
						<div class="imgContainer">
							<img :src="'http://' + item.pic" class="img">
						</div>
						<div class="extractWaWa" @click="extractWaWa(item.goods_id)">
							<img src="~@/assets/modal/an-ico01.png" class="img">
						</div>
					</div>
					
				</div>
			</div>
			<div class="extractRecordsContent" v-else>
				<div class="title">
					<div class="extractContent">
						<span class="text">提取内容</span>
					</div>
					<div class="currentState">
						<span class="text">当前状态</span>
					</div>
				</div>
				<div class="list">
					<div class="item" v-for="(item, index) in extractRecords" :key="index">
						<div class="extractContent">
							<span class="text">布娃娃</span>
						</div>
						<div class="currentState">
							<span class="text">发送中</span>
						</div>
					</div>
					<div class="item">
						<div class="extractContent">
							<span class="text">布娃娃</span>
						</div>
						<div class="currentState">
							<span class="text">发送中</span>
						</div>
					</div>
					<div class="item">
						<div class="extractContent">
							<span class="text">布娃娃</span>
						</div>
						<div class="currentState">
							<span class="text suc">成功</span>
						</div>
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
				active: 'myWaWa',
				myWaWaList: [],
				extractRecords: []
			}
		},
		mounted() {
			this.loadData();
		},
		methods: {
			loadData() {
				let option = {
					url: 'api/rucksack?token=' + sessionStorage.token,
					type: 'GET',
					success: function(result, status, xhr) {
						if(result.code === 1) {
							this.myWaWaList = result.data;
						}
					}.bind(this)
				};

				myAjax(option);

				let option2 = {
					url: 'api/withdrawlog?token=' + sessionStorage.token,
					type: 'POST',
					success: function(result, status, xhr) {
						if(result.length > 0) {
							this.extractRecords = result;
						}
					}.bind(this)
				};

				myAjax(option2);
			},
			close() {
				this.$store.commit('modal/setBackpack', {
					showBackpack: false
				});
			},
			change(tab) {
				if(tab === 'myWaWa') {
					this.active = 'myWaWa';
				}else {
					this.active = 'extractRecords';
				}
			},
			extractWaWa(goods_id) {

			}
		},
		computed: {
			show() {
				if(this.$store.state.modal.showBackpack === true) {
					this.loadData();
				}

				return this.$store.state.modal.showBackpack;
			}
		}
	}
</script>

<style scoped lang="less">  
	.backpack {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		z-index: 20;
		text-align: center;

		.pannel {
			position: absolute;
			width: 95%;
			height: 90%;
			top: 5%;
			left: 50%;
			margin-left: -47.5%;
			background-image: url('~@/assets/modal/box-bg02.png');
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

			.tabs {
				width: 100%;
				height: 1.6rem;
				margin-top: 0.3rem;
				text-align: center;

				.tab {
					display: inline-block;
					width: 35%;
					height: 100%;
					margin: 0 0.2rem 0 0.2rem;
					overflow: hidden;

					.img {
						width: 100%;
						height: 100%;
					}

					.text {
						display: inline-block;
						position: relative;
						top: -1.1rem;
						font-size: 0.65rem;
						font-weight: 600;
						color: #fff;
					}
				}
			}

			.content {
				width: 90%;
				height: 77%;
				margin-left: 5%;
				background-color: #f2cd5b;
				border-radius: 1rem;
				overflow-y: scroll;

				.list {
					padding: 0.8rem 0.5rem;
					height: 90%;
					font-size: 0;

					.item {
						display: inline-block;
						width: 28%;
						height: 5rem;

						.imgContainer {
							width: 100%;
							height: 2.8rem;
							border-radius: 0.3rem;
							background-color: #fff;
							text-align: center;
							padding-top: 0.2rem;

							.img {
								width: 60%;
								height: 90%;
								margin: 0 auto;
							}
						}

						.extractWaWa {
							width: 100%;
							height: 1.2rem;
							margin-top: 0.4rem;

							.img {
								width: 100%;
								height: 100%;
							}
						}
					}

					.item1 {
						margin-right: 8%;
					}

					.item2 {
						margin-right: 8%;
					}
				}
			}

			.extractRecordsContent {
				width: 90%;
				height: 77%;
				margin-left: 5%;
				background-color: #f2cd5b;
				border-radius: 1rem;
				overflow-y: scroll;

				.title {
					height: 1.5rem;
					line-height: 1.5rem;
					margin-top: 0.3rem;
					font-size: 0;
					color: #2E2B2B;
					padding-bottom: 0.2rem;
					border-bottom: 1px solid #ddbe66;

					.extractContent {
						width: 50%;
						display: inline-block;
						font-size: 0.7rem;
						font-weight: 500;
					}

					.currentState {
						width: 50%;
						display: inline-block;
						font-size: 0.7rem;
						font-weight: 500;
					}
				}

				.list {
					.item {
						height: 1.3rem;
						line-height: 1.3rem;
						margin-top: 0.3rem;
						font-size: 0;
						color: #B3681B;
						padding-bottom: 0.2rem;
						border-bottom: 1px solid #ddbe66;

						.extractContent {
							width: 50%;
							display: inline-block;
							font-size: 0.68rem;
							font-weight: 500;
						}

						.currentState {
							width: 50%;
							display: inline-block;
							font-size: 0.68rem;
							font-weight: 500;

							.suc {
								color: #56b810;
							}
						}
					}
				}
			}
		}
	}
</style>