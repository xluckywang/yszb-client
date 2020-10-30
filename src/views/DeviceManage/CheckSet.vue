<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>设备列表</el-breadcrumb-item>
      <el-breadcrumb-item>点检设置</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 控制台 -->
    <div class="form-bar">
      <el-row>
        <el-col :span="14">
          <h3>{{$router.history.current.params.id}}</h3>
        </el-col>
        <el-col :span="10" style="text-align : right;">
          <!-- <el-button type="primary" size="small" @click="defaultSet()">恢复默认</el-button> -->
          <el-button type="primary" size="small" @click="saveDialogVisible=true,gridData = multipleSelection">保存</el-button>
          <el-button type="primary" size="small" @click="handleBack()">取消</el-button>
        </el-col>
      </el-row>
    </div>

    <!-- 保存确认弹窗 -->
    <el-dialog title="已选择点检方案" :visible.sync="saveDialogVisible">
      <el-table :data="gridData">
        <el-table-column prop="djxmId" label="点检项目编号" width="120"></el-table-column>
        <el-table-column prop="djlxId" label="点检类型" width="120"></el-table-column>
        <el-table-column prop="djxmName" label="点检项目" width="300"></el-table-column>
        <el-table-column prop="djxmDetail" label="点检项目内容"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="saveDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveSet">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 点检类型表格 -->
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="container">
          <el-button type="primary" size="small" @click="setDialogVisible = true">设置日点检计划</el-button>
          <el-table :data="dList" style="width: 100%" height="600">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="date" label="项目名称" min-width="100"></el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="container">
          <el-button type="primary" size="small">设置周点检计划</el-button>
          <el-table :data="wList" style="width: 100%" height="600">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="date" label="项目名称" min-width="100"></el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="container">
          <el-button type="primary" size="small">设置月点检计划</el-button>
          <el-table :data="mList" style="width: 100%" height="600">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="date" label="项目名称" min-width="100"></el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="container">
          <el-button type="primary" size="small">设置年点检计划</el-button>
          <el-table :data="yList" style="width: 100%" height="600">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="date" label="项目名称" min-width="100"></el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <!-- 设置点检计划弹窗 -->
    <el-dialog title="选择点检项目" :visible.sync="setDialogVisible">
      <el-table ref="multipleTable" :data="djxmList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="项目名称" width="120"></el-table-column>
        <el-table-column prop="address" label="项目内容"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="saveDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveSet">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getDjxmList, addDjfa, getDefaultConfig } from '@/api/DeviceManage/CheckSet';

export default {
  data () {
    return {
      tableData: [
        {
          djxmId: 'S01',
          djlxId: '开机点检',
          djxmName: '油液位标尺',
          djxmDetail: '点检项目内容'
        }
      ],
      gridData: [],
      search: '',
      multipleSelection: [],
      saveDialogVisible: false,


      dList: [],
      wList: [],
      mList: [],
      yList: [],
      djxmList: [],
      setDialogVisible: false,
    };
  },
  created () {
    this.init();
  },
  mounted () {

  },
  methods: {
    init () {
      getDjxmList('').then(res => {
        // console.log(res.data.data);
        this.tableData = res.data.data;
      }).catch(err => {
        // console.log(err)
        this.$message.error({
          message: err,
          position: 'top',
          time: 2000
        })
      })
    },
    // 保存
    saveSet () {
      this.format(this.gridData)
      this.handleAdd(this.gridData);
      this.$router.go(-1);
    },

    // 添加点检方案请求数据整理
    format (ary) {
      for (let i = 0; i < ary.length; i++) {
        ary[i].sbxxId = this.$router.history.current.params.id;
      }
      return ary
    },

    // 添加点检方案
    handleAdd (msg) {
      addDjfa(msg).then(res => {
        this.$message.success({
          message: res.data.data,
          position: 'top',
          time: 2000
        })
      }).catch(err => {
        this.$message.error({
          message: err,
          position: 'top',
          time: 2000
        })
      })
    },
    // 选择
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },

    // 返回
    handleBack () {
      this.$router.go(-1);
    },

    // 恢复默认点检设置
    defaultSet () {
      // console.log('default')
      getDefaultConfig(this.$router.history.current.params.id).then(res => {
        // console.log(res.data)
        if (res.data.code == 'SUCCESS') {
          // console.log(res.data.data)
          this.$confirm('确定要恢复成默认点检方案？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.handleAdd(res.data.data);
            this.$router.go(-1);
          })
        } else {
          this.$message.error({
            message: '该设备暂无默认点检方案',
            position: 'top',
            time: 2000
          })
        }
      })
    }
  }
};
</script>

<style scoped>
@import '../../assets/css/common.css';

.container {
  background-color: white;
  padding: 10px;
}
</style>
