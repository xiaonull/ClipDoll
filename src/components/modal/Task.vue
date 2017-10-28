<template>
	<section class="task" v-if="show">
		<div class="pannel">
			<div class="title">
				<img src="~@/assets/modal/box-bt04.png" class="img_title">
				<img src="~@/assets/modal/close.png" class="img_close" @click="close">
			</div>
			<div class="content">
				<div class="list">
					<div class="item" v-for="item in taskList">
						<img src="~@/assets/modal/gold-ico02.png" class="icon">
						<div class="main">
							<span class="text">{{item.mission_title}}({{item.finish_num}}/{{item.mission_need_num}})</span>
							<span class="reward">{{item.awards_contents}}</span>
						</div>
						<span class="state" :class="{green : item.finish_num == item.mission_need_num}">{{item.finish_num == item.mission_need_num ? '已达成' : '未达成'}}</span>
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
				taskList: []
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
							this.taskList = result.data;
						}
					}.bind(this)
				};

				myAjax(option);
			}
		},
		computed: {
			show() {
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
						height: 2.5rem;
						background-color: #ffe7ab;
						border-radius: 0.8rem;
						margin-bottom: 0.7rem;
						text-align: left;

						.icon {
							display: inline-block;
							width: 1.1rem;
							height: 1.4rem;
							margin-left: 0.7rem;
							position: relative;
							top: 0.55rem;
						}

						.main {
							display: inline-block;

							.text {
								display: block;
								font-size: 0.8rem;
								color: #4C2C0B;
								font-weight: 500;
								margin-left: 0.3rem;
								position: relative;
								top: 0.4rem;
							}

							.reward {
								display: inline-block;
								margin-left: 0.3rem;
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

						.green {
							color: #14bf0c;
						}
					}
				}

			}

		}
	}
</style>