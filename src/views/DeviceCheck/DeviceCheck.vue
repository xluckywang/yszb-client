<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>设备点检</el-breadcrumb-item>
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
          <el-select v-model="formInline.check" multiple collapse-tags clearable placeholder="请选择点检周期">
            <el-option v-for="item in checkOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item>
          <el-cascader v-model="formInline.check" :options="checkOptions" :props="props" style="width:255px" collapse-tags clearable
            placeholder="请选择点检周期"></el-cascader>
        </el-form-item> -->
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
          <el-button type="primary" @click="SaveCheck()">完成点检</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 设备点检列表 -->
    <div class="container">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" :selectable="isDisabled" min-width="55"></el-table-column>
        <el-table-column type="expand" min-width="55">
          <template slot-scope="props">
            <el-tabel :data="props">
              <el-table-column prop="" label="项目名称"></el-table-column>
              <el-table-column prop="" label="项目内容"></el-table-column>
            </el-tabel>
          </template>
        </el-table-column>
        <el-table-column prop="sbxxId" label="设备名称" min-width="120"></el-table-column>
        <el-table-column prop="sbxxCode" label="设备编号" min-width="140"></el-table-column>
        <el-table-column prop="sbxxName" label="设备类型" width="180"></el-table-column>
        <el-table-column prop="djxmType" label="点检周期" width="100"></el-table-column>
        <el-table-column prop="isFinished" label="是否完成" width="120"></el-table-column>
        <el-table-column prop="isOutdated" label="是否超期" width="120"></el-table-column>
        <el-table-column prop="finishedTime" label="完成时间" width="220"></el-table-column>
        <el-table-column prop="djfaOperator" label="操作人员" show-overflow-tooltip></el-table-column>
      </el-table>
      <!-- 分页  -->
      <Pagination :pageData="pageData" @handleCurrentChange="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
import { getDevList } from '@/api/DeviceManage/DeviceList';
import { getDjfa, commitDjfa,getSbDjxByType } from '@/api/DeviceCheck/DeviceCheck';
// import {  } from '@/api/DeviceManage/CheckSet';

//组件
import Pagination from '@/components/Pagination';


export default {
  name: '',
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
        // {
        //   value: '选项1',
        //   label: '设备一'
        // }
      ],
      //点检项目选项-----选项待修改
      props: { multiple: true },
      checkOptions: [
        {
          value: 'D',
          label: '日点检',
        }, {
          value: 'W',
          label: '周点检',
        }, {
          value: 'M',
          label: '月点检',
        }, {
          value: 'Y',
          label: '年点检',
        }
      ],
      //完成情况选项
      complete: [

        { value: '已完成', label: '已完成' },
        { value: '未完成', label: '未完成' },
      ],
      // 设备点检数据
      tableData: [],
      multipleSelection: [],
      // 分页
      pageData: {
        totalElements: 400,
        currentPage: 1,
        pageSize: 10
      },
    }
  },
  created () {
    this.init();
  },
  components: {
    Pagination
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
      }).catch(err => {
        // console.log(err);
        this.$message.error({
          message: err,
          position: 'top',
          time: 2000
        })
      })
      this.getDjrz(
        this.djrzFormat()
      );
      // console.log(this.tableData);

    },

    // 获取点检日志列表
    getDjrz (obj) {
      getDjfa(obj).then(res => {
        // console.log(obj);
        // console.log(res.data.data.data);
        this.tableData = res.data.data.data;
        this.pageData.totalElements = res.data.data.totalElements;
        console.log(this.tableData);
        console.log(this.tableData[0].sbxxId);
        console.log(this.tableData[0].djlxId);
        getSbDjxByType(this.tableData[0].sbxxId, this.tableData[0].djlxId).then(res => {
          console.log(res);
        })
        // for(let i=0;i<this.tableData.length;i++){

        // }
      }).catch(err => {
        // console.log(err)
        this.$message.error({
          message: err,
          position: 'top',
          time: 2000
        })
      })
    },

    //条件筛选
    onSubmit () {
      console.log(this.formInline.time);
      console.log(this.formInline.deviceValue);
      console.log(this.formInline.check);
      console.log(this.formInline.completeValue);

      // this.getDjrz(
      //   this.djrzFormat()
      // );

    },

    // 提交点检
    SaveCheck () {
      // console.log(this.multipleSelection)
      let idList = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        idList[i] = this.multipleSelection[i].djfaId
      }
      // console.log(idList)

      this.$confirm('此操作将修改点检状态为已完成，确定设备已完成点检？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // console.log(idList)
        commitDjfa(idList).then(res => {
          // console.log(res.data.data)
          this.$message.success({
            message: res.data.data,
            position: 'top',
            time: 2000
          })
          this.getDjrz(this.djrzFormat());
        }).catch(err => {
          // console.log(err);
          this.$message.error({
            message: err,
            position: 'top',
            time: 2000
          })
        })
      })
    },

    // 选择框禁用
    isDisabled (row) {
      if (row.isFinished == '已完成')
        return false;
      else
        return true;
    },


    // 据点检日志请求体数整理
    djrzFormat () {

      let djxmList = [];
      for (let i = 0; i < this.formInline.check.length; i++) {
        djxmList[i] = this.formInline.check[i][1];
      }
      // console.log(djxmList)

      if (this.formInline.time) {
        return {
          pageSize: 10,
          pageNo: this.pageData.currentPage,
          startTime: this.formInline.time[0],
          endTime: this.formInline.time[1],
          sbxxIdList: this.formInline.deviceValue,
          djxmIdList: djxmList,
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
          djxmIdList: djxmList,
          finished: this.formInline.completeValue
        }
    },

    // getDjxm (sbId, djzq) {
    //   getSbDjxByType(sbId, djzq).then(res => {
    //     console.log(res);
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },

    // 分页-->当前页数
    handleCurrentChange (val) {
      // console.log(val);
      this.pageData.currentPage = val;


      this.getDjrz(
        this.djrzFormat()
      );
    },

    handleSelectionChange (val) {
      this.multipleSelection = val;
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
