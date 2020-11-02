<template>
  <div class="deviceType">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="add">
      <el-button type="primary" @click="addTypedialogVisible = true">添加设备类型</el-button>
      <el-button type="primary" @click="$router.push({name:'checkManage'})">管理点检项目</el-button>
    </div>
    <el-row>
      <el-col :span="5" v-for="item in TypeList" :key="item.sblxId">
        <router-link :to="{name:'deviceList',params:{id:item.sblxId}}">
          <el-card>
            <img :src="item.pictureUrl">
            <div>
              <h3>{{item.sblxName}}</h3>
            </div>
          </el-card>
        </router-link>
      </el-col>
      <!-- <el-col :span="5">
        <el-card>
          <div class="add">
            <a href="javascript:void(0);" @click="addTypedialogVisible = true">
              <i class="el-icon-plus"></i>
            </a>
          </div>
        </el-card>
      </el-col> -->
    </el-row>
    <!-- 添加设备类型弹窗 -->
    <el-dialog title="提示" :visible.sync="addTypedialogVisible" width="30%">
      <el-form ref="addTypeform" :model="addTypeform" :rules="rules">
        <el-form-item label="类型名称" prop="sblxName" label-width="100px">
          <el-input v-model="addTypeform.sblxName" placeholder="请输入类型名称"></el-input>
        </el-form-item>
        <el-form-item label="类型编号" prop="sblxId" label-width="100px">
          <el-input v-model="addTypeform.sblxId" placeholder="请输入设备类型编号"></el-input>
        </el-form-item>
        <el-form-item label="缩写" prop="sblxAbbreviation" label-width="100px">
          <el-input v-model="addTypeform.sblxAbbreviation" placeholder="请输入设备类型编号缩写"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarkName" label-width="100px">
          <el-input v-model="addTypeform.remarkName" placeholder="请输入设备厂商"></el-input>
        </el-form-item>
        <!-- 上传文件 -->
        <!-- <el-form-item label="类型图片" prop="" label-width="100px">
          <el-upload class="avatar-uploader" action="/apis" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addTypeSubmit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

import { getTypeList,addSblx } from '@/api/DeviceManage/DeviceType'

export default {
  name: '',
  data () {
    return {
      isShow: true,
      addTypedialogVisible: false,
      TypeList: [
        // {
        //   sblxId: 'xxxx',
        //   sblxName: '设备类型名称',
        //   pictureUrl: ''
        // }
      ],
      addTypeform: {
        sblxName: '',
        sblxId: '',
        sblxAbbreviation: '',
        remarkName: ''
      },
      rules: {
        sblxName: [
          { required: true, message: '请输入类型名称', trigger: 'blur' }
        ],
        sblxId: [
          { required: true, message: '请输入设备类型编号', trigger: 'blur' }
        ],
        sblxAbbreviation: [
          { required: true, message: '请输入设备类型编号缩写', trigger: 'blur' }
        ],
        remarkName: [
          { required: true, message: '请输入设备厂商', trigger: 'blur' }
        ],
      },
      // imageUrl: ''
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      getTypeList().then(res => {
        this.TypeList = res.data.data;
      }).catch(err => {
        // console.log(err);
        this.$message.error({
          message: err,
          position: 'top',
          time: 2000
        })
      })
    },

    addTypeSubmit () {
      addSblx(this.addTypeform).then(()=>{
        // console.log(res)
        this.$message.success({
          message: '添加设备类型成功!',
          position: 'top',
          time: 2000
        }).catch(err=>{
          console.log(err);
        })
      })
      this.addTypedialogVisible = false;
      this.init();
    },
  }
}
</script>
<style scoped>
.deviceType {
  height: 100%;
}
.el-col {
  margin: 30px;
  min-width: 339px;
}
.el-card {
  text-align: center;
  /* width: 339px; */
}
.el-card img {
  width: 230px;
  height: 230px;
}
.el-card h3 {
  margin: 19px;
}
.el-card p {
  margin: 0px;
}
.add {
  padding-top: 20px;
}
a {
  text-decoration: none;
  color: black;
}
</style>
