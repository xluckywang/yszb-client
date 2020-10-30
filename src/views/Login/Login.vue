<template>
  <div class="login">
    <el-row>
      <el-col :span="14">
        <img src="@/assets/login.png" height="410px">
      </el-col>
      <el-col :span="10" class="content">
        <el-row>
          <el-col :span="12">
            <div class="title">{{title}}</div>
          </el-col>
          <el-col :span="12">
            <div class="logo"><img src="@/assets/logo.png" alt="logo"></div>
          </el-col>
          <el-col>
            <h1>设备智能自诊断平台</h1>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form ref="form" :model="form" :rules="rules">
              <el-form-item label="账号" prop="username" label-width="60px">
                <el-input class="loginInput" type="text" v-model="form.username" placeholder="请输入账号"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password" label-width="60px">
                <el-input class="loginInput" type="password" v-model="form.password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="loginBtn" type="primary" @click="submitForm('form')">立即登录</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-link href="/register" type="primary">用户注册</el-link>
          </el-col>
          <el-col :span="12" style="text-align:right;">
            <el-link href="/reset" type="primary">忘记密码</el-link>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { login } from '@/api/login/login';

export default {
  name: '',
  data () {
    return {
      loading: false,
      title: '欢迎使用',
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //加载
          this.loading = true;

          // 请求数据整理
          let userList = {
            userPhone: this.form.username,
            userPwd: this.form.password
          }

          //登录请求
          login(userList).then(res => {
            // console.log(res);
            if (res.status == '200') {
              if (res.data.data) {
                localStorage.setItem('access_token', res.data.data.token); // 测试解决上线第一次请求不带token问题
                localStorage.setItem('username', this.form.username);
                this.$message.success({
                  message: '登录成功',
                  position: 'top',
                  time: 2000
                })
                this.$router.push({ path: '/home/overview' })
              } else {
                this.$message.error({
                  message: '用户名或密码不正确',
                  position: 'top',
                  time: 2000
                })
                this.loading = false
              }
            } else {
              this.loading = false
            }
          })
            .catch(err => {
              this.$message.error({
                  message: err,
                  position: 'top',
                  time: 2000
                })
              this.loading = false
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>
<style scoped>
@import '../../assets/css/loginStyle.css';

.login {
  margin: auto;
  padding-top: 200px;
  width: 1200px;
  height: 410px;
}
.content {
  width: 450px;
}
</style>
