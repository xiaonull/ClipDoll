<template>
	<section class="index">
		<help></help>
		<transition name="slide-fade">
			<share></share>
		</transition>
		<msg></msg>
		<transition name="bounce">
			<selectWawaJi></selectWawaJi>
		</transition>
		<transition name="bounce">
			<recharge></recharge>
		</transition>
		<transition name="bounce">
			<backpack></backpack>
		</transition>
		<receiptInfo></receiptInfo>
		<transition name="bounce">
			<playerShow></playerShow>
		</transition>
		<transition name="bounce">
			<publishShow></publishShow>
		</transition>
		<transition name="bounce">
			<task></task>
		</transition>
		<transition name="bounce">
			<loginReward></loginReward>
		</transition>
		<functionIcon></functionIcon>
		<notice></notice>
		<transition name="bounce">
			<noticeBoard></noticeBoard>
		</transition>
		<transition name="bounce">
			<catch></catch>
		</transition>
		<transition name="bounce">
			<gift></gift>
		</transition>
		<countDown></countDown>
		<transition name="bounce">
			<setting></setting>
		</transition>
		<game-box></game-box>
		<!-- <luck-value></luck-value> -->
		<game-desk></game-desk>
	</section>
</template>

<script>
	import Help from './Help.vue';
	import Share from './Share.vue';
	import Notice from './Notice.vue';
	import NoticeBoard from './modal/NoticeBoard.vue';
	import FunctionIcon from './FunctionIcon.vue';
	import CountDown from './modal/CountDown.vue';
	import GameBox from './GameBox.vue';
	import LuckValue from './LuckValue.vue';
	import GameDesk from './GameDesk.vue';
	import Msg from './modal/Msg.vue';
	import SelectWawaJi from './modal/SelectWawaJi.vue';
	import Backpack from './modal/Backpack.vue';
	import ReceiptInfo from './modal/ReceiptInfo.vue';
	import Recharge from './modal/Recharge.vue';
	import Task from './modal/Task.vue';
	import LoginReward from './modal/LoginReward.vue';
	import PlayerShow from './modal/PlayerShow.vue';
	import PublishShow from './modal/PublishShow.vue';
	import Catch from './modal/Catch.vue';
	import Gift from './modal/Gift.vue';
	import Setting from './modal/Setting.vue';

	export default {
		components: {
			Help,
			Share,
			FunctionIcon,
			Notice,
			CountDown,
			GameBox,
			LuckValue,
			GameDesk,
			Msg,
			SelectWawaJi,
			Backpack,
			ReceiptInfo,
			Recharge,
			Task,
			LoginReward,
			PlayerShow,
			PublishShow,
			Catch,
			Gift,
			Setting,
			NoticeBoard
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
			
			if(sessionStorage.init === 'true') {
				this.$store.commit('modal/setLoginReward', {
					showLoginReward: false
				});
			}else {
				this.$store.commit('modal/setLoginReward', {
					showLoginReward: true
				});

				sessionStorage.init = 'true';
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

	.slide-fade-enter-active {
		transition: all .3s ease;
	}
	.slide-fade-leave-active {
		transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.slide-fade-enter, .slide-fade-leave-to
	/* .slide-fade-leave-active for below version 2.1.8 */ {
		transform: translateX(10px);
		opacity: 0;
	}

	.bounce-enter-active {
		animation: bounce-in .3s;
	}
	.bounce-leave-active {
		animation: bounce-in .5s reverse;
	}
	@keyframes bounce-in {
		0% {
			transform: scale(0);
		}
		25% {
			transform: scale(0.3);
		}
		50% {
			transform: scale(0.7);
		}
		75% {
			transform: scale(0.9);
		}
		100% {
			transform: scale(1);
		}
	}
</style>