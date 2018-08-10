<template>
  <div class="wraper login-wraper">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <h3 class="title">vue-element-admin</h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="off" placeholder="username" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="off" placeholder="password"></el-input>
        <span class="show-pwd" @click="showPwd"><svg-icon :icon-class="eyeStatus" /></span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          Sign in
        </el-button>
      </el-form-item>
      <div class="tips">
        <span style="margin-right:20px;">username: {{loginForm.username}}</span>
        <span> password: {{loginForm.password}}</span>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
	data() {
		const validateUsername = function() {};
		return {
			loginForm: {
				username: 'admin1',
				password: 'admin123'
			},
			loginRules: {
				username: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
					{ min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ min: 8, max: 15, message: '长度在 8 到 15 个字符', trigger: 'blur' }
				]
			},
			loading: false,
			pwdType: 'password',
			eyeStatus: 'eye-open'
		};
	},
	methods: {
		showPwd() {
			if (this.pwdType === 'text') {
				this.pwdType = 'password';
				this.eyeStatus = 'eye-open';
			} else {
				this.pwdType = 'text';
				this.eyeStatus = 'eye-close';
			}
		},
		handleLogin() {
			this.loading = true;
			this.$refs.loginForm.validate(valid => {
				if (valid) {
					this.$store.dispatch('LOGIN', this.loginForm).then(result => {
						this.loading = false;
						this.$message({
							type: 'success',
							message: '登录成功'
						});
					});
				} else {
					console.log('error submit!!');
					this.loading = false;
					return false;
				}
			});
		}
	}
};
</script>

<style lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;
/* reset element-ui css */
.login-wraper {
	.el-input {
		display: inline-block;
		height: 47px;
		width: 85%;
		input {
			background: transparent;
			border: 0px;
			-webkit-appearance: none;
			border-radius: 0px;
			padding: 12px 5px 12px 0;
			color: $light_gray;
			height: 47px;
			&:-webkit-autofill {
				box-shadow: 0 0 0px 1000px $bg inset !important;
				-webkit-text-fill-color: #fff !important;
			}
		}
	}
	.el-form-item {
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(0, 0, 0, 0.1);
		border-radius: 5px;
		color: #454545;
	}
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-wraper {
	position: fixed;
	height: 100%;
	width: 100%;
	background-color: $bg;
	.login-form {
		position: absolute;
		left: 0;
		right: 0;
		width: 520px;
		padding: 35px 35px 15px 35px;
		margin: 120px auto;
		box-sizing: border-box;
	}
	.tips {
		font-size: 14px;
		color: #fff;
		margin-bottom: 10px;
		span {
			&:first-of-type {
				margin-right: 16px;
			}
		}
	}
	.svg-container {
		padding: 6px 5px 6px 15px;
		color: $dark_gray;
		vertical-align: middle;
		width: 30px;
		display: inline-block;
		font-size: 20px;
	}
	.title {
		font-size: 26px;
		font-weight: 400;
		color: $light_gray;
		margin: 0px auto 40px auto;
		text-align: center;
		font-weight: bold;
	}
	.show-pwd {
		position: absolute;
		right: 10px;
		top: 7px;
		font-size: 16px;
		color: $dark_gray;
		cursor: pointer;
		user-select: none;
	}
}
</style>
