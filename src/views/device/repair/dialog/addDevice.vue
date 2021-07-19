<template>
  <el-dialog :visible.sync="visible" :title="getTitle" :before-close="handleClose" :close-on-click-modal="false" width="980px" top="10vh">
    <div class="dialog-scroll-wrap">
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="150px" class="addForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="设备号" prop="no">
              <el-input v-model="addForm.no" placeholder="请输入设备号搜索" @change="viewDeviceByNo"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备名称" prop="name">
              <el-input v-model="addForm.name" disabled placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="上报人" prop="reporterId">
              <el-select v-model="addForm.reporterId" placeholder="请选择">
                <el-option
                  v-for="(item,index) in userList"
                  :key="index"
                  :label="item.realName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上报时间" prop="reportTime">
              <el-date-picker v-model="addForm.reportTime" type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd hh:mm:ss"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="故障描述" prop="faultDescription">
              <el-input type="textarea" v-model="addForm.faultDescription" maxlength="30" show-word-limit></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="故障原因">
              <el-input type="textarea" v-model="addForm.faultReason" maxlength="30" show-word-limit></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="处理状态">
              <el-select v-model="addForm.processStatus" placeholder="请选择">
                <el-option
                  v-for="(item,index) in processStatuss"
                  :key="index"
                  :label="item.desc"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地点">
              <el-input v-model="addForm.address" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="维修部门">
              <el-select v-model="addForm.repairDepartmentId" placeholder="请选择" @change="queryDepartmentUserList">
                <el-option
                  v-for="(item,index) in departmentList"
                  :key="index"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="维修人">
              <el-select v-model="addForm.repairerId" placeholder="请选择">
                <el-option
                  v-for="(item,index) in repairList"
                  :key="index"
                  :label="item.realName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="维修方式">
              <el-select v-model="addForm.repairType" placeholder="请选择">
                <el-option
                  v-for="(item,index) in repairTypes"
                  :key="index"
                  :label="item.desc"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- <el-form-item label="维修时间">
              <el-date-picker v-model="addForm.purchaseDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item> -->
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="维修方法(厂内)">
              <el-input v-model="addForm.repairMeasure" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="维修工具(厂内)">
              <el-input v-model="addForm.repairTool" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="使用配件(厂内)">
              <el-input v-model="addForm.usedFitting" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用时(厂内,单位分钟)">
              <el-input v-model.number="addForm.repairCost" type="number" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="送修时间(厂外)">
              <el-date-picker v-model="addForm.sendTime" type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd hh:mm:ss"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="回厂时间(厂外)">
              <el-date-picker v-model="addForm.backTime" type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd hh:mm:ss"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="维修结果">
              <el-select v-model="addForm.repairStatus" placeholder="请选择">
                <el-option
                  v-for="(item,index) in repairStatuss"
                  :key="index"
                  :label="item.desc"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div style="text-align:right;">
      <el-button type="primary" @click="handleSubmit('addForm')">
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
import { saveDeviceRepair, getRepairDeviceByNo } from '@/api/device'
import { getAllComUser, getRoleList, getRolesUser } from '@/api/user'
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
        return this.$t('device.addRepair')
      }else{
        return this.$t('device.updateRepair')
      }
    }
  },
  mixins: [operateMixins],
  data(){
    return {
      addForm:{
      },
      rules:{
        name:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}],
        no:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}],
        reportId:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}],
        reportTime:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}],
        faultDescription:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}],
      },
      processStatuss:[
        {code:0,desc:'待处理'},
        {code:1,desc:'部门接单'},
        {code:2,desc:'分派维修人'},
        {code:3,desc:'维修人到场'},
        {code:4,desc:'现场处理结束'}
      ],
      repairStatuss:[
        {code:0,desc:'待维修'},
        {code:1,desc:'维修成功'},
        {code:2,desc:'维修失败'}
      ],
      repairTypes:[
        {code:1,desc:'场内维修'},
        {code:2,desc:'场外维修'},
      ],
      departmentList:[],
      repairList:[],
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
          let param = JSON.parse(JSON.stringify(this.addForm))

          saveDeviceRepair(param).then(res => {
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
    queryDepartmentList(){
      // 查询部门列表
      let param = {
        size:-1
      }
      getRoleList(param).then(res => {
        if(res.code == '200'){
          this.departmentList = res.data.records
        }
      })
    },
    queryDepartmentUserList(){
      // 查询部门下的员工列表
      let param = {
        roleId:this.addForm.repairDepartmentId
      }
      getRolesUser(param).then(res => {
        if(res.code == '200'){
          this.repairList = res.data
        }
      })
    },
    queryRepairUser(){
      // 查询本公司所有员工
      getAllComUser({}).then(res => {
        if(res.code == '200'){
          this.userList = res.data
        }
      })
    },
    viewDeviceByNo(){
      // 根据设备号查询设备名称
      let param = {
        no:this.addForm.no
      }
      getRepairDeviceByNo(param).then(res => {
        if(res.code == '200'){
          if(res.data){
            this.addForm.deviceId = res.data.id
            this.$set(this.addForm,'name',res.data.name)
          }else{
            this.$message.error('设备不存在！')
            this.addForm.deviceId = undefined
            this.$set(this.addForm,'name','')
          }
        }
      })
    },
  },
  created(){
    this.queryDepartmentList()
    this.queryRepairUser()
    if(this.source == 'edit'){
      this.addForm = JSON.parse(JSON.stringify(this.infoObj))
      this.queryDepartmentUserList()
      if(this.addForm.status){//后台返回是个对象需要转换
        this.addForm.status = this.addForm.status.code
      }
      if(this.addForm.device){
        this.addForm.no = this.addForm.device.no
        this.addForm.name = this.addForm.device.name
      }
      if(this.addForm.repairStatus){
        this.addForm.repairStatus = this.addForm.repairStatus.code
      }
      if(this.addForm.processStatus){
        this.addForm.processStatus = this.addForm.processStatus.code
      }
      if(this.addForm.repairType){
        this.addForm.repairType = this.addForm.repairType.code
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.addForm{
  padding: 0;
}
</style>
