<template>
	<section class="functionIcon">
		<div class="icon" @click="download">
			<img src="~@/assets/functionIcon/sz-ico04.png" class="img">
		</div>
		<div class="icon favoriteIcon" @click="favorite">
			<img src="~@/assets/functionIcon/sz-ico03.png" class="img">
			<div class="bubble" ref="bubble">
				<p class="text">点击收藏，下次也是可以玩</p>
			</div>
		</div>
		<div class="icon" @click="share">
			<img src="~@/assets/functionIcon/sz-ico02.png" class="img">
		</div>
		<div class="icon" @click="openSetting">
			<img src="~@/assets/functionIcon/sz-ico01.png" class="img">
		</div>
		<audio id="mainBgMusic" ref="bgm" loop autoplay>
			<source src="~@/assets/music/bgm.mp3" type="audio/mpeg">
		</audio>
	</section>
</template>

<script type="text/javascript">
	export default {
		mounted() {
			if(this.$store.state.info.bgm === false) {
				$(this.$refs.bgm)[0].pause();
			}
		},
		data() {
			return {
				startMusic: this.$store.state.info
			}
		},
		watch: {
			startMusic: {
				handler: function(val, oldVal) {
					if(val.bgm === false) {
						$(this.$refs.bgm)[0].pause();
					}
				},
				deep: true
			}
		},
		methods: {
			download() {
				if(this.$store.state.info.startGame === true) {
					return;
				}

				this.$store.commit('modal/setMsg', {
					msg: '请在浏览器的设置中保存本页',
					display: true
				});

				let t = setTimeout(() => {
					this.$store.commit('modal/resetMsg');
					clearTimeout(t);
				}, 3000);
			},
			openSetting() {
				if(this.$store.state.info.startGame === true) {
					return;
				}

				this.$store.commit('modal/setSetting', {
					showSetting: true
				});
			},
			favorite() {
				if(this.$store.state.info.startGame === true) {
					return;
				}

				$(this.$refs.bubble).hide();

				if(isWeiXin()) {
					this.$store.commit('modal/setMsg', {
						msg: '请在微信中收藏本页',
						display: true
					});
				}else {
					this.$store.commit('modal/setMsg', {
						msg: '请在浏览器的设置中收藏本页',
						display: true
					});
				}

				let t = setTimeout(() => {
					this.$store.commit('modal/resetMsg');
					clearTimeout(t);
				}, 3000);
			},
			share() {
				if(this.$store.state.info.startGame === true) {
					return;
				}
				
				this.$store.commit('modal/setShare', {
					showShare: true
				});
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

		.favoriteIcon {
			position: relative;

			.bubble {
				position: absolute;
				z-index: 30;
				top: 1rem;
				left: -2.7rem;
				width: 5rem;
				height: 3rem;
				background-image: url('~@/assets/luckValue/frame-box.png');
				background-size: 100% 100%;
				transform: rotate(180deg);

				.text {
					transform: rotate(180deg);
					font-size: 0.5rem;
					margin: 0.6rem 1rem 0 1rem;
				}
			}
		}
	}
</style>