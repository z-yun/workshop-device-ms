<template>
  <el-dialog :visible.sync="visible" :title="getTitle" :before-close="handleClose" :close-on-click-modal="false" width="960px" top="10vh">
    <div class="dialog-scroll-wrap">
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="120px" class="addForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="父件商品编号">
              <el-select v-if="source=='edit'" v-model="addForm.product" value-key="id" disabled>
                <el-option
                  v-for="(item,index) in productList"
                  :key="index"
                  :label="item.name"
                  :value="item"></el-option>
              </el-select>
              <el-select v-else v-model="addForm.product" value-key="id" placeholder="请选择" @change="handleChangeProduct">
                <el-option
                  v-for="(item,index) in productList"
                  :key="index"
                  :label="item.name"
                  :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="父件商品名称" prop="name">
              <el-input v-model="addForm.name" disabled placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="商品类别">
              <el-input v-if="addForm.category" v-model="addForm.category.name" disabled placeholder="请输入" />
              <el-input v-else disabled placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="父件规格">
              <el-input v-model="addForm.specification" disabled placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="父件计量单位">
              <el-input v-if="addForm.measure" v-model="addForm.measure.name" disabled placeholder="请输入" />
              <el-input v-else disabled placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注">
              <el-input v-model="addForm.remark" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <!-- 子件明细 -->
        <div class="detail">
          <h4 class="title">
            <span>{{$t('psi.childDetail')}}</span>
            <el-button type="primary" @click="handleAdd">
              {{ $t('psi.addProducts') }}
            </el-button>
          </h4>
          <el-table :data="products" class="mbt-24" border>
            <el-table-column label="序号">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column label="商品编号" prop="id"></el-table-column>
            <el-table-column label="商品名称" prop="name"></el-table-column>
            <el-table-column label="计量单位">
              <template slot-scope="{row}">
                <div v-if="row.measure">{{row.measure.name}}</div>
              </template>
            </el-table-column>
            <el-table-column label="规格" prop="specification" width="100"></el-table-column>
            <el-table-column label="供应商">
              <template slot-scope="{row}">
                <div v-if="row.supplier">{{ row.supplier.name }}</div>
              </template>
            </el-table-column>
            <el-table-column label="数量" width="120">
              <template slot-scope="{row}">
                <template v-if="row.edit">
                  <el-input class="tb-input" v-model.number="row.quantity" placeholder="请输入数量" />
                </template>
                <template v-else>{{ row.quantity }}</template>
              </template>
            </el-table-column>
            <el-table-column label="操作" min-width="120">
              <template slot-scope="scope">
                <template v-if="scope.row.edit">
                  <el-button type="text" size="small" @click="handleSave(scope)">
                    {{ $t('btn.save') }}
                  </el-button>
                </template>
                <template v-else>
                  <el-button type="text" size="small" @click="handleEdit(scope)">
                    {{ $t('btn.update') }}
                  </el-button>
                  <el-button type="text" class="danger-txt" size="small" @click="handleRemove(scope)">
                    {{ $t('btn.remove') }}
                  </el-button>
                </template>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form>
    </div>
    <div style="text-align:right;">
      <el-button type="primary" @click="handleSubmit('addForm')" :loading="btnLoading">
        {{ $t('btn.confirm') }}
      </el-button>
      <el-button type="default" @click="handleClose">
        {{ $t('btn.cancel') }}
      </el-button>
    </div>
    <!-- 选择商品 -->
    <selectGoods v-if="detailVisible" :visible.sync="detailVisible" @listFresh="confirmAdd" :excludeProductIds="excludeProductIds"></selectGoods>
  </el-dialog>
</template>

<script>
import { operateMixins } from '@/mixins';
import { saveProductBom, getProductList, viewProductBom } from '@/api/psi'
import { getAllComUser } from '@/api/user'
import selectGoods from './selectGoods'

export default{
  components:{ selectGoods },
  props:{
    visible: {
    	type: Boolean,
    	default: false
    },
    source:{
      type:String,
      default:''
    },
    infoObj:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  computed: {
    getTitle(){
      var locale = this.$i18n.locale;
      if(this.source == 'add'){
        return this.$i18n.messages[locale].psi.addBom;
      }else{
        return this.$i18n.messages[locale].psi.editBom;
      }
    }
  },
  mixins: [operateMixins],
  data(){
    return {
      addForm:{},
      rules:{
        name:[{ required: true, trigger: 'blur'}]
      },
      btnLoading:false,
      productList:[],
      detailVisible:false,
      products:[],
      id:0,
      excludeProductIds:[]
    }
  },
  methods:{
  	handleClose(){
  		this.$emit('update:visible',false)
  	},
    handleSubmit(form){
      this.$refs[form].validate((valid, props) => {
      	if (valid) {
          this.btnLoading = true
          let details = this.products.map(item=>{
            return {
              productDetailId:item.id,
              quantity:item.quantity
            }
          })
          let productBom = {
            productId: this.addForm.product.id,
            remark: this.addForm.remark,
            details
          }
          if(this.source == 'edit'){
            productBom.id = this.infoObj.id
          }
          // console.log(this.addForm)
          saveProductBom({productBom}).then(res => {
            this.btnLoading = false
            if(res.code == '200'){
              this.$message.success('success')
              this.$emit('update:visible',false)
              this.$emit('queryFresh')
            }
          }).catch(error => {
            this.btnLoading = false
          })
      	}
      })
    },
    handleChangeProduct(row){
      // 切换父件商品编码
      this.addForm.name = row.name
      this.addForm.specification = row.specification
      this.addForm.measure = row.measure
      this.addForm.category = row.category
    },
    handleAdd(){
      // 新增项
      this.detailVisible = true
      this.excludeProductIds = []
      this.products.forEach(item => {
      	this.excludeProductIds.push(item.id)
      })
    },
    handleEdit(scope){
      // 修改表格行
      scope.row.edit = true
    },
    handleSave(scope){
      // 保存表格行
      scope.row.edit = false
    },
    handleRemove(scope){
      // 删除表格行
      this.$confirm('是否确认删除？删除后不可撤回！')
      .then(_ => {
        this.products.splice(scope.$index,1)
      })
    },
    confirmAdd(goodslist){
      // 确认添加商品
      for(let i=0;i<goodslist.length;i++){
        let obj = {...goodslist[i]}
        obj.quantity = 0
        obj.edit = false
        this.products.push(obj)
      }
    },
    queryProductList(){
      // 查询本公司所有员工
      let param = {
        size: -1
      }
      getProductList(param).then(res => {
        if(res.code == '200'){
          this.productList = res.data.records
        }
      })
    },
    queryProductBom(){
      // 查询BOM订单详情
      let param = {
        bomId:this.infoObj.id
      }
      viewProductBom(param).then(res => {
        if(res.code == '200'){
          this.addForm = JSON.parse(JSON.stringify(res.data.product))
          this.addForm.remark = res.data.remark
          this.addForm.product = JSON.parse(JSON.stringify(res.data.product))
          let products = JSON.parse(JSON.stringify(res.data.details))
          for(let i=0;i<products.length;i++){
            let obj = {...products[i].productDetail}
            obj.quantity = products[i].quantity
            obj.edit = false
            this.products.push(obj)
          }
        }
      })
    },
  },
  created(){
    this.queryProductList()
    if (this.source == 'edit') {
      this.queryProductBom()
    }
  }
}
</script>

<style lang="scss" scoped>
.addForm{
  padding: 0;
}
.title{
  line-height: 60px;
  .el-button{
    margin-left: 16px;
  }
}
</style>
