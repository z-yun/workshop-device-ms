import request from '@/utils/request'
import qs from 'qs'

// 查询计量单位列表
export function getMeasureList(data) {
  return request({
    url: '/psi/measure/list',
    method: 'post',
    data
  })
}

// 新增、编辑计量单位
export function saveMeasure(data) {
  return request({
    url: '/psi/measure/save',
    method: 'post',
    data
  })
}

// 删除计量单位
export function delMeasure(data) {
  return request({
    url: '/psi/measure/remove',
    method: 'post',
    data
  })
}

// 查询计量单位详情
export function viewMeasure(data) {
  return request({
    url: '/psi/measure/view',
    method: 'post',
    data
  })
}

// 查询分类列表
export function getCategoryList(data) {
  return request({
    url: '/psi/category/list',
    method: 'post',
    data
  })
}

// 新增、编辑分类
export function saveCategory(data) {
  return request({
    url: '/psi/category/save',
    method: 'post',
    data
  })
}

// 删除分类
export function delCategory(data) {
  return request({
    url: '/psi/category/remove',
    method: 'post',
    data
  })
}

// 查询分类详情
export function viewCategory(data) {
  return request({
    url: '/psi/category/view',
    method: 'post',
    data
  })
}

// 查询商品列表
export function getProductList(data) {
  return request({
    url: '/psi/product/list',
    method: 'post',
    data
  })
}

// 新增、编辑商品
export function saveProduct(data) {
  return request({
    url: '/psi/product/save',
    method: 'post',
    data
  })
}

// 删除商品
export function delProduct(data) {
  return request({
    url: '/psi/product/remove',
    method: 'post',
    data
  })
}

// 查询商品详情
export function viewProduct(data) {
  return request({
    url: '/psi/product/view',
    method: 'post',
    data
  })
}

// 查询BOM列表
export function getProductBomList(data) {
  return request({
    url: '/psi/product_bom/list',
    method: 'post',
    data
  })
}

// 新增、编辑BOM
export function saveProductBom(data) {
  return request({
    url: '/psi/product_bom/save',
    method: 'post',
    data
  })
}

// 删除BOM
export function delProductBom(data) {
  return request({
    url: '/psi/product_bom/remove',
    method: 'post',
    data
  })
}

// 查询BOM详情
export function viewProductBom(data) {
  return request({
    url: '/psi/product_bom/view',
    method: 'post',
    data
  })
}

// 查询仓库列表
export function getWarehouseList(data) {
  return request({
    url: '/psi/warehouse/list',
    method: 'post',
    data
  })
}

// 新增、编辑仓库
export function saveWarehouse(data) {
  return request({
    url: '/psi/warehouse/save',
    method: 'post',
    data
  })
}

// 删除仓库
export function delWarehouse(data) {
  return request({
    url: '/psi/warehouse/remove',
    method: 'post',
    data
  })
}

// 查询仓库详情
export function viewWarehouse(data) {
  return request({
    url: '/psi/warehouse/view',
    method: 'post',
    data
  })
}

// 查询采购订单列表
export function getPurchaseOrderList(data) {
  return request({
    url: '/psi/purchase_order/list',
    method: 'post',
    data
  })
}

// 新增、编辑采购订单
export function savePurchaseOrder(data) {
  return request({
    url: '/psi/purchase_order/save',
    method: 'post',
    data
  })
}

// 删除采购订单
export function delPurchaseOrder(data) {
  return request({
    url: '/psi/purchase_order/remove',
    method: 'post',
    data
  })
}

// 查询采购订单详情
export function viewPurchaseOrder(data) {
  return request({
    url: '/psi/purchase_order/view',
    method: 'post',
    data
  })
}

// 查询采购入库列表
export function getPurchaseStockInList(data) {
  return request({
    url: '/psi/purchase_stock_in/list',
    method: 'post',
    data
  })
}

// 新增、编辑采购入库
export function savePurchaseStockIn(data) {
  return request({
    url: '/psi/purchase_stock_in/save',
    method: 'post',
    data
  })
}

// 删除采购入库
export function delPurchaseStockIn(data) {
  return request({
    url: '/psi/purchase_stock_in/remove',
    method: 'post',
    data
  })
}

// 查询采购入库详情
export function viewPurchaseStockIn(data) {
  return request({
    url: '/psi/purchase_stock_in/view',
    method: 'post',
    data
  })
}

// 采购入库、取消入库
export function purchaseStockIn(data) {
  return request({
    url: '/psi/purchase_stock_in/stock_in',
    method: 'post',
    data
  })
}

// 查询销售订单列表
export function getSaleOrderList(data) {
  return request({
    url: '/psi/sale_order/list',
    method: 'post',
    data
  })
}

// 新增、编辑销售订单
export function saveSaleOrder(data) {
  return request({
    url: '/psi/sale_order/save',
    method: 'post',
    data
  })
}

// 删除销售订单
export function delSaleOrder(data) {
  return request({
    url: '/psi/sale_order/remove',
    method: 'post',
    data
  })
}

// 查询销售订单详情
export function viewSaleOrder(data) {
  return request({
    url: '/psi/sale_order/view',
    method: 'post',
    data
  })
}

// 查询销售出库列表
export function getSaleStockOutList(data) {
  return request({
    url: '/psi/sale_stock_out/list',
    method: 'post',
    data
  })
}

// 新增、编辑销售出库
export function saveSaleStockOut(data) {
  return request({
    url: '/psi/sale_stock_out/save',
    method: 'post',
    data
  })
}

// 删除销售出库
export function delSaleStockOut(data) {
  return request({
    url: '/psi/sale_stock_out/remove',
    method: 'post',
    data
  })
}

// 查询销售出库详情
export function viewSaleStockOut(data) {
  return request({
    url: '/psi/sale_stock_out/view',
    method: 'post',
    data
  })
}

// 销售出库、取消出库
export function saleStockOut(data) {
  return request({
    url: '/psi/sale_stock_out/stock_out',
    method: 'post',
    data
  })
}

// 查询其他入库列表
export function getOtherStockInList(data) {
  return request({
    url: '/psi/other_stock_in/list',
    method: 'post',
    data
  })
}

// 新增、编辑其他入库
export function saveOtherStockIn(data) {
  return request({
    url: '/psi/other_stock_in/save',
    method: 'post',
    data
  })
}

// 删除其他入库
export function delOtherStockIn(data) {
  return request({
    url: '/psi/other_stock_in/remove',
    method: 'post',
    data
  })
}

// 查询其他入库详情
export function viewOtherStockIn(data) {
  return request({
    url: '/psi/other_stock_in/view',
    method: 'post',
    data
  })
}

// 其他入库、取消入库
export function otherStockIn(data) {
  return request({
    url: '/psi/other_stock_in/stock_in',
    method: 'post',
    data
  })
}

// 查询其他出库列表
export function getOtherStockOutList(data) {
  return request({
    url: '/psi/other_stock_out/list',
    method: 'post',
    data
  })
}

// 新增、编辑其他出库
export function saveOtherStockOut(data) {
  return request({
    url: '/psi/other_stock_out/save',
    method: 'post',
    data
  })
}

// 删除其他出库
export function delOtherStockOut(data) {
  return request({
    url: '/psi/other_stock_out/remove',
    method: 'post',
    data
  })
}

// 查询其他出库详情
export function viewOtherStockOut(data) {
  return request({
    url: '/psi/other_stock_out/view',
    method: 'post',
    data
  })
}

// 其他出库、取消出库
export function otherStockOut(data) {
  return request({
    url: '/psi/other_stock_out/stock_out',
    method: 'post',
    data
  })
}

// 查询商品库存列表
export function productStockList(data) {
  return request({
    url: '/psi/product_stock/list',
    method: 'post',
    data
  })
}