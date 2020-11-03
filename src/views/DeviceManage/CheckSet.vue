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
          <el-button type="primary" size="small" @click="$router.go(-1)">取消</el-button>
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
          <el-button type="primary" size="small" @click="handleSetDialog('d')">设置日点检计划</el-button>
          <el-table :data="dList" style="width: 100%" height="600">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="djxmName" label="项目名称" min-width="100"></el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="container">
          <el-button type="primary" size="small" @click="handleSetDialog('w')">设置周点检计划</el-button>
          <el-table :data="wList" style="width: 100%" height="600">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="djxmName" label="项目名称" min-width="100"></el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="container">
          <el-button type="primary" size="small" @click="handleSetDialog('m')">设置月点检计划</el-button>
          <el-table :data="mList" style="width: 100%" height="600">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="djxmName" label="项目名称" min-width="100"></el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="container">
          <el-button type="primary" size="small" @click="handleSetDialog('y')">设置年点检计划</el-button>
          <el-table :data="yList" style="width: 100%" height="600">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="djxmName" label="项目名称" min-width="100"></el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <!-- 设置点检计划弹窗 -->
    <el-dialog title="选择点检项目" :visible.sync="setDialogVisible">
      <el-table ref="multipleTable" :data="djxmList" tooltip-effect="dark" max-height="300" style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="djxmName" label="项目名称" width="200"></el-table-column>
        <el-table-column prop="djxmContent" label="项目内容"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addDjfa } from '@/api/DeviceManage/CheckSet';
import { getDjxmList } from '@/api/DeviceManage/CheckManage';

export default {
  data () {
    return {
      gridData: [],
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
  updated () {
    switch (this.period) {
      case 'd':
        this.toggleSelection(this.dList); break;
      case 'w':
        this.toggleSelection(this.wList); break;
      case 'm':
        this.toggleSelection(this.mList); break;
      case 'y':
        this.toggleSelection(this.yList); break;
      default:
        this.toggleSelection(); break;
    }
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
      });
      getDjxmList().then(res => {
        // console.log(res.data.data);
        this.djxmList = res.data.data;
      });
    },
    handleSetDialog (period) {
      this.setDialogVisible = true;
      this.period = period;
    },
    setConfirm () {
      this.setDialogVisible = false;
      switch (this.period) {
        case 'd':
          this.dList = this.multipleSelection; break;
        case 'w':
          this.wList = this.multipleSelection; break;
        case 'm':
          this.mList = this.multipleSelection; break;
        case 'y':
          this.yList = this.multipleSelection; break;
      }
      console.log(this.dList);
    },
    // 保存
    saveSet () {
      this.format(this.gridData)
      this.handleAdd(this.gridData);
      // this.$router.go(-1);
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
      }
      // else {
      //   this.$refs.multipleTable.clearSelection();
      // }
    },
    handleSelectionChange (val) {
      // console.log(val)
      this.multipleSelection = val;
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
