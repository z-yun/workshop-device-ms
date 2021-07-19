<template>
  <el-dialog :visible.sync="visible" :title="getTitle" :before-close="handleClose" :close-on-click-modal="false" width="540px">
    <el-form :model="addForm" :rules="rules" ref="addForm" label-width="110px" class="addForm">
      <el-form-item label="控制器名称" prop="name">
        <el-input v-model="addForm.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="控制器IP" prop="ip">
        <el-input v-model="addForm.ip" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="(com3)三色灯">
        <el-select v-model="addForm.lightId" placeholder="请选择">
          <el-option
            v-for="(item,index) in lightList"
            :key="index"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="(com4)轨道">
        <el-select v-model="addForm.railId" placeholder="请选择">
          <el-option
            v-for="(item,index) in railList"
            :key="index"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="硬件编码">
        <el-input v-model="addForm.ioFunction" placeholder="请输入"></el-input>
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
import { saveIo, getLightList, getRailList } from '@/api/factory'
import { validIp } from '@/utils/validate'

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
        return this.$t('factory.addIo')
      }else{
        return this.$t('factory.editIo')
      }
    }
  },
  mixins: [operateMixins],
  data(){
    const validateIp = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('validate.required')))
      } else {
        if (!validIp(value)) {
          callback(new Error(this.$t('validate.ip')))
        } else {
          callback()
        }
      }
    }
    return {
      addForm:{},
      rules:{
        name:[{ required: true, trigger: 'blur', message: this.$t('validate.required')}],
        ip:[{ required: true, trigger: 'blur', validator: validateIp}]
      },
      btnLoading:false,
      lightList:[],
      railList:[]
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
          let ioConfig = { ...this.addForm }
          saveIo({ioConfig}).then(res => {
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
    queryLightList(){
      // 查询三色灯
      let param = {
        size:-1
      }
      getLightList(param).then(res => {
        if(res.code == '200'){
          this.lightList = res.data.records
        }
      })
    },
    queryRailList(){
      // 查询轨道
      let param = {
        size:-1
      }
      getRailList(param).then(res => {
        if(res.code == '200'){
          this.railList = res.data.records
        }
      })
    }
  },
  created(){
    this.queryLightList()
    this.queryRailList()
    if(this.source == 'edit'){
      this.addForm = JSON.parse(JSON.stringify(this.infoObj))
      if(this.addForm.light){
        delete this.addForm.light
      }
      if(this.addForm.rail){
        delete this.addForm.rail
      }
    }
  }
}
</script>

<style lang="scss">
</style>
