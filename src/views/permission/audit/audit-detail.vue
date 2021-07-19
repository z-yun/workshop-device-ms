<template>
  <div class="app-container audit-detail">
    <div class="app-container-box">
      <h4 class="title">基本资料</h4>
      <el-row>
        <el-col :span="8">
          <span class="main-txt">企业名称：</span>
          <span class="sub-txt">{{companyInfo.companyName}}</span>
        </el-col>
        <el-col :span="8">
          <span class="main-txt">企业税号：</span>
          <span class="sub-txt">{{companyInfo.taxNumber}}</span>
        </el-col>
        <el-col :span="8">
          <span class="main-txt">联系电话：</span>
          <span class="sub-txt">{{companyInfo.telephone}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span class="main-txt">营业执照：</span>
          <el-image
            class="license"
            :src="companyInfo.photo"
            :preview-src-list="[companyInfo.photo]"
            alt="点击查看大图">
          </el-image>
        </el-col>
      </el-row>
    </div>
    <div class="app-container-box">
      <h4 class="title">审核进度</h4>
      <div class="audit-step">
        <div class="step step1">
          <i class="circle line"></i>
          <span>提交资料</span>
          <span class="sub-txt">{{companyInfo.createTime}}</span>
        </div>
        <div class="step step2">
          <i :class="auditStatus==0?'circle circle-wait':'circle'"></i>
          <span :class="nameColor">{{statusName}}</span>
          <span v-if="auditStatus!=0" class="sub-txt">{{companyInfo.auditTime}}</span>
        </div>
        <el-alert
          v-if="auditStatus==2"
          :title="companyInfo.remark"
          type="info"
          :closable="false"
          class="remark">
        </el-alert>
      </div>
    </div>
    <div class="footer">
      <el-button type="primary" @click="handlePass" :disabled="btnDisabled">
        {{ $t('permission.pass') }}
      </el-button>
      <el-button type="default" @click="handleReject" :disabled="btnDisabled2">
        {{ $t('permission.reject') }}
      </el-button>
    </div>
    <!-- components -->
    <rejectReason v-if="rejectVisible" :visible.sync="rejectVisible" :id="id" @queryFresh="getDetailInfo"></rejectReason>
  </div>
</template>

<script>
import { registerViewDetail, registerComPass, registerComreject } from '@/api/user'
import rejectReason from './dialog/rejectReason'

export default {
  name:'auditDetail',
  components:{ rejectReason },
  computed:{
    statusName(){
      switch(this.auditStatus){
        case 0:
        return '待审核';
        break;
        case 1:
        this.nameColor = 'success-txt';
        return '审核通过';
        break;
        case 2:
        this.nameColor = 'danger-txt';
        return '审核未通过';
        break;
      }
    }
  },
  data() {
    return {
      active:0,
      auditStatus:0,//审核状态0待审核1通过2未通过
      nameColor:'',
      id:null,
      companyInfo:{},
      btnDisabled:false,
      btnDisabled2:false,
      rejectVisible:false
    }
  },
  methods:{
    handlePass(){
      // 通过
      this.btnDisabled = true
      registerComPass({id:this.id}).then(res => {
        this.btnDisabled = false
        if(res.code == '200'){
          this.$message.success(this.$t('validate.success'))
          this.getDetailInfo()
        }
      }).catch(error => {
        this.btnDisabled = false
      })
    },
    handleReject(){
      // 驳回按钮
      this.rejectVisible = true
    },
    getDetailInfo(){
      // 查询信息
      registerViewDetail({id:this.id}).then(res => {
        if(res.code == '200'){
          this.companyInfo = JSON.parse(JSON.stringify(res.data))
          this.auditStatus = this.companyInfo.status.code
        }
      })
    }
  },
  created(){
    if (this.$route.query.id) {
      this.id = Number(this.$route.query.id);
      this.getDetailInfo();
    }
  }
}
</script>

<style lang="scss" scoped>
.audit-detail{
  padding-bottom: 60px;
  .app-container-box{
    padding: 0 20px 20px 20px;
  }
  .title{
    line-height: 60px;
  }
  .el-row{
    margin-top: 10px;
    margin-bottom: 20px;
    line-height: 22px;
    &:last-child{
      margin-bottom: 0;
    }
  }
  .license{
    width: 100px;
    height: 100px;
    vertical-align: -80px;
    color: #909399;
    cursor: pointer;
  }
  .audit-step{
    margin: 13px 0;
    .step{
      color: #303133;
      line-height: 22px;
      &.step1{
        margin-bottom: 80px;
      }
      &.step2{
        margin-top: -10px;
      }
      .circle{
        display: inline-block;
        width: 12px;
        height: 12px;
        background-color: #0D7EFF;
        border-radius: 50%;
        &.line{
          position: relative;
          &::after{
            content: '';
            position: absolute;
            left: 5px;
            top: 12px;
            height: 80px;
            width: 2px;
            background-color: #0D7EFF;
          }
        }
        &.circle-wait{
          background-color: #C0C4CC;
        }
      }
      span{
        margin: 8px;
      }
    }
  }
  .remark{
    margin: 12px 18px 0 18px;
    width: calc(100% - 36px);
    background-color: #F5F7FA;
    color: #303133;
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
}
</style>
