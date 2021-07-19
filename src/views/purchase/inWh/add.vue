<template>
  <div class="app-container detail">
    <el-form :model="addForm" :rules="rules" ref="addForm" label-width="110px" class="addForm search-form">
      <!-- 入库信息 -->
      <div class="app-container-box">
        <h4 class="title">{{$t('psi.stockInInfo')}}</h4>
        <el-row>
          <el-col :span="8">
            <el-form-item label="入库单号">
              <el-input v-if="source=='edit'" v-model="addForm.purchaseStockInId" disabled placeholder="请输入" />
              <el-input v-else disabled placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收货人" prop="receiverId">
              <el-select v-model="addForm.receiverId" placeholder="请选择">
                <el-option
                  v-for="(item,index) in userList"
                  :key="index"
                  :label="item.realName"
                  :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入库日期" prop="stockDate">
              <el-date-picker
                v-model="addForm.stockDate"
                type="date"
                placeholder="入库日期"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
           <el-form-item label="入库仓库">
             <el-select v-model="addForm.warehouseId" placeholder="请选择">
               <el-option
                 v-for="(item,index) in warehouseList"
                 :key="index"
                 :label="item.name"
                 :value="item.id"></el-option>
             </el-select>
           </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="入库金额">
              <el-input v-model="addForm.stockAmount" disabled placeholder="请输入" />
            </el-form-item>
          </el-col> -->
        </el-row>
      </div>
      <!-- 入库明细 -->
      <div class="app-container-box">
        <h4 class="title">
          <span>{{$t('psi.stockInDetail')}}</span>
          <el-button type="default" @click="handleAdd">
            {{ choosePurchaseBtn }}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
        </h4>
        <el-table
          :data="products"
          class="mbt-24"
          border
          show-summary
          :summary-method="getSummaries">
          <el-table-column label="序号" fixed="left">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="商品编号" prop="id"></el-table-column>
          <el-table-column label="商品名称" prop="name" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="商品类别">
            <template slot-scope="{row}">
              <div v-if="row.category">{{row.category.name}}</div>
            </template>
          </el-table-column>
          <el-table-column label="计量单位">
            <template slot-scope="{row}">
              <div v-if="row.measure">{{row.measure.name}}</div>
            </template>
          </el-table-column>
          <el-table-column label="规格" prop="specification" width="100"></el-table-column>
          <el-table-column label="品牌" prop="brand"></el-table-column>
          <el-table-column label="供应商" :show-overflow-tooltip="true">
            <template slot-scope="{row}">
              <div v-if="row.supplier">{{ row.supplier.name }}</div>
            </template>
          </el-table-column>
          <!-- <el-table-column label="采购单价(元)" prop="purchasePrice" width="130"></el-table-column> -->
          <!-- <el-table-column label="销售单价(元)" prop="salePrice" width="130"></el-table-column> -->
          <el-table-column label="数量" prop="quantity" width="120"></el-table-column>
          <el-table-column label="已入库数" prop="finishQuantity" width="120"></el-table-column>
          <el-table-column label="可入库数" prop="remainQuantity" width="120">
            <template slot-scope="{row}">
              <template v-if="row.edit">
                <el-input class="tb-input" v-model.number="row.remainQuantity" placeholder="请输入数量" />
              </template>
              <template v-else>{{ row.remainQuantity }}</template>
            </template>
          </el-table-column>
          <!-- <el-table-column label="金额" prop="amount" width="140" :formatter="formatAmount"></el-table-column> -->
          <el-table-column label="操作" fixed="right" min-width="120">
            <template slot-scope="scope" v-if="source=='edit'">
              <el-button v-if="scope.row.status==0" type="text" size="small" @click="handleStockIn(scope.row,1)">
                {{ $t('psi.stockIn') }}
              </el-button>
              <el-button v-if="scope.row.edit" type="text" size="small" @click="handleSave(scope)">
                {{ $t('btn.save') }}
              </el-button>
              <el-button v-if="!scope.row.edit&&scope.row.status!=1" type="text" size="small" @click="handleEdit(scope)">
                {{ $t('btn.update') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 业务信息 -->
      <div class="app-container-box">
        <h4 class="title">{{$t('psi.busiInfo')}}</h4>
        <el-row>
          <el-col :span="8" v-if="source=='edit'">
            <el-form-item label="操作员">
              <el-input v-if="addForm.updateUser" disabled v-model="addForm.updateUser.realName" />
              <el-input v-else disabled />
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="source=='edit'">
            <el-form-item label="上次更新时间">
              <el-input disabled v-model="addForm.updateTime" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备注">
              <el-input type="textarea" v-model="addForm.remark" />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="footer">
        <el-button type="primary" @click="handleSubmit('addForm')">
          {{ $t('btn.save') }}
        </el-button>
        <el-button type="default" @click="handleClose" >
          {{ $t('btn.cancel') }}
        </el-button>
      </div>
    </el-form>
    <!-- 选择采购订单 -->
    <selectPurchaseOrder v-if="detailVisible" :visible.sync="detailVisible" @listFresh="confirmAdd"></selectPurchaseOrder>
  </div>
</template>

<script>
import { getAllComUser } from '@/api/user'
import { getWarehouseList, savePurchaseStockIn, viewPurchaseStockIn, viewPurchaseOrder, purchaseStockIn } from '@/api/psi'
import selectPurchaseOrder from './dialog/selectPurchaseOrder'

export default {
  name:'addPurchase',
  components:{ selectPurchaseOrder },
  data() {
    return {
      id:'',
      addForm:{},
      rules:{
        purchaseUserId:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}],
        stockDate:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}],
        paidAmount:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}]
      },
      userList:[],
      warehouseList:[],
      products:[],
      detailVisible:false,
      source:'add',
      choosePurchaseBtn:'请选择采购订单'
    }
  },
  methods:{
    handleClose(){
      //关闭当前tab
      this.$store.dispatch('tagsView/delView', this.$route)
      this.$router.go(-1)
    },
    handleSubmit(form){
      this.$refs[form].validate((valid, props) => {
      	if (valid) {
          let purchaseStockIn = {...this.addForm}
          if(purchaseStockIn.status){
            purchaseStockIn.status = purchaseStockIn.status.code
          }
          savePurchaseStockIn({purchaseStockIn}).then(res => {
            this.btnLoading = false
            if(res.code == '200'){
              this.$message.success(this.$t('validate.success'))
              this.$store.dispatch('tagsView/delView', this.$route)
              this.$router.go(-1)
            }
          }).catch(error => {
            this.btnLoading = false
          })
      	}
      })
    },
    queryAllUser(){
      // 查询本公司所有员工
      getAllComUser({}).then(res => {
        if(res.code == '200'){
          this.userList = res.data
        }
      })
    },
    queryWarehouseList(){
      // 查询仓库列表
      let param = {
        size:-1
      }
      getWarehouseList(param).then(res => {
        if(res.code == '200'){
          this.warehouseList = res.data.records
        }
      })
    },
    handleAdd(){
      // 新增项
      this.detailVisible = true
    },
    handleEdit(scope){
      // 修改表格行
      scope.row.edit = true
    },
    handleSave(scope){
      // 保存表格行
      scope.row.edit = false
    },
    handleStockIn(row,status){
      // 入库、取消操作
      if(status == 0){
        // 入库
        if(row.quantity > row.remainQuantity){
          this.$message.info(this.$t('psi.stockInQuatity'))
          return false
        }
      }
      let param = {
        purchaseOrderProductId:row.purchaseOrderProductId,
        purchaseStockInId:this.id,
        purchaseOrderId:this.addForm.purchaseOrderId,
        quantity:row.quantity,
        status:status,
        warehouseId:this.addForm.warehouseId
      }
      purchaseStockIn(param).then(res => {
        if(res.code == '200'){
          this.$message.success(this.$t('validate.success'))
          this.queryPurchaseStockIn()
        }
      })
    },
    confirmAdd(id){
      // 确认选择采购单
      this.choosePurchaseBtn = id
      this.addForm.purchaseOrderId = id
      this.queryPurchaseOrder()
    },
    formatAmount(row, column){
      return (row.quantity*row.purchasePrice).toFixed(2)
    },
    getSummaries(param){
      //自定义表格合计规则
      const { columns, data } = param
      const sums = []
      let values = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价'
          return
        }
        if(column.property == 'amount'){
          values = data.map(item => Number(item.quantity * item.purchasePrice))
        } else {
          values = data.map(item => Number(item[column.property]))
        }
        if(column.property == 'quantity' || column.property == 'amount' || column.property == 'finishQuantity' || column.property == 'remainQuantity'){
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0);
          sums[index]
        } else {
          sums[index] = ''
        }
      })

      return sums
    },
    queryPurchaseOrder(){
      // 查询采购订单详情
      let param = {
        purchaseOrderId:this.addForm.purchaseOrderId
      }
      viewPurchaseOrder(param).then(res => {
        if(res.code == '200'){
          let products = JSON.parse(JSON.stringify(res.data.products))
          this.products = []
          for(let i=0;i<products.length;i++){
            let obj = {...products[i].product}
            obj.quantity = products[i].quantity
            obj.status = products[i].status.code
            obj.purchaseOrderProductId = products[i].purchaseOrderProductId
            obj.finishQuantity = products[i].finishQuantity
            obj.remainQuantity = products[i].remainQuantity
            obj.edit = false
            this.products.push(obj)
          }
        }
      })
    },
    queryPurchaseStockIn(){
      // 查询采购入库订单详情
      let param = {
        purchaseStockInId:this.id
      }
      viewPurchaseStockIn(param).then(res => {
        if(res.code == '200'){
          this.addForm = JSON.parse(JSON.stringify(res.data.purchaseStockIn))
          let products = JSON.parse(JSON.stringify(res.data.products))
          this.products = []
          for(let i=0;i<products.length;i++){
            let obj = {...products[i].product}
            obj.quantity = products[i].quantity
            obj.status = products[i].status.code
            obj.purchaseOrderProductId = products[i].purchaseOrderProductId
            obj.finishQuantity = products[i].finishQuantity
            obj.remainQuantity = products[i].remainQuantity
            obj.edit = false
            this.products.push(obj)
          }
          this.choosePurchaseBtn = this.addForm.purchaseOrderId
        }
      })
    }
  },
  created(){
    this.queryAllUser()
    this.queryWarehouseList()
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.source = 'edit'
      this.queryPurchaseStockIn()
    }
  }
}
</script>

<style lang="scss">
.title{
  .el-input{
    width: 88px;
  }
}
.el-input.tb-input{
  width: 80px;
}

</style>
<style lang="scss" scoped>
.detail{
  padding-bottom: 60px;
  .app-container-box{
    padding: 0 20px 20px 20px;
  }
  .addForm{
    padding: 0;
  }
  .title{
    line-height: 60px;
    .el-button{
      margin-left: 16px;
    }
    .el-select{
      margin-left: 16px;
      width: 88px;

    }
  }
  .footer{
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 12px 20px;
    width: 100%;
    background-color: #fff;
    text-align: right;
  }
}
</style>
