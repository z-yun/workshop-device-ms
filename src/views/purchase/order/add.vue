<template>
  <div class="app-container detail">
    <el-form :model="addForm" :rules="rules" ref="addForm" label-width="110px" class="addForm search-form">
      <!-- 采购信息 -->
      <div class="app-container-box">
        <h4 class="title">{{$t('psi.purchaseInfo')}}</h4>
        <el-row>
          <el-col :span="8">
            <el-form-item label="采购订单号">
              <el-input v-if="source=='edit'" v-model="addForm.purchaseOrderId" disabled placeholder="请输入" />
              <el-input v-else disabled placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="采购员" prop="purchaseUserId">
              <el-select v-model="addForm.purchaseUserId" placeholder="请选择">
                <el-option
                  v-for="(item,index) in userList"
                  :key="index"
                  :label="item.realName"
                  :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="采购日期" prop="purchaseDate">
              <el-date-picker
                v-model="addForm.purchaseDate"
                type="date"
                placeholder="采购日期"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="到货日期">
              <el-date-picker
                v-model="addForm.deliveryDate"
                type="date"
                placeholder="采购日期"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="供应商">
              <el-select v-model="addForm.supplierId" placeholder="请选择">
                <el-option
                  v-for="(item,index) in supplierList"
                  :key="index"
                  :label="item.name"
                  :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
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
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="状态" prop="orderStatus">
              <el-select v-model="addForm.orderStatus" placeholder="状态">
                <el-option
                  v-for="(item,index) in orderStatusOptions"
                  :key="index"
                  :label="item.desc"
                  :value="item.code"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="8">
            <el-form-item label="入库状态" prop="stockStatus">
              <el-select v-model="addForm.stockStatus" placeholder="入库状态">
                <el-option
                  v-for="(item,index) in stockStatusOptions"
                  :key="index"
                  :label="item.desc"
                  :value="item.code"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row> -->
      </div>
      <!-- 采购明细 -->
      <div class="app-container-box">
        <h4 class="title">
          <span>{{$t('psi.purchaseDetail')}}</span>
          <el-button type="primary" @click="handleAdd">
            {{ $t('psi.addProducts') }}
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
          <el-table-column label="商品名称" prop="name"></el-table-column>
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
          <el-table-column label="采购单价(元)" prop="purchasePrice" width="130"></el-table-column>
          <el-table-column label="销售单价(元)" prop="salePrice" width="130"></el-table-column>
          <el-table-column label="数量" width="120">
            <template slot-scope="{row}">
              <template v-if="row.edit">
                <el-input class="tb-input" v-model.number="row.quantity" placeholder="请输入数量" />
              </template>
              <template v-else>{{ row.quantity }}</template>
            </template>
          </el-table-column>
          <el-table-column label="金额" prop="amount" width="140" :formatter="formatAmount"></el-table-column>
          <el-table-column label="操作" fixed="right" min-width="120">
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-button type="text" size="small" @click="handleSave(scope)">
                  {{ $t('btn.save') }}
                </el-button>
                <el-button type="text" size="small" @click="handleSave(scope)">
                  {{ $t('btn.cancel') }}
                </el-button>
              </template>
              <template v-else>
                <el-button type="text" size="small" @click="handleEdit(scope)">
                  {{ $t('btn.update') }}
                </el-button>
                <el-button type="text" class="danger-txt" size="small" @click="handleRemove(scope)">
                  {{ $t('btn.remove') }}
                </el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 付款信息 -->
      <!-- <div class="app-container-box">
        <h4 class="title">
          <span>{{$t('psi.payInfo')}}</span>
          <el-select v-model="addForm.payStatus" placeholder="付款状态">
            <el-option
              v-for="(item,index) in payStatusOption"
              :key="index"
              :label="item.desc"
              :value="item.code"></el-option>
          </el-select>
        </h4>
        <el-row v-if="addForm.payStatus==1">
          <el-col :span="8">
            <el-form-item label="总金额">
              <el-input disabled v-model="addForm.totalAmount" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="已付款(元)" prop="paidAmount">
              <el-input v-model.number="addForm.paidAmount" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="未付款(元)">
              <el-input disabled v-model="addForm.unpaidAmount" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="addForm.payStatus==1">
          <el-col :span="8">
            <el-form-item label="计划付款日期">
              <el-date-picker
                v-model="addForm.planPayDate"
                type="date"
                placeholder="计划付款日期"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实际付款日期">
              <el-date-picker
                v-model="addForm.actualPayDate"
                type="date"
                placeholder="实际付款日期"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </div> -->
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
    <!-- 选择商品 -->
    <selectGoods v-if="detailVisible" :visible.sync="detailVisible" @listFresh="confirmAdd" :excludeProductIds="excludeProductIds"></selectGoods>
  </div>
</template>

<script>
import { getAllComUser } from '@/api/user'
import { getSupplierList } from '@/api/device'
import { getWarehouseList, savePurchaseOrder, viewPurchaseOrder } from '@/api/psi'
import selectGoods from '@/components/SelectGoods'

export default {
  name:'addPurchase',
  components:{ selectGoods },
  data() {
    return {
      id:'',
      addForm:{
        updateUser:{},
        payStatus:0
      },
      rules:{
        purchaseUserId:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}],
        purchaseDate:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}],
        paidAmount:[{ required: true, trigger: 'blur', message:this.$t('validate.required')}]
      },
      userList:[],
      supplierList:[],
      warehouseList:[],
      orderStatusOptions:[
        {desc:'开立',code:0},
        {desc:'驳回',code:1},
        {desc:'审核',code:2},
        {desc:'下单',code:3},
        {desc:'交货',code:4},
        {desc:'验收',code:5},
        {desc:'付款',code:6},
        {desc:'结案',code:7},
      ],
      products:[],
      detailVisible:false,
      payStatusOption:[
        {desc:'未付款',code:0},
        {desc:'已付款',code:1}
      ],
      source:'add',
      excludeProductIds:[]//已选商品列表
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
          let products = this.products.map(item=>{
            if(this.source == 'edit'){
              return {
                productId:item.id,
                quantity:item.quantity,
                purchaseOrderProductId:item.purchaseOrderProductId
              }
            } else {
              return {
                productId:item.id,
                quantity:item.quantity
              }
            }
          })
          if(this.addForm.supplier){
            if(this.addForm.supplier.type){
              this.addForm.supplier.type = this.addForm.supplier.type.code
            }
          }
          let param = {
            products,
            purchaseOrder:{...this.addForm}
          }
          savePurchaseOrder(param).then(res => {
            this.btnLoading = false
            if(res.code == '200'){
              this.$message.success(this.$t('validate.success'))
              this.$store.dispatch('tagsView/delView', this.$route)
              this.$router.push({
                path: '/purchase/order'
              })
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
    querySupplierList(){
      // 查询供应商
      let param = {
        size:-1,
        type:1
      }
      getSupplierList(param).then(res => {
        if(res.code == '200'){
          this.supplierList = res.data
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
      this.excludeProductIds = []
      this.products.forEach(item => {
      	this.excludeProductIds.push(item.id)
      })
    },
    handleEdit(scope){
      // 修改表格行
      scope.row.edit = true
    },
    handleSave(scope){
      // 保存表格行
      scope.row.edit = false
    },
    handleRemove(scope){
      // 删除表格行
      this.$confirm('是否确认删除？删除后不可撤回！')
      .then(_ => {
        this.products.splice(scope.$index,1)
      })
    },
    confirmAdd(goodslist){
      // 确认添加商品
      for(let i=0;i<goodslist.length;i++){
        let obj = {...goodslist[i]}
        obj.quantity = 0
        obj.edit = false
        this.products.push(obj)
      }
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
        if(column.property == 'quantity' || column.property == 'amount'){
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
    queryPurchaseOrderDetail(){
      // 查询采购订单详情
      let param = {
        purchaseOrderId:this.id
      }
      viewPurchaseOrder(param).then(res => {
        if(res.code == '200'){
          this.addForm = JSON.parse(JSON.stringify(res.data.purchaseOrder))
          if(this.addForm.payStatus){
            this.addForm.payStatus = this.addForm.payStatus.code
          }
          if(this.addForm.stockStatus){
            this.addForm.stockStatus = this.addForm.stockStatus.code
          }
          if(this.addForm.orderStatus){
            this.addForm.orderStatus = this.addForm.orderStatus.code
          }
          let products = JSON.parse(JSON.stringify(res.data.products))
          for(let i=0;i<products.length;i++){
            let obj = {...products[i].product}
            obj.quantity = products[i].quantity
            obj.purchaseOrderProductId = products[i].purchaseOrderProductId
            obj.edit = false
            this.products.push(obj)
          }
        }
      })
    },
  },
  created(){
    this.queryAllUser()
    this.querySupplierList()
    this.queryWarehouseList()
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.source = 'edit'
      this.queryPurchaseOrderDetail()
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
