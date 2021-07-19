<template>
  <div class="app-container">
    <el-form :inline="true" ref="searchForm" :model="searchForm" class="search-form app-container-box">
      <el-form-item prop="supplierId">
        <el-select v-model="searchForm.supplierId" placeholder="收货单位">
          <el-option
            v-for="(item,index) in supplierList"
            :key="index"
            :label="item.name"
            :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="stockDate">
        <el-date-picker
          v-model="searchForm.stockDate"
          type="date"
          placeholder="出库日期"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item class="rtbtn">
        <el-button type="primary" @click="getList">{{ $t('search.query') }}</el-button>
        <el-button type="reset" @click="reset">{{ $t('search.reset') }}</el-button>
      </el-form-item>
    </el-form>

    <div class="app-container-box">
      <div class="btn-group">
        <el-button type="primary" @click="handleAdd()">
          {{ $t('psi.addStockOut') }}
        </el-button>
        <!-- <el-button type="danger" @click="handleBatchDel">
          {{ $t('btn.batchDelete') }}
        </el-button> -->
      </div>
      <el-table :data="dataList" class="mbt-24" border v-loading="listLoading" @selection-change="handleSelectionChange">
        <!-- <el-table-column type="selection" width="50" align="center" fixed="left"></el-table-column> -->
        <el-table-column label="出库单号" width="160" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.otherStockInId }}
          </template>
        </el-table-column>
        <el-table-column label="出库日期" sortable prop="stockDate" width="150"></el-table-column>
        <el-table-column label="发货人" width="120">
          <template slot-scope="{row}">
            <div v-if="row.receive">{{row.receive.realName}}</div>
          </template>
        </el-table-column>
        <el-table-column label="收货单位" width="150">
          <template slot-scope="{row}">
            <div v-if="row.supplier">{{row.supplier.name}}</div>
          </template>
        </el-table-column>
        <el-table-column label="出库仓库" width="140">
          <template slot-scope="{row}">
            <div v-if="row.warehouse">{{row.warehouse.name}}</div>
          </template>
        </el-table-column>
        <el-table-column label="出库状态" width="80">
          <template slot-scope="{row}">
            <div v-if="row.status">{{row.status.desc}}</div>
          </template>
        </el-table-column>
        <el-table-column label="出库金额" prop="stockAmount" width="100"></el-table-column>
        <el-table-column label="操作" min-width="180px" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleAdd(scope.row.otherStockInId)">
              {{ $t('btn.edit') }}
            </el-button>
            <el-button class="danger-txt" type="text" size="small" @click="handleBatchDel(scope.row.purchaseStockInId)">
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
import { getOtherStockOutList, delSaleStockOut } from '@/api/psi'
import { getSupplierList } from '@/api/device'

export default {
  name:'tricolorLight',
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
        {desc:'已入库',code:1},
        {desc:'未出库',code:2},
        {desc:'已出库',code:3}
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
      getOtherStockOutList(param).then(res => {
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
      //跳转到新增、编辑页
      if(id){
        this.$router.push({
          path: "/stock/outWh/edit",
          query: {id}
        });
      }else{
        this.$router.push({
          path: "/stock/outWh/add"
        });
      }
    },
    handleBatchDel(id){
      // 批量删除
      // if(this.multipleSelection.length>0){
        this.$confirm('是否确认删除？删除后不可撤回！')
        .then(_ => {
          // let otherStockInIds = []
          // this.multipleSelection.forEach(item => {
          // 	otherStockInIds.push(item.otherStockInId)
          // })
          // let param = {otherStockInIds}
          let param = {
            otherStockInIds: [id]
          }
          delOtherStockOut(param).then(res => {
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
				type:0
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
