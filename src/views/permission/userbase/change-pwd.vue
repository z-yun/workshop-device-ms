<template>
  <el-form :model="addForm" ref="addForm" :rules="rules" label-width="100px" class="changeForm">
    <el-form-item label="原密码" prop="oldPassword">
      <el-input v-model="addForm.oldPassword" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input v-model="addForm.newPassword" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="确认新密码" prop="confirmPwd">
      <el-input v-model="addForm.confirmPwd" placeholder="请输入" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit('addForm')" :loading="btnLoading">
        {{ $t('permission.confirmChage') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updatePassword } from '@/api/user'
export default{
  name:'changePwd',
  data(){
    const validatePassword = (rule, value, callback) => {
      if(value){
        if (value.length < 6) {
          callback(new Error(this.$t('validate.password')))
        } else {
          callback()
        }
      }else{
        callback(new Error(this.$t('validate.required')))
      }
    }
    const validateConfirmPwd = (rule, value, callback) => {
      if (value!==this.addForm.newPassword) {
        callback(new Error(this.$t('validate.confirmPwd')))
      } else {
        callback()
      }
    }
    return {
      addForm:{},
      rules:{
        oldPassword:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}],
        newPassword: [{ required: true, trigger: 'blur', validator: validatePassword }],
        confirmPwd: [{ required: true, trigger: 'blur', validator: validateConfirmPwd }]
      },
      btnLoading:false
    }
  },
  methods:{
    handleSubmit(form){
      this.$refs[form].validate(valid => {
        if (valid) {
          let param = {...this.addForm}
          this.btnLoading = true
          updatePassword(param).then((res) => {
            this.btnLoading = false
            if(res.code == '200'){
              this.$message.success(this.$t('validate.success'));
              setTimeout(()=>{
                this.$router.push({ path: '/'})
              })
            }
          }).catch(() => {
            this.btnLoading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.changeForm{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  .el-button{
    width: 300px;
  }
}
</style>
