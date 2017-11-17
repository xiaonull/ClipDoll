<template>
	<section class="help" v-if="show">
		<div class="header">
			<div class="back" @click="back"></div>
			<div class="title">求助中心</div>
		</div>
		<div class="main" ref="content">
			<div class="item" v-for="(item, index) in list" :key="item.id">
				<div class="question">
					<p>Q：{{item.problem}}</p>
					<div class="openAnswer" @click="openAnswer(index)"></div>
				</div>
				<div class="answer"><p class="detail">A：{{item.answer}}</p></div>
			</div>
		</div>
	</section>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				list: []
			}
		},
		mounted() {
			// this.init();
		},
		computed: {
			show() {
				if(this.$store.state.modal.showHelp === true) {
					this.init();
				}

				return this.$store.state.modal.showHelp;
			}
		},
		methods: {
			back() {
				this.$store.commit('modal/setHelp', {
					showHelp: false
				});
				
				// setTimeout(() => {
				// 	this.$store.commit('modal/setLoginReward', {
				// 		showLoginReward: false
				// 	});
				// }, 0);
			},
			openAnswer(index) {
				if($(this.$refs.content).find('.openAnswer').eq(index).hasClass('endOpenAnswer')) {
					return;
				}

				$(this.$refs.content).find('.openAnswer').removeClass('startOpenAnswer');
				$(this.$refs.content).find('.openAnswer').removeClass('endOpenAnswer');
				$(this.$refs.content).find('.answer').hide();

				$(this.$refs.content).find('.openAnswer').eq(index).addClass('startOpenAnswer');
				setTimeout(() => {
					$(this.$refs.content).find('.openAnswer').eq(index).addClass('endOpenAnswer');
				}, 350);
				$(this.$refs.content).find('.answer').eq(index).slideDown(400); 
			},
			init() {
				let option = {
					url: 'api/helpinfo?token=' + sessionStorage.token,
					type: 'GET',
					success: function(result, status, xhr) {
						if(result) {
							this.list = result;
							if(this.list.length >= 1) {
								setTimeout(() => {
									this.openAnswer(0);
								}, 0);
							}
						}
					}.bind(this)
				};

				myAjax(option);
			}
		}
	}
</script>

<style scoped lang="less"> 
	.help {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #fff;
		z-index: 50;

		.header {
			position: fixed;
			width: 100%;
			height: 1.8rem;
			background-color: #fff;
			line-height: 1.8rem;
			border-bottom: 1px solid #BBBBBB;

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
			margin-top: 2rem;
			margin-bottom: 1rem;

			.item {
				font-size: 0.65rem;
				border-bottom: 1px solid #DADADA;

				.question {
					position: relative;
					padding-left: 0.7rem;
					padding-right: 0.7rem;
					height: 2rem;
					line-height: 2rem;

					.openAnswer {
						position: absolute;
						right: 0.5rem;
						top: 50%;
						width: 0.4rem;
						height: 0.7rem;
						margin-top: -0.35rem;
						background-image: url('~@/assets/share/arrowico.png');
						background-size: 100% 100%;
						background-repeat: no-repeat;
						transform: rotate(180deg);
					}

					.startOpenAnswer {
						animation: openAnswer 0.4s;
					}

					.endOpenAnswer {
						transform: rotate(270deg);
					}

					@keyframes openAnswer {
						0%   { transform: rotate(180deg); }
						25%  { transform: rotate(210deg); }
						50%  { transform: rotate(240deg); }
						100% { transform: rotate(270deg); }
						0%   { transform: rotate(180deg); }
						12.5%  { transform: rotate(205deg); }
						37.5%  { transform: rotate(225deg); }
						75% { transform: rotate(260deg); }
					}
				}

				.answer {
					display: none;
					padding: 0.5rem 0.7rem;
					background-color: #454359;
					color: #fff;
					line-height: 0.9rem;
					overflow: scroll;
				}
			}
		}
	}
</style>