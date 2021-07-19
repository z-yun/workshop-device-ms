<template>
  <el-dialog :visible.sync="visible" :title="$t('psi.selectGoods')" :before-close="handleClose" :close-on-click-modal="false" width="960px" append-to-body top="10vh">
    <div class="dialog-scroll-wrap">
      <el-form :inline="true" ref="searchForm" :model="searchForm" class="search-form app-container-box">
        <el-form-item prop="categoryIds">
          <el-cascader
            v-model="categoryIds"
            :options="categoryList"
            clearable
            :show-all-levels="false"
            :props="{value:'id',label:'name',checkStrictly: true}"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item prop="id">
          <el-input v-model="searchForm.id" placeholder="请输入商品编号" />
        </el-form-item>
        <el-form-item prop="name">
          <el-input v-model="searchForm.name" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item class="rtbtn">
          <el-button type="primary" @click="getList">{{ $t('search.query') }}</el-button>
          <el-button type="reset" @click="reset">{{ $t('search.reset') }}</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="dataList" class="mbt-24" border v-loading="listLoading" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" align="center" fixed="left"></el-table-column>
        <el-table-column label="商品编号" width="100" fixed="left">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="name" width="140"></el-table-column>
        <el-table-column label="商品类别">
          <template slot-scope="{row}">
            <div v-if="row.category">{{row.category.name}}</div>
          </template>
        </el-table-column>
        <el-table-column label="计量单位">
          <template slot-scope="{row}">
            <div v-if="row.measure">{{row.measure.name}}</div>
          </template>
        </el-table-column>
        <el-table-column label="规格" prop="specification" width="100"></el-table-column>
        <el-table-column label="品牌" prop="brand"></el-table-column>
        <el-table-column label="采购单价" prop="purchasePrice" width="100"></el-table-column>
        <el-table-column label="销售单价" prop="salePrice" width="100"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        <el-table-column label="库存数量" prop="stockQuantity"></el-table-column>
        <el-table-column label="供应商">
          <template slot-scope="{row}">
            <div v-if="row.supplier">{{ row.supplier.name }}</div>
          </template>
        </el-table-column>
        <el-table-column label="来源">
          <template slot-scope="{row}">
            <div v-if="row.source">{{ row.source.desc }}</div>
          </template>
        </el-table-column>
        <el-table-column label="库存预警下限" prop="warningMinLimit" width="140"></el-table-column>
        <el-table-column label="库存预警上限" prop="warningMaxLimit" width="140"></el-table-column>
      </el-table>
      <!-- component -->
      <pagination :total="page.total" :page.sync="page.page" :limit.sync="page.limit" @pagination="getList" />
    </div>
    <div style="text-align:right;">
      <el-button type="primary" @click="handleSubmit(true)">
        {{ $t('btn.save') }}
      </el-button>
      <el-button type="default" @click="handleSubmit(false)">
        {{ $t('btn.saveAndAdd') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getProductList, getCategoryList } from '@/api/psi'

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
    },
    excludeProductIds: {
      type: Array,
      default(){
        return []
      }
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
     categoryList:[],
     categoryIds:[],
     multipleSelection:[]
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
    handleChange(val){
      //切换选择商品类别
      if(this.categoryIds.length>0){
        let ln = this.categoryIds.length
        this.searchForm.categoryId = this.categoryIds[ln-1]
      }
    },
    getList(){
      let param = {
        current:this.page.page,
        size:this.page.limit,
        ...this.searchForm,
        excludeProductIds:this.excludeProductIds
      }
      this.listLoading = true
      getProductList(param).then(res => {
        this.listLoading = false
        if(res.code == '200'){
          this.dataList = res.data.records
          this.page.total = res.data.total
        }
      }).catch(error => {
        this.listLoading = false
      })
    },
    handleSubmit(isClose){
      if(this.multipleSelection.length>0){
        this.$message.success(this.$t('validate.success'))
        this.$emit('listFresh',this.multipleSelection)
        if(isClose){
          this.$emit('update:visible',false);
        }
      }else{
        this.$message.warning(this.$t('validate.atleastOne'))
      }
    },
    handleSelectionChange(val){
      this.multipleSelection = val
    },
    queryCategoryList(){
      // 查询商品类别
      let param = {
        size:-1
      }
      getCategoryList(param).then(res => {
        if(res.code == '200'){
          this.categoryList = res.data
        }
      })
    }
  },
  created(){
    this.getList()
    this.queryCategoryList()
  }
}
</script>

<style lang="scss">
</style>
