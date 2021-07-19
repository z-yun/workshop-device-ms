<template>
  <el-dialog :visible.sync="visible" :title="$t('permission.rejectReason')" :before-close="handleClose" :close-on-click-modal="false" width="540px">
    <el-form :model="rejectForm" :rules="rules">
      <el-form-item prop="remark">
        <el-input class="w100 my-textarea" type="textarea" v-model="rejectForm.remark" placeholder="请输入驳回原因"  maxlength="50" show-word-limit/>
      </el-form-item>
    </el-form>
    <div style="text-align:right;">
      <el-button type="primary" @click="handleSubmit('addForm')" :disabled="btnDisabled">
        {{ $t('permission.confirm') }}
      </el-button>
      <el-button type="default" @click="handleClose">
        {{ $t('permission.cancel') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { registerComReject } from '@/api/user'
export default{
  props:{
    visible: {
    	type: Boolean,
    	default: false
    },
    id:{
      type:Number,
      default:0
    }
  },
  data(){
    return {
      rejectForm:{},
      rules:{
        remark:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}]
      },
      btnDisabled:false
    }
  },
  methods:{
  	handleClose(){
  		this.$emit('update:visible',false);
  	},
    handleSubmit(form){
      // 驳回
      this.btnDisabled = true
      let param = {
        id:this.id,
        ...this.rejectForm
      }
      registerComReject(param).then(res => {
        this.btnDisabled = false
        if(res.code == '200'){
          this.$message.success(this.$t('validate.success'))
          this.$emit('update:visible',false)
          this.$emit('queryFresh')
        }
      }).catch(error => {
        this.btnDisabled = false
      })
    }
  }
}
</script>

<style lang="scss">
.my-textarea{
  .el-textarea__inner{
    height: 96px;
  }
}

</style>
