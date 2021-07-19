<template>
  <el-dialog :visible.sync="visible" :title="getTitle" :before-close="handleClose" :close-on-click-modal="false" width="960px" top="10vh">
    <div class="dialog-scroll-wrap">
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="130px" class="addForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="设备号" prop="no">
              <el-input v-model="addForm.no" placeholder="请输入设备号搜索" @change="viewDeviceByNo" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备名称" prop="deviceName">
              <el-input v-model="addForm.deviceName" disabled placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="日保养">
              <el-checkbox v-model="addForm.dayShift">白班</el-checkbox>
              <el-checkbox v-model="addForm.nightShift">夜班</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开始日期(日保养)">
              <el-date-picker v-model="addForm.dayStartDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开始日期(周保养)">
              <el-date-picker v-model="addForm.weekStartDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开始日期(月保养)">
              <el-date-picker v-model="addForm.monthStartDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开始日期(季保养)">
              <el-date-picker v-model="addForm.seasonStartDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开始日期(年保养)">
              <el-date-picker v-model="addForm.yearStartDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="addForm.description" maxlength="30" show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>
      <div class="maintain-detail">
        <div class="title">
          <span>{{$t('device.maintainDetail')}}</span>
          <el-button type="primary" @click="handleAdd('addForm')">
            {{ $t('device.addMaintain') }}
          </el-button>
          <el-button type="primary" @click="handleApplyModel('addForm')">
            {{ $t('device.applyModel') }}
          </el-button>
        </div>
        <el-table :data="addForm.details" class="mbt-24" border>
          <el-table-column label="维护项">
            <template slot-scope="{row}">
              {{ row.maintainItemName }}
            </template>
          </el-table-column>
          <el-table-column label="维护类型">
            <template slot-scope="{row}">
              <div v-if="row.maintainTypeVo">{{ row.maintainTypeVo.name }}</div>
            </template>
          </el-table-column>
          <el-table-column label="维护代码" prop="code"></el-table-column>
          <el-table-column label="确认方式">
            <template slot-scope="{row}">
              <div v-if="row.confirmType">{{ row.confirmType.desc }}</div>
            </template>
          </el-table-column>
          <el-table-column label="周期" prop="cycle"></el-table-column>
          <el-table-column label="周期单位">
            <template slot-scope="{row}">
              <div v-if="row.cycleUnit">{{ row.cycleUnit.desc }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope)">
                {{ $t('btn.update') }}
              </el-button>
              <el-button type="text" class="danger-txt" size="small" @click="handleRemove(scope)">
                {{ $t('btn.remove') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div style="text-align:right;">
      <el-button type="primary" @click="handleSubmit('addForm')" :loading="btnLoading">
        {{ $t('btn.confirm') }}
      </el-button>
      <el-button type="default" @click="handleClose">
        {{ $t('btn.cancel') }}
      </el-button>
    </div>
    <!-- 新增、修改维护明细 -->
    <addDetail v-if="detailVisible" :source="detailSource" :visible.sync="detailVisible" :detailInfo="detailInfo" :editIndex="editIndex" @listFresh="confirmAdd"></addDetail>
    <!-- 套用模型 -->
    <mainModel v-if="modelVisible" :visible.sync="modelVisible" @listFresh="confirmApply"></mainModel>
  </el-dialog>
</template>

<script>
import { operateMixins } from '@/mixins'
import { addMaintainPlan, updateMaintainPlan, viewDevice, viewMaintainPlan, viewMaintainModel } from '@/api/device'
import mainModel from './mainModel'
import addDetail from './addDetail'

export default{
  components: { mainModel, addDetail },
  props:{
    visible: {
    	type: Boolean,
    	default: false
    },
    source:{
      type:String,
      default:''
    },
    id:{
      type:Number,
      default:0
    }
  },
  computed: {
    getTitle(){
      if(this.source == 'add'){
        return this.$t('device.addPlan')
      }else{
        return this.$t('device.updatePlan')
      }
    }
  },
  mixins: [operateMixins],
  data(){
    return {
      addForm:{
        // device:{},
        details:[]
      },
      rules:{
        no:[{ required: true, trigger: 'blur'}],
        deviceName:[{ required: true, trigger: 'blur'}]
      },
      detailVisible:false,
      modelVisible:false,
      detailInfo:{},
      editIndex:0,
      btnLoading:false
    }
  },
  methods:{
  	handleClose(){
  		this.$emit('update:visible',false)
  	},
    handleSubmit(form){
      // 保存
      this.$refs[form].validate((valid, props) => {
      	if (valid) {
          let param = {
            maintainPlan:JSON.parse(JSON.stringify(this.addForm))
          }
          //枚举类型只传值
          delete param.maintainPlan.device
          param.maintainPlan.details.forEach((item)=>{
            if(item.confirmType){
              item.confirmType = item.confirmType.code
            }
            if(item.cycleUnit){
              item.cycleUnit = item.cycleUnit.code
            }
            if(item.maintainTypeVo){
              item.maintainTypeVo = undefined
            }
          })

          this.btnLoading = true
          let solveFun = addMaintainPlan
          if(this.source == 'edit'){
            if(param.maintainPlan.deleted){
              delete param.maintainPlan.deleted
            }
            delete param.maintainPlan.no
            delete param.maintainPlan.deviceName
            solveFun = updateMaintainPlan
          }
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
    viewDeviceByNo(){
      // 根据设备号查询设备名称
      let param = {
        deviceNo:this.addForm.no
      }
      viewDevice(param).then(res => {
        if(res.code == '200'){
          if(res.data){
            // this.addForm.device = res.data
            this.addForm.deviceId = res.data.id
            this.$set(this.addForm,'deviceName',res.data.name)
          }else{
            this.$message.error('设备不存在！')
            // this.addForm.device = {}
            this.addForm.deviceId = undefined
            this.$set(this.addForm,'deviceName','')
          }
        }
      })
    },
    handleApplyModel(){
      // 套用模型按钮
      this.modelVisible = true
    },
    confirmApply(maintainModelId){
      /**确认套用模型
      * items是数组根据items生成明细表格行
      */
      viewMaintainModel({maintainModelId}).then(res => {
        if(res.code == '200'){
          if(res.data){
            if(res.data.items&&res.data.items.length>0){
              res.data.items.forEach(item=>{
                item.maintainItemName = item.name
                item.maintainTypeVo = res.data.maintainTypeVo
                item.maintainType = res.data.maintainType
                this.addForm.details.push(item)
              })
            }else{
              this.$message.info('模型中没有维护项')
            }
          }
        }
      })
    },
    confirmAdd(obj,index){
      // 新增、修改维护项保存
      if(isNaN(index)){
        this.addForm.details.push(obj)
      }else{
        this.$set(this.addForm.details,index,obj)
      }
    },
    handleAdd(){
      // 新增维护项
      this.detailVisible = true
      this.detailSource = 'add'
    },
    handleEdit(scope){
      // 修改表格行
      this.detailVisible = true
      this.detailSource = 'edit'
      this.detailInfo = scope.row
      this.editIndex = scope.$index
    },
    handleRemove(scope){
      // 删除表格行
      this.$confirm('是否确认删除？删除后不可撤回！')
      .then(_ => {
        this.addForm.details.splice(scope.$index,1)
      })
    }
  },
  created(){
    if(this.source == 'edit'){
      let param = {
        maintainPlanId:this.id
      }
      viewMaintainPlan(param).then(res => {
        if(res.code == '200'){
          if(res.data){
            this.addForm = JSON.parse(JSON.stringify(res.data))
            this.addForm.no = this.addForm.device.no
            this.addForm.deviceName = this.addForm.device.name
            if(!this.addForm.details){
              this.addForm.details = []
            }
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.addForm{
  padding: 0;
}
.maintain-detail{
  .title{
    font-size: 16px;
    line-height: 24px;
    .el-button{
      margin-left: 16px;
    }
  }
}
</style>
