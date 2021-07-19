<template>
  <div class="company right-menu-item">
    <el-button size="medium" round @click="handleChangeCom">{{companyName}} <i class="el-icon-caret-bottom com-icon"></i></el-button>
    <el-drawer
      title="选择企业"
      custom-class="company-drawer"
      :visible.sync="comVisible"
      direction="rtl"
      size="240px"
      append-to-body
      :show-close="false">
      <ul class="list">
      	<li
          :class="active==item.id?'active':''"
          v-for="(item,index) in comlist"
          :key="index"
          @click="chooseCompany(item,index)">{{item.name}}</li>
      </ul>
    </el-drawer>
  </div>
</template>

<script>
import { getCompanyList } from '@/api/user'

export default {
  props:{
    visible:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return {
      companyName:'',
      comVisible:false,
      active:0,
      comlist:[]
    }
  },
  methods: {
    handleChangeCom(){
      // 切换公司
      this.comVisible = true
    },
    chooseCompany(item){
      // 选择公司
      this.companyName = item.name
      this.active = item.id
      sessionStorage.setItem('companyId',item.id)
      this.comVisible = false
      this.refreshView()
    },
    refreshView() {
      // In order to make the cached page re-rendered
      this.$store.dispatch('tagsView/delAllCachedViews', this.$route)

      const { fullPath } = this.$route

      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + fullPath
        })
      })
    }
  },
  created(){
    this.comlist = JSON.parse(sessionStorage.getItem('comlist'))
    this.active = sessionStorage.getItem('companyId')
    this.comlist.forEach(item=>{
      if(item.id == this.active){
        this.companyName = item.name
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.company{
  height: 100%;
  // vertical-align: middle;
  .el-button{
    position: relative;
    padding: 10px 20px 10px 10px;
    width: 108px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    background-color: #F5F7FA;
    color: #606266;
    border: 0;
    border-radius: 16px;
  }
  .com-icon{
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
<style lang="scss">
.company-drawer{
  .el-drawer__header{
    margin-top: 20px;
    margin-bottom: 14px;
  }
  .el-drawer__header > :first-child{
    color: #303133;
    font-size: 18px;
    line-height: 26px;
    &:focus{
      outline: 0;
    }
  }
  .el-drawer__body{
    overflow-y: auto;
  }
  .list{
    li{
      padding: 0 40px;
      line-height: 43px;
      cursor: pointer;
      &.active{
        color: #0D7EFF;
      }
    }
  }
}
</style>
