<template>
  <div class="app-container">
    <el-form :inline="true" ref="searchForm" :model="searchForm" class="search-form app-container-box">
      <el-form-item prop="warehouseId">
        <el-select v-model="searchForm.warehouseId" placeholder="请选择仓库">
          <el-option
            v-for="(item,index) in warehouseList"
            :key="item.id"
            :label="item.name"
            :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="rtbtn">
        <el-button type="primary" @click="getList">{{ $t('search.query') }}</el-button>
        <el-button type="reset" @click="reset">{{ $t('search.reset') }}</el-button>
      </el-form-item>
    </el-form>

    <div class="app-container-box">
      <el-table :data="dataList" class="mbt-24" border v-loading="listLoading">
        <el-table-column label="序号">
          <template slot-scope="scope">
            <div>{{scope.$index+1}}</div>
          </template>
        </el-table-column>
        <el-table-column label="仓库名称" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <div v-if="row.warehouse">{{row.warehouse.name}}</div>
          </template>
        </el-table-column>
        <el-table-column label="库存数量" prop="quantity"></el-table-column>
        <el-table-column label="商品编号" width="100">
          <template slot-scope="{row}">
            <div v-if="row.product">{{row.product.id}}</div>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" width="140" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <div v-if="row.product">{{row.product.name}}</div>
          </template>
        </el-table-column>
        <el-table-column label="商品类别">
          <template slot-scope="{row}">
            <div v-if="row.product">
              <div v-if="row.product.category">{{row.product.category.name}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="计量单位">
          <template slot-scope="{row}">
            <div v-if="row.product">
              <div v-if="row.product.measure">{{row.product.measure.name}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="规格" width="100" prop="specification">
          <template slot-scope="{row}">
            <div v-if="row.product">{{row.product.specification}}</div>
          </template>
        </el-table-column>
        <el-table-column label="品牌">
          <template slot-scope="{row}">
            <div v-if="row.product">{{row.product.brand}}</div>
          </template>
        </el-table-column>
       <!-- <el-table-column label="采购单价" prop="purchasePrice" width="100">
          <template slot-scope="{row}">
            <div v-if="row.product">{{row.product.purchasePrice}}</div>
          </template>
        </el-table-column>
        <el-table-column label="销售单价" prop="salePrice" width="100">
          <template slot-scope="{row}">
            <div v-if="row.product">{{row.product.salePrice}}</div>
          </template>
        </el-table-column> -->
        <el-table-column label="备注" prop="remark"></el-table-column>
        <el-table-column label="供应商" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <div v-if="row.product">
              <div v-if="row.product.supplier">{{ row.product.supplier.name }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="来源">
          <template slot-scope="{row}">
            <div v-if="row.product">
              <div v-if="row.product.source">{{ row.product.source.desc }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="库存预警下限" prop="warningMinLimit" width="140">
          <template slot-scope="{row}">
            <div v-if="row.product">{{row.product.warningMinLimit}}</div>
          </template>
        </el-table-column>
        <el-table-column label="库存预警上限" prop="warningMaxLimit" width="140">
          <template slot-scope="{row}">
              <div v-if="row.product">{{row.product.warningMaxLimit}}</div>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <!-- component -->
      <pagination :total="page.total" :page.sync="page.page" :limit.sync="page.limit" @pagination="getList" />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { productStockList, getWarehouseList } from '@/api/psi'

export default {
  name:'stockinfo',
  components: { Pagination },
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
      warehouseList:[]
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
      productStockList(param).then(res => {
        this.listLoading = false
        if(res.code == '200'){
          this.dataList = res.data.records
          this.page.total = res.data.total
        }
      }).catch(error => {
        this.listLoading = false
      })
    },
    queryWarehouseList(){
      // 查询仓库列表
      let param = {
        size:-1
      }
      getWarehouseList(param).then(res => {
        if(res.code == '200'){
          this.warehouseList = res.data.records
        }
      })
    }
  },
  created(){
    this.queryWarehouseList()
    this.getList()
  }
}
</script>

<style>
</style>
