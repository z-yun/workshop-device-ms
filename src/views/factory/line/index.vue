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
          {{ $t('factory.addLine') }}
        </el-button>
        <!-- <el-button type="danger" @click="handleBatchDel">
          {{ $t('btn.batchDelete') }}
        </el-button> -->
      </div>
      <el-table :data="dataList" class="mbt-24" border v-loading="listLoading" @selection-change="handleSelectionChange">
        <!-- <el-table-column type="selection" width="50"></el-table-column> -->
        <el-table-column label="ID" width="100">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="线别名称" width="140" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="主机密钥">
          <template slot-scope="scope">
            {{ scope.row.hostKey }}
          </template>
        </el-table-column>
        <el-table-column label="描述" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.description }}
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180px">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row)">
              {{ $t('btn.edit') }}
            </el-button>
            <!-- <el-button type="text" size="small" @click="handlSort(scope.row)">
              {{ $t('factory.sort') }}
            </el-button> -->
            <el-button class="danger-txt" type="text" size="small" @click="handleBatchDel(scope.row.id)">
              {{ $t('btn.remove') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- component -->
      <pagination :total="page.total" :page.sync="page.page" :limit.sync="page.limit" @pagination="getList" />
      <!-- 新增、编辑 -->
      <addDialog v-if="addVisible" :visible.sync="addVisible" :source="source" @queryFresh="getList" :infoObj="infoObj"></addDialog>
      <!-- 轨道机台排序-->
      <sortDialog v-if="sortVisible" :visible.sync="sortVisible" @queryFresh="getList" :infoObj="infoObj"></sortDialog>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import addDialog from './dialog/addDialog'
import sortDialog from './dialog/sortDialog'
import { getLineList, delLine } from '@/api/factory'

export default {
  name:'productLine',
  components: { Pagination, addDialog, sortDialog },
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
      source:'add',
      infoObj:{},
      multipleSelection:[],
      sortVisible:false,
      id:0
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
      getLineList(param).then(res => {
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
          // let lineIds = []
          // this.multipleSelection.forEach(item => {
          // 	lineIds.push(item.id)
          // })
          // let param = {lineIds}
          let param = {
            lineIds: [id]
          }
          delLine(param).then(res => {
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
    handlSort(row){
      this.sortVisible = true
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
