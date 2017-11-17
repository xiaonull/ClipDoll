<template>
	<section class="catch" v-if="show" @click="close">
		<!-- <div class="share"></div> -->
		<div class="pannel">
			<div class="title">
				<img src="~@/assets/modal/box-bt07.png" class="img_title">
			</div>	
			<div class="main">
				<img :src="pic" class="wawaImg">
				<div class="info">
					<p class="text">{{goods_name}}</p>
					<p class="text">你抓了{{catchnum}}次抓到，超越了{{Math.floor(Math.random() * 45 + 50)}}%玩家</p>
					<p class="text">感谢 <span class="friends">{{user_names[0] + '、' + user_names[1]}}</span> 为你填坑了~
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
		data() {
			return {
				goods_name: '',
				pic: '',
				user_names: [],
				catchnum: '',
			}
		},
		computed: {
			show() {
				if(this.$store.state.modal.showCatch === true) {
					this.init();
				}

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
				
			},
			init() {
				let id = this.$store.state.info.wawa_id;
				let option = {
					url: 'api/getshare/' + id + '?token=' + sessionStorage.token,
					type: 'GET',
					success: function(result, status, xhr) {
						if(result.code === 1) {
							this.goods_name = result.data.goods_name;
							this.pic = 'http://' + result.data.pic;
							this.user_names = result.data.user_name;
							this.catchnum = result.data.catchnum;
						}
					}.bind(this)
				};

				myAjax(option);
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

		.share {
			/* position: absolute;
			width: 3rem;
			height: 5rem;
			top: 0;
			right: 0;
			background-image: url('~@/assets/modal/share.png');
			background-size: 100% 100%; */
		}

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