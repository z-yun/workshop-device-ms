<template>
  <div class="app-container">
    <el-form :inline="true" ref="searchForm" :model="searchForm" class="search-form app-container-box">
      <el-form-item prop="roleId">
        <el-select v-model="searchForm.roleId" placeholder="用户组">
          <el-option
            v-for="(item,index) in rolesList"
            :key="index"
            :label="item.name"
            :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="mobile">
        <el-input v-model="searchForm.mobile" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item class="rtbtn">
        <el-button type="primary" @click="getList">{{ $t('search.query') }}</el-button>
        <el-button type="reset" @click="reset">{{ $t('search.reset') }}</el-button>
      </el-form-item>
    </el-form>

    <div class="app-container-box">
      <div class="btn-group">
        <el-button type="primary" @click="handleAddUser">
          {{ $t('permission.addUser') }}
        </el-button>
        <!-- <el-button type="danger" @click="handleBatchDelUser">
          {{ $t('permission.batchDelUser') }}
        </el-button> -->
      </div>
      <el-table :data="userList" class="mbt-24" border v-loading="listLoading" @selection-change="handleSelectionChange">
        <!-- <el-table-column type="selection" width="50" align="center" fixed="left"></el-table-column> -->
        <el-table-column prop="id" label="ID" width="55"></el-table-column>
        <el-table-column prop="username" label="用户名" width="140" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column prop="realName" label="真实姓名" width="100"></el-table-column>
        <el-table-column label="用户组" width="140" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <div v-if="row.roles">{{formatRole(row.roles)}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" width="130"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="200" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" sortable width="160"></el-table-column>
        <el-table-column label="操作" min-width="220px" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row.id)">
              {{ $t('permission.edit') }}
            </el-button>
            <el-button type="text" size="small" @click="handleReset(scope.row.id)">
              {{ $t('permission.reset') }}
            </el-button>
            <el-button type="text" size="small" @click="handleLeader(scope.row.id)">
              {{ $t('permission.leader') }}
            </el-button>
            <el-button class="danger-txt" type="text" size="small" @click="handleBatchDel(scope.row.id)">
              {{ $t('btn.remove') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- component -->
      <pagination :total="page.total" :page.sync="page.page" :limit.sync="page.limit" @pagination="getList" />
      <addUser v-if="addVisible" :visible.sync="addVisible" :source="userSource" :userId="userId" @queryFresh="getList"></addUser>
      <assignLeader v-if="leaderVisible" :visible.sync="leaderVisible" :userId="userId"></assignLeader>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import addUser from './dialog/addUser'
import assignLeader from './dialog/assignLeader'
import { getUserList, resetPassword, getRoleList, delUsers } from '@/api/user'

export default {
  name:'userbase',
  components: { Pagination,addUser,assignLeader },
  data() {
    return {
      searchForm:{
        roleId: undefined,
        phone: undefined
      },
      page: {
        page: 1,
        limit: 10,
        sizes: [10, 20, 30,100],
        total: 0
      },
      userList:[],
      listLoading:false,
      addVisible:false,
      leaderVisible:false,
      userSource:'add',
      userId:0,
      rolesList:[],
      multipleSelection:[]
    }
  },
  methods:{
    reset(){
      this.$refs["searchForm"].resetFields()
      this.page.page = 1
      this.page.limit = 10
      this.getList()
    },
    getList(){
      let param = {
        current:this.page.page,
        size:this.page.limit,
        ...this.searchForm
      }
      this.listLoading = true
      getUserList(param).then(res => {
        this.listLoading = false
        if(res.code == '200'){
          this.userList = res.data.records
          this.page.total = res.data.total
        }
      }).catch(error => {
        this.listLoading = false
      })
    },
    formatRole(roles){//格式化用户组
      let names = []
      roles.forEach((item)=>{
        names.push(item.name)
      })
      return names.join()
    },
    handleAddUser(){
      this.addVisible = true
      this.userSource = 'add'
    },
    handleSelectionChange(val){
      this.multipleSelection = val
    },
    handleBatchDelUser(id){
      // 批量删除
      // if(this.multipleSelection.length>0){
        this.$confirm('是否确认删除？删除后不可撤回！')
        .then(_ => {
          // let userIds = []
          // this.multipleSelection.forEach(item => {
          // 	userIds.push(item.id)
          // })
          // let param = {userIds}
          let param = {
            userIds: [id]
          }
          delUsers(param).then(res => {
            if(res.code == '200'){
              this.$message.success(this.$t('validate.success'))
              this.getList()
            }
          })
        })
      // }
    },
    handleEdit(id){
      this.addVisible = true
      this.userSource = 'edit'
      this.userId = id
    },
    handleLeader(id){
      this.leaderVisible = true;
      this.userId = id
    },
    handleReset(id){
      //重置密码
      resetPassword({userId:id}).then(res => {
        this.listLoading = false
        if(res.code == '200'){
          this.$message.success(this.$t('validate.success'))
          this.getList()
        }
      }).catch(error => {
        this.$message.error(error.errorMsg);
      })
    },
    getRoleLists(){
      // 获取用户组列表
      let param = {
        size:-1
      }
      getRoleList(param).then(res => {
        if(res.code == '200'){
          this.rolesList = res.data.records
        }
      }).catch(error => {
        this.$message.error(error.errorMsg)
      })
    }
  },
  created(){
    this.getList();
    this.getRoleLists()
  }
}
</script>

<style>
</style>
