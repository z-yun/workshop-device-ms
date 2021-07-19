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
          {{ $t('permission.addUserGroup') }}
        </el-button>
        <!-- <el-button type="danger" @click="handleBatchDel">
          {{ $t('permission.batchDelUser') }}
        </el-button> -->
      </div>
      <el-table :data="rolesList" class="mbt-24" border v-loading="listLoading" @selection-change="handleSelectionChange">
        <!-- <el-table-column type="selection" width="50" align="center"></el-table-column> -->
        <el-table-column label="ID" width="140">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="用户组名" width="140">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column align="header-center" label="描述">
          <template slot-scope="scope">
            {{ scope.row.description }}
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180px">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row)">
              {{ $t('permission.edit') }}
            </el-button>
            <el-button type="text" size="small" @click="handleAssign(scope.row)">
              {{ $t('permission.assignUser') }}
            </el-button>
            <el-button class="danger-txt" type="text" size="small" @click="handleBatchDel(scope.row.id)">
              {{ $t('btn.remove') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- component -->
      <pagination :total="page.total" :page.sync="page.page" :limit.sync="page.limit" @pagination="getList" />
      <!-- 新增、编辑用户组 -->
      <addUserGroup v-if="addVisible" :visible.sync="addVisible" :source="source" @queryFresh="getList" :userInfo="userInfo"></addUserGroup>
      <!-- 分配用户 -->
      <assignUser v-if="assignVisible" :visible.sync="assignVisible" @queryFresh="getList" :userInfo="userInfo"></assignUser>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import addUserGroup from './dialog/addUserGroup'
import assignUser from './dialog/assignUser'
import { getRoleList, delRoles } from '@/api/user'

export default {
  name:'usergroup',
  components: { Pagination,addUserGroup,assignUser },
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
      rolesList:[],
      listLoading:false,
      addVisible:false,
      assignVisible:false,
      source:'add',
      userInfo:{},
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
      getRoleList(param).then(res => {
        this.listLoading = false
        if(res.code == '200'){
          this.rolesList = res.data.records
          this.page.total = res.data.total
        }
      }).catch(error => {
        this.listLoading = false
      })
    },
    handleAddUser(){
      // 新增用户
      this.addVisible = true
      this.source = 'add'
    },
    handleBatchDel(id){
      // 批量删除
      // if(this.multipleSelection.length>0){
        this.$confirm('是否确认删除？删除后不可撤回！')
        .then(_ => {
          // let roleIds = []
          // this.multipleSelection.forEach(item => {
          // 	roleIds.push(item.id)
          // })
          // let param = {roleIds}
          let param = {
            roleIds: [id]
          }
          delRoles(param).then(res => {
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
      this.userInfo = row
    },
    handleAssign(row){
      this.assignVisible = true
      this.userInfo = row
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
