<template>
	<section class="functionIcon">
		<div class="icon">
			<img src="~@/assets/functionIcon/sz-ico04.png" class="img">
		</div>
		<div class="icon" @click="favorite">
			<img src="~@/assets/functionIcon/sz-ico03.png" class="img">
		</div>
		<div class="icon">
			<img src="~@/assets/functionIcon/sz-ico02.png" class="img">
		</div>
		<div class="icon" @click="openSetting">
			<img src="~@/assets/functionIcon/sz-ico01.png" class="img">
		</div>
	</section>
</template>

<script type="text/javascript">
	export default {
		methods: {
			openSetting() {
				this.$store.commit('modal/setSetting', {
					showSetting: true
				});
			},
			favorite() {
				
			}
		}
	}
</script>

<style scoped lang="less"> 
	.functionIcon {
		position: absolute;
		z-index: 15;
		top: 36px;
		right: 1rem;
		width: 43%;
		height: 1.5rem;
		display: flex;

		.icon {
			flex: 1;
		}

		.icon {
			text-align: center;

			.img {
				display: inline-block;
				width: 1.3rem;
			}
		}
	}
</style>