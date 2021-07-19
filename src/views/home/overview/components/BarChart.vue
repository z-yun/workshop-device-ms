<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { parseTime } from '@/utils/index.js'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    chartData: {
      type: Object,
      default(){
        return {
          allcolortypes:[],
          alldedatas:[],
          stattime:0
        }
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      let categories = ['DateTime']
      let data = this.chartData.alldedatas
      let dataCount = 5
      var startTime = this.chartData.stattime// 1507461407156
      var types = this.chartData.allcolortypes

      function renderItem(params, api) {
        var categoryIndex = api.value(0)
        var start = api.coord([api.value(1), categoryIndex])
        var end = api.coord([api.value(2), categoryIndex])
        var height = api.size([0, 1])[1] * 0.3

        return {
          type: 'rect',
          shape: echarts.graphic.clipRectByRect({
            x: start[0],
            y: start[1] - height / 2,
            width: end[0] - start[0],
            height: height
          }, {
            x: params.coordSys.x,
            y: params.coordSys.y,
            width: params.coordSys.width,
            height: params.coordSys.height
          }),
          style: api.style()
        }
      }
      this.chart.setOption({
        tooltip: {
          formatter: function (params) {
            return params.marker + params.name + '<br/>' + params.value[6] + '<br/>' + '时长: ' + params.value[3]/1000 + ' ss' + '<br/>开始：' + params.value[4] + '<br/>结束：' + params.value[5]
          }
        },
        legend: {
          data: ['bar', 'error']
        },
        grid: {
          height: 250,
          right: 30,
          bottom: 20
        },
        xAxis: [{
          show: true,
          min: startTime,
          scale: true,
          max:'dataMax',
          axisLabel: {
            formatter: function (val) {
              return parseTime(val,'{h}:{i}')
            }
          },
          axisTick: {
            show: false,
            alignWithLabel: true
          },
          axisLine: {
            lineStyle: {
              color: '#0c71e6'
            }
          }
        }],
        yAxis: [{
          data: categories,
          axisLabel: {
            nameTextStyle: {
              color: '#0c71e6'
            }
          }
        }],
        series: [{
          type: 'custom',
          renderItem: renderItem,
          itemStyle: {
            normal: {
              opacity: 1
            }
          },
          encode: {
            x: [1, 2],
            y: 0
          },
          data: data
        }]
      })
    }
  }
}
</script>
