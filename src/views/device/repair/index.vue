<template>
  <div class="app-container">
    <el-form :inline="true" :model="searchForm" class="search-form app-container-box">
      <el-form-item>
        <el-input placeholder="请输入内容" v-model="searchForm.name" class="input-with-select" clearable>
            <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
          </el-input>
      </el-form-item>
    </el-form>

    <div class="app-container-box">
      <div class="btn-group">
        <el-button type="primary" @click="handleAdd">
          {{ $t('device.addRepair') }}
        </el-button>
        <!-- <el-button type="danger" @click="handleBatchDel">
          {{ $t('btn.batchDelete') }}
        </el-button> -->
      </div>
      <el-table :data="dataList" class="mbt-24" border v-loading="listLoading" @selection-change="handleSelectionChange">
        <!-- <el-table-column type="selection" width="50" align="center" fixed="left"></el-table-column> -->
        <el-table-column label="设备号">
          <template slot-scope="scope">
            <div v-if="scope.row.device">{{ scope.row.device.no }}</div>
          </template>
        </el-table-column>
        <el-table-column label="设备名称" width="100">
          <template slot-scope="scope">
            <div v-if="scope.row.device">{{ scope.row.device.name }}</div>
          </template>
        </el-table-column>
        <el-table-column label="上报人" width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.reporter">{{ scope.row.reporter.realName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="reportTime" label="上报时间" width="160"></el-table-column>
        <el-table-column prop="address" label="地点" width="160"></el-table-column>
        <el-table-column label="处理状态">
          <template slot-scope="scope">
            <div v-if="scope.row.processStatus">{{ scope.row.processStatus.desc }}</div>
          </template>
        </el-table-column>
        <el-table-column label="维修部门" width="140" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.repairDepartment">{{ scope.row.repairDepartment.name }}</div>
          </template>
        </el-table-column>
        <el-table-column label="维修人" width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.repairer">{{ scope.row.repairer.realName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="维修方式">
          <template slot-scope="scope">
            <div v-if="scope.row.repairType">{{ scope.row.repairType.desc }}</div>
          </template>
        </el-table-column>
        <el-table-column label="维修结果">
          <template slot-scope="scope">
            <div v-if="scope.row.repairStatus">{{ scope.row.repairStatus.desc }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100px" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row)">
              {{ $t('btn.edit') }}
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
      <addDevice v-if="addVisible" :visible.sync="addVisible" :source="source" @queryFresh="getList" :infoObj="infoObj"></addDevice>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import addDevice from './dialog/addDevice'
import { getDeviceRepairList, delDeviceRepair } from '@/api/device'

export default {
  name:'deviceManage',
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
      infoObj:{},
      multipleSelection:[]
    }
  },
  methods:{
    getList(){
      let param = {
        current:this.page.page,
        size:this.page.limit,
        // type:1,
        ...this.searchForm
      }
      this.listLoading = true
      getDeviceRepairList(param).then(res => {
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
          // let repairIds = []
          // this.multipleSelection.forEach(item => {
          // 	repairIds.push(item.id)
          // })
          // let param = {repairIds}
          let param = {
            repairIds: [id]
          }
          delDeviceRepair(param).then(res => {
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
      this.infoObj = row
    },
    handleSelectionChange(val){
      this.multipleSelection = val
    }
  },
  created(){
    this.getList();
  }
}
</script>

<style>
</style>
