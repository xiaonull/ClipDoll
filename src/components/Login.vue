<template>
	<section class="login">
		
	</section>
</template>

<script type="text/javascript">
	function parseQueryString(url) {
		let reg_url = /^[^\?]+\?([\w\W]+)$/,
		reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
		arr_url = reg_url.exec(url),
		ret = {};
		if (arr_url && arr_url[1]) {
			let str_para = arr_url[1], result;
			while ((result = reg_para.exec(str_para)) != null) {
				ret[result[1]] = result[2];
			}
		}
		return ret;
	}

	export default {
		mounted() {
			let data = parseQueryString((decodeURIComponent(location.href)));
			console.log(data.userImg)
			// console.log('1:  ' + location.href)
			// console.log('2:  ' + decodeURIComponent(location.href))
			alert(decodeURI(location.href));
			let option = {
				url: 'api/login',
				type: 'POST',
				data: data,
				success: function(result, status, xhr) {
					if(result.code === 1) {
						sessionStorage.token = result.token;
						sessionStorage.userData =  JSON.stringify(result.user);
						sessionStorage.initWaWaJi =  JSON.stringify(result.data);
						sessionStorage.loginUrlData =  JSON.stringify(data);
						// console.log(JSON.parse(sessionStorage.initWaWaJi));
						
						if(sessionStorage.login === 'true') {
							sessionStorage.reload = 'true';
						}else {
							sessionStorage.login = 'true';
							sessionStorage.reload = 'false';
						}

						this.$router.push('/index');
					}
				}.bind(this)
			};

			myAjax(option);

		}
	}
</script>