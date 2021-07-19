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
          {{ $t('psi.addBom') }}
        </el-button>
        <!-- <el-button type="danger" @click="handleBatchDel">
          {{ $t('btn.batchDelete') }}
        </el-button> -->
      </div>
      <el-table :data="dataList" class="mbt-24" border v-loading="listLoading" @selection-change="handleSelectionChange">
        <!-- <el-table-column type="selection" width="50" align="center" fixed="left"></el-table-column> -->
        <el-table-column label="父件商品编号" width="120">
          <template slot-scope="{row}">
            <div v-if="row.product">{{row.product.id}}</div>
          </template>
        </el-table-column>
        <el-table-column label="父件商品名称" width="140" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <div v-if="row.product">{{row.product.name}}</div>
          </template>
        </el-table-column>
        <el-table-column label="父件类别" width="140">
          <template slot-scope="{row}">
            <div v-if="row.product">
              <div v-if="row.product.category">{{row.product.category.name}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="父件规格" prop="specification">
          <template slot-scope="{row}">
            <div v-if="row.product">{{row.product.specification}}</div>
          </template>
        </el-table-column>
        <el-table-column label="父件计量单位" width="120">
          <template slot-scope="{row}">
            <div v-if="row.product">
              <div v-if="row.product.measure">{{row.product.measure.name}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="remark" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作" min-width="180px">
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
      <addDialog v-if="addVisible" :visible.sync="addVisible" :source="source" @queryFresh="getList" :infoObj="infoObj"></addDialog>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import addDialog from './dialog/addDialog'
import { getProductBomList, delProductBom } from '@/api/psi'

export default {
  name:'tricolorLight',
  components: { Pagination, addDialog },
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
      getProductBomList(param).then(res => {
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
          // let ids = []
          // this.multipleSelection.forEach(item => {
          // 	ids.push(item.id)
          // })
          // let param = {ids}
          let param = {
            ids: [id]
          }
          delProductBom(param).then(res => {
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
    formatDefault(flag){
      return flag==0?'否':'是'
    }
  },
  created(){
    this.getList();
  }
}
</script>

<style>
</style>
