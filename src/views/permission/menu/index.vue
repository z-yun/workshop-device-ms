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
        <el-button type="primary" @click="handleAddUser">
          {{ $t('permission.addMenu') }}
        </el-button>
      </div>
      <el-table
        :data="dataList"
        class="mbt-24"
        border
        row-key="id"
        v-loading="listLoading"
        @selection-change="handleSelectionChange">
        <!-- <el-table-column type="selection" width="50" align="center" fixed="left"></el-table-column> -->
        <el-table-column label="菜单名称" width="200" fixed="left" >
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="菜单样式" width="120">
          <template slot-scope="scope">
            {{ formatRoute(scope.row.content,'icon') }}
          </template>
        </el-table-column>
        <el-table-column label="父菜单" prop="parentId"></el-table-column>
        <el-table-column label="路由名" width="150">
          <template slot-scope="scope">
            {{ formatRoute(scope.row.content,'name') }}
          </template>
        </el-table-column>
        <el-table-column label="路由地址" prop="url" width="200"></el-table-column>
        <el-table-column label="路由模板" width="260">
          <template slot-scope="scope">
            {{ formatRoute(scope.row.content,'component') }}
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="120px" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row)">
              {{ $t('btn.edit') }}
            </el-button>
            <el-button class="danger-txt" type="text" size="small" @click="handleRemove(scope.row)">
              {{ $t('btn.remove') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- component -->
       <!-- <pagination :total="page.total" :page.sync="page.page" :limit.sync="page.limit" @pagination="getList" /> -->
      <addMenu v-if="addVisible" :visible.sync="addVisible" :source="source" @queryFresh="getList" :infoObj="infoObj"></addMenu>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import addMenu from './dialog/addMenu'
import { getMenus, delMenus } from '@/api/user'

export default {
  name:'menuManage',
  components: { Pagination,addMenu },
  data() {
    return {
      searchForm:{
        name: '',
      },
      page: {
        page: 1,
        limit: 10,
        sizes: [10, 20, 30,100],
        total: 0
      },
      dataList:[],
      listLoading:false,
      addVisible:false,
      source:'add',
      multipleSelection:[],
      infoObj:{}
    }
  },
  methods:{
    getList(){
      let param = {
        size:-1,
        ...this.searchForm
      }
      this.listLoading = true
      getMenus(param).then(res => {
        this.listLoading = false
        if(res.code == '200'){
          this.dataList = res.data
        }
      }).catch(error => {
        this.listLoading = false
      })
    },
    formatRoute(content,filedName){
      let str = ''
      if(content!=''){
        let obj = JSON.parse(content)
        if(filedName == 'icon'){
          if(obj['meta']){
            str = obj['meta'][filedName]
          }
        }else{
          str = obj[filedName]
        }
      }
      return str
    },
    handleAddUser(){
      this.addVisible = true;
      this.source = 'add';
    },
    handleSelectionChange(val){
      this.multipleSelection = val
    },
    handleRemove(row){
      // 删除
      this.$confirm('是否确认删除？删除后不可撤回！')
      .then(_ => {
        let menuIds = [row.id]
        delMenus({menuIds}).then(res => {
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
      if(this.infoObj.content!=''){
        let content = JSON.parse(this.infoObj.content)
        this.infoObj.component = content.component
        this.infoObj.icon = content.meta.icon
        this.infoObj.routeName = content.meta.title
        this.infoObj.hidden = content.hidden
      }
    }
  },
  created(){
    this.getList()
  }
}
</script>

<style>
</style>
