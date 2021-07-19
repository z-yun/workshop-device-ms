<template>
  <div class="app-container">
    <el-form :inline="true" ref="searchForm" :model="searchForm" class="search-form app-container-box">
      <el-form-item prop="status">
        <el-select v-model="searchForm.status" placeholder="审核状态">
          <el-option label="待审核" :value="0"></el-option>
          <el-option label="审核通过" :value="1"></el-option>
          <el-option label="审核未通过" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="companyName">
        <el-input v-model="searchForm.companyName" placeholder="企业名称"></el-input>
      </el-form-item>
      <el-form-item class="rtbtn">
        <el-button type="primary" @click="getList">{{ $t('search.query') }}</el-button>
        <el-button type="reset" @click="reset">{{ $t('search.reset') }}</el-button>
      </el-form-item>
    </el-form>

    <div class="app-container-box">
      <el-table :data="dataList" class="mbt-24" border v-loading="listLoading" :default-sort = "{prop: 'createTime', order: 'descending'}">
        <el-table-column label="审核状态" width="120" fixed="left">
          <template slot-scope="scope" class="status">
            <el-tag :type="formatStatus(scope.row.status.code)" disable-transitions>{{scope.row.status.desc}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="企业名称" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.companyName }}
          </template>
        </el-table-column>
        <el-table-column label="企业税号" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.taxNumber }}
          </template>
        </el-table-column>
        <el-table-column label="用户名" width="180" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <div v-if="row.user">{{ row.user.username }}</div>
          </template>
        </el-table-column>
        <el-table-column label="联系电话">
          <template slot-scope="scope">
            {{ scope.row.telephone }}
          </template>
        </el-table-column>
        <el-table-column label="提交资料时间" sortable width="160" prop="createTime"></el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" v-if="scope.row.status.code==0" size="small" @click="handleDetail(scope.row.id)">
              {{ $t('permission.auditBtn') }}
            </el-button>
            <el-button type="text" v-if="scope.row.status.code==1" size="small" @click="handleAssign(scope.row)">
              {{ $t('permission.assignMenu') }}
            </el-button>
            <el-button type="text" size="small" @click="handleDetail(scope.row.id)">
              {{ $t('permission.auditDetailBtn') }}
            </el-button>
            <el-button type="text" v-if="scope.row.status.code==1" size="small" @click="sendMsg(scope.row.id)" >
              {{ $t('permission.sendMsg') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="page.total" :page.sync="page.page" :limit.sync="page.limit" @pagination="getList" />
      <!-- 分配权限 -->
      <assignMenu v-if="assignVisible" :visible.sync="assignVisible" @queryFresh="getList" :userInfo="userInfo"></assignMenu>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { registerCompanyList, sendSuccessMsg } from '@/api/user'
import assignMenu from './dialog/assignMenu'

export default {
  name:'userbase',
  components: { Pagination, assignMenu },
  data() {
    return {
      searchForm:{
        status: undefined,
        companyName: null
      },
      dataList: [],
      page: {
        page: 1,
        limit: 10,
        sizes: [10, 20, 30, 100],
        total: 0
      },
      listLoading: false,
      assignVisible: false
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
      registerCompanyList(param).then(res => {
        this.listLoading = false
        if(res.code == '200'){
          this.dataList = res.data.records
          this.page.total = res.data.total
        }
      }).catch(error => {
        this.listLoading = false
      })
    },
    formatStatus(status){
      // 表格审核状态样式 0待审核 1通过 2未通过
      switch(status){
        case 0:
        return 'primary';
        break;
        case 1:
        return 'success';
        break;
        case 2:
        return 'danger';
        break;
      }
    },
    handleDetail(id){
      //审核详情页
      this.$router.push({
        path: "/permission/audit-detail",
        query: {id}
      });
    },
    handleAssign(row){
      // 分配菜单权限
      this.assignVisible = true
      this.userInfo = row
    },
    sendMsg(id){
      // 发送通知
      this.listLoading = true
      sendSuccessMsg({id}).then(res => {
        this.listLoading = false
        if(res.code == '200'){
          this.$message.success(this.$t('validate.success'))
        }
      }).catch(error => {
        this.listLoading = false
      })
    }
  },
  created(){
    this.getList()
  }
}
</script>

<style>
</style>
