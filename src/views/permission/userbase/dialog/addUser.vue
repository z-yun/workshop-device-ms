<template>
  <el-dialog :visible.sync="visible" :title="getTitle" :before-close="handleClose" :close-on-click-modal="false" width="540px" top="10vh">
    <el-form :model="addForm" :rules="rules" ref="addForm" label-width="90px" class="addForm">
      <el-form-item label="用户名ID" v-if="!isAdd">
        <el-input v-model="addForm.id" disabled placeholder="请输入" />
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addForm.username" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="真实姓名" prop="realName">
        <el-input v-model="addForm.realName" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="用户组" prop="roleIds">
        <el-select v-model="addForm.roleIds" placeholder="请选择" multiple >
          <el-option v-for="(item,index) in rolesList" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="addForm.mobile" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addForm.email" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="企业微信ID">
        <el-input v-model="addForm.weworkId" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="手表ID">
        <el-input v-model="addForm.watchId" placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align:right;">
      <el-button type="primary" @click="handleSubmit('addForm')" :loading="btnLoading">
        {{ $t('permission.confirm') }}
      </el-button>
      <el-button type="default" @click="handleClose">
        {{ $t('permission.cancel') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getRoleList, addUser, viewUser, updateUser } from '@/api/user'
import { operateMixins } from '@/mixins';
import { validEmail, validPhone } from '@/utils/validate'

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
    userId:{
      type:Number,
      default:0
    }
  },
  mixins: [operateMixins],
  computed: {
    getTitle(){
      if(this.source == 'add'){
        return this.$t('permission.addUser')
      }else{
        return this.$t('permission.editUser')
      }
    }
  },
  data(){
    const validateMobile = (rule, value, callback) => {
      if (validPhone(value)) {
        callback()
      } else {
        callback(new Error(this.$t('validate.phone')))
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (validEmail(value)) {
        callback()
      } else {
        callback(new Error(this.$t('validate.email')))
      }
    }
    return {
      addForm:{},
      rules:{
        username:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}],
        realName:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}],
        roleIds: [{ required: true, trigger: 'blur',message:this.$t('validate.required') }],
        mobile: [{ required: true, trigger: 'blur', validator: validateMobile }],
        email:[{required: true, trigger: 'blur', validator: validateEmail}]
      },
      rolesList:[],
      btnLoading:false
    }
  },
  methods:{
  	handleClose(){
  		this.$emit('update:visible',false);
  	},
    handleSubmit(form){
      this.$refs[form].validate((valid, props) => {
      	if (valid) {
          let param = {
            ...this.addForm
          }
          let solveFun = addUser
          if(this.source == 'edit'){
            solveFun = updateUser
          }
          this.btnLoading = true
          solveFun(param).then(res => {
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
    getRoleLists(){
      // 获取用户组列表
      let param = {
        size:-1
      }
      getRoleList(param).then(res => {
        if(res.code == '200'){
          this.rolesList = res.data.records
        }
      }).catch(error => {
      })
    },
  },
  created(){
    this.getRoleLists()
    if(this.source == 'edit'){
      // 获取用户信息
      let userId = this.userId
      viewUser({userId}).then(res => {
        if(res.code == '200'){
          this.addForm = JSON.parse(JSON.stringify(res.data))
          // this.addForm.roleId = 4
        }
      }).catch(error => {
      })
    }
  }
}
</script>

<style lang="scss">
</style>
