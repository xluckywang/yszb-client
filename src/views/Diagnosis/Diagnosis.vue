<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>设备诊断</el-breadcrumb-item>
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
        <el-table-column prop="address" label="设备位置" width="120"></el-table-column>
        <el-table-column prop="address" label="故障类型" width="220"></el-table-column>
        <el-table-column prop="address" label="备注" width="120"></el-table-column>
        <el-table-column label="解决方案" width="220">
          <el-table-column prop="scheme1" label="方案一">
            <template slot-scope="scope">
              <el-button type="text" @click="handleScheme(scope.row)">{{scope.row.scheme1}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="scheme2" label="方案二"></el-table-column>
          <el-table-column prop="scheme3" label="方案三"></el-table-column>
          <el-table-column label="...">
            <el-button type="text" size="small">更多方案</el-button>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="address" label="是否解决" width="120"></el-table-column>
        <el-table-column prop="address" label="是否开启通知" show-overflow-tooltip></el-table-column>
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
      // 表格数据
      tableData: [
        {
          scheme1: '方案一',
          scheme2: '方案二',
          scheme3: '方案三',
        },
        {}
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
    
    handleScheme(row){
      console.log(row)
      this.$router.push({name:'diagnosisContent',param:{id:row.scheme1}});
    },
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
