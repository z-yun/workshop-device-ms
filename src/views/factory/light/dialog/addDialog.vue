<template>
  <el-dialog :visible.sync="visible" :title="getTitle" :before-close="handleClose" :close-on-click-modal="false" width="540px">
    <div class="dialog-scroll-wrap">
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
        <el-form-item label="三色灯名称" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="addForm.description" maxlength="30" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-select v-model="addForm.isShow" placeholder="请选择">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="不启用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机台类型">
          <el-select v-model="addForm.type" placeholder="请选择">
            <el-option
              v-for="(item,index) in lineTypes"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关联机台ID">
          <el-input v-model.number="addForm.relatedId" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="顺序">
          <el-input v-model.numer="addForm.weight" type="number" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="设备编号">
          <el-select v-model="addForm.deviceNo" placeholder="请选择">
            <el-option
              v-for="(item,index) in deviceList"
              :key="index"
              :label="item.no"
              :value="item.no">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
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
import { saveLight, getLineList, getLightType } from '@/api/factory'
import { getDeviceList } from '@/api/device'

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
        return this.$t('factory.addLight')
      }else{
        return this.$t('factory.editLight')
      }
    }
  },
  mixins: [operateMixins],
  data(){
    return {
      addForm:{
        isShow: 1
      },
      rules:{
        lineId: [{ required: true, trigger: 'blur', message:this.$t('validate.required')}],
        name: [{ required: true, trigger: 'blur', message:this.$t('validate.required')}],
      },
      btnLoading: false,
      lineList: [],
      lineTypes: [],
      deviceList: []
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
          let param = { ...this.addForm }
          param.order = Number(param.order)
          param.relatedId = Number(param.relatedId)
          param.colorLimit = 0
          param.collectInterval = 10
          if(this.source == 'edit'){
            delete param.deleted
            if(param.isShow){
              param.isShow = param.isShow.code
            }
          }
          saveLight(param).then(res => {
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
    },
    queryLineType(){
      // 查询三色灯类型
      getLightType().then(res => {
        if(res.code == '200'){
          this.lineTypes = res.data
        }
      })
    },
    queryDevice(){
      // 查询设备
      let param = {
        size:-1
      }
      getDeviceList(param).then(res => {
        if(res.code == '200'){
          this.deviceList = res.data.records
        }
      })
    }
  },
  created(){
    this.queryLineList()
    this.queryLineType()
    this.queryDevice()
    if(this.source == 'edit'){
      this.addForm = JSON.parse(JSON.stringify(this.infoObj))
    }
  }
}
</script>

<style lang="scss">
</style>
