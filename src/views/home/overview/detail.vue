<!-- 监控详情 -->
<template>
  <div class="app-container homedetail">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本运转参数" name="first">
        <el-form :inline="true" ref="searchForm" :model="searchForm" class="search-form app-container-box">
          <el-form-item prop="lightId">
            <el-select v-model="searchForm.lightId" placeholder="全部三色灯">
              <el-option
                v-for="(item,index) in lightList"
                :key="index"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="date">
            <el-date-picker
              v-model="searchForm.date"
              type="date"
              placeholder="日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="rtbtn">
            <el-button type="primary" @click="getList">{{ $t('search.query') }}</el-button>
            <el-button type="reset" @click="reset">{{ $t('search.reset') }}</el-button>
          </el-form-item>
        </el-form>
        <el-row :gutter="16">
          <el-col :span="8">
            <div class="app-container-box minHeight">
              <div class="title text-center">详细信息</div>
              <el-table :data="colorDetails" class="mbt-24" border v-loading="listLoading">
                <el-table-column label="颜色" width="50">
                  <template slot-scope="scope">
                    <span :style="{backgroundColor:scope.row.colorSet}" class="circle"></span>
                  </template>
                </el-table-column>
                <el-table-column label="ID" width="40" prop="lightValue" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="描述" width="112" prop="name" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="时间总数" prop="duration"></el-table-column>
                <el-table-column label="次数" prop="times"></el-table-column>
              </el-table>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="app-container-box">
              <div class="title text-center">运行稼动图表</div>
              <div class="mbt-24">
                <pie-chart v-if="chartShow" :chart-data="runDetail" name="稼动情况" />
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="app-container-box">
              <div class="title text-center">停机详细情况</div>
              <div class="mbt-24">
                <pie-chart v-if="chartShow" :chart-data="stopDetail" name="停机情况" />
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="app-container-box">
          <div class="title text-center">{{$t("btn.detail")}}</div>
          <bar-chart v-if="chartShow" :chart-data="detailall" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="机台参数" name="second">
        <div class="app-container-box">
          <el-form :inline="true" ref="searchForm" :model="lightParam" class="search-form">
            <el-form-item label="印刷方向">
              <el-input v-model="lightParam.otherStockInId" disabled placeholder="请输入" />
            </el-form-item>
            <el-form-item label="循环时间">
              <el-input v-model="lightParam.time" disabled placeholder="请输入" />
            </el-form-item>
            <el-form-item label="分离速度">
              <el-input v-model="lightParam.time" disabled placeholder="请输入" />
            </el-form-item>
            <el-form-item label="脱模距离">
              <el-input v-model="lightParam.time" disabled placeholder="请输入" />
            </el-form-item>
            <el-form-item label="印刷速度">
              <el-input v-model="lightParam.time" disabled placeholder="请输入" />
            </el-form-item>
            <el-form-item label="刮刀压力">
              <el-input v-model="lightParam.time" disabled placeholder="请输入" />
            </el-form-item>
            <el-form-item label="印刷方式">
              <el-input v-model="lightParam.time" disabled placeholder="请输入" />
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="维护保养记录" name="third">
        <div class="app-container-box">
          <el-table :data="recordList" border v-loading="listLoading">
            <el-table-column label="设备号" fixed="left">
              <template slot-scope="{row}">
                <div v-if="row.device">{{ row.device.no }}</div>
              </template>
            </el-table-column>
            <el-table-column label="设备名称" width="100">
              <template slot-scope="{row}">
                <div v-if="row.device">{{ row.device.name }}</div>
              </template>
            </el-table-column>
            <el-table-column label="保养类型">
              <template slot-scope="{row}">
                <div v-if="row.maintainTypeVo">{{ row.maintainTypeVo.name }}</div>
              </template>
            </el-table-column>
            <el-table-column label="保养名称" prop="maintainItemName"></el-table-column>
            <el-table-column label="计划日期" prop="plainTime" width="120"></el-table-column>
            <el-table-column label="班次">
              <template slot-scope="{row}">
                <div v-if="row.shift">{{ row.shift.desc }}</div>
              </template>
            </el-table-column>
            <el-table-column label="保养人" width="180">
              <template slot-scope="{row}">
                <div v-if="row.maintainUser">{{ row.maintainUser.realName }}</div>
              </template>
            </el-table-column>
            <el-table-column label="保养时间" prop="doneTime" width="160"></el-table-column>
            <el-table-column label="确认人" width="180">
              <template slot-scope="{row}">
                <div v-if="row.auditUser">{{ row.auditUser.realName }}</div>
              </template>
            </el-table-column>
            <el-table-column label="确认时间" width="160">
              <template slot-scope="{row}">
                <div v-if="row.auditUser">{{ row.auditUser.createTime }}</div>
              </template>
            </el-table-column>
            <el-table-column label="保养工具"></el-table-column>
            <el-table-column label="保养用时"></el-table-column>
            <el-table-column label="保养状态">
              <template slot-scope="{row}">
                <div v-if="row.status">{{ row.status.desc }}</div>
              </template>
            </el-table-column>
            <el-table-column label="确认状态" width="100px" fixed="right">
              <template slot-scope="{row}" class="status">
                <div v-if="row.auditStatus">
                  <el-tag :type="formatStatus(row.auditStatus.code)" disable-transitions>{{row.auditStatus.desc}}</el-tag>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getLightList, getOverviewDetail } from '@/api/factory'
import { parseTime } from '@/utils/index.js'
import { getMaintainRecordList } from '@/api/device'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'

export default {
  name:'overview',
  components: { PieChart, BarChart },
  data() {
    return {
      searchForm:{
        lineId:undefined
      },
      colorDetails:[],
      listLoading:false,
      lightList:[],
      activeName: 'first',
      runDetail:{},
      stopDetail:{},
      detailall:{},
      lightId:0,
      lightParam:{},
      recordList:[],
      chartShow:false,
      deviceNo:''
    }
  },
  methods:{
    handleClick(tab, event) {
      console.log(tab, event);
    },
    reset(){
      this.$refs["searchForm"].resetFields()
      this.page.page = 1
      this.page.limit = 10
      this.getList()
    },
    getList(){
      let param = {
        lightId:this.lightId,
        ...this.searchForm
      }
      this.listLoading = true
      this.chartShow = false
      getOverviewDetail(param).then(res => {
        this.listLoading = false
        if(res.code == '200'){
          this.colorDetails = res.data.colorDetails
          this.runDetail = {...res.data.runDetail}
          this.stopDetail = {...res.data.stopDetail}
          this.detailall = {...res.data.detailall}
          this.chartShow = true
        }
      }).catch(error => {
        this.listLoading = false
        this.$message.error(error.errorMsg)
      })
    },
    queryLightList(){
      // 查询三色灯
      let param = {
        size:-1
      }
      getLightList(param).then(res => {
        if(res.code == '200'){
          this.lightList = res.data.records
          this.lightList.unshift({name:'全部三色灯',id:undefined})
        }
      })
    },
    getDatatime(){
      //默认显示今天
			this.$set(this.searchForm, "date", parseTime(new Date(),'{y}-{m}-{d}'))
    },
    queryMaintainRecordList(){
      //维护保养记录
      let param = {
        deviceNo:this.deviceNo,
        size:-1
      }
      getMaintainRecordList(param).then(res => {
        if(res.code == '200'){
          this.recordList = res.data.records
        }
      })
    },
    formatStatus(status){
      // 表格审核状态样式
      switch(status){
        case 0:
        return 'primary';
        break;
        case 1:
        return 'success';
        break;
        case 2:
        return 'danger';
        break;
      }
    }
  },
  created(){
    this.getDatatime()
    this.queryLightList()
    if (this.$route.query.lightId) {
      this.lightId = Number(this.$route.query.lightId)
      this.deviceNo = this.$route.query.deviceNo
      this.getList()
      this.queryMaintainRecordList()
    }
  }
}
</script>

<style lang="scss">
.homedetail{
  .el-tabs__header{
    margin: 0;
    padding: 10px 20px 20px 20px;
    border-radius: 8px;
    background-color: #fff;
  }
  .app-container-box.search-form{
    padding-bottom: 0;
  }
}
</style>
<style lang="scss" scoped>
.homedetail{
  .box-card{
    color: #606266;
  }
  .minHeight{
    min-height: 402px;
  }
  .circle{
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  .blockgroup{
    display: flex;
    justify-content: space-around;
    margin-bottom: 8px;
    margin-top: -8px;
    .colorblock{
      flex: 1;
      display: inline-block;
      margin-right: 8px;
      width: 57px;
      height: 24px;
      background: #ff3341;
      border-radius: 4px;
    }
  }
}
</style>
