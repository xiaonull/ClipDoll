<template>
	<section class="playerShow" v-if="show">
		<div class="pannel">
			<div class="title">
				<img src="~@/assets/modal/box-bt02.png" class="img_title">
				<img src="~@/assets/modal/close.png" class="img_close" @click="close">
			</div>	
			<div class="main">
				<div class="toLeft">
					<img src="~@/assets/modal/box-l.png" class="img">
				</div>
				<div class="imgContainer">
					<img src="~@/assets/modal/meizi.png" class="img">
				</div>
				<div class="toRight">
					<img src="~@/assets/modal/box-r.png" class="img">
				</div>
			</div>	
			<div class="bottom">
				<div class="left">
					<img src="~@/assets/modal/header.png" class="img">
				</div>
				<div class="right">
					<h2 class="playerName">微信昵称</h2>
					<p class="text">{{text.length < 60 ? text : text.substr(0, 60) + '...'}}</p>
				</div>
			</div>	
			<img src="~@/assets/modal/an-ico02.png" class="toSend" @click="toSend">
		</div>
	</section>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				text: '评论文字评论文字评论文字评论文字评论文字评论文字评论文字评论文字评论文字评论文字评论文字评论文字评论文字评论文字评论文字评论文字评论文字11'
			}
		},
		methods: {
			loadData() {

			},
			close() {
				this.$store.commit('modal/setPlayerShow', {
					showPlayerShow: false
				});
			},
			toSend() {
				this.$store.commit('modal/setPlayerShow', {
					showPlayerShow: false
				});
				this.$store.commit('modal/setPublishShow', {
					showPublishShow: true
				});
			}
		},
		computed: {
			show() {
				if(this.$store.state.modal.showPlayerShow === true) {
					this.loadData();
				}

				return this.$store.state.modal.showPlayerShow;
			}
		}
	}
</script>

<style scoped lang="less"> 
	.playerShow {
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
			background-image: url('~@/assets/modal/box-bg03.png');
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

			.main {
				width: 100%;
				height: 52%;
				margin-top: 0.6rem;
				font-size: 0;

				.toLeft {
					width: 18%;
					height: 100%;
					display: inline-block;

					.img {
						width: 60%;
						height: 2.2rem;
						margin-left: 20%;
						position: relative;
						top: 50%;
						margin-top: -1.1rem;
					}
				}

				.imgContainer {
					width: 64%;
					height: 100%;
					display: inline-block;

					.img {
						width: 100%;
						height: 100%;
					}
				}

				.toRight {
					width: 18%;
					height: 100%;
					display: inline-block;

					.img {
						width: 60%;
						height: 2.2rem;
						margin-left: 20%;
						position: relative;
						top: 50%;
						margin-top: -1.1rem;
					}
				}
			}

			.bottom {
				width: 90%;
				height: 4.1rem;
				margin: 0.8rem auto 0.2rem auto;
				overflow: hidden;

				.left {
					display: inline-block;
					width: 2.6rem;
					height: 2.6rem;
					float: left;

					.img {
						width: 100%;
						height: 100%;
					}
				}

				.right {
					margin-left: 3.2rem;
					height: 4.1rem;
					text-align: left;
					overflow: hidden;

					.playerName {
						font-size: 0.7rem;
						color: #37860e;
					}

					.text {
						color: #494536;
						font-size: 0.6rem;
						line-height: 0.8rem;
					}
				}
			}

			.toSend {
				display: inline-block;
				width: 5.5rem;
				height: 1.8rem;
			}
		}
	}
</style>