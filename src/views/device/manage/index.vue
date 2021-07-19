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
          {{ $t('device.addDevice') }}
        </el-button>
       <!-- <el-button type="danger" @click="handleBatchDel">
          {{ $t('btn.batchDelete') }}
        </el-button> -->
      </div>
      <el-table :data="dataList" class="mbt-24" border v-loading="listLoading" @selection-change="handleSelectionChange">
        <!-- <el-table-column type="selection" width="50" align="center" fixed="left"></el-table-column> -->
        <el-table-column label="设备名称" width="140">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="设备号" width="120">
          <template slot-scope="scope">
            {{ scope.row.no }}
          </template>
        </el-table-column>
        <el-table-column label="资产编号" width="120" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.assetNumber }}
          </template>
        </el-table-column>
        <el-table-column label="品牌" width="120">
          <template slot-scope="scope">
            {{ scope.row.brand }}
          </template>
        </el-table-column>
        <el-table-column label="设备类型" width="100">
          <template slot-scope="{row}">
            <div v-if="row.deviceType">{{ row.deviceType.name }}</div>
          </template>
        </el-table-column>
        <el-table-column label="型号">
          <template slot-scope="scope">
            {{ scope.row.model }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <div v-if="scope.row.status">{{ scope.row.status.desc }}</div>
          </template>
        </el-table-column>
        <el-table-column label="供应商" width="140" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.supplier">{{ scope.row.supplier.name }}</div>
          </template>
        </el-table-column>
        <el-table-column label="联系人">
          <template slot-scope="scope">
            <div v-if="scope.row.supplier">{{ scope.row.supplier.contactUser }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="120px" fixed="right">
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
import { getDeviceList, delDevices } from '@/api/device'

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
        ...this.searchForm
      }
      this.listLoading = true
      getDeviceList(param).then(res => {
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
          // let deviceIds = []
          // this.multipleSelection.forEach(item => {
          // 	deviceIds.push(item.id)
          // })
          // let param = {deviceIds}
          let param = {
            deviceIds: [id]
          }
          delDevices(param).then(res => {
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
