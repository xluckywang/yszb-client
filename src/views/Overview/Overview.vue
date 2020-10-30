<template>
  <div>
    <el-container>
      <el-main>
        <el-card>
          <div slot="header" class="clearfix">
            <span>运行情况</span>
          </div>
          <div class="text item">
            <el-row :gutter="20">
              <el-col :span="2">
                <p>状态：<span>{{translation.state}}</span></p>
              </el-col>
              <el-col :span="7">
                <div class="chartBox">
                  <div id="checkPie" class="chartStyle"></div>
                </div>
              </el-col>
              <el-col :span="7">
                <div class="chartBox">
                  <div id="alertPie" class="chartStyle"></div>
                </div>
              </el-col>
              <el-col :span="7">
                <div class="chartBox">
                  <div id="faultPie" class="chartStyle"></div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card>
          <div slot="header" class="clearfix">
            <span>设备列表</span>
          </div>
          <div>
            <el-table :data="DevListData.slice((pageData.currentPage-1)*pageData.pageSize,pageData.currentPage*pageData.pageSize)"
              style="width: 100%;min-height:285px">
              <el-table-column type="index" label="序号" width="80"></el-table-column>
              <el-table-column prop="sblxName" label="设备类型" width="180"></el-table-column>
              <el-table-column prop="sbxxCode" label="设备编号" width="180"></el-table-column>
              <el-table-column prop="sbxxId" label="设备名称"></el-table-column>
              <el-table-column prop="sbxxLocation" label="设备位置"></el-table-column>
              <el-table-column prop="whContacts" label="维护人"></el-table-column>
            </el-table>
            <Pagination :pageData="pageData" @handleCurrentChange="handleCurrentChange" />
          </div>
        </el-card>
      </el-main>
      <el-aside width="420px">
        <el-card>
          <div slot="header" class="clearfix">
            <span>基本信息</span>
          </div>
          <div class="text item">
            <p>用户姓名：{{userInfo.nickName}}</p>
            <p>所属公司：{{userInfo.companyName}}</p>
            <p>用户权限：{{userInfo.permissionType}}</p>
            <p>登陆时间：{{userInfo.loginTime}}</p>
          </div>
        </el-card>
        <el-card>
          <div slot="header" class="clearfix">
            <span>待办事项</span>
          </div>
          <div>
            <template>
              <el-table :data="noReadMidList" border style="width: 100%" max-height="430">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="content" label="内容" min-width="200"></el-table-column>
                <el-table-column fixed="right" label="操作" min-width="50">
                  <template slot-scope="scope">
                    <el-button @click="handleRead(scope.row)" type="text" size="small">已读</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </el-card>
      </el-aside>
    </el-container>
  </div>
</template>
<script>
//组件
import Pagination from '@/components/Pagination';

// api
import { getUserInfo, getMySbxx, commitIsRead } from '@/api/Overview/overview';

export default {
  data () {
    return {
      // 点检情况饼状图数据
      checkPieOption: {
        title: {
          text: '点检情况',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          bottom: 10,
          left: 'center',
          data: ['未点检', '超期', '已点检']
        },
        series: [
          {
            name: '点检',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              { value: 135, name: '未点检' },
              { value: 110, name: '超期' },
              { value: 534, name: '已点检' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      // 设备预警情况饼状图数据
      alertPieOption: {
        title: {
          text: '预警情况',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          bottom: 10,
          left: 'center',
          data: ['未排除', '超期', '已排除']
        },
        series: [
          {
            name: '设备预警',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              { value: 135, name: '未排除' },
              { value: 110, name: '超期' },
              { value: 534, name: '已排除' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      faultPieOption: {
        title: {
          text: '故障情况',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          bottom: 10,
          left: 'center',
          data: ['未解决', '超期', '已解决']
        },
        series: [
          {
            name: '设备预警',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              { value: 135, name: '未解决' },
              { value: 110, name: '超期' },
              { value: 534, name: '已解决' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      // 用户信息
      userInfo: {
        nickName: '',
        userName: '',
        userPhone: '',
        userPwd: '',
        userEmail: '',
        departId: '',
        companyName: '',
        permissionType: '',
        loginTime: ''
      },
      translation: {
        state: '正常'
      },
      // 设备列表
      DevListData: [],
      // 分页
      pageData: {
        totalElements: 400,
        currentPage: 1,
        pageSize: 4
      },

      // websocke数据
      webSocet: null,
      path: 'ws://140.143.235.204:8081/websocket/',
      msgCount: 0,
      msgList: [],
      noReadMidList: []
    }
  },
  created () {
    this.init();
  },
  mounted () {
    this.drawPie('checkPie', this.checkPieOption);
    this.drawPie('alertPie', this.alertPieOption);
    this.drawPie('faultPie', this.faultPieOption);
  },
  destroyed () {
    this.webSocet.close()
  },
  components: {
    Pagination
  },
  methods: {
    init () {
      this.userInfo.userName = window.localStorage.getItem('username');
      // 获取用户信息
      getUserInfo(this.userInfo.userName).then(res => {
        // console.log(res.data.data);
        this.userInfo = res.data.data;
        this.initWebSocket();
        // 获取用户相关设备
        getMySbxx(this.userInfo.nickName).then(res => {
          this.DevListData = res.data.data
          // console.log(this.DevListData)
          this.pageData.totalElements = this.DevListData.length;

        })

      })
    },
    // 饼图
    drawPie (idName, options) {
      let dom = document.getElementById(idName);
      let myChart = this.$echarts.init(dom);
      myChart.setOption(options);
    },

    // 当前页
    handleCurrentChange (val) {
      // console.log(val);
      this.pageData.currentPage = val;
    },
    // 初始化webSocket
    initWebSocket () {

      this.webSocet = new WebSocket(this.path + this.userInfo.userId + '/' + this.userInfo.userName);
      this.webSocet.onopen = this.onOpenWebSocket;
      this.webSocet.onmessage = this.getMessage;
    },
    onOpenWebSocket () {
      // console.log('链接建立成功')
    },
    getMessage (msg) {
      // console.log(msg.data)
      let res = JSON.parse(msg.data);
      // console.log(res);
      this.msgList.unshift(res)
      if (res.isRead == 0)
        this.noReadMidList.unshift(res)
      // console.log(this.noReadMidList);
    },
    handleRead (row) {
      // console.log(index,row);
      commitIsRead(row.id).then(() => {
        // console.log(res);
        this.$message.success({
          message: '消息已读',
          position: 'top',
          time: 2000
        });
        this.msgList = [];
        this.noReadMidList = [];
        this.initWebSocket ();
      })
    }
  }
}
</script>
<style scoped>
.el-card {
  margin: 10px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.chartBox {
  width: 100%;
  height: 245px;
}
.chartStyle {
  width: 100%;
  height: 100%;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.el-aside {
  /* background-color: #d3dce6; */
  padding: 0px;
  color: #333;
  /* text-align: center; */
  /* line-height: 200px; */
}

.el-main {
  /* background-color: white; */
  padding: 0px;
  color: #333;
  /* text-align: center;
  line-height: 160px; */
}

/* 布局背景 */
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
