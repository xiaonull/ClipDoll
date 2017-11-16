<template>
	<section class="loginReward" v-if="show">
		<div class="pannel">
			<div class="title">
				<img src="~@/assets/modal/box-bt09.png" class="img_title">
				<img src="~@/assets/modal/close.png" class="img_close" @click="close">
			</div>
			<div class="content">
				<div class="list">
					<div class="item" v-for="item in rewardList" :key="item.mission_id">
						<img :src="'http://' + item.mission_icon" class="icon">
						<div class="main">
							<span class="text">{{item.mission_title}}</span>
							<span class="reward">{{item.awards_contents}}</span>
						</div>
						<span class="state reach" v-if=" item.mission_status === '1' " @click="receive(item.mission_id)">
							<img src="~@/assets/modal/receive.png" class="img">
						</span>
						<span class="state" :class="{green : item.mission_status === '2'}" v-else>
							{{item.mission_status === '0' ? '未达成' : ''}}
							{{item.mission_status === '2' ? '已领取' : ''}}
						</span>
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
				rewardList: []
			}
		},
		computed: {
			show() {
				if(this.$store.state.modal.showLoginReward === true) {
					this.init();
				}

				return this.$store.state.modal.showLoginReward;
			}
		},
		methods: {
			init() {
				let option = {
					url: 'api/daymission?token=' + sessionStorage.token,
					type: 'GET',
					success: function(result, status, xhr) {
						if(result.code === 1) {
							this.rewardList = [];
							this.rewardList = result.data;
						}
					}.bind(this)
				};

				myAjax(option);
			},
			close() {
				this.$store.commit('modal/setLoginReward', {
					showLoginReward: false
				});

				this.$store.commit('modal/setNoticeBoard', {
					showNoticeBoard: true
				});
			},
			receive(mission_id) {
				let option = {
					url: 'api/finishmission/' + mission_id + '?token=' + sessionStorage.token,
					type: 'POST',
					success: function(result, status, xhr) {
						if(result.code === 1) {
							this.$store.commit('modal/setMsg', {
								msg: '领取成功！',
								display: true
							});
							
							// 刷新任务状态
							this.init();

							// 刷新用户数据
							let data = JSON.parse(sessionStorage.loginUrlData);
							let option = {
								url: 'api/login',
								type: 'POST',
								data: data,
								success: function(result, status, xhr) {
									if(result.code === 1) {
										sessionStorage.token = result.token;
										sessionStorage.userData =  JSON.stringify(result.user);

										let userData = JSON.parse(sessionStorage.userData);
										this.$store.commit('info/setUserGold', userData.coin);
									}
								}.bind(this)
							};

							myAjax(option);

							let t = setTimeout(() => {
								this.$store.commit('modal/resetMsg');
								clearTimeout(t);
							}, 2000);
						}
					}.bind(this)
				};

				myAjax(option);
			}
		}
	}
</script>

<style scoped lang="less"> 
	.loginReward {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		z-index: 20;
		text-align: center;

		.pannel {
			position: absolute;
			width: 95%;
			height: 80%;
			top: 10%;
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
				height: 85%;
				margin-left: 5%;
				margin-top: 0.2rem;
				background-color: #f2cd5b;
				border-radius: 0.2rem;
				overflow-y: scroll;

				.list {
					padding: 0.6rem 0.5rem 0 0.5rem;
					height: 93%;

					.item {
						position: relative;
						width: 100%;
						height: 2.5rem;
						background-color: #ffe7ab;
						background-image: url('~@/assets/modal/task-bg.jpg');
						background-size: 1% 100%;
						border-radius: 0.3rem;
						margin-bottom: 0.5rem;
						text-align: left;

						.icon {
							display: inline-block;
							width: 2.3rem;
							height: 2.3rem;
							margin: 0.1rem;
							position: relative;
							top: 0.1rem;
						}

						.main {
							display: inline-block;
							position: relative;
							top: -1.1rem;
							margin-left: 0.4rem;

							.text {
								display: block;
								font-size: 0.7rem;
								color: #4C2C0B;
								font-weight: 500;
								margin-left: -0.2rem;
								position: relative;
								top: 0.4rem;
							}

							.reward {
								display: inline-block;
								margin-left: -0.2rem;
								position: relative;
								top: 0.6rem;
								color: #b9951d;
								font-size: 0.65rem;
							}
						}

						.state {
							display: inline-block;
							font-size: 0.7rem;
							position: absolute;
							right: 0.5rem;
							top: 0.8rem;
							color: #4C2C0B;
						}

						.reach {
							width: 2.1rem;
							height: 1rem;
							
							.img {
								width: 100%;
								height: 100%;
							}
						}

						.green {
							color: #14bf0c;
						}
					}
				}

			}
		}
	}
</style>