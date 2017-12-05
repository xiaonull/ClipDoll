<template>
	<section class="colorfulMsg" v-if="show">
		<p class="text">
			<img :src="img" class="img">
		</p>
	</section>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				img: 'static/msg/defeat-zi01.png'
			}
		},
		computed: {
			show() {
				if(this.$store.state.modal.showColorfulMsg === true) {
					let n = Math.floor(Math.random() * 4 + 1);
					this.img = 'static/msg/defeat-zi0' + n + '.png';

					setTimeout(() => {
						this.$store.commit('modal/setColorfulMsg', false);
					}, 2000);
				}

				return this.$store.state.modal.showColorfulMsg;
			}
		}
	}
</script>

<style lang="less" scoped>
	.colorfulMsg {
		position: absolute;
		width: 100%;
		height: 100%;
		/* background-color: rgba(0, 0, 0, 0.3); */
		z-index: 50;
		text-align: center;

		.text {
			position: relative;
			top: 30%;
			left: 50%;
			margin-left: -6rem;
			width: 12rem;
			height: 2rem;
			line-height: 2rem;
			background-image: url('~@/assets/msg/defeat-bg.png');
			background-size: 100% 100%;
			text-align: center;

			.img {
				display: inline-block;
				height: 1rem;
				margin-top: 0.5rem;
			}
		}
	}
</style>