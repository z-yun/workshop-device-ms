<template>
  <el-dialog :visible.sync="visible" :title="$t('permission.assignUser')" :before-close="handleClose" :close-on-click-modal="false" width="540px">
    <el-transfer
      filterable
      filter-placeholder="请输入名称"
      class="my-transfer"
      v-model="selectListKey"
      :props="defaultProps"
      :filter-method="filterMethod"
      :titles="['用户列表', '组成员']"
      :data="userData">
    </el-transfer>
    <div class="text-right">
      <el-button type="primary" @click="handleSubmit">
        {{ $t('permission.confirm') }}
      </el-button>
      <el-button type="default" @click="handleClose">
        {{ $t('permission.cancel') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { rolesUserId, getAllComUser, saveRoleUserIds } from '@/api/user'
export default{
  props:{
    visible: {
    	type: Boolean,
    	default: false
    },
    userInfo:{
      type:Object,
      default(){
        return {}
      }
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
      selectListKey:[]//已选
    }
  },
  methods:{
  	handleClose(){
  		this.$emit('update:visible',false);
  	},
    handleSubmit(){
      // 确定
      let param = {
        roleId:this.userInfo.id,
        userIds:this.selectListKey
      }
      saveRoleUserIds(param).then(res => {
        if(res.code == '200'){
          this.$message.success('success')
          this.$emit('update:visible',false)
          this.$emit('queryFresh')
        }
      }).catch(error => {
        this.$message.error(error.errorMsg)
      })
    },
    getRolesUserList(){
      // 已选组成员
      let param = {
        roleId:this.userInfo.id
      }
      rolesUserId(param).then(res => {
        if(res.code == '200'){
          if(res.data){
            this.selectListKey = res.data
            if(this.selectListKey.length>0){
              this.userData.filter(obj=>!this.selectListKey.some(obj1=>obj1.id==obj.id))
            }
          }
        }
      }).catch(error => {
        this.$message.error(error.errorMsg)
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
      }).catch(error => {
        this.$message.error(error.errorMsg)
      })
    },
    filterMethod(query, item){
      return item.realName.indexOf(query) > -1
    }
  },
  created(){
    this.getRolesUserList()
    this.getAllComUsers()
  }
}
</script>

<style lang="scss">
</style>
