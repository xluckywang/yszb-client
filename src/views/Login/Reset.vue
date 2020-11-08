<template>
  <div class="reset">
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
            <el-input class="loginInput" v-model="form.username" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="Email" label-width="60px">
            <el-input class="loginInput" v-model="form.Email" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="loginBtn" type="primary" @click="submitForm('form')">重置密码</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>

// api
import { reset } from '@/api/login/login';


export default {
  name: '',
  data () {
    return {
      title: '重置密码',
      form: {
        username: '',
        Email: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        Email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //api       
          reset({
            userPhone:this.form.username,
            userEmail:this.form.Email 
          }).then(res => {
            console.log(res.data)
            if (res.data.code == 'SUCCESS') {
              this.$router.push('/login');
              this.$message.success({
                message: res.data.data,
                position: 'top',
                time: 2000
              })
            } else {
              this.$message.error({
                message: res.data.message,
                position: 'top',
                time: 2000
              })
            }

          }).catch(err => {
            console.log(err)
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

.reset {
  margin: auto;
  padding-top: 200px;
  width: 450px;
}
/* .el-input{
  height: 50px;
} */
</style>
