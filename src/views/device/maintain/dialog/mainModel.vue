<template>
  <el-dialog :visible.sync="visible" :title="$t('device.maintainModel')" :before-close="handleClose" :close-on-click-modal="false" width="540px" append-to-body>
    <div class="dialog-scroll-wrap">
      <el-table :data="dataList" class="mbt-24" border v-loading="listLoading">
        <el-table-column label="模型编号" width="100">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="模型名称">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="维护类型">
          <template slot-scope="scope">
            <div v-if="scope.row.maintainTypeVo">{{ scope.row.maintainTypeVo.name }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100px" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleApply(scope.row)">
              {{ $t('device.apply') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script>
import { getMaintainModelList } from '@/api/device'
export default{
  props:{
    visible: {
    	type: Boolean,
    	default: false
    }
  },
  data(){
    return {
      listLoading:false,
      dataList:[]
    }
  },
  methods:{
    handleClose(){
    	this.$emit('update:visible',false)
    },
    handleApply(row){
      // 套用
      this.$emit('update:visible',false)
      this.$emit('listFresh',row.id)
    },
    queryMaintainModelList(){
      // 查询模型列表
      let param = {
        size:-1
      }
      this.listLoading = true
      getMaintainModelList(param).then(res => {
        this.listLoading = false
        if(res.code == '200'){
          this.dataList = res.data.records
        }
      }).catch(error => {
        this.listLoading = false
      })
    }
  },
  created(){
    this.queryMaintainModelList()
  }
}
</script>

<style lang="scss">
.dialog-scroll-wrap{
  .el-table__body-wrapper{
    overflow: visible;
  }
  .el-table--border{
    border-right: 1px solid #dfe6ec;
    border-bottom: 1px solid #dfe6ec;
  }
}
</style>
