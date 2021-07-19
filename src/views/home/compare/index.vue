<!-- 运转对比图 -->
<template>
  <div class="app-container home">
    <el-form :inline="true" ref="searchForm" :model="searchForm" class="search-form app-container-box">
      <el-form-item prop="date">
        <el-date-picker v-model="searchForm.date" type="date" placeholder="日期" value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="lineId">
        <el-select v-model="searchForm.lineId" placeholder="全部产线" @change="getList()">
          <el-option v-for="(item,index) in lineList" :key="index" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="rtbtn">
        <el-button type="primary" @click="getList">{{ $t('search.query') }}</el-button>
        <el-button type="reset" @click="reset">{{ $t('search.reset') }}</el-button>
      </el-form-item>
    </el-form>
    <div class="app-container-box clearfix" v-loading="listLoading">
      <table class="chart-tb fl">
        <tr>
          <td>信号灯名</td>
        </tr>
        <tr v-for="(item,index) in categories" :key="index">
          <td>{{item}}</td>
        </tr>
      </table>
      <bar-chart class="fl" v-if="chartShow" :chart-data="detailall" width="80%" :height="chartHeight+'px'"/>
    </div>
  </div>
</template>

<script>
import { getLineList, getCompareChart } from '@/api/factory'
import { parseTime } from '@/utils/index.js'
import BarChart from './components/BarChart'

export default {
  name: 'overview',
  components: { BarChart },
  data() {
    return {
      searchForm: {
        lineId: undefined
      },
      listLoading: false,
      lineList: [],
      chartShow: false,
      detailall: {
        categories:[]
      },
      chartHeight: 0
    }
  },
  computed: {
    categories(){
      return this.detailall.categories.reverse()
    }
  },
  methods: {
    reset() {
      this.$refs["searchForm"].resetFields()
      this.page.page = 1
      this.page.limit = 10
      this.getList()
    },
    getList() {
      let param = {
        ...this.searchForm
      }
      this.listLoading = true
      this.chartShow =false
      getCompareChart(param).then(res => {
        this.listLoading = false
        if(res.code == '200'){
          this.detailall = res.data
          this.chartShow = true
          this.chartHeight = (this.detailall.categories.length+1)*45
        }
      }).catch(error => {
        this.listLoading = false
        this.$message.error(error.errorMsg)
      })
    },
    queryLineList() {
      // 查询线别
      let param = {
        size: -1
      }
      getLineList(param).then(res => {
        if (res.code == '200') {
          this.lineList = res.data.records
          this.lineList.unshift({
            name: '全部产线',
            id: undefined
          })
        }
      })
    },
    getDatatime() {
      //默认显示今天
      this.$set(this.searchForm, "date", parseTime(new Date(), '{y}-{m}-{d}'))
    },
  },
  created() {
    this.getDatatime()
    this.queryLineList()
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
.home{
  .chart-tb{
    border-collapse: collapse;
    color:#e9e9e9;
    font-size: 13px;
    td {
      padding: 0 40px;
      height: 45px;
      border: 1px solid rgba($color: #fff, $alpha: .05);
      text-align: center;
      box-sizing: border-box;
      background-color: #272a31;
    }
    tr:nth-child(2n){
      td{
        background-color: rgba($color: #272a31, $alpha: .95);
      }
    }
  }
  .chart{
    background-color: #272a31;
  }
}
</style>
