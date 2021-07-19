<template>
  <div class="app-container">
    <el-form :inline="true" :model="searchForm" class="search-form app-container-box">
      <el-form-item>
        <el-input placeholder="请输入设备号查询" v-model="searchForm.deviceNo" class="input-with-select" clearable>
            <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
          </el-input>
      </el-form-item>
    </el-form>

    <div class="app-container-box">
      <div class="btn-group">
        <el-button type="primary" @click="handleAdd">
          {{ $t('device.addPlan') }}
        </el-button>
        <!-- <el-button type="danger" @click="handleBatchDel">
          {{ $t('btn.batchDelete') }}
        </el-button> -->
      </div>
      <el-table :data="dataList" class="mbt-24" border v-loading="listLoading" @selection-change="handleSelectionChange">
        <!-- <el-table-column type="selection" width="50" align="center" fixed="left"></el-table-column> -->
        <el-table-column label="计划编号" width="100">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column align="header-center" label="设备号">
          <template slot-scope="scope">
            <div v-if="scope.row.device">{{ scope.row.device.no }}</div>
          </template>
        </el-table-column>
        <el-table-column label="资产编号" :show-overflow-tooltip="true" width="100">
          <template slot-scope="scope">
            <div v-if="scope.row.device">{{ scope.row.device.assetNumber }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="yearStartDate" label="开始日期(年)" sortable width="140"></el-table-column>
        <el-table-column prop="seasonStartDate" label="开始日期(季)" sortable width="140"></el-table-column>
        <el-table-column prop="monthStartDate" label="开始日期(月)" sortable width="140"></el-table-column>
        <el-table-column prop="weekStartDate" label="开始日期(周)" sortable width="140"></el-table-column>
        <el-table-column prop="dayStartDate" label="开始日期(日)" sortable width="140"></el-table-column>
        <el-table-column label="操作" min-width="220px" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row)">
              {{ $t('btn.edit') }}
            </el-button>
            <el-button type="text" size="small" @click="handleAddTodayTask(scope.row.id)">
              {{ $t('device.addTodayTask') }}
            </el-button>
            <el-button class="danger-txt" type="text" size="small" @click="handleBatchDel(scope.row.id)">
              {{ $t('btn.remove') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- component -->
      <pagination :total="page.total" :page.sync="page.page" :limit.sync="page.limit" @pagination="getList" />
      <!-- 新增、编辑 -->
      <addDevice v-if="addVisible" :visible.sync="addVisible" :source="source" @queryFresh="getList" :id="id"></addDevice>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import addDevice from './dialog/addDevice'
import { getMaintainPlanList, delMaintainPlan, addMaintainPlanTask } from '@/api/device'

export default {
  name:'maintainManage',
  components: { Pagination, addDevice },
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
      addVisible:false,
      assignVisible:false,
      source:'add',
      id:0,
      multipleSelection:[]
    }
  },
  methods:{
    getList(){
      let param = {
        current:this.page.page,
        size:this.page.limit,
        ...this.searchForm
      }
      this.listLoading = true
      getMaintainPlanList(param).then(res => {
        this.listLoading = false
        if(res.code == '200'){
          this.dataList = res.data.records
          this.page.total = res.data.total
        }
      }).catch(error => {
        this.listLoading = false
      })
    },
    handleAdd(){
      // 新增
      this.addVisible = true
      this.source = 'add'
    },
    handleBatchDel(id){
      // 批量删除
      // if(this.multipleSelection.length>0){
        this.$confirm('是否确认删除？删除后不可撤回！')
        .then(_ => {
          // let maintainPlanIds = []
          // this.multipleSelection.forEach(item => {
          // 	maintainPlanIds.push(item.id)
          // })
          // let param = {maintainPlanIds}
          let param = {
            maintainPlanIds: [id]
          }
          delMaintainPlan(param).then(res => {
            this.listLoading = false
            if(res.code == '200'){
              this.$message.success(this.$t('validate.success'))
              this.getList()
            }
          }).catch(error => {
            this.listLoading = false
          })
        })
      // }
    },
    handleEdit(row){
      this.addVisible = true
      this.source = 'edit'
      this.id = row.id
    },
    handleSelectionChange(val){
      this.multipleSelection = val
    },
    handleAddTodayTask(id){
      // 生成今日任务
      addMaintainPlanTask({maintainPlanId:id}).then(res => {
        if(res.code == '200'){
          this.$message.success(this.$t('validate.success'))
          this.getList()
        }
      })
    }
  },
  created(){
    this.getList();
  }
}
</script>

<style>
</style>
