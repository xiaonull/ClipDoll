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
					<p class="text">今日从“<span class="red">公众号菜单</span>”进入游戏即可领取</p>
				</div>
				<div class="right">
					<img src="~@/assets/modal/gold-ico06.png" class="img">
				</div>
			</div>
			<span class="line"></span>
			<div class="go">
				<img src="~@/assets/modal/an-ico07.png" class="img">
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
				overflow: hidden;

				.left {
					display: table;
					width: 8.5rem;
					height: 5rem;
					float: left;

					.text {
						display: table-cell; 
						vertical-align:middle; 
						text-align:center;
						padding: 0 0.5rem 0 1rem;
						text-align: left;
						font-size: 0.6rem;
						color: #65492a;
						font-weight: 600;

						.red {
							color: #d86241;
						}
					}
				}

				.right {
					width: 5rem;
					height: 5rem;
					float: left;

					.img {
						width: 90%;
						height: 90%;
						margin-top: 5%;
					}
				}
			}

			.line {
				display: block;
				width: 12rem;
				height: 1px;
				margin-left: 1rem;
				margin-top: 0.7rem;
				background-color: #65492a;
			}

			.go {
				width: 5.3rem;
				height: 1.8rem;
				margin: 0.8rem auto 0 auto;

				.img {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>


