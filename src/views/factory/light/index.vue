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
          {{ $t('factory.addLight') }}
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
        <el-table-column label="三色灯名称" width="140" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="线别">
          <template slot-scope="{row}">
            <div v-if="row.line">{{row.line.name}}</div>
          </template>
        </el-table-column>
        <el-table-column label="描述" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.description }}
          </template>
        </el-table-column>
        <el-table-column label="创建时间" sortable prop="createTime" width="180"></el-table-column>
        <el-table-column label="是否启用">
          <template slot-scope="scope">
            <div v-if="scope.row.isShow">{{ scope.row.isShow.desc }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180px">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row)">
              {{ $t('btn.edit') }}
            </el-button>
            <el-button type="text" size="small" @click="handleConfig(scope.row)">
              {{ $t('factory.excode') }}
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
      <addDialog v-if="addVisible" :visible.sync="addVisible" :source="source" @queryFresh="getList" :infoObj="infoObj"></addDialog>
      <!-- 异常编码定义 -->
      <lightConfig v-if="configVisible" :visible.sync="configVisible" @queryFresh="getList" :infoObj="infoObj"></lightConfig>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import addDialog from './dialog/addDialog'
import lightConfig from './dialog/lightConfig'
import { getLightList, delLight } from '@/api/factory'

export default {
  name:'tricolorLight',
  components: { Pagination, addDialog, lightConfig },
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
      configVisible:false,
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
      getLightList(param).then(res => {
        this.listLoading = false
        if(res.code == '200'){
          this.dataList = res.data.records
          this.page.total = res.data.total
        }
      }).catch(error => {
        this.listLoading = false
        this.$message.error(error.errorMsg)
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
          // let lightIds = []
          // this.multipleSelection.forEach(item => {
          // 	lightIds.push(item.id)
          // })
          // let param = {lightIds}
          let param = {
            lightIds: [id]
          }
          delLight(param).then(res => {
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
    },
    handleConfig(row){
      this.configVisible = true
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
