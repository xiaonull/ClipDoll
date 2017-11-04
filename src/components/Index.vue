<template>
	<section class="index">
		<msg></msg>
		<selectWawaJi></selectWawaJi>
		<recharge></recharge>
		<backpack></backpack>
		<receiptInfo></receiptInfo>
		<playerShow></playerShow>
		<publishShow></publishShow>
		<task></task>
		<notice></notice>
		<catch></catch>
		<gift></gift>
		<game-box></game-box>
		<!-- <luck-value></luck-value> -->
		<game-desk></game-desk>
	</section>
</template>

<script>
	import Notice from './Notice.vue';
	import GameBox from './GameBox.vue';
	import LuckValue from './LuckValue.vue';
	import GameDesk from './GameDesk.vue';
	import Msg from './modal/Msg.vue';
	import SelectWawaJi from './modal/SelectWawaJi.vue';
	import Backpack from './modal/Backpack.vue';
	import ReceiptInfo from './modal/ReceiptInfo.vue';
	import Recharge from './modal/Recharge.vue';
	import Task from './modal/Task.vue';
	import PlayerShow from './modal/PlayerShow.vue';
	import PublishShow from './modal/PublishShow.vue';
	import Catch from './modal/Catch.vue';
	import Gift from './modal/Gift.vue';

	export default {
		components: {
			Notice,
			GameBox,
			LuckValue,
			GameDesk,
			Msg,
			SelectWawaJi,
			Backpack,
			ReceiptInfo,
			Recharge,
			Task,
			PlayerShow,
			PublishShow,
			Catch,
			Gift
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

			// 页面刷新时更新数据
			let data = JSON.parse(sessionStorage.loginUrlData);
			// console.log(data);
			let option = {
				url: 'api/login',
				type: 'POST',
				data: data,
				success: function(result, status, xhr) {
					if(result.code === 1) {
						sessionStorage.token = result.token;
						sessionStorage.userData =  JSON.stringify(result.user);
						sessionStorage.initWaWaJi =  JSON.stringify(result.data);
					}
				}.bind(this)
			};

			myAjax(option);
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