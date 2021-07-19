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
      default: '318px'
    },
    chartData: {
      type: Object,
      default(){
        return {
          allcolortypes:[],
          detailallList:[],
          stattime:0,
          categories:[],
          lightList:[]
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
      let categories = this.chartData.categories
      let data = this.chartData.detailallList
      let dataCount = 5
      var startTime = this.chartData.stattime// 1507461407156
      var types = this.chartData.allcolortypes
      var chartHeight = (this.chartData.categories.length + 1) * 45;

      function renderItem(params, api) {
        var categoryIndex = api.value(0)
        var start = api.coord([api.value(1), categoryIndex])
        var end = api.coord([api.value(2), categoryIndex])
        var height = 46;// api.size([0, 1])[1]*1;
        return {
          type: 'rect',
          shape: echarts.graphic.clipRectByRect({
            x: start[0],
            y: start[1] - height / 2,
            width: end[0] - start[0],
            height: 44
          }, {
            x: params.coordSys.x,
            y: params.coordSys.y,
            width: params.coordSys.width,
            height: params.coordSys.height,
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
          height: chartHeight - 46,
          top: 45,
          right: 30,
          left: 0,
          bottom: 0
        },
        xAxis: [{
          show: true,
          min: startTime,
          scale: true,
          max:'dataMax',
          offset: -(chartHeight - 46),
          axisLabel: {
            formatter: function (val) {
              return parseTime(val,'{h}:{i}')
            },
            margin: -20,
            align: 'left'
          },
          axisTick: {
            show: false,
            alignWithLabel: true
          },
          axisLine: {
            lineStyle: {
              color: '#e9e9e9'
            }
          }
        }],
        yAxis: [{
          data: categories,
          show: false,
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
