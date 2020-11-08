<template>
  <div>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 控制面板 -->
    <div class="form-bar">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户搜索">
          <el-input v-model="formInline.username" placeholder="按用户名搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()" style="margin-right:50px">筛选</el-button>
        </el-form-item>
        <el-form-item>
          <el-badge :value="auditData.length" :hidden="isHidden" style="margin-right:10px">
            <el-button type="primary" @click="auditDialogTableVisible = true">待审核</el-button>
          </el-badge>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="$router.push({name:'modifyInfo'})">修改个人信息</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 审核列表弹窗 -->
    <el-dialog title="待审核" :visible.sync="auditDialogTableVisible">
      <el-table :data="auditData" max-height="450px">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="公司" prop="companyId" min-width="130"></el-table-column>
        <el-table-column label="用户姓名" prop="nickName"></el-table-column>
        <el-table-column label="用户权限" min-width="120">
          <template slot-scope="scope">
            <el-select v-model="scope.row.permissionType">
              <el-option v-for="item in permissionTypeList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="联系电话" prop="userPhone" min-width="130"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="editRow(scope.$index, scope.row)" type="text" size="small">审核通过</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 用户表格 -->
    <div class="container">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="公司" prop="companyId"></el-table-column>
        <el-table-column label="用户姓名" prop="nickName"></el-table-column>
        <el-table-column label="用户权限" prop="permissionType"></el-table-column>
        <el-table-column label="联系电话" prop="userPhone"></el-table-column>
        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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

import { getUserList, updateUser, deleteUserbyPhone } from '@/api/UserManage/UserManage';

export default {
  data () {
    return {
      formInline: {//筛选表单传递数据
        username: '',
      },
      tableData: [], //用户列表
      auditData: [],  //待审核列表
      // 权限表
      permissionTypeList: [
        { value: 'admin', label: '管理员' },
        { value: 'user', label: '普通用户' }
      ],

      // 待审核提示
      isHidden: false,

      // 弹窗
      auditDialogTableVisible: false,
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
    this.init();
  },
  methods: {
    init () {
      this.getUsers();
    },
    // 用户列表
    getUsers () {
      getUserList({
        pageSize: 10,
        pageNo: this.pageData.currentPage,
        object: this.formInline.username
      }).then(res => {
        // console.log(res.data.data.data);
        let unAuditList = [],
          AuditList = [];
        for (let i = 0; i < res.data.data.data.length; i++) {
          if (res.data.data.data[i].permissionType == 'guest')
            unAuditList.unshift(res.data.data.data[i])
          else
            AuditList.unshift(res.data.data.data[i])
        }
        this.auditData = unAuditList;
        this.tableData = AuditList;
        // console.log(this.tableData)
        // console.log(this.auditData)
        this.pageData.totalElements = this.tableData.length;
        if (this.auditData.length == 0)
          this.isHidden = true;
        else {
          this.isHidden = false;

        }
      })
    },

    // 筛选
    onSubmit () {
      this.getUsers();
    },
    // 当前页
    handleCurrentChange (val) {
      // console.log(val);
      this.pageData.currentPage = val;
    },
    handleEdit (index, row) {
      console.log(index, row);
    },
    handleDelete (index, row) {
      // console.log(index, row.userPhone);
      deleteUserbyPhone(row.userPhone).then(() => {
        this.$message.error({
          message: 'res.data.data',
          position: 'top',
          time: 2000
        })
        this.getUsers();
      })
    },
    editRow (index, row) {
      // console.log(index, row.permissionType);
      if (row.permissionType == 'guest') {
        this.$message.error({
          message: '请分配用户权限',
          position: 'top',
          time: 2000
        })
      } else {
        updateUser(row).then(() => {
          this.$message.success({
            message: '用户审核通过',
            position: 'top',
            time: 2000
          })
          this.getUsers();
        }).catch(err => {
          this.$message.error({
            message: err,
            position: 'top',
            time: 2000
          })
        })
      }

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
