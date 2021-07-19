<template>
  <el-dialog :visible.sync="visible" :title="$t('psi.selectPurchasesOrder')" :before-close="handleClose" :close-on-click-modal="false" width="960px" append-to-body top="10vh">
    <div class="dialog-scroll-wrap">
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
        <el-form-item prop="purchaseOrderId">
          <el-input v-model="searchForm.purchaseOrderId" placeholder="请输入采购订单号" />
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
      <el-table :data="dataList" class="mbt-24" border v-loading="listLoading">
        <el-table-column label="" width="50" align="center">
          <template slot-scope="{row}">
          	<el-radio :label="row.purchaseOrderId" v-model="templateRadio" @change.native="getSelectRow(row.purchaseOrderId)">{{''}}</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="采购订单号" width="160">
          <template slot-scope="scope">
            <span class="primary-txt">{{ scope.row.purchaseOrderId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="采购员" width="180">
          <template slot-scope="{row}">
            <div v-if="row.purchaseUser">{{row.purchaseUser.realName}}</div>
          </template>
        </el-table-column>
        <el-table-column label="采购日期" sortable prop="purchaseDate" width="150"></el-table-column>
        <el-table-column label="到货日期" sortable prop="deliveryDate" width="150"></el-table-column>
        <el-table-column label="供应商" width="150">
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
             <div v-if="row.payStatus">{{row.payStatus.desc}}</div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="已付款" prop="paidAmount" width="100"></el-table-column> -->
      </el-table>
      <!-- component -->
      <pagination :total="page.total" :page.sync="page.page" :limit.sync="page.limit" @pagination="getList" />
    </div>
    <div style="text-align:right;">
      <el-button type="primary" @click="handleSubmit">
        {{ $t('btn.confirm') }}
      </el-button>
      <el-button type="default" @click="handleClose">
        {{ $t('btn.cancel') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getPurchaseOrderList } from '@/api/psi'
import { getSupplierList } from '@/api/device'

export default{
  components:{ Pagination },
  props:{
    visible: {
    	type: Boolean,
    	default: false
    },
    source:{
      type:String,
      default:''
    },
    detailInfo:{
      type:Object,
      default(){
        return {}
      }
    },
    editIndex:{
      type:Number,
      default:0
    }
  },
  data(){
    return {
     searchForm:{},
     page: {
       page: 1,
       limit: 10,
       sizes: [10, 20, 30, 100],
       total: 0
     },
     dataList:[],
     listLoading:false,
     stockStatusOptions:[
       {desc:'未入库',code:0},
       {desc:'已入库',code:1},
       // {desc:'未出库',code:2},
       // {desc:'已出库',code:3}
     ],
     supplierList:[],
     templateRadio:'',
     rowSelection:0
    }
  },
  methods:{
  	handleClose(){
  		this.$emit('update:visible',false);
  	},
    reset(){
      this.$refs["searchForm"].resetFields()
      this.page.page = 1
      this.page.limit = 10
      this.getList()
    },
    getList(){
      if(this.searchForm.purchaseOrderId){
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
        })
      }
    },
    handleSubmit(){
      this.$emit('listFresh',this.rowSelection)
      this.$emit('update:visible',false);
    },
    getSelectRow(id){//获取选中数据
			this.rowSelection = id;
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
    // this.getList()
    this.querySupplierList()
  }
}
</script>

<style lang="scss">
</style>
