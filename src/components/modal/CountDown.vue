<template>
	<section class="countDown" v-if="show">
		<span class="count">{{count}}</span>
	</section>
</template>

<script type="text/javascript">
	export default {
		computed: {
			show() {
				return this.$store.state.modal.countDown.show;
			},
			count() {
				return this.$store.state.modal.countDown.count;
			}
		}
	}
</script>

<style scoped lang="less">
	.countDown {
		position: absolute;
		top: 0.2rem;
		left: 50%;
		z-index: 20;
		width: 2.4rem;
		height: 2.3rem;
		line-height: 2.2rem;
		text-align: center;
		margin-left: -1.2rem;
		background-image: url('~@/assets/modal/count-down.png');
		background-size: 100% 100%;

		.count {
			font-size: 0.8rem;
			font-weight: 600;
			color: #fa5d6f;
		}
	}
</style>