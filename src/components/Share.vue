<template>
	<section class="share" v-if="show">
		<div class="header">
			<div class="back" @click="back"></div>
			<div class="title">分享至朋友圈</div>
		</div>
		<div class="main">
			<img :src="codeImg" class="img" v-show="codeImg !== ''">
		</div>
	</section>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				codeImg: ''
			}
		},
		mounted() {
			// this.init();
		},
		computed: {
			show() {
				if(this.$store.state.modal.showShare === true) {
					this.init();
				}

				return this.$store.state.modal.showShare;
			}
		},
		methods: {
			back() {
				this.$store.commit('modal/setShare', {
					showShare: false
				});
				
				// setTimeout(() => {
				// 	this.$store.commit('modal/setLoginReward', {
				// 		showLoginReward: false
				// 	});
				// }, 0);
			},
			init() {
				let option = {
					url: 'api/qrcode?token=' + sessionStorage.token,
					type: 'GET',
					success: function(result, status, xhr) {
						if(result) {
							this.codeImg = 'http://' + result;
						}
					}.bind(this)
				};

				myAjax(option);
			}
		}
	}
</script>

<style scoped lang="less"> 
	.share {
		position: absolute;
		width: 100%;
		height: 100%;
		background-image: url('~@/assets/share/fx-bg.jpg');
		background-size: 100% 100%;
		background-position: 0 1.8rem;
		z-index: 50;

		.header {
			position: relative;
			height: 1.8rem;
			background-color: #fff;
			line-height: 1.8rem;

			.back {
				position: absolute;
				left: 0.5rem;
				top: 50%;
				width: 0.5rem;
				height: 0.8rem;
				margin-top: -0.4rem;
				background-image: url('~@/assets/share/arrowico.png');
				background-size: 100% 100%;
				background-repeat: no-repeat;
			}

			.title {
				font-size: 0.7rem;
				text-align: center;
			}
		}
		
		.main {
			.img {
				width: 65%;
				margin: 38% auto;
			}
		}
	}
</style>