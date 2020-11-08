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
          <h3>{{addDevform.sblxName}}</h3>
        </el-col>
        <el-col :span="10" style="text-align : right;">
          <el-button type="primary" size="small" @click="AddDevdialogVisible = true">添加设备</el-button>
          <el-button type="primary" size="small" @click="handleBack()">返回</el-button>
        </el-col>
      </el-row>
      <!-- 添加设备弹框 -->
      <el-dialog title="添加设备" :visible.sync="AddDevdialogVisible" width="30%">
        <el-form ref="addDevform" :model="addDevform" :rules="rules">
          <el-form-item label="设备ID" prop="sbxxId" label-width="100px">
            <el-input v-model="addDevform.sbxxId" placeholder="请输入设备ID"></el-input>
          </el-form-item>
          <el-form-item label="设备编号" prop="sbxxCode" label-width="100px">
            <el-input v-model="addDevform.sbxxCode" placeholder="请输入设备信息编号"></el-input>
          </el-form-item>
          <el-form-item label="设备位置" prop="sbxxLocation" label-width="100px">
            <el-input v-model="addDevform.sbxxLocation" placeholder="请输入设备位置"></el-input>
          </el-form-item>
          <el-form-item label="出场时间" prop="dilveryTime" label-width="100px">
            <el-input v-model="addDevform.dilveryTime" placeholder="请输入设备出厂时间"></el-input>
          </el-form-item>
          <el-form-item label="维护联系人" prop="whContacts" label-width="100px">
            <el-input v-model="addDevform.whContacts" placeholder="请输入维护联系人姓名"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remarkName" label-width="100px">
            <el-input v-model="addDevform.remarkName" placeholder="请输入设备厂商"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('addDevform')">确 定</el-button>
        </span>
      </el-dialog>
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
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="primary" @click="handleDetail(scope.row)">查看状态详情</el-button>
            <el-button size="mini" type="primary" @click="handleCheckSet(scope.row)">点检设置</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 编辑设备弹窗 -->
      <el-dialog title="修改设备信息" :before-close="handleClose" :visible.sync="EditDevdialogVisible" width="30%">
        <el-form ref="updataDevform" :model="updataDevform" label-width="90px">
          <el-form-item label="设备编号">
            <el-input v-model="updataDevform.sbxxId"></el-input>
          </el-form-item>
          <el-form-item label="设备位置">
            <el-input v-model="updataDevform.sbxxLocation"></el-input>
          </el-form-item>
          <el-form-item label="维护联系人">
            <el-input v-model="updataDevform.whContacts"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="updataDevform.remarkName"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="EditSubmit()">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 分页  -->
      <Pagination :pageData="pageData" @handleCurrentChange="handleCurrentChange" />
    </div>
  </div>
</template>

<script>

//组件
import Pagination from '@/components/Pagination';

// api
import { getTypeName, getDevList, addSbxx, updateSbxx } from '@/api/DeviceManage/DeviceList';

export default {
  data () {
    return {
      // 弹窗
      AddDevdialogVisible: false,
      EditDevdialogVisible: false,

      // 添加设备
      addDevform: {
        sbxxId: '',
        sblxName: '设备类型名称',
        sbxxCode: '',
        sbxxLocation: '',
        dilveryTime: '',
        whContacts: '',
        remarkName: ''
      },

      //更新设备
      updataDevform: {
        sbxxId: '',
        sbxxLocation: '',
        whContacts: '',
        remarkName: ''
      },

      //设备列表
      tableData: [{
        sbxxId: 'sbxxid',
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
      },

      rules: {
        sbxxId: [
          { required: true, message: '请输入设备ID', trigger: 'blur' }
        ],
        sbxxCode: [
          { required: true, message: '请输入设备信息编号', trigger: 'blur' }
        ],
        sbxxLocation: [
          { required: true, message: '请输入设备位置', trigger: 'blur' }
        ],
        dilveryTime: [
          { required: true, message: '请输入设备出厂时间', trigger: 'blur' }
        ],
        whContacts: [
          { required: true, message: '请输入维护联系人姓名', trigger: 'blur' }
        ],
        remarkName: [
          { required: true, message: '请输入设备厂商', trigger: 'blur' }
        ],
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
      // 获取类型名
      getTypeName(this.$router.history.current.params.id).then(res => {
        // console.log(this.pageData)
        this.addDevform.sblxName = res.data.data;
      }).catch(err => {
        this.$message.error({
          message: err,
          position: 'top',
          time: 2000
        })
      })
      this.getList();
    },

    // 获取设备列表
    getList () {
      let msg = {
        pageSize: 10,
        pageNo: this.pageData.currentPage,
        object: this.$router.history.current.params.id
      };
      getDevList(msg).then(res => {
        this.tableData = res.data.data.data;
        this.pageData.totalElements = res.data.data.totalElements;
      }).catch(err => {
        this.$message.error({
          message: err,
          position: 'top',
          time: 2000
        })
      })
    },

    // 添加设备
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.AddDevdialogVisible = false
          addSbxx(this.addDevform).then(res => {
            if (res.data.code == 'SUCCESS') {
              this.getList();
              this.$message.success({
                message: res.data.message,
                position: 'top',
                time: 2000
              })
            } else {
              this.$message.error({
                message: res.data.message,
                position: 'top',
                time: 2000
              })
            }
          }).catch(err => {
            this.$message.error({
              message: err,
              position: 'top',
              time: 2000
            })
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    //编辑设备信息
    handleEdit (row) {
      this.updataDevform = row;
      this.EditDevdialogVisible = true;
    },

    //编辑设备信息确定
    EditSubmit () {
      updateSbxx(this.updataDevform).then(res => {
        this.getList();
        this.$message.success({
          message: res.data.message,
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
      this.EditDevdialogVisible = false;

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
