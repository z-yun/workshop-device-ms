<template>
  <el-dialog :visible.sync="visible" :title="getTitle" :before-close="handleClose" :close-on-click-modal="false" width="540px" top="10vh">
    <div class="dialog-scroll-wrap">
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="90px" class="addForm">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="addForm.description" maxlength="30" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-tree
            ref="menu"
            :data="treeData"
            show-checkbox
            node-key="id"
            :props="defaultProps">
          </el-tree>
        </el-form-item>
      </el-form>
    </div>
    <div style="text-align:right;">
      <el-button type="primary" @click="handleSubmit('addForm')" :loading="btnLoading">
        {{ $t('permission.confirm') }}
      </el-button>
      <el-button type="default" @click="handleClose">
        {{ $t('permission.cancel') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { operateMixins } from '@/mixins';
import { addRole, getMenus, roleIdList, updateRole } from '@/api/user'
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
    userInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  computed: {
    getTitle(){
      if(this.source == 'add'){
        return this.$t('permission.addUserGroup')
      }else{
        return this.$t('permission.editUserGroup')
      }
    }
  },
  mixins: [operateMixins],
  data(){
    return {
      addForm:{},
      rules:{
        name:[{ required: true, trigger: 'blur'}]
      },
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      treeData:[],
      selectIds:[],
      btnLoading:false
    }
  },
  methods:{
  	handleClose(){
  		this.$emit('update:visible',false)
  	},
    handleSubmit(form){
      this.$refs[form].validate((valid, props) => {
      	if (valid) {
          let checkedKeys = this.$refs['menu'].getCheckedKeys()
          let hafCheckedKeys = this.$refs['menu'].getHalfCheckedKeys()
          let menuIds = checkedKeys.concat(hafCheckedKeys)

          let param = {
            menuIds,
            ...this.addForm
          }
          let solveFun = addRole
          if(this.source == 'edit'){
            solveFun = updateRole
          }
          this.btnLoading = true
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
    getSelectIdList(){
      // 获取用户组分配的菜单id
      let param = {
        roleId:this.addForm.id
      }
      roleIdList(param).then(res => {
        if(res.code == '200'){
          this.selectIds = res.data
          setTimeout(() => {
            this.selectIds.forEach((i,n) => {
              var node = this.$refs['menu'].getNode(i);
              if(node && node.isLeaf){
                this.$refs['menu'].setChecked(node,true)
              }
            })
          },300)
        }
      })
    },
    getMenuList(){
      // 获取菜单权限列表
      getMenus({
        withCompanyMenu:true
      }).then(res => {
        if(res.code == '200'){
          this.treeData = res.data
        }
      })
    },
  },
  created(){
    this.getMenuList()
    if(this.source == 'edit'){
      this.addForm = JSON.parse(JSON.stringify(this.userInfo))
      this.getSelectIdList()
    }
  }
}
</script>

<style lang="scss">
</style>
