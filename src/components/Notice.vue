<template>
	<section class="notice" ref="notice">
		<p class="text">恭喜<span class="name">{{nickname.length > 4 ? nickname.slice(0, 4) + '...' : nickname}}</span>走狗屎运抓到{{goods_name}}了！</p>
		<!-- <p class="text" v-if="currentIndex >= 0">{{noticeList[currentIndex].contents}}</p> -->
	</section>
</template>

<script type="text/javascript">
	export default {
		mounted() {
			this.init();
		},
		data() {
			return {
				nickname: '',
				goods_name: ''
			}
		},
		methods: {
			init() {
				let option = {
					url: 'api/randdata?token=' + sessionStorage.token,
					type: 'GET',
					success: function(result, status, xhr) {
						if(result.code === 1) {
							this.nickname = result.nickname;
							this.goods_name = result.goods_name;
							this.roll();
						}
					}.bind(this)
				};

				myAjax(option);
			},
			// startRoll() {
			// 	this.roll();
			// 	setInterval(() => {
			// 		this.roll();
			// 	}, 8000);
			// },
			roll() {
				$(this.$refs.notice).animate({
					width: '95%'
				}, 1000, () => {
					let t = setTimeout(() => {
						$(this.$refs.notice).animate({
							width: '0'
						}, 200, () => {
							clearTimeout(t);
						});
					}, 2000);

					let t2 = setTimeout(() => {
						this.init();
						clearTimeout(t2);
					}, 10000);
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
		top: 3rem;
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