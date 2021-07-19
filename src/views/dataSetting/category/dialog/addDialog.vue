<template>
  <el-dialog :visible.sync="visible" :title="getTitle" :before-close="handleClose" :close-on-click-modal="false" width="540px">
    <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="addForm">
      <el-form-item label="类别名称" prop="name">
        <el-input v-model="addForm.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="上级类别" prop="parentIds">
        <el-cascader
          v-model="addForm.parentIds"
          :options="dataList"
          :show-all-levels="false"
          :props="{value:'id',label:'name',checkStrictly: true}">
        </el-cascader>
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
import { saveCategory, getCategoryList } from '@/api/psi'
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
        return this.$t('psi.addCategory')
      }else{
        return this.$t('psi.editCategory')
      }
    }
  },
  mixins: [operateMixins],
  data(){
    return {
      addForm:{},
      rules:{
        name:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}],
        parentIds:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}]
      },
      btnLoading:false,
      dataList:[]
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
          let category = { ...this.addForm }
          if(category.parentIds.length>0){
            let ln = category.parentIds.length
            category.parentId = category.parentIds[ln-1]
          }
          // console.log(category)
          saveCategory({category}).then(res => {
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
    getList(){
      let param = {
        size:-1
      }
      getCategoryList(param).then(res => {
        if(res.code == '200'){
          this.dataList = res.data
          this.dataList.push({
            id: 0,
            name:'根类别'
          })
        }
      })
    }
  },
  created(){
    this.getList()
    if(this.source == 'edit'){
      this.addForm = JSON.parse(JSON.stringify(this.infoObj))
      if(this.addForm.parentIds.length ==0 ){
        this.addForm.parentIds = [0]
      }
    }
  }
}
</script>

<style lang="scss">
</style>
