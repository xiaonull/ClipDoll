<template>
	<section class="msg" v-if="display">
		<p class="text">{{msg}}</p>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				Msg: this.$store.state.modal.Msg,
				msg: '',
				display: false
			}
		},
		watch: {
			Msg: {
				handler: function (val, oldVal) {
					this.msg = val.msg;
					this.display = val.display;
				},
				deep: true
			}
		}
	}
</script>

<style scoped lang="less">
	.msg {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		z-index: 50;
		text-align: center;

		.text {
			display: inline-block;
			position: relative;
			top: 35%;
			background-color: rgba(0, 0, 0, 0.5);
			width: 80%;
			min-height: 3rem;
			padding: 0.5rem;
			line-height: 3rem;
			font-size: 0.8rem;
			color: #fff;
			border-radius: 0.5rem;
		}
	}
</style>