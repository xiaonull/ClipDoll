<template>
	<section class="index">
		<msg></msg>
		<recharge></recharge>
		<backpack></backpack>
		<playerShow></playerShow>
		<publishShow></publishShow>
		<task></task>
		<game-box></game-box>
		<luck-value></luck-value>
		<game-desk></game-desk>
	</section>
</template>

<script>
	import GameBox from './GameBox.vue';
	import LuckValue from './LuckValue.vue';
	import GameDesk from './GameDesk.vue';
	import Msg from './modal/Msg.vue';
	import Backpack from './modal/Backpack.vue';
	import Recharge from './modal/Recharge.vue';
	import Task from './modal/Task.vue';
	import PlayerShow from './modal/PlayerShow.vue';
	import PublishShow from './modal/PublishShow.vue';

	export default {
		components: {
			GameBox,
			LuckValue,
			GameDesk,
			Msg,
			Backpack,
			Recharge,
			Task,
			PlayerShow,
			PublishShow
		},
		mounted() {
			// 每20分钟刷新一下 token
			let t = setTimeout(() => {
				setInterval(() => {
					getToken();
				}, 1200000);

				clearTimeout(t);
			}, 1200000);
			
			// console.log(sessionStorage.reload);
			if(sessionStorage.reload === 'true') {
				sessionStorage.reload = 'false';
				window.location.reload();
			}
		}
	}
</script>

<style scoped lang="less">
	.index {
		position: absolute;
		z-index: 0;
		width: 100%;
		height: 100%;
		background-color: #f26fa5;
		overflow: hidden;
	}
</style>