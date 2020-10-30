<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>设备列表</el-breadcrumb-item>
      <el-breadcrumb-item>设备状态详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 控制面板 -->
    <div class="form-bar">
      <el-row>
        <el-col :span="14">
          <h3>{{$router.history.current.params.id}}</h3>
        </el-col>
        <el-col :span="10" style="text-align : right;">
          <el-button type="primary" size="small" @click="handleBack ()">返回</el-button>
        </el-col>
      </el-row>
    </div>

    <el-container>
      <el-aside width="300px">
        <img :src="img" width="300" height="300">

        <!-- 设备详细信息 -->
        <div>
          <p>设备信息编号：<span>{{sbDetail.sbxxId}}</span></p>
          <p>设备名称：<span>{{sbDetail.sblxName}}</span></p>
          <p>设备类型：<span>{{sbDetail.sblxId}}</span></p>
          <p>设备位置：<span>{{sbDetail.sbxxLocation}}</span></p>
          <p>出厂时间：<span>{{sbDetail.dilveryTime}}</span></p>
          <p>安调时间：<span>{{sbDetail.adjustTime}}</span></p>
          <p>维护联系人：<span>{{sbDetail.whContacts}}</span></p>
          <p>是否运行：<span :class="this.sbDetail.isRunning | isRunningFilter">{{sbDetail.isRunning}}</span></p>
          <p>点检情况：<span :class="this.sbDetail.isChecked | isRunningFilter">{{sbDetail.isChecked}}</span></p>
          <p>备注：<span>{{sbDetail.remarkName}}</span></p>
        </div>
      </el-aside>
      <el-main>
        <!-- 参数表 -->
        <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: 100%;min-height:565px;">
          <el-table-column type="index" width="50" align="center"></el-table-column>
          <el-table-column label="参数编号" prop="num"></el-table-column>
          <el-table-column label="参数名称" prop="name"></el-table-column>
          <el-table-column label="参数含义" prop=""></el-table-column>
          <el-table-column label="参数采集周期" prop=""></el-table-column>
          <el-table-column label="参数采集部位" prop="addr"></el-table-column>
          <el-table-column label="参数阈值" prop=""></el-table-column>
          <el-table-column align="right" width="200">
            <template slot="header" slot-scope="{}">
              <el-input v-model="search" size="mini" placeholder="输入参数名称搜索" />
            </template>
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleParams(scope.row)">查看历史数据</el-button>
            </template>
          </el-table-column>
        </el-table>
        <Pagination :pageData="pageData" @handleCurrentChange="handleCurrentChange" />
      </el-main>
    </el-container>
  </div>
</template>

<script>
// 组件
import Pagination from '@/components/Pagination';

// api
import { getSbDetail, getSblxPicture } from '@/api/DeviceManage/DeviceDetail';

export default {
  data () {
    return {
      // 设备详细信息
      sbDetail: {
        sbxxId: '',
        sblxName: '',
        sblxId: '',
        sbxxLocation: '',
        dilveryTime: '',
        adjustTime: '',
        whContacts: '',
        isRunning: '',
        isChecked: '',
        remarkName: '',
      },
      img: '',

      // 分页
      pageData: {
        totalElements: 400,
        currentPage: 1,
        pageSize:10
      },

      // 参数列表
      tableData: [{
        id: '1',
        num: 'CU.01.01',
        name: '参数名称一',
        addr: 'CU操作台'
      }, {
        id: '2',
        num: 'CU.01.01',
        name: '参数名称二',
        addr: 'CU操作台'
      }],
      search: ''
    };
  },
  components: {
    Pagination
  },
  created () {
    this.init()
  },
  mounted () {

  },
  filters: {
    isRunningFilter (item) {
      if (item == '正在运行' || item == '已开启')
        return 'success';
      else
        return 'warn';

    }
  },
  methods: {
    init () {
      getSbDetail(this.$router.history.current.params.id).then(res => {
        this.sbDetail = res.data.data;
        getSblxPicture(this.sbDetail.sblxId).then(res => {
          this.img = res.data.data;
        })
      })

    },



    // 查看历史参数
    handleParams (row) {
      this.$router.push({ name: 'parameters', params: { id: row.id } })
    },

    // 后退
    handleBack () {
      this.$router.go(-1);
    },
    // 当前页
    handleCurrentChange (val) {
      // console.log(val);
      this.pageData.currentPage = val;
    },
  }
};
</script>

<style scoped>
@import '../../assets/css/common.css';

.success {
  color: #67c23a;
  font-weight: bold;
}
.warn {
  color: #f56c6c;
  font-weight: bold;
}
.el-container {
  background-color: white;
  margin: 10px;
  padding: 10px;
}
p {
  margin: 10px 0;
  font-weight: bold;
}
span {
  font-weight: normal;
}
.el-main {
  background-color: white;
}
</style>
