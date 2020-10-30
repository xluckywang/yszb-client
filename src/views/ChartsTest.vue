<template>
  <div>

    <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
    <div id="container" :style="{width: '870px', height: '290px'}"></div>
    <div id="pie" :style="{width: '870px', height: '290px'}"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      option: {
        title: {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
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
      }
    };
  },
  created () {

  },
  mounted () {
    this.drawLine();
    this.drawTable();
    this.drawPie();
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: { text: '在Vue中使用echarts' },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      });
    },
    drawPie () {
      let dom = document.getElementById('pie');
      let myChart3 = this.$echarts.init(dom);
      myChart3.setOption(this.option);
    },
    drawTable () {
      var dom = document.getElementById("container");
      let myChart2 = this.$echarts.init(dom);
      //载入数据
      myChart2.setOption({
        tooltip: {
          trigger: 'item'
        },
        toolbox: {
          show: true,
        },
        xAxis: {
          type: 'category',
          axisTick: {
            show: false
          },
          boundaryGap: false,
          data: ['01:30', '03:24', '05:19', '08:50', '12:08', '15:11', '20:05']
        },
        yAxis: {
          type: 'value',
          axisLine: {
            onZero: false,
            show: false //不显示Yz

          },
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: '{value} °C',
            margin: 20
          },
          boundaryGap: false,
          scale: true,
          max: 29,
          min: 24


        },
        series: [
          {
            name: '最高气温',
            type: 'line',
            smooth: true,
            itemStyle: {
              color: 'rgba(109,212,0,1)'
            },
            lineStyle: {
              width: 3,
              color: 'rgba(109,212,0,1)'
            },
            data: [28.8, 26.6, 27, 26.8, 25.5, 24.5, 24.6]

          }
        ]
      });
    }
  }
};
</script>

<style scoped>
</style>
