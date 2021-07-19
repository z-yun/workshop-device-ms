<template>
  <el-dialog :visible.sync="visible" :title="getTitle" :before-close="handleClose" :close-on-click-modal="false" width="540px">
    <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="addForm">
      <el-form-item label="线别" prop="lineId">
        <el-select v-model="addForm.lineId" placeholder="请选择">
          <el-option
            v-for="(item,index) in lineList"
            :key="index"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="轨道名称" prop="name">
        <el-input v-model="addForm.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="addForm.description" maxlength="30" show-word-limit></el-input>
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
import { saveRail, getLineList } from '@/api/factory'
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
        return this.$t('factory.addRail')
      }else{
        return this.$t('factory.editRail')
      }
    }
  },
  mixins: [operateMixins],
  data(){
    return {
      addForm:{},
      rules:{
        name:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}],
        lineId:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}]
      },
      btnLoading:false,
      lineList:[]
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
          let rail = { ...this.addForm }
          saveRail({rail}).then(res => {
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
    queryLineList(){
      // 查询线别
      let param = {
        size:-1
      }
      getLineList(param).then(res => {
        if(res.code == '200'){
          this.lineList = res.data.records
        }
      })
    }
  },
  created(){
    this.queryLineList()
    if(this.source == 'edit'){
      this.addForm = JSON.parse(JSON.stringify(this.infoObj))
    }
  }
}
</script>

<style lang="scss">
</style>
