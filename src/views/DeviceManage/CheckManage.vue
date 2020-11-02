<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>管理点检项目</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="checkBoard">
      <el-button type="primary" @click="dialogFormVisible = true">添加点检项目</el-button>
      <el-button type="primary" @click="$router.go(-1)">返回</el-button>
    </div>
    <div>
      <el-table :data="djxmlist.filter(data => !search || data.djxmName.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="djxmName" label="点检项目名称" min-width="100"></el-table-column>
        <el-table-column prop="djxmContent" label="内容" min-width="200"></el-table-column>
        <el-table-column align="center" width="250">
          <template slot="header" slot-scope="{}">
            <el-input v-model="search" size="mini" placeholder="项目名称搜索" />
          </template>
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 修改点检项目弹窗 -->
    <div>
      <el-dialog title="修改点检项目" :before-close="handleClose" :visible.sync="editDialogFormVisible" width="30%">
        <el-form ref="addDjxmForm" :model="editDjxmForm" :rules="rules">
          <el-form-item label="名称" prop="djxmName" :label-width="formLabelWidth">
            <el-input v-model="editDjxmForm.djxmName"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="djxmContent" :label-width="formLabelWidth">
            <el-input type="textarea" :rows="3" v-model="editDjxmForm.djxmContent"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="EditButton()">修改</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 添加点检项目弹窗 -->
    <div>
      <el-dialog title="添加点检项目" :visible.sync="dialogFormVisible" width="30%">
        <el-form ref="addDjxmForm" :model="addDjxmForm" :rules="rules">
          <el-form-item label="名称" prop="djxmName" :label-width="formLabelWidth">
            <el-input v-model="addDjxmForm.djxmName"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="djxmContent" :label-width="formLabelWidth">
            <el-input type="textarea" :rows="3" v-model="addDjxmForm.djxmContent"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleAdd()">添加</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getDjxmList, addDjxm, delDjxm, modityDjxm } from '@/api/DeviceManage/CheckManage'

export default {
  data () {
    return {
      djxmlist: [
        // {
        //   djxmContent:'',
        //   djxmId:'',
        //   djxmName:'',
        //   remark:''
        // }
      ],
      search: '',
      dialogFormVisible: false,
      editDialogFormVisible: false,
      formLabelWidth: '80px',
      addDjxmForm: {
        djxmName: '',
        djxmContent: '',
        remark: ''
      },
      editDjxmForm: {},
      rules: {
        djxmName: [
          { required: true, message: '请输入点检项目名称', trigger: 'blur' }
        ],
        djxmContent: [
          { required: true, message: '请输入点检项目内容', trigger: 'blur' }
        ],
      }
    };
  },
  created () {
  },
  mounted () {
    this.init();
  },
  methods: {
    init () {
      this.DjxmList();
    },
    DjxmList () {
      getDjxmList().then(res => {
        // console.log(res.data.data);
        this.djxmlist = res.data.data;
      })
    },
    handleDelete (row) {
      // console.log(row);
      delDjxm(row.djxmId).then(res => {
        // console.log(res);
        this.$message.success({
          message: res.data.data,
          position: 'top',
          time: 2000
        })
        this.DjxmList();
      })
    },
    handleEdit (row) {
      // console.log(row);
      this.editDialogFormVisible = true;
      this.editDjxmForm = row;
    },
    EditButton () {
      modityDjxm(this.editDjxmForm).then(res => {
        this.$message.success({
          message: res.data.data,
          position: 'top',
          time: 2000
        });
        this.editDialogFormVisible = false;
        this.DjxmList();
      })
    },
    handleAdd () {
      addDjxm(this.addDjxmForm).then(() => {
        // console.log(res);
        this.$message.success({
          message: '添加点检项目成功!',
          position: 'top',
          time: 2000
        })
        this.dialogFormVisible = false;
        this.DjxmList();
      }).catch(err => {
        console.log(err);
      })
    },
    handleClose () {
      this.init()
      this.dialogFormVisible = false;
      this.editDialogFormVisible = false;
    }
  }
};
</script>

<style scoped>
.checkBoard {
  padding: 20px;
}
</style>
