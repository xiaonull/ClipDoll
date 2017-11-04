<template>
	<section class="notice" ref="notice">
		<!-- <p class="text">恭喜<span class="name">一步一步</span>走狗屎运抓到奶牛维尼熊了！</p> -->
		<p class="text" v-if="currentIndex >= 0">{{noticeList[currentIndex].contents}}</p>
	</section>
</template>

<script type="text/javascript">
	export default {
		mounted() {
			this.init();
		},
		data() {
			return {
				noticeList: [],
				currentIndex: -1,
			}
		},
		methods: {
			init() {
				let option = {
					url: 'api/notice?token=' + sessionStorage.token,
					type: 'GET',
					success: function(result, status, xhr) {
						if(result.code === 1 && result.data.length > 0) {
							this.noticeList = result.data;
							this.currentIndex = 0;
							this.startRoll();
						}
					}.bind(this)
				};

				myAjax(option);
			},
			startRoll() {
				this.roll();
				setInterval(() => {
					this.roll();
				}, 8000);
			},
			roll() {
				$(this.$refs.notice).animate({
					width: '95%'
				}, 1000, () => {
					let t = setTimeout(() => {
						$(this.$refs.notice).animate({
							width: '0'
						}, 200, () => {
							this.currentIndex++;
							if(this.currentIndex >= this.noticeList.length) {
								this.currentIndex = 0;
							}
							clearTimeout(t);
						});
					}, 2000);
				});
			}
		}
	}
</script>

<style scoped lang="less"> 
	.notice {
		position: absolute;
		z-index: 15;
		width: 0;
		min-height: 1.8rem;
		line-height: 1.8rem;
		margin-left: 2.5%;
		top: 1.5rem;
		background-image: url('~@/assets/bg/notice-bg.png');
		background-size: 100% 100%;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;

		.text {
			text-align: center;
			font-weight: 600;
			font-size: 0.65rem;
			.name {
				color: #fa0f09;
			}
		}
	}
</style>