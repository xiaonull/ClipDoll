<template>
	<section class="entry">
		<div class="headerBg"></div>
		<div class="lodin_main" v-show="type === 'login'">
			<input type="text" name="name" class="input" placeholder="请输入用户名" v-model="login_username">
			<input type="text" name="name" class="input" placeholder="请输入密码" v-model="login_password">
			<div class="login">
				<img src="~@/assets/bg/an-ico10.png" class="img">
			</div>
			<p class="toRegister" @click="toRegister">还没有账号?立即注册！</p>
		</div>
		<div class="register_main" v-show="type === 'register'">
			<h2 class="title">注册</h2>
			<div class="form">
				<input type="number" name="name" class="input" placeholder="请输入手机号" v-model="register_phone">
				<div class="formGroup">
					<div class="left">
						<input type="text" name="name" class="input" placeholder="请输入手机验证码" v-model="register_phoneCode">
					</div>
					<div class="right">
						<button class="btn">发送验证码</button>
					</div>
				</div>
				<input type="text" name="name" class="input" placeholder="请输入密码" v-model="register_password">
				<div class="formGroup">
					<div class="left">
						<input type="text" name="name" class="input" placeholder="请输入验证码" v-model="register_code">
					</div>
					<div class="right">
						<div class="img_code" @click="getVerifycode">
							<img :src="verifycodeUrl" class="img" v-show="verifycodeUrl !== ''">
						</div>
					</div>
				</div>
			</div>
			<div class="register">
				<img src="~@/assets/bg/an-ico09.png" class="img">
			</div>
		</div>
	</section>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				type: 'login',
				login_username: '',
				login_password: '',
				register_phone: '',
				register_phoneCode: '',
				register_password: '',
				register_code: '',
				verifycodeUrl: ''
			}
		},
		methods: {
			toRegister() {
				this.type = 'register';
				this.getVerifycode();
			},
			getVerifycode() {
				let option = {
					url: 'api/verifycode',
					type: 'GET',
					success: function(result, status, xhr) {
						if(result) {
							this.verifycodeUrl = result;
						}
					}.bind(this)
				};

				myAjax(option);
			}
		}
	}
</script>

<style scoped lang="less"> 
	.entry {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: url('~@/assets/bg/login-bg.jpg');
		background-size: 100% 100%;

		.headerBg {
			position: relative;
			z-index: 2;
			width: 50%;
			height: 9rem;
			margin-left: auto;
			margin-right: auto;
			margin-top: -2rem;
			background-image: url('~@/assets/bg/login-logo.png');
			background-size: 100% 100%;
			background-position: 0 0rem;
			background-repeat: no-repeat;
		}

		.lodin_main {
			width: 75%;
			height: 10rem;
			margin: -0.5rem auto;
			padding-top: 1rem;
			background-image: url('~@/assets/bg/login-boxbg01.png');
			background-size: 100% 100%;
			text-align: center;

			.input {
				width: 75%;
				height: 1.5rem;
				background-image: url('~@/assets/bg/kuang-bg01.png');
				background-size: 100% 100%;
				background-color: transparent;
				padding-left: 0.5rem;
				font-size: 0.6rem;
				margin-top: 0.5rem;
			}

			.login {
				width: 52%;
				height: 2rem;
				margin: 0.8rem auto 0 auto;

				.img {
					width: 100%;
					height: 100%;
				}
			}

			.toRegister {
				color: #8D8273;
				font-size: 0.55rem;
				margin-top: 0.6rem;
			}
		}

		.register_main {
			width: 75%;
			height: 13rem;
			margin: -0.5rem auto;
			padding-top: 1rem;
			background-image: url('~@/assets/bg/login-boxbg02.png');
			background-size: 100% 100%;
			text-align: center;

			.title {
				font-size: 1rem;
				font-weight: 500;
			}

			.form {
				width: 85%;
				margin-left: auto;
				margin-right: auto;

				.input {
					width: 100%;
					height: 1.5rem;
					background-image: url('~@/assets/bg/kuang-bg01.png');
					background-size: 100% 100%;
					background-color: transparent;
					padding-left: 0.4rem;
					margin-left: -0.25rem;
					font-size: 0.6rem;
					margin-top: 0.5rem;
				}

				.formGroup {
					width: 100%;
					text-align: left;

					.left {
						display: inline-block;
						width: 55%;
					}

					.right {
						display: inline-block;
						width: 40%;
						float: right;
						margin-right: -0.2rem;

						.btn {
							display: inline-block;
							width: 100%;
							height: 1.5rem;
							position: relative;
							top: 0.5rem;
							background-color: transparent;
							border: none;
							background-image: url('~@/assets/bg/login-an01.png');
							background-size: 100% 100%;

							color: #fff;
							font-size: 0.6rem;
						}

						.img_code {
							display: inline-block;
							width: 100%;
							height: 1.6rem;
							position: relative;
							top: 0.5rem;
							background-color: #f5f5f5;

							.img {
								width: 100%;
								height: 100%;
							}
						}
					}
				}
			}

			.register {
				width: 52%;
				height: 2rem;
				margin: 0.8rem auto 0 auto;

				.img {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>