<template>
	<section class="publishShow" v-if="show">
		<div class="pannel">
			<div class="title">
				<img src="~@/assets/modal/box-bt03.png" class="img_title">
				<img src="~@/assets/modal/close.png" class="img_close" @click="close">
			</div>
			<h3 class="info">玩家秀通过审核可获得100金币奖励</h3>	
			<div class="content">
				<textarea class="contentText" placeholder="请输入不少于30字的玩家秀内容" v-model="contentText"></textarea>
			</div>
			<h2 class="info2">请上传美美的照片</h2>
			<div class="uploadImg">
				<form id="uploadImgForm" ref="uploadImgForm">
					<input type="file" name="pic" id="uploadImg" ref="uploadImg" hidden="true" value="" @change="uploadImg" />
					<label for="uploadImg" class="uploadImgLabel">
						<img src="~@/assets/modal/add-ico.png" class="addIcon">
					</label>
				</form>
				<div class="preview">
					<img :src="previewImgUrl" class="img" v-if="previewImgUrl !== ''">
				</div>
			</div>
			<h5 class="info3">
				<p>*写上游戏的祝福语再拍照会更容易通过审核哦！</p>
				<p>*通过审核后即可获得100金币奖励！</p>
				<p>*所上传图片视为允许被引用！</p>
			</h5>
			<img src="~@/assets/modal/an-ico03.png" class="sureToSend" @click="sureToSend">
		</div>
	</section>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				contentText: '',
				previewImgUrl: ''
			}
		},
		methods: {
			close() {
				this.$store.commit('modal/setPublishShow', {
					showPublishShow: false
				});
			},
			resetData() {
				this.contentText = '';
				this.previewImgUrl = '';
			},
			uploadImg() {
				var file = $(this.$refs.uploadImg)[0].files[0];
				if(!(file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
					console.log('文件格式不为图片');
					this.previewImgUrl = '';
					return;
				}

				this.previewImgUrl = URL.createObjectURL(file);
			},
			sureToSend() {
				if(this.contentText.length < 30) {
					this.$store.commit('modal/setMsg', {
						msg: '请输入不少于30字的玩家秀内容',
						display: true
					});

					let t = setTimeout(() => {
						this.$store.commit('modal/resetMsg');
						clearTimeout(t);
					}, 2000);

					return;
				}
				
				let file = $(this.$refs.uploadImg)[0].files[0];
				// console.log(file)
				if(!file || !(file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
					this.$store.commit('modal/setMsg', {
						msg: '请上传美美的照片',
						display: true
					});

					let t = setTimeout(() => {
						this.$store.commit('modal/resetMsg');
						clearTimeout(t);
					}, 2000);
					
					document.getElementById('uploadImgForm').reset();
					return;
				}
				
				let formData = new FormData();
				formData.append('pic', file);
				let option = {
					url: 'api/addusershow?contents=' + this.contentText + '&token=' + sessionStorage.token,
					type: 'POST',
					data: formData,
					dataType: 'json',
					cache: false,
					processData: false,
					contentType: false,
					success: function(result, status, xhr) {
						if(result.code === 1) {
							this.$store.commit('modal/setMsg', {
								msg: '发表成功',
								display: true
							});

							let t = setTimeout(() => {
								this.$store.commit('modal/resetMsg');
								clearTimeout(t);
							}, 2000);
							
							document.getElementById('uploadImgForm').reset();
							this.contentText = '';
							this.previewImgUrl = '';
						}else {
							this.$store.commit('modal/setMsg', {
								msg: '发表失败，请稍后重试',
								display: true
							});

							let t = setTimeout(() => {
								this.$store.commit('modal/resetMsg');
								clearTimeout(t);
							}, 2000);

							console.log('发表玩家秀err: ' + result);
						}
					}.bind(this)
				};

				myAjax(option);
			}
		},
		computed: {
			show() {
				if(this.$store.state.modal.showPublishShow === true) {
					this.resetData();
				}

				return this.$store.state.modal.showPublishShow;
			}
		}
	}
</script>

<style scoped lang="less"> 
	.publishShow {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		z-index: 20;
		text-align: center;

		.pannel {
			position: absolute;
			width: 93%;
			height: 90%;
			top: 5%;
			left: 50%;
			margin-left: -46.5%;
			background-image: url('~@/assets/modal/box-bg03.png');
			background-size: 100% 100%;
			background-position: center;

			.title {
				text-align: center;

				.img_title {
					display: inline-block;
					width: 9rem;
					margin-top: -0.8rem;
				}

				.img_close {
					position: absolute;
					top: -0.2rem;
					right: -0.25rem;
					width: 1.5rem;
					height: 1.5rem;
				}
			}

			.info {
				color: #93796d;
				font-size: 0.63rem;
				margin-top: 0.2rem;
			}

			.content {
				width: 88%;
				height: 6rem;
				margin: 0.4rem auto 0 auto;
				background-image: url('~@/assets/modal/input-bg.png');
				background-repeat: no-repeat;
				background-size: 100% 100%;
				overflow: hidden;

				.contentText {
					width: 90%;
					height: 90%;
					border: none;
					background-color: rgba(255, 255, 255, 0);
					padding: 0.4rem 0.1rem 0.4rem 0.6rem;
					font-size: 0.8rem;
					outline: none;
					resize: none;
				}

				.contentText:focus {
					border: none;
				}
			}

			.info2 {
				text-align: left;
				font-size: 0.73rem;
				padding: 0.8rem 0 0 0.5rem;
				color: #e35727;
				padding-bottom: 0.5rem;
				border-bottom: 2px dashed #e35727;
				margin: 0 0.2rem 0 0.2rem;
			}

			.uploadImg {
				height: 3rem;
				text-align: left;
				position: relative;

				.uploadImgLabel {
					display: inline-block;

					.addIcon {
						display: inline-block;
						width: 1.5rem;
						margin: 0.5rem 0 0 0.6rem;
					}
				}
			}

			.preview {
				position: absolute;
				width: 2.4rem;
				height: 2.4rem;
				top: 0.25rem;
				right: 0.5rem;
				border: 2px dashed #e35727;

				.img {
					width: 100%;
					height: 100%;
				}
			}

			.info3 {
				text-align: left;
				font-size: 0.61rem;
				color: #625D42;
				padding-left: 0.5rem;
				line-height: 0.9rem;
			}

			.sureToSend {
				width: 6rem;
				height: 2rem;
				margin-top: 0.7rem;
				margin-left: auto;
				margin-right: auto;
			}
		}
	}
</style>