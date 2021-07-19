<template>
  <el-dialog :visible.sync="visible" :title="infoObj.name" :before-close="handleClose" :close-on-click-modal="false" width="540px" top="10vh">
    <div class="dialog-scroll-wrap">
      <div class="sortTip">拖拽进行轨道机台排序</div>
      <draggable :set-data="setData" :list="datalist" group="article" class="dragList">
        <div v-for="item in datalist" :key="item.id" class="list-item">
          <div class="list-item-handle">
            {{ item.name }}
          </div>
        </div>
      </draggable>
    </div>
    <div style="text-align:right;">
      <el-button type="primary" @click="handleSubmit" :loading="btnLoading">
        {{ $t('btn.confirm') }}
      </el-button>
      <el-button type="default" @click="handleClose">
        {{ $t('btn.cancel') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { listSort, saveSort } from '@/api/factory'
import draggable from 'vuedraggable'

export default{
  components:{ draggable },
  props:{
    visible: {
    	type: Boolean,
    	default: false
    },
    infoObj:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return {
      addForm:{},
      rules:{
        name:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}]
      },
      btnLoading:false,
      datalist:[],
      listLoading:false
    }
  },
  methods:{
  	handleClose(){
  		this.$emit('update:visible',false)
  	},
    handleSubmit(){
      this.btnLoading = true
      let items = this.datalist.map(item=>{
        return {
          targetId:item.targetId,
          targetType:item.targetType
        }
      })
      let param = {
        items,
        lineId:this.infoObj.id
      }
      saveSort(param).then(res => {
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
    getList(){
      let lineId = this.infoObj.id
      listSort({lineId}).then(res => {
        this.listLoading = false
        if(res.code == '200'){
          this.datalist = res.data
        }
      }).catch(error => {
        this.listLoading = false
      })
    },
    setData(dataTransfer) {
      // to avoid Firefox bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      dataTransfer.setData('Text', '')
    }
  },
  created(){
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
.sortTip{
  color: #303133;
  font-size: 14px;
  text-align: center;
}
.dragList{
  margin: 12px auto;
  width:400px;
  .list-item{
    margin-bottom: 8px;
    padding: 0 12px;
    height: 36px;
    color: #303133;
    line-height: 36px;
    border: 1px solid #E4E7ED;
    border-radius: 5px;
    cursor: all-scroll;
  }
}
</style>
