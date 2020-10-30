<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>管理点检项目</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="checkBoard">
      <el-button type="primary">添加点检项目</el-button>
      <el-button type="primary" @click="$router.go(-1)">返回</el-button>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="date" label="点检项目名称" min-width="150"></el-table-column>
        <el-table-column prop="date" label="内容" min-width="250"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small">编辑</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      djxmlist:[],
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
.checkBoard {
  padding: 20px;
}
</style>
