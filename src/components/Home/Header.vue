<template>
  <div>
    <img src="@/assets/logo.png" style="margin-top: 10px;
  height: 35px;">
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      userInfo: {
        name: ''
      }
    }
  },
  mounted(){
    this.init();
  },
  methods:{
    init(){
      this.userInfo.name = localStorage.getItem('userrole');
    },
    handleCommand (command) {
      window.localStorage.removeItem('access_token');
      this.$router.push({name:'login'});
      this.$message('click on item ' + command);
    }
  }
}
</script>
<style scoped>

</style>
