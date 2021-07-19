<template>
  <el-dialog :visible.sync="visible" :title="$t('permission.leader')" :before-close="handleClose" :close-on-click-modal="false" width="540px">
    <el-transfer
      filterable
      filter-placeholder="请输入名称"
      class="my-transfer"
      v-model="selectListKey"
      :props="defaultProps"
      :filter-method="filterMethod"
      :titles="['未选领导', '已选领导']"
      :data="userData">
    </el-transfer>
    <div class="text-right">
      <el-button type="primary" @click="handleSubmit" :loading="btnLoading">
        {{ $t('permission.confirm') }}
      </el-button>
      <el-button type="default" @click="handleClose">
        {{ $t('permission.cancel') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getLeaderList, getAllComUser, saveLeaderIds } from '@/api/user'
export default{
  props:{
    visible: {
    	type: Boolean,
    	default: false
    },
    userId:{
      type:Number,
      default:0
    }
  },
  data(){
    return {
      addForm:{},
      userData: [],//可选
      defaultProps:{
        key: 'id',
        label: 'realName'
      },
      selectListKey:[],//已选
      btnLoading:false
    }
  },
  methods:{
  	handleClose(){
  		this.$emit('update:visible',false);
  	},
    handleSubmit(){
      // 确定
      let param = {
        userId:this.userId,
        leaderIds:this.selectListKey
      }
      this.btnLoading = true
      saveLeaderIds(param).then(res => {
        this.btnLoading = false
        if(res.code == '200'){
          this.$message.success(this.$t('validate.success'))
          this.$emit('update:visible',false)
          this.$emit('queryFresh')
        }
      }).catch(error => {
        this.btnLoading = false
      })
    },
    getLeaderLists(){
      // 已选
      let param = {
        userId:this.userId
      }
      getLeaderList(param).then(res => {
        if(res.code == '200'){
          if(res.data){
            let lists = res.data
            if(lists.length>0){
              this.selectListKey = lists.map(item => item.id)
              this.userData.filter(obj=>!lists.some(obj1=>obj1.id==obj.id))
            }
          }
        }
      })
    },
    getAllComUsers(){
      // 公司所有成员
      getAllComUser({}).then(res => {
        if(res.code == '200'){
          if(res.data){
            this.userData = res.data
          }
        }
      })
    },
    filterMethod(query, item){
      return item.realName.indexOf(query) > -1
    }
  },
  created(){
    this.getLeaderLists()
    this.getAllComUsers()
  }
}
</script>

<style lang="scss">
</style>
