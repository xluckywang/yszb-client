<template>
  <div class="home">
    <el-container class="container">
      <el-header>
        <Header></Header>
      </el-header>
      <el-container class="content">
        <el-aside width="200px">
          <Menu></Menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Menu from "../components/Home/Menu"
import Header from "../components/Home/Header"

export default {
  name: "Home",

  components: {
    Menu,
    Header
  },
  created () {
    
  }
};
</script>
<style>
html,
body,
#app,
.home {
  padding: 0px;
  margin: 0px;
  height: 100%;
}
.container {
  height: 100%;
}
.content{
  height: 50%;
}
.el-header {
  background-color: white;
  color: #333;
  line-height: 60px;
}
.el-menu {
  height: 100%;
}
.el-main {
  height: 100%;
  background-color: #e9eef3;
  color: #333;
}
.router-view {
  height: 100%;
}
.el-dropdown {
  float: right;
}
</style>