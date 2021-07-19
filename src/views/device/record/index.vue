<template>
  <div class="app-container">
    <el-form :inline="true" ref="searchForm" :model="searchForm" class="search-form app-container-box">
      <el-form-item prop="deviceNo">
        <el-input v-model="searchForm.deviceNo" placeholder="请输入设备号"></el-input>
      </el-form-item>
      <el-form-item prop="maintainPlanId">
        <el-input v-model="searchForm.maintainPlanId" placeholder="请输入计划ID"></el-input>
      </el-form-item>
      <el-form-item prop="startDate">
        <el-date-picker v-model="searchForm.startDate" type="date" placeholder="选择开始日期" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item prop="endDate">
        <el-date-picker v-model="searchForm.endDate" type="date" placeholder="选择结束日期" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item class="rtbtn">
        <el-button type="primary" @click="getList">{{ $t('search.query') }}</el-button>
        <el-button type="reset" @click="reset">{{ $t('search.reset') }}</el-button>
      </el-form-item>
    </el-form>

    <div class="app-container-box">
      <el-table :data="dataList" class="mbt-24" border v-loading="listLoading">
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
        <el-table-column label="保养名称" prop="maintainItemName" :show-overflow-tooltip="true"></el-table-column>
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
        <el-table-column label="确认状态" width="100px">
          <template slot-scope="{row}" class="status">
            <div v-if="row.auditStatus">
              <el-tag :type="formatStatus(row.auditStatus.code)" disable-transitions>{{row.auditStatus.desc}}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100px" fixed="right">
          <template slot-scope="{row}">
            <el-button v-if="row.auditStatus.code==0&&row.status.code==1" type="text" size="small" @click="handleAudit(row)">
              {{ $t('btn.audit') }}
            </el-button>
            <el-button type="text" size="small" @click="handleAudit(row)">
              {{ $t('btn.detail') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- component -->
      <pagination :total="page.total" :page.sync="page.page" :limit.sync="page.limit" @pagination="getList" />
      <!-- 审核 -->
      <recordAudit v-if="auditVisible" :visible.sync="auditVisible" :infoObj="infoObj"  @queryFresh="getList"></recordAudit>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getMaintainRecordList, auditRecord } from '@/api/device'
import recordAudit from './dialog/recordAudit'

export default {
  name:'maintainRecord',
  components: { Pagination, recordAudit },
  data() {
    return {
      searchForm:{
        name: ''
      },
      page: {
        page: 1,
        limit: 10,
        sizes: [10, 20, 30, 100],
        total: 0
      },
      dataList:[],
      listLoading:false,
      auditVisible:false,
      infoObj:{}
    }
  },
  methods:{
    reset(){
      this.$refs["searchForm"].resetFields()
      this.page.page = 1
      this.page.limit = 10
      this.getList()
    },
    getList(){
      let param = {
        current:this.page.page,
        size:this.page.limit,
        ...this.searchForm
      }
      this.listLoading = true
      getMaintainRecordList(param).then(res => {
        this.listLoading = false
        if(res.code == '200'){
          if(res.data.records){
            this.dataList = res.data.records
            this.page.total = res.data.total
          }
        }
      }).catch(error => {
        this.listLoading = false
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
    },
    handleAudit(row){
      this.auditVisible = true
      this.infoObj = row
    }
  },
  created(){
    this.getList();
  }
}
</script>

<style>
</style>
