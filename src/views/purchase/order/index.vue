<template>
  <div class="app-container">
    <el-form :inline="true" ref="searchForm" :model="searchForm" class="search-form app-container-box">
      <el-form-item prop="supplierId">
        <el-select v-model="searchForm.supplierId" placeholder="供应商">
          <el-option
            v-for="(item,index) in supplierList"
            :key="index"
            :label="item.name"
            :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="purchaseDate">
        <el-date-picker
          v-model="searchForm.purchaseDate"
          type="date"
          placeholder="采购日期"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <!-- <el-form-item prop="stockStatus">
        <el-select v-model="searchForm.stockStatus" placeholder="入库状态">
          <el-option
            v-for="(item,index) in stockStatusOptions"
            :key="index"
            :label="item.desc"
            :value="item.code"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item class="rtbtn">
        <el-button type="primary" @click="getList">{{ $t('search.query') }}</el-button>
        <el-button type="reset" @click="reset">{{ $t('search.reset') }}</el-button>
      </el-form-item>
    </el-form>

    <div class="app-container-box">
      <div class="btn-group">
        <el-button type="primary" @click="handleAdd()">
          {{ $t('psi.addPurchase') }}
        </el-button>
        <!-- <el-button type="danger" @click="handleBatchDel">
          {{ $t('btn.batchDelete') }}
        </el-button> -->
      </div>
      <el-table :data="dataList" class="mbt-24" border v-loading="listLoading" @selection-change="handleSelectionChange">
        <!-- <el-table-column type="selection" width="50" align="center" fixed="left"></el-table-column> -->
        <el-table-column label="采购订单号" width="160" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.purchaseOrderId }}
          </template>
        </el-table-column>
        <el-table-column label="采购员" width="120">
          <template slot-scope="{row}">
            <div v-if="row.purchaseUser">{{row.purchaseUser.realName}}</div>
          </template>
        </el-table-column>
        <el-table-column label="采购日期" sortable prop="purchaseDate" width="150"></el-table-column>
        <el-table-column label="到货日期" sortable prop="deliveryDate" width="150"></el-table-column>
        <el-table-column label="供应商" width="150" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <div v-if="row.supplier">{{row.supplier.name}}</div>
          </template>
        </el-table-column>
       <!-- <el-table-column label="入库状态">
          <template slot-scope="{row}">
            <div v-if="row.stockStatus">{{row.stockStatus.desc}}</div>
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="采购金额" prop="totalAmount" width="100"></el-table-column> -->
        <el-table-column label="状态">
          <template slot-scope="{row}">
             <div v-if="row.orderStatus">{{row.orderStatus.desc}}</div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="已付款" prop="paidAmount" width="100"></el-table-column> -->
        <el-table-column label="操作" min-width="180px" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleAdd(scope.row.purchaseOrderId)">
              {{ $t('btn.look') }}
            </el-button>
            <el-button type="text" size="small" @click="handleAdd(scope.row.purchaseOrderId)">
              {{ $t('btn.edit') }}
            </el-button>
            <el-button class="danger-txt" type="text" size="small" @click="handleBatchDel(scope.row.purchaseOrderId)">
              {{ $t('btn.remove') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- component -->
      <pagination :total="page.total" :page.sync="page.page" :limit.sync="page.limit" @pagination="getList" />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getPurchaseOrderList, delPurchaseOrder } from '@/api/psi'
import { getSupplierList } from '@/api/device'

export default {
  name:'purchaseOrder',
  components: { Pagination },
  data() {
    return {
      searchForm:{
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
      supplierList:[],
      stockStatusOptions:[
        {desc:'未入库',code:0},
        {desc:'已入库',code:1}
      ]
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
      getPurchaseOrderList(param).then(res => {
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
    handleAdd(id){
      //跳转到新增、编辑订单页
      this.$store.dispatch('tagsView/delView', this.$route)
      if(id){
        this.$router.push({
          path: '/purchase/order/edit',
          query: {id}
        })
      }else{
        this.$router.push({
          path: '/purchase/order/add'
        })
      }
    },
    handleBatchDel(id){
      // 批量删除
      // if(this.multipleSelection.length>0){
        this.$confirm('是否确认删除？删除后不可撤回！')
        .then(_ => {
          // let purchaseOrderIds = []
          // this.multipleSelection.forEach(item => {
          // 	purchaseOrderIds.push(item.purchaseOrderId)
          // })
          // let param = {purchaseOrderIds}
          let param = {
            purchaseOrderIds: [id]
          }
          delPurchaseOrder(param).then(res => {
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
    handleSelectionChange(val){
      this.multipleSelection = val
    },
    querySupplierList(){
      // 查询供应商
      let param = {
        size:-1,
        type:1
      }
      getSupplierList(param).then(res => {
        if(res.code == '200'){
          this.supplierList = res.data
        }
      })
    }
  },
  created(){
    this.querySupplierList()
    this.getList()
  }
}
</script>

<style>
</style>
