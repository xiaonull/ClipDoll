<template>
	<section class="task" v-if="show">
		<div class="pannel">
			<div class="title">
				<img src="~@/assets/modal/box-bt04.png" class="img_title">
				<img src="~@/assets/modal/close.png" class="img_close" @click="close">
			</div>
			<div class="header">
				<div class="main">
					<span class="state" v-if="status === 0">未达成</span>
					<span class="state reach" v-else @click="exchange">
						<img src="~@/assets/modal/receive.png" class="img">
					</span>
				</div>
				<div class="bar">
					<span class="barInfo"><span class="value">{{current_point}}</span>/<span class="total">{{max_point}}</span></span>
					<div class="subBar" ref="subBar"></div>
				</div>
			</div>
			<div class="content">
				<div class="list">
					<div class="item" v-for="item in taskList" :key="item.mission_id">
						<img :src="'http://' + item.mission_icon" class="icon">
						<div class="main">
							<span class="text">{{item.mission_title}}({{item.finish_num}}/{{item.mission_need_num}})</span>
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
				taskList: [],
				current_point: '',
				max_point: '',
				status: 0
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			close() {
				this.$store.commit('modal/setTask', {
					showTask: false
				});
			},
			init() {
				let option = {
					url: 'api/mission?token=' + sessionStorage.token,
					type: 'GET',
					success: function(result, status, xhr) {
						if(result.code === 1) {
							this.taskList = [];
							this.taskList = result.data;
						}
					}.bind(this)
				};

				myAjax(option);

				let option2 = {
					url: 'api/getpoint?token=' + sessionStorage.token,
					type: 'GET',
					success: function(result, status, xhr) {
						if(result.code === 1) {
							this.current_point = result.current_point;
							this.max_point = result.max_point;
							this.status = result.status;
							
							$(this.$refs.subBar).css('width', this.current_point / this.max_point * 100 + '%');
						}
					}.bind(this)
				};

				myAjax(option2);
			},
			exchange() {
				let option = {
					url: 'api/exchange?token=' + sessionStorage.token,
					type: 'GET',
					success: function(result, status, xhr) {
						if(result.code === 1) {
							this.$store.commit('modal/setMsg', {
								msg: result.msg,
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
		},
		computed: {
			show() {
				if(this.$store.state.modal.showTask === true) {
					this.init();
				}

				return this.$store.state.modal.showTask;
			}
		}
	}
</script>

<style scoped lang="less"> 
	.task {
		position: absolute;
		width: 100%;
		height: 100%;
		/* background-color: rgba(0, 0, 0, 0.3); */
		z-index: 20;
		text-align: center;

		.pannel {
			position: absolute;
			width: 95%;
			height: 80%;
			top: 12%;
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
			
			.header {
				position: relative;
				margin: 0 0.5rem -0.2rem 0.5rem;
				height: 2.7rem;
				background-image: url('~@/assets/modal/banner-tu2.png');
				background-size: 100% 100%;

				.main {
					position: relative;
					top: 0.7rem;
					padding-right: 0.5rem;
					text-align: right;
					color: #4C2C0B;
					font-size: 0.65rem;

					.reach {
						display: inline-block;
						font-size: 0.7rem;
						position: absolute;
						right: 0.5rem;
						top: 0.3rem;
						color: #4C2C0B;
						width: 2rem;
						height: 0.9rem;

						.img {
							width: 100%;
							height: 100%;
						}
					}
				}

				.bar {
					position: absolute;
					left: 1.5%;
					bottom: 0;
					width: 97%;
					height: 0.4rem;
					line-height: 0.4rem;
					background-image: url('~@/assets/modal/banner-xian.png');
					background-size: 100% 100%;
					font-size: 0.4rem;
					color: #fff;

					.barInfo {
						position: relative;
						z-index: 25;
					}

					.subBar {
						position: absolute;
						width: 10%;
						height: 0.4rem;
						top: 0rem;
						background-color: #125A76;
						border-radius: 1rem;
					}
				}
			}

			.content {
				width: 90%;
				height: 73%;
				margin-left: 5%;
				margin-top: 0.2rem;
				background-color: #f2cd5b;
				border-radius: 0.2rem 0.2rem 1rem 1rem;
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
							width: 2.4rem;
							height: 2.4rem;
							position: relative;
							top: 0.1rem;
						}

						.main {
							display: inline-block;
							position: relative;
							top: -0.85rem;

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