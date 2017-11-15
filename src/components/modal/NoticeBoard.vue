<template>
	<section class="noticeBoard" v-if="show">
		<div class="pannel">
			<div class="title">
				<img src="~@/assets/modal/box-bt10.png" class="img_title">
				<img src="~@/assets/modal/close.png" class="img_close" @click="close">
			</div>
			<div class="main">
				<div class="item_hasImg">
					<div class="left">
						<img src="~@/assets/modal/notice.png" class="img">
					</div>
					<div class="right">
						<h2 class="title">欢乐模式开启！</h2>
						<p class="msg">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</p>
					</div>
				</div>
				<div class="item_noImg">
					<h2 class="title">欢乐模式开启！</h2>
					<p class="msg">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</p>
				</div>
				<div class="item_hasImg">
					<div class="left">
						<img src="~@/assets/modal/notice.png" class="img">
					</div>
					<div class="right">
						<h2 class="title">欢乐模式开启！</h2>
						<p class="msg">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</p>
					</div>
				</div>
				<div class="item_noImg">
					<h2 class="title">欢乐模式开启！</h2>
					<p class="msg">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</p>
				</div>
				<div class="item_hasImg">
					<div class="left">
						<img src="~@/assets/modal/notice.png" class="img">
					</div>
					<div class="right">
						<h2 class="title">欢乐模式开启！</h2>
						<p class="msg">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</p>
					</div>
				</div>
				<div class="item_noImg">
					<h2 class="title">欢乐模式开启！</h2>
					<p class="msg">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</p>
				</div>
				<div class="item_hasImg">
					<div class="left">
						<img src="~@/assets/modal/notice.png" class="img">
					</div>
					<div class="right">
						<h2 class="title">欢乐模式开启！</h2>
						<p class="msg">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</p>
					</div>
				</div>
				<div class="item_noImg">
					<h2 class="title">欢乐模式开启！</h2>
					<p class="msg">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</p>
				</div>
			</div>
		</div>
	</section>
</template>
<script type="text/javascript">
export default {
	computed: {
		show() {
			return this.$store.state.modal.showNoticeBoard;
		}
	},
	methods: {
		close() {
			this.$store.commit('modal/setNoticeBoard', {
				showNoticeBoard: false
			});
		},
	}
}
</script>

<style scoped lang="less"> 
.noticeBoard {
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

		.main {
			width: 85%;
			height: 80%;
			margin: 0.5rem auto;
			background-color: #f2cd5b;
			border-radius: 0.2rem;
			padding-top: 0.1rem;
			overflow: scroll;

			.item_hasImg {
				margin: 0.3rem;
				padding: 0.4rem 0.4rem 0.1rem 0.4rem;
				background-image: url('~@/assets/modal/task-bg.jpg');
				background-size: 100% 100%;
				overflow: hidden;
				font-size: 0;

				.left {
					float: left;
					display: inline-block;
					width: 35%;

					.img {
						width: 100%;
					}
				}

				.right {
					display: inline-block;
					width: 65%;

					.title {
						font-size: 0.7rem;
						color: #7c7c7b;
						font-weight: 500;
						text-align: left;
						margin-left: 0.5rem;
						margin-top: -0.2rem;
						margin-bottom: 0.1rem;
					}

					.msg {
						font-size: 0.6rem;
						color: #af8a51;
						margin-left: 0.5rem;
						word-wrap:break-word; 
						word-break:break-all;
						text-align: left;
						line-height: 0.7rem;
					}
				}
			}

			.item_noImg {
				margin: 0.3rem;
				padding: 0.4rem 0.4rem 0.4rem 0.5rem;
				background-image: url('~@/assets/modal/task-bg.jpg');
				background-size: 100% 100%;
				text-align: left;

				.title {
					font-size: 0.7rem;
					color: #7c7c7b;
					font-weight: 500;
					text-align: left;
					margin-bottom: 0.1rem;
				}

				.msg {
					font-size: 0.6rem;
					color: #af8a51;
					word-wrap:break-word; 
					word-break:break-all;
					text-align: left;
					line-height: 0.7rem;
				}
			}
		}
	}
}
</style>