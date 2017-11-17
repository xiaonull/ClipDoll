<template>
	<section class="setting" v-if="show">
		<div class="main">
			<div class="close" @click="close">
				<img src="~@/assets/modal/close01.png" class="img">
			</div>
			<div class="closeMusic" @click="closeMusic">
				<img src="~@/assets/modal/an-ico11.png" class="img">
			</div>
			<div class="help" @click="toHelp">
				<img src="~@/assets/modal/an-ico13.png" class="img">
			</div>
		</div>
	</section>
</template>

<script type="text/javascript">
	export default {
		computed: {
			show() {
				return this.$store.state.modal.showSetting;
			}
		},
		methods: {
			close() {
				this.$store.commit('modal/setSetting', {
					showSetting: false
				});
			},
			closeMusic() {
				this.$store.commit('info/setBgm', false);
			},
			toHelp() {
				this.$store.commit('modal/setHelp', {
					showHelp: true
				});
			}
		}
	}
</script>

<style scoped lang="less"> 
	.setting {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		z-index: 20;
		text-align: center;
		
		.main {
			position: relative;
			width: 65%;
			height: 9.6rem;
			top: 50%;
			margin: -4.8rem auto;
			background-color: #fffbe2;
			border-radius: 1rem;

			.img {
				width: 100%;
				height: 100%;
			}

			.close {
				position: absolute;
				top: 0.4rem;
				right: 0.4rem;
				width: 1rem;
				height: 1rem;
			}

			.closeMusic {
				width: 6rem;
				height: 2rem;
				margin: 0 auto;
				position: relative;
				top: 2.2rem;
			}

			.help {
				width: 6rem;
				height: 2rem;
				margin: 0 auto;
				position: relative;
				top: 3.2rem;
			}
		}
	}
</style>