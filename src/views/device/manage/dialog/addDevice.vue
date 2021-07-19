<template>
  <el-dialog :visible.sync="visible" :title="getTitle" :before-close="handleClose" :close-on-click-modal="false" width="540px" top="10vh">
    <div class="dialog-scroll-wrap">
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="90px" class="addForm">
        <el-form-item label="设备名称" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="设备号" prop="no">
          <el-input v-model="addForm.no" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="资产编号" prop="assetNumber">
          <el-input v-model="addForm.assetNumber" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="品牌">
          <el-input v-model="addForm.brand" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="设备类型">
          <el-select v-model="addForm.type" placeholder="请选择">
            <el-option
              v-for="(item,index) in deviceTypes"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="购买方式">
          <el-select v-model="addForm.purchaseType" placeholder="请选择">
            <el-option
              v-for="(item,index) in purchaseTypes"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="购买日期">
          <el-date-picker v-model="addForm.purchaseDate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="型号">
          <el-input v-model="addForm.model" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="addForm.status" placeholder="请选择">
            <el-option
              v-for="(item,index) in deviceStatus"
              :key="index"
              :label="item.desc"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商">
          <el-select v-model="addForm.supplier" placeholder="请选择" value-key="id">
            <el-option
              v-for="(item,index) in supplierList"
              :key="index"
              :label="item.name"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商联系人">
          <el-input v-model="addForm.supplier.contactUser" disabled />
        </el-form-item>
        <el-form-item label="供应商电话">
          <el-input v-model="addForm.supplier.contactPhone" disabled />
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="addForm.departmentId" placeholder="请选择" @change="queryDepartmentUserList">
            <el-option
              v-for="(item,index) in departmentList"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="维修人">
          <el-select v-model="addForm.repairId" placeholder="请选择">
            <el-option
              v-for="(item,index) in repairList"
              :key="index"
              :label="item.realName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核人">
          <el-select v-model="addForm.auditId" placeholder="请选择">
            <el-option
              v-for="(item,index) in repairList"
              :key="index"
              :label="item.realName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="安装地点">
          <el-input v-model="addForm.installPlace" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="addForm.description" maxlength="30" show-word-limit></el-input>
        </el-form-item>
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
import { addDevice, updateDevice, purchaseType, deviceType, getSupplierList } from '@/api/device'
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
        return this.$t('device.addDevice')
      }else{
        return this.$t('device.updateDevice')
      }
    }
  },
  mixins: [operateMixins],
  data(){
    return {
      addForm:{
        supplier:{}
      },
      rules:{
        name:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}],
        no:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}],
        assetNumber:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}],
      },
      purchaseTypes:[],
      deviceTypes:[],
      deviceStatus:[
        {code:0,desc:'未使用'},
        {code:1,desc:'正常'},
        {code:2,desc:'维修'},
      ],
      supplierList:[],
      departmentList:[],
      repairList:[]
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
          param.supplierId = param.supplier.id
          let solveFun = addDevice
          if(this.source == 'edit'){
            solveFun = updateDevice
          }
          solveFun(param).then(res => {
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
    queryPurchaseType(){
      // 查询购买方式
      purchaseType().then(res => {
        if(res.code == '200'){
          if(res.data){
            this.purchaseTypes = res.data
          }
        }
      })
    },
    queryDeviceType(){
      // 查询设备类型
      deviceType().then(res => {
        if(res.code == '200'){
          if(res.data){
            this.deviceTypes = res.data
          }
        }
      })
    },
    querySupplierList(){
      // 查询供应商列表
      getSupplierList({}).then(res => {
        if(res.code == '200'){
          if(res.data){
            this.supplierList = res.data
          }
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
        roleId:this.addForm.departmentId
      }
      getRolesUser(param).then(res => {
        if(res.code == '200'){
          this.repairList = res.data
        }
      })
    },
  },
  created(){
    this.queryPurchaseType()
    this.queryDeviceType()
    this.querySupplierList()
    this.queryDepartmentList()
    if(this.source == 'edit'){
      this.addForm = JSON.parse(JSON.stringify(this.infoObj))
      if(this.addForm.departmentId){
        this.queryDepartmentUserList()
      }
      if(!this.addForm.supplier){
        this.addForm.supplier = {}
      }
      if(this.addForm.status){//后台返回是个对象需要转换
        this.addForm.status = this.addForm.status.code
      }
    }
  }
}
</script>

<style lang="scss">
</style>
