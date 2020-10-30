<template>
  <div class="register">
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
          <el-form-item label="用户姓名" prop="name" label-width="80px">
            <el-input class="loginInput" v-model="form.name" placeholder="请填写真实的用户姓名"></el-input>
          </el-form-item>
          <el-form-item label="公司" prop="company" label-width="80px">
            <el-select v-model="form.company" placeholder="请选择公司">
              <el-option v-for="item in companyList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="邮箱" prop="Email" label-width="80px">
            <el-input class="loginInput" v-model="form.Email" placeholder="请填写邮箱"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="Phone" label-width="80px">
            <el-input class="loginInput" v-model="form.Phone" placeholder="请填写手机号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd" label-width="80px">
            <el-input class="loginInput" type="password" v-model="form.pwd" placeholder="密码长度至少9位，包含数字及大小写字母"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkpwd" label-width="80px">
            <el-input class="loginInput" type="password" v-model="form.checkpwd" placeholder="确认密码和新密码保持一致"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="loginBtn" type="primary" @click="submitForm('form')">注册</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { register, getAllCompany } from '@/api/login/login'

export default {
  name: '',
  data () {

    //验证规则
    let checkPhone = (rule, value, callback) => {
      if (value.length < 11 || isNaN(value)) {
        return callback(new Error('请输入正确的手机号'));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      let lovercase = /[a-z]/.test(value);//小写
      let number = /\d/.test(value); //数字
      let uppercase = /[A-Z]/.test(value); //大写
      if (value.length < 9 || !lovercase || !number || !uppercase) {
        return callback(new Error('密码长度至少9位，包含数字及大小写字母'));
      } else {
        callback();
      }
    };
    let validateCheck = (rule, value, callback) => {
      if (value != this.form.pwd) {
        return callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };


    return {
      loading: false,
      title: '用户注册',

      // 注册请求数据
      form: {
        name: '',
        company: '',
        Email: '',
        Phone: '',
        pwd: '',
        checkpwd: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请选择公司', trigger: 'change' }
        ],
        Email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'change' }
        ],
        Phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'change' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'change' }
        ],
        checkpwd: [
          { required: true, message: '请重新输入密码', trigger: 'blur' },
          { validator: validateCheck, trigger: 'change' }
        ]
      },
      companyList: [ //获取公司列表
        // { value: 'company1', label: '公司一' }
      ]
    };
  },
  mounted(){
    this.init();
  },
  methods: {
    init(){
      getAllCompany().then(res=>{
        // console.log(res.data.data);
        for(let i=0;i<res.data.data.length;i++){
          this.companyList.unshift({
            value:res.data.data[i].companyId,
            label:res.data.data[i].companyName
          })
        }
      })
    },

    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          // console.log(this.form);
          let msg = {
            userName: this.form.Phone,
            nickName: this.form.name,
            userPwd: this.form.pwd,
            userEmail: this.form.Email,
            userPhone: this.form.Phone,
            companyId: this.form.company
          };

          // 注册请求
          register(msg).then(res => {
            // console.log(res.data);
            if (res.status == 200) {
              if (res.data.code == 'SUCCESS') {
                this.$message.success({
                  message: '注册成功，等待管理员审核...',
                  position: 'top',
                  time: 2000
                })
                this.$router.push('/login')
              } else {
                this.$message.error({
                  message: '该手机号已经被注册',
                  position: 'top',
                  time: 2000
                })
                this.loading = false;
              }
            } else {
              this.loading = false;
            }
          })
            .catch(err => {
              console.log(err);
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

.register {
  margin: auto;
  padding-top: 140px;
  width: 450px;
  /* background-color: pink; */
}
</style>
