<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

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
      default: '280px'
    },
    chartData: {
      type: Object,
      default(){
        return {
          datas:[],
          colors:[]
        }
      }
    },
    name: {
      type: String,
      default: '情况'
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
      let _self = this;

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color: _self.chartData.colors,
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: _self.name,
            type: 'pie',
            radius: '50%',
            center: ['50%', '70%'],
            minAngle: 5,
            data: _self.chartData.datas,
            animationEasing: 'cubicInOut',
            animationDuration: 1000
          }
        ]
      })
    }
  }
}
</script>
