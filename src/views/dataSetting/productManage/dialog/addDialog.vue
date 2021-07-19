<template>
  <el-dialog :visible.sync="visible" :title="getTitle" :before-close="handleClose" :close-on-click-modal="false" width="980px" top="10vh">
    <div class="dialog-scroll-wrap">
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="110px" class="addForm">
        <el-row>
          <el-col :span="12" v-if="source=='edit'">
            <el-form-item label="商品编号" prop="id">
              <el-input v-model="addForm.id" disabled placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-else>
            <el-form-item label="商品编号">
              <el-input disabled placeholder="系统自动生成" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="addForm.name" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="商品类别">
              <el-cascader
                v-model="categoryIds"
                :options="categoryList"
                clearable
                :show-all-levels="false"
                :props="{value:'id',label:'name',checkStrictly: true}">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计量单位">
              <el-select v-model="addForm.measureId" placeholder="请选择">
                <el-option
                  v-for="(item,index) in measureList"
                  :key="index"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="规格">
              <el-input v-model="addForm.specification" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="品牌">
              <el-input v-model="addForm.brand" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="供应商">
              <el-select v-model="addForm.supplierId" placeholder="请选择">
                <el-option
                  v-for="(item,index) in supplierList"
                  :key="index"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="来源">
              <el-radio-group v-model="addForm.source">
                <el-radio :label="0">自产</el-radio>
                <el-radio :label="1">外购</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="采购单价" prop="purchasePrice">
              <el-input v-model="addForm.purchasePrice" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品料号" prop="productNo">
              <el-input v-model="addForm.productNo" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="ERP料号">
              <el-input v-model.number="addForm.erpNo" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="ERP名称">
              <el-input v-model.number="addForm.erpName" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="库存预警下限">
              <el-input v-model.number="addForm.warningMinLimit" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="库存预警上限">
              <el-input v-model.number="addForm.warningMaxLimit" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="备注">
              <el-input type="textarea" v-model="addForm.remark" placeholder="请输入" maxlength="30" show-word-limit />
            </el-form-item>
          </el-col>
        </el-row>
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
  </el-dialog>
</template>

<script>
import { operateMixins } from '@/mixins'
import { validFloatNumber } from '@/utils/validate'
import { saveProduct, getMeasureList, getCategoryList } from '@/api/psi'
import { getSupplierList } from '@/api/device'
export default{
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
      if(this.source == 'add'){
        return this.$t('psi.addProduct')
      }else{
        return this.$t('psi.editProduct')
      }
    }
  },
  mixins: [operateMixins],
  data(){
    const validatePrice = (rule, value, callback) => {
      if(value){
        if (!validFloatNumber(value)) {
          callback(new Error(this.$t('validate.floatNumber')))
        } else {
          callback()
        }
      }else{
        callback()
      }
    }
    return {
      addForm:{
        source:0
      },
      rules:{
        id:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}],
        name:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}],
        purchasePrice:[
          { trigger: 'blur', validator: validatePrice}
        ],
        salePrice:[
          { trigger: 'blur', validator: validatePrice}
        ]
      },
      btnLoading:false,
      measureList:[],
      supplierList:[],
      categoryList:[],
      categoryIds:[]
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
          let param = {
            product:{...this.addForm}
          }

          if(this.categoryIds.length>0){
            let ln = this.categoryIds.length
            param.product.categoryId = this.categoryIds[ln-1]
          }

          saveProduct(param).then(res => {
            this.btnLoading = false
            if(res.code == '200'){
              this.$message.success(this.$t('validate.success'))
              this.$emit('update:visible',false)
              this.$emit('queryFresh')
            }
          }).catch(error => {
            this.btnLoading = false
          })
      	}
      })
    },
    queryMeasureList(){
      // 查询计量单位
      let param = {
        size:-1
      }
      getMeasureList(param).then(res => {
        if(res.code == '200'){
          this.measureList = res.data.records
        }
      })
    },
    querySupplierList(){
      // 查询供应商
      let param = {
        size:-1
      }
      getSupplierList(param).then(res => {
        if(res.code == '200'){
          this.supplierList = res.data
        }
      })
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
    },
  },
  created(){
    this.queryMeasureList()
    this.querySupplierList()
    this.queryCategoryList()
    if(this.source == 'edit'){
      this.addForm = JSON.parse(JSON.stringify(this.infoObj))
      if(this.addForm.category) {
        if(this.addForm.category.parentIds.length>1) {
          this.categoryIds = this.addForm.category.parentIds
        }else {
          this.categoryIds = [ this.addForm.category.id ]
        }
      }
      this.addForm.source = this.addForm.source.code
    }
  }
}
</script>

<style lang="scss">
.addForm{
  padding: 0;
}
</style>
