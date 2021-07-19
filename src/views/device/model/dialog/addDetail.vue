<template>
  <el-dialog :visible.sync="visible" :title="getTitle" :before-close="handleClose" :close-on-click-modal="false" width="540px" append-to-body>
    <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="addForm">
      <el-form-item label="维护项名称" prop="name">
        <el-input v-model="addForm.name" placeholder="维护项名称"/>
      </el-form-item>
      <el-form-item label="维护代码" prop="code">
        <el-input v-model="addForm.code" placeholder="维护代码"/>
      </el-form-item>
      <el-form-item label="确认方式" prop="confirmType">
        <el-select v-model="addForm.confirmType" placeholder="请选择" value-key="code">
          <el-option
            v-for="(item,index) in confirmTypes"
            :key="index"
            :label="item.desc"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="周期" prop="cycle">
        <el-input v-model.number="addForm.cycle" placeholder="周期"/>
      </el-form-item>
      <el-form-item label="周期单位" prop="cycleUnit">
        <el-select v-model="addForm.cycleUnit" placeholder="请选择" value-key="code">
          <el-option
            v-for="(item,index) in cycleUnits"
            :key="index"
            :label="item.desc"
            :value="item">
          </el-option>
        </el-select>
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
import { modelComfirmType, modelCycleUnit } from '@/api/device'
import { operateMixins } from '@/mixins'

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
        return this.$t('device.addMaintain')
      }else{
        return this.$t('device.updateMaintain')
      }
    }
  },
  data(){
    return {
      addForm:{
      },
      rules:{
        name:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}],
        code: [{ required: true, trigger: 'blur', message:this.$t('validate.required') }],
        confirmType: [{ required: true, trigger: 'blur', message:this.$t('validate.required') }],
        cycle: [{ required: true, trigger: 'blur', message:this.$t('validate.required') }],
        cycleUnit: [{ required: true, trigger: 'blur', message:this.$t('validate.required') }],
      },
      confirmTypes:[],
      cycleUnits:[]
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
    queryComfirmType(){
      // 确认方式
      modelComfirmType().then(res => {
        if(res.code == '200'){
          if(res.data){
            this.confirmTypes = res.data
          }
        }
      })
    },
    queryCycleUnit(){
      // 周期单位
      modelCycleUnit().then(res => {
        if(res.code == '200'){
          if(res.data){
            this.cycleUnits = res.data
          }
        }
      })
    }
  },
  created(){
    this.queryComfirmType()
    this.queryCycleUnit()
    if(this.source == 'edit'){
      // 获取用户信息
      this.addForm = JSON.parse(JSON.stringify(this.detailInfo))
    }
  }
}
</script>

<style lang="scss">
</style>
