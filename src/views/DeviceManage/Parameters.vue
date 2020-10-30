<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>设备列表</el-breadcrumb-item>
      <el-breadcrumb-item>设备状态详情</el-breadcrumb-item>
      <el-breadcrumb-item>参数历史数据</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 控制台 -->
    <div class="form-bar">
      <el-row>
        <el-col :span="14">
          <h3>{{$router.history.current.params.id}}</h3>
        </el-col>
        <el-col :span="10" style="text-align : right;">
          <el-button type="primary" size="small" @click="handleBack()">返回</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 数据表格 -->
    <el-container>
      <el-table :data="tableData.filter(data => !search || data.num.toLowerCase().includes(search.toLowerCase()))" style="width: 100%;min-height:600px">
        <el-table-column label="阈值" prop="threshold">
        </el-table-column>
        <el-table-column label="数值" prop="num">
        </el-table-column>
        <el-table-column align="right" prop="date">
          <template slot="header" slot-scope="{}">
            <el-input v-model="search" size="mini" placeholder="输入数值搜索" />
          </template>
        </el-table-column>
      </el-table>
    </el-container>
    <el-container>
      <Pagination :pageData="pageData" @handleCurrentChange="handleCurrentChange" />
    </el-container>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination';

export default {
  data () {
    return {
      // 历史参数
      tableData: [
        {
          date: '2016-05-02',
          threshold: '阈值1',
          num: '数值1'
        }, {
          date: '2016-05-02',
          threshold: '阈值2',
          num: '数值2'
        }],
      search: '',


      // 分页
      pageData: {
        totalElements: 400,
        currentPage: 1
      },
    }
  },
  components:{
    Pagination
  },
  created () { },
  mounted () { },
  methods: {
    // 返回
    handleBack () {
      this.$router.go(-1)
    },
    handleCurrentChange (val) {
      this.pageDate.currentPage = val;
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/common.css';

.el-container {
  background-color: white;
  margin: 20px 10px;
}
</style>