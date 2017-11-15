<template>
	<section class="catch" v-if="show" @click="close">
		<div class="pannel">
			<div class="title">
				<img src="~@/assets/modal/box-bt07.png" class="img_title">
			</div>	
			<div class="main">
				<img src="~@/assets/modal/wawa2.png" class="wawaImg">
				<div class="info">
					<p class="text">粉红猴子</p>
					<p class="text">你抓了8次抓到，超越了90%玩家</p>
					<p class="text">感谢 <span class="friends">你的好友</span> 为你填坑了~
						<br>
						赶快刺激他们吧
					</p>
				</div>
				<div class="tellFriends" @click.stop="tellFriends">
					<img src="~@/assets/modal/an-ico06.png" class="img">
				</div>
			</div>
		</div>
	</section>
</template>

<script type="text/javascript">
	export default {
		computed: {
			show() {
				return this.$store.state.modal.showCatch;
			}
		},
		methods: {
			close() {
				this.$store.commit('modal/setCatch', {
					showCatch: false
				});
			},
			tellFriends() {
				
			}
		}
	}
</script>

<style scoped lang="less"> 
	.catch {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		z-index: 20;
		text-align: center;

		.pannel {
			position: absolute;
			width: 95%;
			height: 80%;
			top: 15%;
			left: 50%;
			margin-left: -47.5%;

			.title {
				text-align: center;

				.img_title {
					display: inline-block;
					width: 11rem;
					margin-top: -0.8rem;
				}
			}

			.main {
				text-align: center;

				.wawaImg {
					display: inline-block;
					width: 3.5rem;
					height: 4.8rem;
					margin: 0.5rem auto 0.8rem auto;
				}

				.info {
					color: #fff;
					font-size: 0.72rem;
					line-height: 1.4rem;

					.friends {
						color: #FCF922;
					}
				}

				.tellFriends {
					width: 7rem;
					height: 2.2rem;
					margin: 1.5rem auto;

					.img {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
</style>