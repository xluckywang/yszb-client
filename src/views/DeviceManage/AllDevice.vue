<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>设备列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 控制面板 -->
    <div class="form-bar">
      <el-row>
        <el-col :span="14">
          <h3>全部设备</h3>
        </el-col>
        <el-col :span="10" style="text-align : right;">
          <el-button type="primary" size="small" @click="handleBack()">返回</el-button>
        </el-col>
      </el-row>
    </div>

    <!-- 设备列表 -->
    <div class="container">
      <el-table :data="tableData" :row-class-name="tableRowClassName" style="min-height:640px;">
        <el-table-column type="index" align="center" min-width="20"></el-table-column>
        <el-table-column prop="sbxxId" label="设备编号" min-width="50"></el-table-column>
        <el-table-column prop="sbxxLocation" label="设备位置" min-width="100"></el-table-column>
        <el-table-column prop="dilveryTime" label="出厂时间" min-width="80"></el-table-column>
        <el-table-column prop="adjustTime" label="安调时间" min-width="80"></el-table-column>
        <el-table-column prop="whContacts" label="维护联系人" min-width="50"></el-table-column>
        <el-table-column prop="isRunning" label="运行" min-width="50"></el-table-column>
        <el-table-column prop="isChecked" label="点检" min-width="50"></el-table-column>
        <el-table-column prop="remarkName" label="备注" min-width="100"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleDetail(scope.row)">查看状态详情</el-button>
            <el-button size="mini" type="primary" @click="handleCheckSet(scope.row)">点检设置</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页  -->
      <Pagination :pageData="pageData" @handleCurrentChange="handleCurrentChange" />
    </div>
  </div>
</template>

<script>

//组件
import Pagination from '@/components/Pagination';

// api
// import { getDevList } from '@/api/DeviceManage/DeviceList';

export default {
  data () {
    return {
      //设备列表
      tableData: [{
        sbxxId: '',
        sblxName: '',
        sbxxLocation: '',
        dilveryTime: '',
        adjustTime: '',
        whContacts: '',
        isChecked: '',
        isRunning: '',
        remarkName: ''
      }],

      // 分页
      pageData: {
        totalElements: 400,
        currentPage: 1,
        pageSize:10
      }
    };
  },
  components: {
    Pagination
  },
  created () {
    this.init();
  },
  mounted () {

  },
  filters: {
    isRunning (item) {
      if (item == '正在运行' || item == '已开启')
        return 'success';
      else
        return 'warn';

    },
    isChecked (item) {
      if (item == '')
        return 'success';
      else
        return 'warn';
    }
  },
  methods: {
    // 初始化
    init () {
      this.getList();

      
    },

    // 获取设备列表
    getList () {
      


    },

    // 查看设备详情
    handleDetail (row) {
      // console.log(row)
      this.$router.push({ name: 'deviceDetail', params: { id: row.sbxxId } });
    },

    handleCheckSet (row) {
      this.$router.push({ name: 'checkSet', params: { id: row.sbxxId } });
    },

    // 分页-->当前页数
    handleCurrentChange (val) {
      // console.log(val);
      this.pageData.currentPage = val;
      this.getList();
    },
    // 关闭弹窗
    handleClose () {
      this.getList();
      this.EditDevdialogVisible = false;
    },

    //返回
    handleBack () {
      this.$router.push({ name: 'deviceManage' })
    },

    // 警告修改样式
    tableRowClassName (row) {
      // console.log(row)
      if (row.row.isRunning == '未运行')
        return 'error-row';
      else if (row.row.isChecked == '未开启')
        return 'warning-row';
    }

  }
};
</script>

<style scoped>
@import '../../assets/css/common.css';

.container {
  background-color: white;
  margin: 20px 10px;
}

</style>
