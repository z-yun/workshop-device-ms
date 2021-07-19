<template>
  <el-dialog :visible.sync="visible" :title="getTitle" :before-close="handleClose" :close-on-click-modal="false" width="960px" top="10vh">
    <div class="dialog-scroll-wrap">
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="130px" class="addForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="模型名称" prop="name">
              <el-input v-model="addForm.name" placeholder="请输入"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="维护类型" prop="maintainType">
              <el-select v-model="addForm.maintainType" placeholder="请选择">
                <el-option
                  v-for="(item,index) in maintainTypes"
                  :key="index"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="部门">
              <el-select v-model="addForm.departmentId" placeholder="请选择" @change="queryDepartmentList">
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
            <el-form-item label="描述">
              <el-input type="textarea" v-model="addForm.remark" maxlength="30" show-word-limit></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-divider></el-divider>
      <div class="maintain-detail">
        <div class="title">
          <span>{{$t('device.maintainDetail')}}</span>
          <el-button type="primary" @click="handleAdd('addForm')">
            {{ $t('device.addMaintain') }}
          </el-button>
        </div>
        <el-table :data="addForm.items" class="mbt-24" border>
          <el-table-column label="维护项" prop="name"></el-table-column>
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
              <el-button type="text" size="small" @click="handleRemove(scope)">
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
    <!-- model component -->
    <!-- 新增、修改维护明细 -->
    <addDetail v-if="detailVisible" :source="itemsource" :visible.sync="detailVisible" :detailInfo="detailInfo" :editIndex="editIndex" @listFresh="confirmAdd"></addDetail>
  </el-dialog>
</template>

<script>
import { operateMixins } from '@/mixins'
import { addMaintainModel, updateMaintainModel, modelType, viewMaintainModel } from '@/api/device'
import { getRoleList } from '@/api/user'
import addDetail from './addDetail'

export default{
  components: { addDetail },
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
        return this.$t('device.addModel')
      }else{
        return this.$t('device.updateModel')
      }
    }
  },
  mixins: [operateMixins],
  data(){
    return {
      addForm:{
        items:[]
      },
      rules:{
        name:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}],
        maintainType:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}]
      },
      detailVisible:false,
      modelVisible:false,
      detailInfo:{},
      editIndex:0,
      btnLoading:false,
      maintainTypes:[],
      departmentList:[]
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
            maintainModel:{...this.addForm}
          }
          this.btnLoading = true
          let solveFun = addMaintainModel
          if(this.source == 'edit'){
            solveFun = updateMaintainModel
          }
          // console.log(this.addForm)
          // console.log(param)
          param.maintainModel.items.forEach((item)=>{
            if(item.confirmType){
              item.confirmType = item.confirmType.code
            }
            if(item.cycleUnit){
              item.cycleUnit = item.cycleUnit.code
            }
          })
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
    queryModelType(){
      // 维护类型
      modelType().then(res => {
        if(res.code == '200'){
          if(res.data){
            this.maintainTypes = res.data
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
    confirmAdd(obj,index){
      // 新增、修改维护项保存
      if(isNaN(index)){
        this.addForm.items.push(obj)
      }else{
        this.$set(this.addForm.items,index,obj)
      }
    },
    handleAdd(){
      // 新增维护项
      this.detailVisible = true
      this.itemsource = 'add'
    },
    handleEdit(scope){
      // 修改表格行
      this.detailVisible = true
      this.itemsource = 'edit'
      this.detailInfo = scope.row
      this.editIndex = scope.$index
    },
    handleRemove(scope){
      // 删除表格行
      this.$confirm('是否确认删除？删除后不可撤回！')
      .then(_ => {
        this.addForm.items.splice(scope.$index,1)
      })
    }
  },
  created(){
    this.queryModelType()
    this.queryDepartmentList()
    if(this.source == 'edit'){
      let param = {
        maintainModelId:this.id
      }
      viewMaintainModel(param).then(res => {
        if(res.code == '200'){
          if(res.data){
            this.addForm = JSON.parse(JSON.stringify(res.data))
            if(!this.addForm.items){
              this.addForm.items = []
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
