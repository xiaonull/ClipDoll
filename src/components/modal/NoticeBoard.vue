<template>
	<section class="noticeBoard" v-if="show">
		<div class="pannel">
			<div class="title">
				<img src="~@/assets/modal/box-bt10.png" class="img_title">
				<img src="~@/assets/modal/close.png" class="img_close" @click="close">
			</div>
			<div class="main">
				<div class="item">
					<div class="left"></div>
					<div class="right"></div>
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
				padding-top: 0.5rem;
			}
		}
	}
</style>