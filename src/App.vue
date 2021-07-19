<template>
  <div id="app" @mousemove="clicked" @click="clicked">
    <router-view></router-view>
  </div>
</template>
<script>
import { getToken } from '@/utils/auth' // get token from cookie
export default {
  name: 'app',
  //监听浏览器刷新
  data (){
    return {
      lTime: new Date().getTime(), // 最后一次点击的时间
      cTime: new Date().getTime(), //当前时间
      tOut: 30 * 60 * 1000, //超时时间30min
      t1: '',
    }
  },
  mounted () {
    this.t1 = setInterval(this.tTime, 1000);
  },
  methods:{
    clicked () {
      this.lTime = new Date().getTime()  //当界面被点击更新点击时间
    },
    tTime() {
      this.cTime = new Date().getTime();
      if (this.cTime - this.lTime > this.tOut) {
        //未登录状态
        const hasToken = getToken()
        if(hasToken){
          this.lTime = new Date().getTime();
        }else{
          this.logout();
          this.$message({
            message: '登录超时，请重新登录',
            type: 'warning'
          });
        }
      }
    },
    async logout(){
      //logout
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
    }
  }
}
</script>
