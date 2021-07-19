<template>
  <el-dialog :visible.sync="visible" :title="$t('permission.assignMenu')" :before-close="handleClose" :close-on-click-modal="false" width="540px" top="10vh">
    <div class="dialog-scroll-wrap">
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="90px" class="addForm">
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
import { saveCompanyMenu, getMenus, roleIdList } from '@/api/user'
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
            companyId: this.addForm.companyId
          }

          this.btnLoading = true
          saveCompanyMenu(param).then(res => {
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
    getMenuList(){
      // 获取菜单权限列表
      getMenus({
        withCompanyMenu:false
      }).then(res => {
        if(res.code == '200'){
          this.treeData = res.data
        }
      })
    },
  },
  created(){
    this.getMenuList()
    this.addForm = JSON.parse(JSON.stringify(this.userInfo))
    if(this.addForm.companyMenuIds){
      this.selectIds = this.addForm.companyMenuIds
      setTimeout(() => {
        this.selectIds.forEach((i,n) => {
          var node = this.$refs['menu'].getNode(i);
          if(node.isLeaf){
            this.$refs['menu'].setChecked(node,true)
          }
        })
      },500)
    }
  }
}
</script>

<style lang="scss">
</style>
