<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">
          {{ $t('register.title') }}
        </h3>
        <lang-select class="set-language" />
      </div>
      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          :placeholder="$t('register.username')"
          name="username"
          type="text"
          tabindex="2"
          autocomplete="off"
        />
      </el-form-item>
      <div class="clearfix">
        <el-form-item prop="code" class="fl">
          <el-input
            ref="code"
            v-model="loginForm.code"
            :placeholder="$t('register.code')"
            name="code"
            type="text"
            tabindex="3"
            autocomplete="off"
            class="code-ipt"
          />
        </el-form-item>
        <el-button type="default" class="fr code-btn" @click.native.prevent="getCode" :disabled="codeDisabled">
          {{ codeBtnName }}
        </el-button>
      </div>
      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            :placeholder="$t('register.password')"
            name="password"
            tabindex="4"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
          />
          <!-- <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span> -->
        </el-form-item>
      </el-tooltip>
      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="confirmPwd">
          <el-input
            :key="passwordType"
            ref="confirmPwd"
            v-model="loginForm.confirmPwd"
            :type="passwordType"
            :placeholder="$t('register.confirmPwd')"
            name="password"
            tabindex="5"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
          />
          <!-- <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span> -->
        </el-form-item>
      </el-tooltip>
      <el-button :loading="loading" type="primary" class="login-btn" @click.native.prevent="handleLogin">
        {{ $t('register.logIn') }}
      </el-button>

      <div class="to-register">
        <el-link class="blueLink" :loading="loading" @click.native.prevent="toLogin">
        {{ $t('register.toLogin') }}
      </el-link>
      </div>
    </el-form>
  </div>
</template>

<script>
import { registerUser, sendRegisterCode } from '@/api/user'
import { validEmail,validPhone } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import { setAuthor } from '@/utils/auth'

export default {
  name: 'Register',
  components: { LangSelect },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (validEmail(value)||validPhone(value)) {
        callback()
      } else {
        callback(new Error(this.$t('validate.username')))
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error(this.$t('validate.password')))
      } else {
        callback()
      }
    }
    const validateConfirmPwd = (rule, value, callback) => {
      if (value!==this.loginForm.password) {
        callback(new Error(this.$t('validate.confirmPwd')))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('validate.code')))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        code: [{ required: true, trigger: 'blur', validator: validateCode}],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        confirmPwd: [{ required: true, trigger: 'blur', validator: validateConfirmPwd }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      codeBtnName:'',
      codeDisabled:false,
      codeCount:60,
      codeTimer:null
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    var locale = this.$i18n.locale;
    this.codeBtnName =  this.$i18n.messages[locale].register.getCode;
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    getCode(){
      //获取验证码
      let username = (this.loginForm.username).trim();
      if(validEmail(username)||validPhone(username)){
        clearInterval(this.codeTimer)
        sendRegisterCode({ username }).then(res => {
          if(res.code == '200'){
            this.$message.success(this.$t('validate.success'));
            let locale = this.$i18n.locale;
            this.codeDisabled = true
            this.codeBtnName = this.codeCount + this.$i18n.messages[locale].register.codeCount
            this.codeTimer = setInterval(()=>{
              if(this.codeCount>1){
                this.codeCount--
                this.codeBtnName = this.codeCount + this.$i18n.messages[locale].register.codeCount
              }else{
                this.codeBtnName =  this.$i18n.messages[locale].register.getCode
                clearInterval(this.codeTimer)
                this.codeDisabled = false
                this.codeCount = 60
              }
            },1000)
          }
        })
      }

    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          let data = {...this.loginForm}
          registerUser(data).then(() => {
              // this.$router.push({ path: '/audit',query:{status:1}})
              // setAuthor(1)
              // 注册后自动登录
              this.$store.dispatch('user/login', this.loginForm).then(() => {
                this.$router.push({ path: '/permission' || this.redirect , query: this.otherQuery })
              }).catch(() => {
                this.$router.push({ path: '/login' })
              })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    toLogin(){
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/login.scss'
</style>
