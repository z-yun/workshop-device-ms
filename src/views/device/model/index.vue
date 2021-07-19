<template>
  <div class="app-container">
    <el-form :inline="true" :model="searchForm" class="search-form app-container-box">
      <el-form-item>
        <el-input placeholder="请输入名称查询" v-model="searchForm.name" class="input-with-select" clearable>
            <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
          </el-input>
      </el-form-item>
    </el-form>

    <div class="app-container-box">
      <div class="btn-group">
        <el-button type="primary" @click="handleAdd">
          {{ $t('device.addModel') }}
        </el-button>
        <!-- <el-button type="danger" @click="handleBatchDel">
          {{ $t('btn.batchDelete') }}
        </el-button> -->
      </div>
      <el-table :data="dataList" class="mbt-24" border v-loading="listLoading" @selection-change="handleSelectionChange">
        <!-- <el-table-column type="selection" width="50" align="center"></el-table-column> -->
        <el-table-column label="模型名称">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column align="header-center" label="维修类型">
          <template slot-scope="{row}">
            <div v-if="row.maintainTypeVo">{{ row.maintainTypeVo.name }}</div>
          </template>
        </el-table-column>
        <el-table-column align="header-center" label="部门">
          <template slot-scope="{row}">
            <div v-if="row.department">{{ row.department.name }}</div>
          </template>
        </el-table-column>
        <el-table-column align="header-center" label="描述">
          <template slot-scope="scope">
            {{ scope.row.remark }}
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100px">
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
      <addDevice v-if="addVisible" :visible.sync="addVisible" :source="source" @queryFresh="getList" :id="id"></addDevice>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import addDevice from './dialog/addDevice'
import { getMaintainModelList, delMaintainModel } from '@/api/device'

export default {
  name:'maintainModel',
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
      getMaintainModelList(param).then(res => {
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
          // let maintainModelIds = []
          // this.multipleSelection.forEach(item => {
          // 	maintainModelIds.push(item.id)
          // })
          // let param = {maintainModelIds}
          let param = {
            maintainModelIds: [id]
          }
          delMaintainModel(param).then(res => {
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
    }
  },
  created(){
    this.getList();
  }
}
</script>

<style>
</style>
