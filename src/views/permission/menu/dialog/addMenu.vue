<template>
  <el-dialog :visible.sync="visible" :title="getTitle" :before-close="handleClose" :close-on-click-modal="false" width="540px">
    <el-form :model="addForm" :rules="rules" ref="addForm" label-width="90px" class="addForm">
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="addForm.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="菜单图标">
        <el-input v-model="addForm.icon" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="菜单级别">
        <el-select v-model="menuLevel" placeholder="请选择" @change="changeLevel">
          <el-option label="一级菜单" :value="0"></el-option>
          <el-option label="二级菜单" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="路由名" prop="routeName">
        <el-input v-model="addForm.routeName" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="路由地址" prop="url">
        <el-input v-model="addForm.url" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="路由模板" prop="component">
        <el-input v-if="menuLevel==0" v-model="addForm.component" placeholder="一级菜单必须为Layout"></el-input>
        <el-input v-else="menuLevel==1" v-model="addForm.component" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="父菜单" v-if="menuLevel == 1" prop="parentId">
        <el-select v-model="addForm.parentId" placeholder="请选择">
          <el-option
            v-for="item in parentOptions"
            :key="item.value"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="addForm.hidden">
          <el-radio :label="false">显示</el-radio>
          <el-radio :label="true">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div style="text-align:right;">
      <el-button type="primary" @click="handleSubmit('addForm')">
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
import { getMenus, addMenus } from '@/api/user'

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
    infoObj:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  computed: {
    getTitle(){
      if(this.source == 'add'){
        return this.$t('permission.addMenu')
      }else{
        return this.$t('permission.editMenu')
      }
    }
  },
  mixins: [operateMixins],
  data(){
    return {
      addForm:{
        hidden:false,
        component:'Layout',
        icon:'',
        routeName:''
      },
      parentOptions:[],
      rules:{
        name:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}],
        routeName:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}],
        url:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}],
        component:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}],
        parentId:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}]
      },
      menuLevel:0
    }
  },
  methods:{
  	handleClose(){
  		this.$emit('update:visible',false);
  	},
    handleSubmit(form){
      this.$refs[form].validate((valid, props) => {
      	if (valid) {
          let menu = JSON.parse(JSON.stringify(this.addForm))
          let content = {
            path: menu.url,
            component: menu.component,
            name: menu.routeName,
            meta:{
              icon: menu.icon,
              title: menu.routeName,
              name: menu.name
            },
            hidden:menu.hidden
          }
          if(this.menuLevel == 0){
            menu.parentId = 0
            content.alwaysShow = true
            content.redirect = menu.url+'/index'
          }
          menu.content = JSON.stringify(content)
          // console.log(menu)
          addMenus({menu}).then(res => {
            if(res.code == '200'){
              this.$message.success(this.$t('validate.success'))
              this.$emit('update:visible',false)
              this.$emit('queryFresh')
            }
          }).catch(error => {
            this.$message.error(error.errorMsg)
          })
      	}
      })
    },
    changeLevel(val){
      //切换菜单级别
      if(val == 0){
        this.addForm.component = 'Layout'
      }else{
        this.addForm.component = ''
      }
    },
    getList(){
      let param = {
        size:-1,
        ...this.searchForm
      }
      this.listLoading = true
      getMenus(param).then(res => {
        this.listLoading = false
        if(res.code == '200'){
          this.parentOptions = res.data
        }
      }).catch(error => {
        this.listLoading = false
      })
    }
  },
  created(){
    this.getList()
    if(this.source == 'edit'){
      this.addForm = JSON.parse(JSON.stringify(this.infoObj))
     console.log(this.addForm)
      if(this.addForm.parentId ==0){
        this.menuLevel = 0
      }else{
        this.menuLevel = 1
      }
    }
  }
}
</script>

<style lang="scss">
</style>
