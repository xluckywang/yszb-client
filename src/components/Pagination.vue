<template>
  <div>
    <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageData.pageSize"
      layout="total, prev, pager, next, jumper" :total="pageData.totalElements">
    </el-pagination>
  </div>
</template>
<script>

export default {
  name: "component_name",
  data () {
    return {
      currentPage: 1
    }
  },
  created () {

  },
  mounted () { },
  props: [
    'pageData'
  ],
  methods: {
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`);
      this.$emit('handleCurrentChange',val);
    }
  }
}
</script>
<style lang="scss" scoped>
</style>