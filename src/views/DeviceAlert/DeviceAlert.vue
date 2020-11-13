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
            :picker-options="pickerOptions" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.deviceValue" multiple collapse-tags clearable placeholder="请选择设备">
            <el-option v-for="item in deviceOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.completeValue" style="width:150px" clearable placeholder="请选择完成情况">
            <el-option v-for="item in complete" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">筛选</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleFinished()">排除警告</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 列表 -->
    <div class="container">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" :selectable="isDisabled"></el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="sbxxId" label="设备名称"></el-table-column>
        <el-table-column prop="sbxxType" label="设备编号"></el-table-column>
        <el-table-column prop="sbxxName" label="设备类型"></el-table-column>
        <el-table-column prop="paramter" label="参数"></el-table-column>
        <el-table-column prop="value" label="参数阈值"></el-table-column>
        <el-table-column prop="isFinished" label="状态"></el-table-column>
        <el-table-column prop="finishedTime" label="完成时间"></el-table-column>
      </el-table>
      <!-- 分页  -->
      <Pagination :pageData="pageData" @handleCurrentChange="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
//组件
import Pagination from '@/components/Pagination';
import { getYjfaList, commitYjfa } from '@/api/DeviceAlert/DeviceAlert';
import { getDevList } from '@/api/DeviceManage/DeviceList';

export default {
  data () {
    return {
      formInline: {//筛选表单传递数据
        time: '',
        device: '',
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
        // {
        //   value: '选项1',
        //   label: '设备一'
        // }
      ],
      //完成情况选项
      complete: [
        { value: '已解决', label: '已解决' },
        { value: '未解决', label: '未解决' }
      ],
      tableData: [],
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
    this.init();
  },
  mounted () {

  },
  methods: {
    init () {
      // 设备列表
      getDevList(
        {
          pageSize: 1000,
          pageNo: 1,
          object: ''
        }
      ).then(res => {
        // console.log(this.deviceOptions[0]);
        for (let i = 0; i < res.data.data.data.length; i++) {
          // console.log(res.data.data.data[i].sbxxId);
          let devItem = { value: '', label: '' };
          devItem.value = res.data.data.data[i].sbxxId;
          devItem.label = res.data.data.data[i].sbxxId;
          this.deviceOptions.push(devItem);
        }
        // console.log(this.deviceOptions);
      })
      this.getYjList(
        this.Format()
      )
    },
    getYjList (obj) {
      getYjfaList(obj).then(res => {
        // console.log(res.data.data);
        this.tableData = res.data.data.data;
        this.pageData.totalElements = res.data.data.totalElements;
      })
    },
    // 请求体数整理
    Format () {

      if (this.formInline.time) {
        return {
          pageSize: 10,
          pageNo: this.pageData.currentPage,
          startTime: this.formInline.time[0],
          endTime: this.formInline.time[1],
          sbxxIdList: this.formInline.deviceValue,
          finished: this.formInline.completeValue
        }
      }
      else
        return {
          pageSize: 10,
          pageNo: this.pageData.currentPage,
          startTime: '',
          endTime: '',
          sbxxIdList: this.formInline.deviceValue,
          finished: this.formInline.completeValue
        }
    },

    //条件筛选
    onSubmit () {
      // console.log(this.formInline.time);
      // console.log(this.formInline.deviceValue);
      // console.log(this.formInline.completeValue);

      this.getYjList(this.Format());

    },
    // 排除警告
    handleFinished () {
      // console.log(this.multipleSelection);
      let IdList = [];
      for (let i = 0, len = this.multipleSelection.length; i < len; i++) {
        IdList.push(this.multipleSelection[i].yjfaId);
      }
      // console.log(IdList);
      commitYjfa(IdList).then(res => {
        this.$message.success({
          message: res.data.data,
          position: 'top',
          time: 2000
        })
      })
      this.getYjList(this.Format());

    },
    // 选择框禁用
    isDisabled (row) {
      if (row.isFinished == '已解决')
        return false;
      else
        return true;
    },

    // 当前页
    handleCurrentChange (val) {
      // console.log(val);
      this.pageData.currentPage = val;
      // console.log(this.Format())
      this.getYjList(this.Format());
    },

    handleSelectionChange (val) {
      this.multipleSelection = val;
    }
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
