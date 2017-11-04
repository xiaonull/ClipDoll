<template>
	<section class="gift" v-if="show">
		<img src="~@/assets/modal/cat-bg.png" class="catImg">
		<div class="pannel">
			<div class="title">
				<img src="~@/assets/modal/box-bt06.png" class="img_title">
				<img src="~@/assets/modal/close.png" class="img_close" @click="close">
			</div>
			<div class="main">
				<div class="left">
					
				</div>
				<div class="right"></div>
			</div>
		</div>
	</section>
</template>

<script type="text/javascript">
	export default {
		computed: {
			show() {
				return this.$store.state.modal.showGift;
			}
		},
		methods: {
			close() {
				this.$store.commit('modal/setGift', {
					showGift: false
				});
			},
		}
	}
</script>

<style scoped lang="less"> 
	.gift {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
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
			height: 55%;
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

			.main {
				margin-top: 1.5rem;

				.left {
					width: 60%;
					height: 5rem;
					float: left;
					background-color: #fff;
				}

				.right {
					width: 40%;
					height: 5rem;
					float: right;
					background-color: #9F1818;
				}
			}
		}
	}
</style>


