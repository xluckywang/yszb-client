<template>
  <div>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>修改个人信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="user-container">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户姓名" prop="nickName">
          <el-input v-model="form.nickName"></el-input>
        </el-form-item>
        <el-form-item label="公司" prop="companyId" label-width="80px">
          <el-select v-model="form.companyId" placeholder="请选择公司">
            <el-option v-for="item in companyList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="userPhone">
          <el-input v-model="form.userPhone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
          <el-input v-model="form.userEmail"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-button @click="dialogFormVisible = true">修改密码</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button @click="$router.push({name:'userManage'})">取消</el-button>
        </el-form-item>
      </el-form>
      <!-- 更改密码弹窗 -->
      <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="28%">
        <el-form ref="pwdform" :model="pwdform" :rules="pwdrules" label-width="100px">
          <el-form-item label="旧密码" prop="oldPwd">
            <el-input type="password" v-model="pwdform.oldPwd"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPwd">
            <el-input type="password" v-model="pwdform.newPwd"></el-input>
          </el-form-item>
          <el-form-item label="重复新密码" prop="newPwdCheck">
            <el-input type="password" v-model="pwdform.newPwdCheck"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="resetPwd()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/Overview/overview';
import { getAllCompany } from '@/api/login/login';
import { updateUser, updatePwd } from '@/api/UserManage/UserManage';

export default {
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
      if (value != this.pwdform.newPwd) {
        return callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    return {
      form: {},
      pwdform: {
        oldPwd: '',
        okdPwdCheck: '',
        newPwd: '',
        newPwdCheck: ''
      },
      companyList: [],
      dialogFormVisible: false,
      rules: {
        nickName: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' }
        ],
        companyId: [
          { required: true, message: '请选择公司', trigger: 'change' }
        ],
        userEmail: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'change' }
        ],
        userPhone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'change' }
        ]
      },
      pwdrules: {
        oldPwd: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'change' }
        ],
        newPwdCheck: [
          { required: true, message: '请重新输入新密码', trigger: 'blur' },
          { validator: validateCheck, trigger: 'change' }
        ]
      }
    };
  },
  created () {

  },
  mounted () {
    this.init();
  },
  methods: {
    init () {
      let username = localStorage.getItem('username')
      // console.log(username)
      getUserInfo(username).then(res => {
        // console.log(res.data.data);
        this.form = {
          userId: res.data.data.userId,
          userName: res.data.data.userName,
          nickName: res.data.data.nickName,
          userEmail: res.data.data.userEmail,
          userPhone: res.data.data.userPhone,
          companyId: res.data.data.companyId
        }
        this.pwdform.oldPwdCheck = res.data.data.userPwd;
      }).catch(err => {
        console.log(err);
      });
      getAllCompany().then(res => {
        // console.log(res.data.data)
        for (let i = 0; i < res.data.data.length; i++) {
          this.companyList.unshift({
            value: res.data.data[i].companyId,
            label: res.data.data[i].companyName
          })
        }
        // console.log(this.companyList)
      }).catch(err => {
        console.log(err);
      });
    },
    onSubmit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // console.log(this.form);
          updateUser(this.form).then(res => {
            this.$message.success({
              message: res.data.data,
              position: 'top',
              time: 2000
            })
            this.$router.push({ name: 'userManage' });
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetPwd () {
      // console.log(this.pwdform)
      if (this.pwdform.oldPwd == this.pwdform.oldPwdCheck) {
        if (this.pwdform.newPwd != this.pwdform.oldPwdCheck) {
          this.$refs['pwdform'].validate((valid) => {
            if (valid) {
              console.log(this.pwdform)
              updatePwd({
                userName: this.form.userName,
                userPwd: this.pwdform.newPwd
              }).then(() => {
                this.$message.success({
                  message: '修改密码成功！',
                  position: 'top',
                  time: 2000
                });
                this.dialogFormVisible = false;
                getUserInfo(localStorage.getItem('username')).then(res => {
                  this.pwdform.okdPwdCheck = res.data.data.userPwd;
                });
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });


        } else {
          this.$message.error({
            message: '请设置和之前不同的密码',
            position: 'top',
            time: 2000
          })
        }
      }
    }
  }
};
</script>

<style scoped>
.user-container {
  background-color: white;
  margin: 20px 10px;
  padding: 20px;
}
.user-container .el-input {
  max-width: 350px;
}
</style>
