<template>
  <el-dialog :visible.sync="visible" :title="getTitle" :before-close="handleClose" :close-on-click-modal="false" width="540px">
    <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="addForm">
      <el-form-item v-if="source=='edit'" label="仓库编号" prop="id">
        <el-input v-model="addForm.id" placeholder="请输入" disabled />
      </el-form-item>
      <el-form-item label="仓库名称" prop="name">
        <el-input v-model="addForm.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="仓库负责人" prop="principalId">
        <el-select v-model="addForm.principalId" placeholder="请选择">
          <el-option
            v-for="(item,index) in userList"
            :key="index"
            :label="item.realName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="仓库地址">
        <el-input v-model="addForm.address" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="默认仓库">
        <el-radio-group v-model="addForm.isDefault">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
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
import { operateMixins } from '@/mixins';
import { saveWarehouse } from '@/api/psi'
import { getAllComUser } from '@/api/user'
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
        return this.$t('psi.addWarehouse')
      }else{
        return this.$t('psi.editWarehouse')
      }
    }
  },
  mixins: [operateMixins],
  data(){
    return {
      addForm:{
        isDefault:0
      },
      rules:{
        id:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}],
        name:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}]
      },
      btnLoading:false,
      userList:[]
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
          let warehouse = { ...this.addForm }
          saveWarehouse({warehouse}).then(res => {
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
    queryAllUser(){
      // 查询本公司所有员工
      getAllComUser({}).then(res => {
        if(res.code == '200'){
          this.userList = res.data
        }
      })
    },
  },
  created(){
    this.queryAllUser()
    if(this.source == 'edit'){
      this.addForm = JSON.parse(JSON.stringify(this.infoObj))
    }
  }
}
</script>

<style lang="scss">
</style>
