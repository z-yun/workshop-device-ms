<template>
  <div class="app-container">
    <el-form :inline="true" :model="searchForm" class="search-form app-container-box">
      <el-form-item>
        <el-input placeholder="单位名称" v-model="searchForm.name" class="input-with-select" clearable>
            <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
          </el-input>
      </el-form-item>
    </el-form>

    <div class="app-container-box">
      <div class="btn-group">
        <el-button type="primary" @click="handleAdd">
          {{ $t('psi.addMeasure') }}
        </el-button>
      </div>
      <el-table :data="dataList" class="mbt-24" border v-loading="listLoading">
        <el-table-column label="序号" width="100">
          <template slot-scope="scope">
            {{ scope.$index+1 }}
          </template>
        </el-table-column>
        <el-table-column label="单位名称" width="140">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="说明">
          <template slot-scope="scope">
            {{ scope.row.description }}
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180px">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row)">
              {{ $t('btn.edit') }}
            </el-button>
            <el-button type="text" class="danger-txt" size="small" @click="handleRemove(scope.row.id)">
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
import { getMeasureList, delMeasure } from '@/api/psi'

export default {
  name:'measure',
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
      getMeasureList(param).then(res => {
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
    handleRemove(id){
      // 删除
      this.$confirm('是否确认删除？删除后不可撤回！')
      .then(_ => {
        let measureIds = [id]
        delMeasure({measureIds}).then(res => {
          this.listLoading = false
          if(res.code == '200'){
            this.$message.success(this.$t('validate.success'))
            this.getList()
          }
        }).catch(error => {
          this.listLoading = false
        })
      })
    },
    handleEdit(row){
      this.addVisible = true
      this.source = 'edit'
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
