<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>设备诊断</el-breadcrumb-item>
      <el-breadcrumb-item>设备诊断内容</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 控制面板 -->
    <div class="form-bar">
      <el-row>
        <el-col :span="14">
          <h3>EM01</h3>
        </el-col>
        <el-col :span="10" style="text-align : right;">
          <el-button type="primary" size="small" @click="handleBack ()">返回</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="container">
      方案内容方案内容方案内容方案内容方案内容方案内容
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {

    };
  },
  created () {
    console.log(this.$router)
  },
  mounted () {

  },
  methods: {
    // 后退
    handleBack () {
      this.$router.go(-1);
    },
  }
};
</script>

<style scoped>
@import '../../assets/css/common.css';

.container {
  padding: 30px;
  background-color: white;
  margin: 20px 10px;
  height: 660px;
}
</style>
