<template>
  <div class="audit-page">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="提交审核资料"></el-step>
      <el-step title="等待平台审核"></el-step>
      <el-step title="查看审核结果"></el-step>
    </el-steps>
    <!-- step1 -->
    <el-form v-if="status==1" :model="auditForm" :rules="auditRules" ref="auditForm" label-width="84px" class="auditForm" label-position="left">
      <el-form-item label="企业名称" prop="companyName">
        <el-input v-model="auditForm.companyName" autocomplete="off" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="企业税号" prop="taxNumber">
        <el-input v-model="auditForm.taxNumber" autocomplete="off" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="telephone">
        <el-input v-model.number="auditForm.telephone" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="营业执照" prop="photo">
        <el-input type="hidden" v-model="auditForm.photo"></el-input>
        <el-upload
          class="upload-demo"
          drag
          accept=".jpg,.png,.jpeg"
          action
          :http-request="uploadPhoto">
          <svg-icon icon-class="upload-cloud" class="el-icon-upload" />
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item class="btn-item">
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
    <div class="step-audit" v-else-if="status==3">
      <svg-icon icon-class="audit-wait" />
      <div class="txt">资料正在审核中，请耐心等待审核结果</div>
    </div>
    <div class="step-audit" v-else-if="status==2">
      <svg-icon icon-class="audit-fail" />
      <div class="txt">审核失败{{remark}}</div>
      <el-button type="primary" @click="reSubmit">重新提交</el-button>
    </div>
    <el-button class="rtTopBtn" type="default" @click="logout">登出</el-button>
  </div>
</template>

<script>
import { registerCompany } from '@/api/user'
import { picUpload } from '@/api/upload'
import { validPhone } from '@/utils/validate'
import { setAuthor } from '@/utils/auth'

export default {
  name: 'audit',
  data() {
    const validateTelephone = (rule, value, callback) => {
      if (!validPhone(value)) {
        callback(new Error('Please enter the correct telephone number'))
      } else {
        callback()
      }
    }
    return {
      active: 0,
      auditForm:{},
      auditRules:{
        companyName: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' },
        ],
        taxNumber: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' },
        ],
        telephone: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' },
        ],
        photo: [
          { required: true, message: this.$t('validate.required'), trigger: 'none' },
        ]
      },
      status:1,//1注册2失败3等待
      remark:''
    }
  },
  methods:{
    uploadPhoto(param){
      // 上传营业执照
      const _file = param.file;
      const isLt2M = _file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
      	this.$message.error('上传文件大小不能超过 2MB!');
      	return false;
      }
      var formData = new FormData();
      formData.append("file", _file);

      picUpload(formData).then(res => {
        this.$message.success(this.$t('validate.uploadSuccess'));
        this.auditForm.photo = res.data.filePath;
      })
    },
    submitForm() {
      // 提交
      this.$refs.auditForm.validate(valid => {
        console.log(this.auditForm)
        if (valid) {
          this.loading = true
          let data = {...this.auditForm}
          registerCompany(data).then(() => {
            this.active = 1
            this.$router.push({ path: '/audit',query:{status:3}})
            setAuthor(3)
            this.init()
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    reSubmit(){
      // 重新提交
      this.$router.push({ path: '/audit',query:{status:1}})
      setAuthor(1)
      this.init()
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
    },
    init(){
      if(this.$route.query.status&&this.$route.query.status!=''){
        this.status = Number(this.$route.query.status);
        // 1注册2失败3等待
        if(this.status == 1){
          this.active = 0
        }else if(this.status == 2){
          this.active = 2
          this.remark = sessionStorage.getItem('remark')
        }else if(this.status == 3){
          this.active = 1
        }
      }
    }
  },
  created(){
    this.init()
  }
}
</script>


<style lang="scss">
.audit-page{
  .el-step__head.is-process,
  .el-step__head.is-success{
    color: #0D7EFF;
    border-color: #0D7EFF;
  }
  .el-step__title.is-process,
  .el-step__title.is-success{
    color: #0D7EFF;
  }
  .el-step__head.is-success .el-step__line{
    background-color: #0D7EFF;
  }
  .el-step__head.is-wait{
    color: #303133;
    border-color: #303133;
  }
  .el-step__head.is-process .el-step__line,
  .el-step__head.is-wait .el-step__line{
    background-color: #303133;
  }
  .el-step__title.is-process{
    font-weight: 400;
  }
  .el-step__title.is-wait{
    color: #303133;
  }
  .el-form-item__label{
    padding-right: 16px;
    color: #303133;
    font-weight: 400;
  }
  .el-upload-dragger{
    width: 300px;
  }
  .el-upload__tip{
    margin-top: 0;
    line-height: 18px;
    color: #999;
  }
}
</style>
<style lang="scss" scoped>
.audit-page{
  margin: auto;
  padding: 100px 0;
  width: 620px;
  .auditForm{
    margin: 88px 118px 0 118px;
    label{
      font-weight: 400;
    }
    .btn-item{
      margin-top: 30px;
    }
    .el-button{
      width: 300px;
      padding: 12px 20px;
    }
  }
  .step-audit{
    margin-top: 88px;
    text-align: center;
    .svg-icon{
      width: 320px;
      height: 320px;
    }
    .txt{
      margin: 20px 0;
      font-size: 16px;
      line-height: 24px;
    }
    .el-button{
      margin-top: 20px;
      width: 300px;
      padding: 12px 20px;
    }
  }
  .rtTopBtn{
    position: fixed;
    top: 10vh;
    right: 10vh;
    color: #0D7EFF;
  }
}
</style>
