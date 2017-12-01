<template>
	<section class="receiptInfo" v-if="show">
		<div class="pannel">
			<div class="title">
				<img src="~@/assets/modal/close.png" class="img_close" @click="close">
			</div>
			<div class="main">
				<div class="header">
					<h2>提取娃娃</h2>
					<p>请仔细填写收货地址</p>
				</div>
				<div class="formGroup">
					<label>姓名：</label>
					<input type="text" name="name" class="input" ref="name" placeholder="输入姓名" v-model="name">
				</div>
				<div class="formGroup">
					<label>手机：</label>
					<input type="number" name="phone" class="input" ref="phone" placeholder="输入手机号" v-model="phone">
				</div>
				<div class="formGroup">
					<label>地址：</label>
					<div class="sel">
						<v-distpicker  @selected="onSelected"></v-distpicker>
					</div>
				</div>
				<div class="formGroup">
					<label></label>
					<textarea placeholder="详细地址" ref="addressDetail" v-model="addressDetail"></textarea>
				</div>
				<img src="~@/assets/modal/an-ico05.png" class="commit" @click="commit">
			</div>
		</div>
	</section>
</template>

<script type="text/javascript">
	import Vue from 'vue';
	import VDistpicker from '@/components/v-distpicker/Distpicker';
	Vue.component('v-distpicker', VDistpicker);

	export default {
		data() {
			return {
				name: '',
				phone: '',
				address: '',
				addressDetail: ''
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
							// this.address = result.data.address;
						}
					}
				}.bind(this)
			};

			myAjax(option);

		},
		computed: {
			show() {
				this.address = '';
				this.addressDetail = '';

				return this.$store.state.modal.showReceiptInfo;
			}
		},
		methods: {
			close() {
				this.$store.commit('modal/setReceiptInfo', {
					showReceiptInfo: false
				});
			},
			onSelected(data) {
				this.address = data.province.value + data.city.value + data.area.value;
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

				if(this.name === '' || this.phone === '' || this.address === '' || this.addressDetail === '') {
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
						address: this.address + this.addressDetail
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
								msg: result.msg,
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
		/* background-color: rgba(0, 0, 0, 0.3); */
		z-index: 30;
		-webkit-user-select: auto;

		.pannel {
			position: absolute;
			width: 90%;
			height: 80%;
			top: 10%;
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

			.header {
				text-align: center;
				color: #7e4d27;
				border-bottom: 1px dotted #c19f85;
				padding-bottom: 0.2rem;
				margin: 0 0.5rem 0.5rem 0.5rem;

				h2 {
					font-size: 0.9rem;
					font-weight: 500;
				}

				p {
					font-size: 0.5rem;
					color: #c19f85;
					margin-top: 0.2rem;
				}
			}

			.main {
				width: 90%;
				height: 86%;
				left: 5%;
				position: absolute;
				top: 4.5%;
				background-color: #fdffed;
				border-radius: 0.5rem;
				padding-top: 1.3rem;
				overflow: hidden;

				.formGroup {
					font-size: 0;

					label {
						display: inline-block;
						width: 20%;
						font-size: 0.6rem;;
						text-align: center;
						color: #a58363;
					}

					.input {
						display: inline-block;
						width: 70%;
						height: 1.2rem;
						margin: 0 auto 0.4rem auto;
						border: 2px solid #bdab6e;
						border-radius: 0.5rem;

						font-size: 0.67rem;
						font-weight: 500;
						color: #fff;
						padding-left: 0.5rem;

						background-image: url('~@/assets/modal/kua-bg01.jpg');
					}

					.sel {
						display: inline-block;
						width: 75%;
						height: 1.5rem;
					}

					::-webkit-input-placeholder {
						color: #816252;
					}
					:-moz-placeholder {
						color: #816252;
					}

					::-moz-placeholder{
						color: #816252;
					}

					:-ms-input-placeholder {
						color: #816252;
					}

					textarea {
						display: inline-block;
						margin-top: 0.4rem;
						width: 65%;
						height: 3rem;
						border: 2px solid #bdab6e;
						border-radius: 0.5rem;
						font-size: 0.67rem;
						font-weight: 500;
						color: #fff;
						padding: 0.5rem;
						background-image: url('~@/assets/modal/kua-bg02.jpg');
					}
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