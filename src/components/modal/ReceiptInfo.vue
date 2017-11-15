<template>
	<section class="receiptInfo" v-if="show">
		<div class="pannel">
			<div class="title">
				<img src="~@/assets/modal/close.png" class="img_close" @click="close">
			</div>
			<div class="main">
				<input type="text" name="name" class="input" placeholder="请填写你的姓名" v-model="name">
				<input type="number" name="phone" class="input" placeholder="请填写你的手机号" v-model="phone">
				<input type="text" name="address" class="input" placeholder="请填写你的详细地址" v-model="address">
				<div class="info">
					*为了娃娃顺利的到达您手中，请确保填写资料无误.
				</div>
				<img src="~@/assets/modal/an-ico05.png" class="commit" @click="commit">
			</div>
		</div>
	</section>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				name: '',
				phone: '',
				address: ''
			};
		},
		mounted() {
			let option = {
				url: 'api/address?token=' + sessionStorage.token,
				type: 'GET',
				success: function(result, status, xhr) {
					if(result.code === 1) {
						if(result.data && result.data.address) {
							this.name = result.data.name;
							this.phone = result.data.phone;
							this.address = result.data.address;
						}
					}
				}.bind(this)
			};

			myAjax(option);
		},
		computed: {
			show() {
				return this.$store.state.modal.showReceiptInfo;
			}
		},
		methods: {
			close() {
				this.$store.commit('modal/setReceiptInfo', {
					showReceiptInfo: false
				});
			},
			commit() {
				if(this.$store.state.modal.receiptID.rucksack_id === 0 && this.$store.state.modal.receiptID.goods_id === 0) {
					this.$store.commit('modal/setMsg', {
						msg: '请重新选择要提取的娃娃',
						display: true
					});
					let t = setTimeout(() => {
						this.$store.commit('modal/resetMsg');
						clearTimeout(t);
					}, 2000);
					return;
				}

				if(this.name === '' || this.phone === '' || this.address === '') {
					this.$store.commit('modal/setMsg', {
						msg: '请填写完整信息',
						display: true
					});
					let t = setTimeout(() => {
						this.$store.commit('modal/resetMsg');
						clearTimeout(t);
					}, 2000);
					return;
				}

				let reg = /^1[0-9]{10}$/;
				if(!reg.test(this.phone)) {
					this.$store.commit('modal/setMsg', {
						msg: '请填写正确的手机号',
						display: true
					});
					let t = setTimeout(() => {
						this.$store.commit('modal/resetMsg');
						clearTimeout(t);
					}, 2000);
					return;
				}


				let option = {
					url: '/api/withdrawdoll?token=' + sessionStorage.token,
					type: 'POST',
					data: {
						rucksack_id: this.$store.state.modal.receiptID.rucksack_id,
						goods_id: this.$store.state.modal.receiptID.goods_id,
						name: this.name,
						phone: this.phone,
						address: this.address
					},
					success: function(result, status, xhr) {
						if(result.code === 1) {
							this.$store.commit('modal/setMsg', {
								msg: result.msg,
								display: true
							});
							let t = setTimeout(() => {
								this.$store.commit('modal/resetMsg');
								clearTimeout(t);
							}, 2000);

							htsBus.$emit('loadBackpackData');

							this.$store.commit('modal/setReceiptInfo', {
								showReceiptInfo: false
							});
						}else {
							this.$store.commit('modal/setMsg', {
								msg: '提取失败',
								display: true
							});
							let t = setTimeout(() => {
								this.$store.commit('modal/resetMsg');
								clearTimeout(t);
							}, 2000);
						}
					}.bind(this)
				};

				myAjax(option);
			}
		}
	}
</script>

<style scoped lang="less">
	.receiptInfo {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		z-index: 30;

		.pannel {
			position: absolute;
			width: 90%;
			height: 64%;
			top: 18%;
			left: 50%;
			margin-left: -45%;

			.title {
				text-align: center;

				.img_close {
					position: absolute;
					top: 0.2rem;
					right: 0.2rem;
					width: 1.5rem;
					height: 1.5rem;
					z-index: 30;
				}

			}

			.main {
				width: 90%;
				height: 86%;
				left: 5%;
				position: absolute;
				top: 4.5%;
				background-color: #fff;
				border-radius: 0.5rem;
				padding-top: 1.3rem;
				overflow: hidden;

				.input {
					display: block;
					width: 80%;
					height: 1.5rem;
					margin: 0 auto 0.4rem auto;
					border: 2px solid #eee9c8;
					border-radius: 0.2rem;

					font-size: 0.67rem;
					font-weight: 600;
					color: #000;
					padding-left: 0.5rem;
				}

				.info {
					width: 83%;
					margin: 0 auto 0.4rem auto;
					color: #FF1110;
					font-size: 0.65rem;
					font-weight: 500;
					line-height: 1rem;
				}

				.commit {
					display: block;
					width: 7rem;
					height: 2.3rem;
					margin: 1rem auto 0 auto;
				}
			}
		}
	}
</style>