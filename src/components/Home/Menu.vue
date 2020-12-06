<template>
  <el-menu :default-active="index" class="el-menu-vertical-demo" @select="handleSelect" background-color="#545c64" text-color="#fff"
    active-text-color="#399EFF">
    <el-menu-item index="overview">
      <i class="el-icon-s-promotion"></i>
      <span slot="title">概览</span>
    </el-menu-item>
    <el-menu-item index="deviceManage">
      <i class="el-icon-cpu"></i>
      <span slot="title">设备管理</span>
    </el-menu-item>
    <el-menu-item index="deviceCheck">
      <i class="el-icon-s-order"></i>
      <span slot="title">设备点检</span>
    </el-menu-item>
    <el-menu-item index="deviceAlert">
      <i class="el-icon-warning"></i>
      <span slot="title">设备警告</span>
    </el-menu-item>
    <!-- <el-menu-item index="diagnosis">
      <i class="el-icon-s-opportunity"></i>
      <span slot="title">故障诊断</span>
    </el-menu-item> -->
    <el-menu-item index="userManage">
      <i class="el-icon-s-custom"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
    <!-- <el-menu-item index="model">
      <i class="el-icon-s-marketing"></i>
      <span slot="title">查看模型</span>
    </el-menu-item> -->
  </el-menu>
</template>
<script>
export default {
  data(){
    return{
      index:''
    }
  },
  created(){
    this.index = this.$router.history.current.name;
  },
  methods: {
    handleSelect (key) {
      // console.log(key);
      this.$router.push({ name: key });
    }
  }
}
</script>
<style scoped>
</style>
