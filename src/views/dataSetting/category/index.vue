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
          {{ $t('psi.addCategory') }}
        </el-button>
      </div>
      <el-table
        :data="dataList"
        class="mbt-24" border
        v-loading="listLoading"
        row-key="id">
        <el-table-column label="类别名称" width="540">
          <template slot-scope="scope">
            {{ scope.row.name }}
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
      <!-- 新增、编辑 -->
      <addDialog v-if="addVisible" :visible.sync="addVisible" :source="source" @queryFresh="getList" :infoObj="infoObj"></addDialog>
    </div>
  </div>
</template>

<script>
import addDialog from './dialog/addDialog'
import { getCategoryList, delCategory } from '@/api/psi'

export default {
  name:'measure',
  components: { addDialog },
  data() {
    return {
      searchForm:{
        name: ''
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
        ...this.searchForm
      }
      this.listLoading = true
      getCategoryList(param).then(res => {
        this.listLoading = false
        if(res.code == '200'){
          this.dataList = res.data
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
        let categoryIds = [id]
        delCategory({categoryIds}).then(res => {
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
