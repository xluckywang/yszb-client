<template>
  <div>
    <el-table :data="tableData" border style="width: 100%; height:1000px" max-height="840">
      <el-table-column prop="training" label="训练集"></el-table-column>
      <el-table-column prop="verify" label="验证集"></el-table-column>
      <el-table-column prop="parame" label="模型参数"></el-table-column>
      <el-table-column prop="loss" label="Loss"></el-table-column>
      <el-table-column prop="rmse" label="RMSE"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData:[
        {
          training:'测试',
          verify:'测试',
          parame:'测试',
          loss:'测试',
          rmse:'测试'
        },
      ]
    };
  },
  created () {

  },
  mounted () {

  },
  methods: {

  }
};
</script>

<style scoped>
.container {
  padding: 30px;
  background-color: white;
  margin: 20px 10px;
  height: 660px;
}
</style>
