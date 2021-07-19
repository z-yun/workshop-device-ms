<template>
  <el-dialog :visible.sync="visible" :title="$t('device.recordDetail')" :before-close="handleClose" :close-on-click-modal="false" width="680px" top="10vh">
    <div class="dialog-scroll-wrap audit-detail">
      <el-row>
        <el-col :span="12">
          <span class="main-txt">计划ID：</span>
          <span class="sub-txt">{{infoObj.id}}</span>
        </el-col>
        <el-col :span="12">
          <span class="main-txt">设备编号：</span>
          <span class="sub-txt" v-if="infoObj.device">{{infoObj.device.no}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span class="main-txt">设备名称：</span>
          <span class="sub-txt" v-if="infoObj.device">{{infoObj.device.name}}</span>
        </el-col>
        <el-col :span="12">
          <span class="main-txt">维护代码：</span>
          <span class="sub-txt">{{infoObj.maintainItemCode}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span class="main-txt">维护类型：</span>
          <span class="sub-txt" v-if="infoObj.maintainTypeVo">{{infoObj.maintainTypeVo.name}}</span>
        </el-col>
        <el-col :span="12">
          <span class="main-txt">维护项名称：</span>
          <span class="sub-txt">{{infoObj.maintainItemName}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span class="main-txt">设备负责人：</span>
          <span class="sub-txt">{{infoObj.devicePrincipalId}}</span>
        </el-col>
        <el-col :span="12">
          <span class="main-txt">创建时间：</span>
          <span class="sub-txt">{{infoObj.createTime}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span class="main-txt">计划维护时间：</span>
          <span class="sub-txt">{{infoObj.plainTime}}</span>
        </el-col>
        <el-col :span="12">
          <span class="main-txt">实际维护时间：</span>
          <span class="sub-txt">{{infoObj.doneTime}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span class="main-txt">维护用户：</span>
          <span class="sub-txt" v-if="infoObj.maintainUser">{{infoObj.maintainUser.realName}}</span>
        </el-col>
        <el-col :span="12">
          <span class="main-txt">班次：</span>
          <span class="sub-txt" v-if="infoObj.shift">{{infoObj.shift.desc}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span class="main-txt">审核时间：</span>
          <span class="sub-txt">{{infoObj.auditTime}}</span>
        </el-col>
        <el-col :span="12">
          <span class="main-txt">审核用户：</span>
          <span class="sub-txt" v-if="infoObj.auditUser">{{infoObj.auditUser.realName}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span class="main-txt">审核状态：</span>
          <span class="sub-txt" v-if="infoObj.auditStatus">{{infoObj.auditStatus.desc}}</span>
        </el-col>
        <el-col :span="12">
          <span class="main-txt">维护状态：</span>
          <span class="sub-txt" v-if="infoObj.status">{{infoObj.status.desc}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span class="main-txt">确认方式：</span>
          <span class="sub-txt" v-if="infoObj.confirmType">{{infoObj.confirmType.desc}}</span>
        </el-col>
        <el-col :span="12" v-if="infoObj.confirmType">
          <span class="main-txt">确认内容：</span>
          <span class="sub-txt" v-if="infoObj.confirmType.code==2">
            <el-image
              :src="infoObj.confirmContent"
              :preview-src-list="[infoObj.confirmContent]">
            </el-image>
          </span>
          <span class="sub-txt" v-else>{{infoObj.confirmContent}}</span>
        </el-col>
      </el-row>
      <div class="footer" v-if="infoObj.auditStatus">
        <template v-if="infoObj.auditStatus.code == 0 && infoObj.status.code==1">
          <el-button type="primary" @click="handleAudit(1)" :loading="loading">
            {{ $t('btn.pass') }}
          </el-button>
          <el-button type="default" @click="handleAudit(2)" :loading="loading">
            {{ $t('btn.reject') }}
          </el-button>
        </template>
        <el-button v-else type="primary" @click="handleClose" :loading="loading">
          {{ $t('btn.close') }}
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { auditRecord } from '@/api/device'

export default{
  props:{
    visible: {
    	type: Boolean,
    	default: false
    },
    infoObj:{
      type:Object,
      default(){
        return {
          auditStatus:{},
          device:{},
          shift:{},
          status:{},
          confirmType:{},
          auditUser:{}
        }
      }
    }
  },
  data(){
    return {
      loading:false,
      auditStatus:0
    }
  },
  methods:{
  	handleClose(){
  		this.$emit('update:visible',false)
  	},
    handleAudit(auditStatus){
      let id = this.infoObj.id
      let param = {
        recordIds:[id],
        auditStatus
      }
      this.loading = true
      auditRecord(param).then(res => {
        this.loading = false
        if(res.code == '200'){
          this.$message.success(this.$t('validate.success'))
          this.$emit('update:visible',false)
          this.$emit('queryFresh')
        }
      }).catch(error => {
        this.loading = false
      })
    }
  },
  created(){
    // console.log(this.infoObj)
  }
}
</script>

<style lang="scss">
.audit-detail{
  padding-bottom: 70px;
  .el-row{
    margin-top: 10px;
    margin-bottom: 20px;
    line-height: 20px;
    &:last-child{
      margin-bottom: 0;
    }
  }
  .footer{
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 12px 20px;
    width: 100%;
    background-color: #fff;
    text-align: right;
  }
  .el-image{
    width: 100px;
    height: 100px;
    vertical-align: top;
  }
}

</style>
