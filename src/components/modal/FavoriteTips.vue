<template>
	<section class="favoriteTips" v-if="show" @click="close">
		<div class="bg" v-if="showTop"></div>
		<div class="text" v-if="showTop">
			点击此处收藏哦
		</div>
		<div class="bg_bottom" v-if="!showTop"></div>
		<div class="text_bottom" v-if="!showTop">
			点击此处收藏哦
		</div>
	</section>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				showTop: true
			}
		},
		computed: {
			show() {
				this.showTop = isWeiXin();

				return this.$store.state.modal.showTips;
			}
		},
		methods: {
			close() {
				this.$store.commit('modal/setTips', false);
			}
		}
	}

	//判断是否是微信浏览器的函数
	function isWeiXin(){
		var ua = window.navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i) == 'micromessenger'){
			return true;
		}else{
			return false;
		}
	}
</script>

<style scoped lang="less">
	.favoriteTips {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		z-index: 50;
		text-align: center;
		
		.bg {
			position: absolute;
			width: 5rem;
			height: 4rem;
			z-index: 30;
			right: 0.3rem;
			top: 5%;
			margin-left: 0.5rem;
			background-image: url('~@/assets/modal/arrow.png');
			background-size: 100% 100%;
		}

		.text {
			position: absolute;
			width: 100%;
			height: 4rem;
			top: 30%;
			z-index: 30;
			text-align: center;
			color: #fff;
			font-size: 1rem;
		}

		.bg_bottom {
			position: absolute;
			width: 5rem;
			height: 4rem;
			z-index: 30;
			left: 7rem;
			bottom: 1rem;
			margin-left: 0.5rem;
			background-image: url('~@/assets/modal/arrow2.png');
			background-size: 100% 100%;
		}

		.text_bottom {
			position: absolute;
			width: 100%;
			height: 4rem;
			top: 60%;
			z-index: 30;
			text-align: center;
			color: #fff;
			font-size: 1rem;
		}
	}
</style>