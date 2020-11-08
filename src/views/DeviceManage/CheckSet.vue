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
          <el-button type="primary" size="small" @click="saveSet">保存</el-button>
          <el-button type="primary" size="small" @click="$router.go(-1)">取消</el-button>
        </el-col>
      </el-row>
    </div>

    <!-- 点检类型表格 -->
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="container">
          <el-button type="primary" size="small" @click="handleSetDialog('D')">设置日点检计划</el-button>
          <el-table :data="dList" style="width: 100%" height="600">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="djxmName" label="项目名称" min-width="100"></el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="container">
          <el-button type="primary" size="small" @click="handleSetDialog('W')">设置周点检计划</el-button>
          <el-table :data="wList" style="width: 100%" height="600">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="djxmName" label="项目名称" min-width="100"></el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="container">
          <el-button type="primary" size="small" @click="handleSetDialog('M')">设置月点检计划</el-button>
          <el-table :data="mList" style="width: 100%" height="600">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="djxmName" label="项目名称" min-width="100"></el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="container">
          <el-button type="primary" size="small" @click="handleSetDialog('Y')">设置年点检计划</el-button>
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
        <el-button @click="setDialogVisible = false;djxmList = JSON.parse(JSON.stringify(list));">取 消</el-button>
        <el-button type="primary" @click="setConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addSbDjxm, getSbDjxmBySbId, getSbDjxmById } from '@/api/DeviceManage/CheckSet';
import { getDjxmList } from '@/api/DeviceManage/CheckManage';

export default {
  data () {
    return {
      dList: [],
      wList: [],
      mList: [],
      yList: [],
      period: '',
      djxmList: [],
      list: [],
      djfaList: [],
      multipleSelection: [],
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
      getDjxmList().then(res => {
        this.djxmList = res.data.data;
        this.list = JSON.parse(JSON.stringify(this.djxmList));
      });
      getSbDjxmBySbId(this.$router.history.current.params.id).then(res => {
        for (let i = 0; i < res.data.data.length; i++) {
          switch (res.data.data[i].period) {
            case 'D':
              getSbDjxmById(res.data.data[i].djxmId).then(res => {
                this.dList.unshift(res.data.data);
              })
              break;
            case 'W':
              getSbDjxmById(res.data.data[i].djxmId).then(res => {
                this.wList.unshift(res.data.data);
              })
              break;
            case 'M':
              getSbDjxmById(res.data.data[i].djxmId).then(res => {
                this.mList.unshift(res.data.data);
              })
              break;
            case 'Y':
              getSbDjxmById(res.data.data[i].djxmId).then(res => {
                this.yList.unshift(res.data.data);
              })
              break;
          }
        };
      });
    },
    handleSetDialog (period) {

      this.period = period;
      this.setDialogVisible = true;
      if (period == 'D') {
        for (let i = 0; i < this.djxmList.length; i++) {
          for (let j = 0; j < this.dList.length; j++) {
            if (this.djxmList[i].djxmId == this.dList[j].djxmId) {
              this.djxmList[i].selected = 1;
            }
          }
        };
      }
      if (period == 'W') {
        for (let i = 0; i < this.djxmList.length; i++) {
          for (let j = 0; j < this.wList.length; j++) {
            if (this.djxmList[i].djxmId == this.wList[j].djxmId) {
              this.djxmList[i].selected = 1;
            }
          }
        };
      }
      if (period == 'M') {
        for (let i = 0; i < this.djxmList.length; i++) {
          for (let j = 0; j < this.mList.length; j++) {
            if (this.djxmList[i].djxmId == this.mList[j].djxmId) {
              this.djxmList[i].selected = 1;
            }
          }
        };
      }
      if (period == 'Y') {
        for (let i = 0; i < this.djxmList.length; i++) {
          for (let j = 0; j < this.yList.length; j++) {
            if (this.djxmList[i].djxmId == this.yList[j].djxmId) {
              this.djxmList[i].selected = 1;
            }
          }
        };
      }
      this.toggleSelection(this.djxmList);
    },
    setConfirm () {
      this.djxmList = JSON.parse(JSON.stringify(this.list));
      this.setDialogVisible = false;
      switch (this.period) {
        case 'D':
          this.dList = this.multipleSelection; break;
        case 'W':
          this.wList = this.multipleSelection; break;
        case 'M':
          this.mList = this.multipleSelection; break;
        case 'Y':
          this.yList = this.multipleSelection; break;
      }

      // console.log(this.);
    },
    // 保存
    saveSet () {
      this.format(this.dList, "D");
      this.format(this.wList, "W");
      this.format(this.mList, "M");
      this.format(this.yList, "Y");

      this.handleAdd(this.djfaList);
      this.$router.go(-1);
    },
    format (list, period) {
      for (let i = 0; i < list.length; i++) {
        this.djfaList.unshift({
          sbxxId: this.$router.history.current.params.id,
          djxmId: list[i].djxmId,
          period: period
        })
      }
    },

    // 添加点检方案
    handleAdd (msg) {
      addSbDjxm(msg).then(res => {
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
      if (rows.length) {
        this.$nextTick(function () {
          rows.forEach(row => {
            if (row.selected == 1) {
              this.$refs.multipleTable.toggleRowSelection(row, true);
            }
          })
        })
      }
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
  padding: 10px;
}
</style>
