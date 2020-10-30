<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>设备警告</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 控制面板 -->
    <div class="form-bar">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-date-picker v-model="formInline.time" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.deviceValue" multiple collapse-tags clearable placeholder="请选择设备">
            <el-option v-for="item in deviceOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.completeValue" style="width:150px" placeholder="请选择完成情况">
            <el-option v-for="item in complete" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">筛选</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">排除警告</el-button>
        </el-form-item>
      </el-form>
    </div>


    <!-- 列表 -->
    <div class="container">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="日期" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="设备名称" width="120"></el-table-column>
        <el-table-column prop="address" label="设备编号" width="120"></el-table-column>
        <el-table-column prop="address" label="设备类型" width="120"></el-table-column>
        <el-table-column prop="address" label="参数阈值" width="120"></el-table-column>
        <el-table-column prop="address" label="通知次数" width="220"></el-table-column>
        <el-table-column prop="address" label="下次预警时间" width="120"></el-table-column>
        <el-table-column prop="address" label="状态" show-overflow-tooltip></el-table-column>
      </el-table>
      <!-- 分页  -->
      <Pagination :pageData="pageData" @handleCurrentChange="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
//组件
import Pagination from '@/components/Pagination';

export default {
  data () {
    return {
      formInline: {//筛选表单传递数据
        time: '',
        device: '',
        check: [],
        deviceValue: [],
        completeValue: ''
      },
      pickerOptions: {//时间选择便捷选项
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      //设备选项
      deviceOptions: [
        {
          value: '选项1',
          label: '设备一'
        }, {
          value: '选项2',
          label: '设备二'
        }
      ],
      //完成情况选项
      complete: [
        { value: '1', label: '已完成' },
        { value: '2', label: '未完成' }
      ],
      // 分页
      pageData: {
        totalElements: 400,
        currentPage: 1,
        pageSize: 10
      },
    };
  },
  components: {
    Pagination
  },
  created () {

  },
  mounted () {

  },
  methods: {
// 当前页
    handleCurrentChange (val) {
      // console.log(val);
      this.pageData.currentPage = val;
    },
  }
};
</script>

<style scoped lang="css">
@import '../../assets/css/common.css';

.container {
  background-color: white;
  margin: 20px 10px;
}
</style>
