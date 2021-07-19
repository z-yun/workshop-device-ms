<template>
  <el-dialog :visible.sync="visible" :title="infoObj.name" :before-close="handleClose" :close-on-click-modal="false" width="980px" top="10vh" class="lightconfig">
    <div class="dialog-scroll-wrap">
      <el-table :data="dataList" class="lightTb" border>
        <el-table-column label="管理名称" width="100">
          <template slot-scope="{row}">
            <template v-if="row.edit">
              <el-input v-model="row.name" placeholder="管理名称"/>
            </template>
            <template v-else>{{ row.name }}</template>
          </template>
        </el-table-column>
        <el-table-column label="红灯" width="80" label-class-name="redlight colorlight" align="center">
          <template slot-scope="{row}">
            <template v-if="row.edit">
              <el-select v-model="row.red">
                <el-option
                  v-for="(item,index) in status"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
            <template v-else>{{ formatStatus(row.red) }}</template>
          </template>
        </el-table-column>
        <el-table-column label="绿灯" width="80" label-class-name="greenlight colorlight" align="center">
          <template slot-scope="{row}">
            <template v-if="row.edit">
              <el-select v-model="row.green">
                <el-option
                  v-for="(item,index) in status"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
            <template v-else>{{ formatStatus(row.green) }}</template>
          </template>
        </el-table-column>
        <el-table-column label="黄灯" width="80" label-class-name="yellowlight colorlight" align="center">
          <template slot-scope="{row}">
            <template v-if="row.edit">
              <el-select v-model="row.yellow" placeholder="请选择">
                <el-option
                  v-for="(item,index) in status"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
            <template v-else>{{ formatStatus(row.yellow) }}</template>
          </template>
        </el-table-column>
        <el-table-column label="蓝灯" width="80" label-class-name="bluelight colorlight" align="center">
          <template slot-scope="{row}">
            <template v-if="row.edit">
              <el-select v-model="row.blue">
                <el-option
                  v-for="(item,index) in status"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
            <template v-else>{{ formatStatus(row.blue) }}</template>
          </template>
        </el-table-column>
        <el-table-column label="表示色" width="80" align="center">
          <template slot-scope="{row}">
            <template v-if="row.edit">
              <el-select v-model="row.colorSet" popper-class="colorset">
                <el-option
                  v-for="(item,index) in colorList"
                  :key="index"
                  :label="item"
                  :value="item">
                  <span class="colorlight" :style="{backgroundColor:item}">{{ item }}</span>
                </el-option>
              </el-select>
            </template>
            <template v-else>
              <div v-if="row.colorSet" class="colorlight" :style="{backgroundColor:row.colorSet.value}">{{row.colorSet.value}}</div>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="运转灯" width="80" align="center">
          <template slot-scope="{row}">
            <template v-if="row.edit">
              <el-checkbox v-model="row.flagRun"></el-checkbox>
            </template>
            <template v-else>{{ formatFlag(row.flagRun) }}</template>
          </template>
        </el-table-column>
        <el-table-column label="停止灯" width="80" align="center">
          <template slot-scope="{row}">
            <template v-if="row.edit">
              <el-checkbox v-model="row.flagStop"></el-checkbox>
            </template>
            <template v-else>{{ formatFlag(row.flagStop) }}</template>
          </template>
        </el-table-column>
        <el-table-column label="计数灯" width="80" align="center">
          <template slot-scope="{row}">
            <template v-if="row.edit">
              <el-checkbox v-model="row.flagCount"></el-checkbox>
            </template>
            <template v-else>{{ formatFlag(row.flagCount) }}</template>
          </template>
        </el-table-column>
        <el-table-column label="是否报警" width="80" align="center">
          <template slot-scope="{row}">
            <template v-if="row.edit">
              <el-checkbox v-model="row.flagAlarm"></el-checkbox>
            </template>
            <template v-else>{{ formatFlag(row.flagAlarm) }}</template>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <template v-if="row.edit">
              <el-button type="text" size="small" @click="handleAdd(row)">
                {{ $t('btn.tbAdd') }}
              </el-button>
            </template>
            <template v-else>
              <el-button type="text" class="danger-txt" size="small" @click="handleDelete(row.id)">
                {{ $t('btn.remove') }}
              </el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <div class="title">{{$t('factory.watchDetail')}}</div>
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="90px" class="addForm">
        <el-row v-for="(item,index) in stage" :key="index">
          <el-col :span="12">
            <el-form-item :label="stageName[index]">
              <el-select v-model="stage[index].showType">
                <el-option
                  v-for="(item,index) in watchTypes"
                  :key="index"
                  :label="item.desc"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示名称">
              <el-input v-model="stage[index].showName" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="tip sub-txt">*您可以更改整个监视器屏幕和月度报告屏幕上显示的项目。</div>
        <div class="tip sub-txt">*初始设定为“第一行：”生产，第二行：“稼动”，第三行：“异常”，第四行：“等待”，第五行：“机种”，第六行：“良率”，第七行：“直通率”。</div>
        <el-form-item class="mt20" label="参考节拍(过滤高频毫秒)" label-width="180">
          <el-input v-model.number="collectInterval" placeholder="请输入" />
        </el-form-item>
      </el-form>
    </div>
    <div style="text-align:right;">
      <el-button type="primary" @click="handleSubmit" :loading="btnLoading">
        {{ $t('btn.save') }}
      </el-button>
      <el-button type="default" @click="handleClose">
        {{ $t('btn.cancel') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getLightSetting, getLightColorList, delLightSetting, saveLightSetting, getLightWatchTypeList, saveLightWatchList, getLightWatchList } from '@/api/factory'
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
  data(){
    return {
      dataList:[],
      colorList:[],
      status:[
        {label:'亮灯',value:0},
        {label:'灭灯',value:1},
        {label:'闪烁',value:2}
      ],
      addForm:{
        isShow:1
      },
      rules:{
        lineId:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}],
        name:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}],
      },
      btnLoading:false,
      watchTypes:[],
      stage:[],
      stageName:['第一阶段','第二阶段','第三阶段','第四阶段','第五阶段','第六阶段','第七阶段'],
      collectInterval:0
    }
  },
  methods:{
  	handleClose(){
  		this.$emit('update:visible',false)
  	},
    handleSubmit(form){
      // 保存显示设置
      this.btnLoading = true
      let param = {
        lightId:this.infoObj.id,
        collectInterval:this.collectInterval,
        lightStatisticsSettings:this.stage
      }

      saveLightWatchList(param).then(res => {
        this.btnLoading = false
        if(res.code == '200'){
          this.$message.success(this.$t('validate.success'))
        }
      }).catch(error => {
        this.btnLoading = false
      })
    },
    getList(){
      // 获取表格
      let lightId = this.infoObj.id
      let param = {
        size:-1,
        lightId
      }
      this.listLoading = true
      getLightSetting(param).then(res => {
        this.listLoading = false
        if(res.code == '200'){
          this.dataList = res.data.records
          this.dataList.push({edit:true})
        }
      }).catch(error => {
        this.listLoading = false
      })
    },
    queryLightColorList(){
      // 查询三色灯颜色列表
      let param = {
        size:-1,
      }
      this.listLoading = true
      getLightColorList(param).then(res => {
        this.listLoading = false
        if(res.code == '200'){
          this.colorList = res.data
        }
      }).catch(error => {
        this.listLoading = false
      })
    },
    formatStatus(status){
      let obj = this.status.find(item=>item.value==status)
      return obj.label
    },
    formatFlag(flag){
      return flag==1?'是':'否'
    },
    handleAdd(row){
      //新增三色灯设置
      let lightColorSetting = { ...row }
      if(!row.name || row.name == ''){
        this.$message.info('名称不能为空')
      }
      lightColorSetting.lightId = this.infoObj.id
      lightColorSetting.flagAlarm = lightColorSetting.flagAlarm?1:0
      lightColorSetting.flagCount = lightColorSetting.flagCount?1:0
      lightColorSetting.flagRun = lightColorSetting.flagRun?1:0
      lightColorSetting.flagStop = lightColorSetting.flagStop?1:0

      saveLightSetting({lightColorSetting}).then(res => {
        this.btnLoading = false
        if(res.code == '200'){
          this.$message.success(this.$t('validate.success'))
          this.getList()
        }
      }).catch(error => {
        this.btnLoading = false
      })
    },
    handleDelete(id){
      //删除三色灯设置
      this.$confirm('是否确认删除？删除后不可撤回！')
      .then(_ => {
        delLightSetting({lightColorSettingId:id}).then(res => {
          if(res.code == '200'){
            this.$message.success(this.$t('validate.success'))
            this.getList()
          }
        })
      }).catch({})
    },
    queryLightWatchTypeList(){
      // 查询监视显示类型列表
      getLightWatchTypeList().then(res => {
        if(res.code == '200'){
          this.watchTypes = res.data
        }
      })
    },
    queryLightWatchList(){
      let lightId = this.infoObj.id
      // 查询监视显示设置列表
      getLightWatchList({lightId}).then(res => {
        if(res.code == '200'){
          this.collectInterval = res.data.collectInterval
          let settings = res.data.settings
          for(let i =0;i<settings.length;i++){
            for(let j=0;j<this.stage.length;j++){
              if(settings[i].stage == this.stage[j].stage){
                this.stage[j].showName = settings[i].showName
                if(settings[i].showType){
                  this.stage[j].showType = settings[i].showType.code
                }
              }
            }
          }
        }
      })
    },
    initStage(){
      for(let i=1;i<8;i++){
        this.stage.push({
          stage:i,
          showName:'',
          showType:''
        })
      }
    }
  },
  created(){
    this.getList()
    this.queryLightColorList()
    this.queryLightWatchTypeList()
    this.queryLightWatchList()
    this.initStage()
  }
}
</script>

<style lang="scss">
.lightconfig{
  .lightTb{
    &.el-table--border,
    &.el-table--border th,
    &.el-table--border td{
      border-right: 1px solid #dfe6ec;
    }
    .el-input--medium .el-input__inner{
      height: 28px;
      line-height: 28px;
      font-size: 12px;
    }
    .el-input--medium .el-input__icon{
      line-height: 28px;
    }
    .el-input--suffix .el-input__inner{
      padding-right: 20px;
    }
    .el-input__suffix{
      right: 0;
    }
    .cell{
      padding: 0 8px;
    }
    & td div,
    & th > .cell{
      &.colorlight{
        width: 64px;
        height: 24px;
        line-height: 24px;
        color: #fff;
        font-size: 12px;
        border-radius: 4px;
        font-weight: 400;
        &.redlight{
          background-color: #FF3341;
        }
        &.greenlight{
          background-color: #14CC14;
        }
        &.yellowlight{
          background-color: #FF9900;
        }
        &.bluelight{
          background-color: #0D7EFF;
        }
      }
    }
  }
  .title{
    margin: 20px 0;
    font-size: 16px;
    line-height: 24px;
  }
  .tip{
    line-height: 20px;
  }
  .mt20{
    margin-top: 20px;
  }
}
.colorset{
    .el-select-dropdown__item{
      padding: 0;
      height: 24px;
      line-height: 24px;
      text-align: center;
    }
    .colorlight{
      display: block;
      width: 100%;
      color: #fff;
    }
  }
</style>
