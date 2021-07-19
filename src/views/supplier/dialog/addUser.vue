<template>
  <el-dialog :visible.sync="visible" :title="getTitle" :before-close="handleClose" :close-on-click-modal="false" width="540px" append-to-body>
    <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="addForm">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="addForm.username" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="电话" prop="mobile">
        <el-input v-model="addForm.mobile" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="人员类型">
        <el-select v-model="addForm.type" placeholder="请选择" value-key="code">
          <el-option label="工程人员" value="工程人员"></el-option>
          <el-option label="研发人员" value="研发人员"></el-option>
          <el-option label="销售人员" value="销售人员"></el-option>
          <el-option label="仓库人员" value="仓库人员"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addForm.email" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="职称" prop="jobTitle">
        <el-input v-model="addForm.jobTitle" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="部门" prop="department">
        <el-input v-model="addForm.department" placeholder="请输入"/>
      </el-form-item>
    </el-form>
    <div style="text-align:right;">
      <el-button type="primary" @click="handleSubmit('addForm')">
        {{ $t('permission.confirm') }}
      </el-button>
      <el-button type="default" @click="handleClose">
        {{ $t('permission.cancel') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { operateMixins } from '@/mixins'
import { validEmail,validPhone,validTel } from '@/utils/validate'

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
  mixins: [operateMixins],
  computed: {
    getTitle(){
      if(this.source == 'add'){
        return this.$t('supplier.addUser')
      }else{
        return this.$t('supplier.editUser')
      }
    }
  },
  data(){
    const validateMobile = (rule, value, callback) => {
      if(value){
        if (validPhone(value)||validTel(value)) {
          callback()
        } else {
          callback(new Error(this.$t('validate.telNumber')))
        }
      }else{
        callback(new Error(this.$t('validate.required')))
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
      },
      rules:{
        username:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}],
        mobile: [{ required: true, trigger: 'blur', validator:validateMobile }],
        email: [{ trigger: 'blur', validator:validateEmail }],
      },
    }
  },
  methods:{
  	handleClose(){
  		this.$emit('update:visible',false);
  	},
    handleSubmit(form){
      this.$refs[form].validate((valid, props) => {
      	if (valid) {
          this.$emit('update:visible',false)
          if(this.source == 'add'){
            this.$emit('listFresh',this.addForm)
          }else{
            this.$emit('listFresh',this.addForm,this.editIndex)
          }
      	}
      })
    },
  },
  created(){
    if(this.source == 'edit'){
      // 获取信息
      this.addForm = JSON.parse(JSON.stringify(this.detailInfo))
    }
  }
}
</script>

<style lang="scss">
</style>
