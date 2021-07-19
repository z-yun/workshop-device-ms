<template>
  <el-dialog :visible.sync="visible" :title="getTitle" :before-close="handleClose" :close-on-click-modal="false" width="960px" top="10vh">
    <div class="dialog-scroll-wrap">
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="addForm supplier">
        <!-- <div class="title mbt-10">基本信息 </div> -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="类型" prop="type">
              <el-select v-model="addForm.type" placeholder="请选择">
                <el-option label="供应商" :value="1"></el-option>
                <el-option label="客户" :value="0"></el-option>
                <el-option label="供应商和客户" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名称" prop="name">
              <el-input v-model="addForm.name" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="代码" prop="vendorCode">
              <el-input v-model="addForm.vendorCode" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人">
              <el-input v-model="addForm.contactUser" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="电话" prop="contactPhone">
              <el-input v-model="addForm.contactPhone" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="addForm.email" placeholder="请输入" />
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="地址">
              <el-input v-model="addForm.address" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注">
              <el-input type="textarea" v-model="addForm.description" maxlength="30" show-word-limit></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="title">{{ $t('supplier.voteInfo') }} </div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="单位名称">
              <el-input v-model="addForm.invoiceCompanyName" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="税号">
              <el-input v-model="addForm.invoiceTaxNumber" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="地址">
              <el-input v-model="addForm.invoiceAddress" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话" prop="invoiceTelephone">
              <el-input v-model="addForm.invoiceTelephone" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="银行开户行">
              <el-input v-model="addForm.invoiceBankName" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="银行账号">
              <el-input v-model="addForm.invoiceBankNo" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="交易条件">
              <el-select v-model="addForm.transactionTerms" placeholder="请选择" value-key="code">
                <el-option label="CIF" value="CIF"></el-option>
                <el-option label="DDU" value="DDU"></el-option>
                <el-option label="DDP" value="DDP"></el-option>
                <el-option label="FOB" value="FOB"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="付款条件">
              <el-input v-model="addForm.paymentTerms" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="title">
          <span>{{ $t('supplier.userInfo') }}</span>
          <el-button type="primary" @click="handleAdd('addForm')">
            {{ $t('supplier.addUser') }}
          </el-button>
        </div>
        <el-table :data="addForm.supplierMembers" class="mbt-24" border>
          <el-table-column label="姓名" prop="username" width="80"></el-table-column>
          <el-table-column label="电话" prop="mobile" width="130"></el-table-column>
          <el-table-column label="邮箱" prop="email" width="130" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="职称" prop="jobTitle"></el-table-column>
          <el-table-column label="部门" prop="department"></el-table-column>
          <el-table-column label="人员类型" prop="type"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope)">
                {{ $t('btn.update') }}
              </el-button>
              <el-button type="text" class="danger-txt" size="small" @click="handleRemove(scope)">
                {{ $t('btn.remove') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </div>
    <div style="text-align:right;">
      <el-button type="primary" @click="handleSubmit('addForm')" :loading="btnLoading">
        {{ $t('permission.confirm') }}
      </el-button>
      <el-button type="default" @click="handleClose">
        {{ $t('permission.cancel') }}
      </el-button>
    </div>
    <!-- 新增、修改人员 -->
    <addUser v-if="addVisible" :source="addSource" :visible.sync="addVisible" :detailInfo="detailInfo" :editIndex="editIndex" @listFresh="confirmAdd"></addUser>
  </el-dialog>
</template>

<script>
import { operateMixins } from '@/mixins'
import { validEmail,validPhone,validTel } from '@/utils/validate'
import { saveSupplier } from '@/api/device'
import addUser from './addUser'

export default{
  components: { addUser },
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
        return this.$t('supplier.add')
      }else{
        return this.$t('supplier.edit')
      }
    }
  },
  mixins: [operateMixins],
  data(){
    const validateMobile = (rule, value, callback) => {
      if(value){
        if (validPhone(value)||validTel(value)) {
          callback()
        } else {
          callback(new Error(this.$t('validate.telNumber')))
        }
      }else{
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (value) {
        if(validEmail(value)){
          callback()
        }else{
          callback(new Error(this.$t('validate.email')))
        }
      } else {
        callback()
      }
    }
    return {
      addForm:{
        supplierMembers:[]
      },
      rules:{
        name:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}],
        type:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}],
        vendorCode:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}],
        contactPhone:[{ trigger: 'blur', validator:validateMobile }],
        email: [{ trigger: 'blur', validator:validateEmail }],
        invoiceTelephone:[{ trigger: 'blur', validator:validateMobile }],
      },
      btnLoading:false,
      addVisible:false,
      detailInfo:{},
      editIndex:0,
      addSource:'add'
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
          let supplier = { ...this.addForm }
          saveSupplier({supplier}).then(res => {
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
    confirmAdd(obj,index){
      // 新增、修改维护项保存
      if(isNaN(index)){
        this.addForm.supplierMembers.push(obj)
      }else{
        this.$set(this.addForm.supplierMembers,index,obj)
      }
    },
    handleAdd(){
      // 新增维护项
      this.addVisible = true
      this.addSource = 'add'
    },
    handleEdit(scope){
      // 修改表格行
      this.addVisible = true
      this.addSource = 'edit'
      this.detailInfo = scope.row
      this.editIndex = scope.$index
    },
    handleRemove(scope){
      // 删除表格行
      this.$confirm('是否确认删除？删除后不可撤回！')
      .then(_ => {
        this.addForm.supplierMembers.splice(scope.$index,1)
      })
    }
  },
  created(){
    if(this.source == 'edit'){
      this.addForm = JSON.parse(JSON.stringify(this.infoObj))
      if(this.addForm.type){
        this.addForm.type = this.addForm.type.code
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.supplier{
  .title{
    margin-bottom: 20px;
    .el-button{
      margin-left: 16px;
    }
  }
}
</style>
