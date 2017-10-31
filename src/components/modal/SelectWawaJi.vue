<template>
	<section class="selectWawaJi" v-if="show">
		<div class="pannel">
			<div class="title">
				<img src="~@/assets/modal/close.png" class="img_close" @click="close">
			</div>
			<div class="main">
				
			</div>
		</div>
	</section>
</template>

<script type="text/javascript">
	export default {
		computed: {
			show() {
				return this.$store.state.modal.showSelectWawaJi;
			}
		},
		methods: {
			close() {
				this.$store.commit('modal/setTask', {
					showTask: false
				});
			}
		}
	}
</script>

<style scoped lang="less">
	.selectWawaJi {
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
				height: 92%;
				margin-left: auto;
				margin-right: auto;
				position: relative;
				top: 4%;
				background-color: #fffada;
				border-radius: 0.5rem;
			}
		}
	}
</style>

