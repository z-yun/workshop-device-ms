import request from '@/utils/request'
import qs from 'qs'

// 查询设备列表
export function getDeviceList(data) {
  return request({
    url: '/device/list_device',
    method: 'post',
    data
  })
}

// 新增设备
export function addDevice(data) {
  return request({
    url: '/device/add_device',
    method: 'post',
    data
  })
}

// 修改设备
export function updateDevice(data) {
  return request({
    url: '/device/update_device',
    method: 'post',
    data
  })
}

// 删除设备
export function delDevices(data) {
  return request({
    url: '/device/remove_device',
    method: 'post',
    data
  })
}

// 查看设备详情
export function viewDevice(data) {
  return request({
    url: '/device/view_device',
    method: 'post',
    data
  })
}

// 查询购买方式
export function purchaseType() {
  return request({
    url: '/device/list_purchase_type',
    method: 'post'
  })
}

// 查询设备类型
export function deviceType() {
  return request({
    url: '/device/list_device_type',
    method: 'post'
  })
}

// 查询维护计划列表
export function getMaintainPlanList(data) {
  return request({
    url: '/device/maintain_plan/list',
    method: 'post',
    data
  })
}

// 新增维护计划
export function addMaintainPlan(data) {
  return request({
    url: '/device/maintain_plan/add',
    method: 'post',
    data
  })
}

// 修改维护计划
export function updateMaintainPlan(data) {
  return request({
    url: '/device/maintain_plan/update',
    method: 'post',
    data
  })
}

// 删除维护计划
export function delMaintainPlan(data) {
  return request({
    url: '/device/maintain_plan/delete',
    method: 'post',
    data
  })
}

// 查看维护计划详情
export function viewMaintainPlan(data) {
  return request({
    url: '/device/maintain_plan/view',
    method: 'post',
    data
  })
}

// 生成今日维护计划
export function addMaintainPlanTask(data) {
  return request({
    url: '/device/maintain_plan/add_task',
    method: 'post',
    data
  })
}

// 查询维护模型列表
export function getMaintainModelList(data) {
  return request({
    url: '/device/maintain_model/list',
    method: 'post',
    data
  })
}

// 新增维护模型
export function addMaintainModel(data) {
  return request({
    url: '/device/maintain_model/add',
    method: 'post',
    data
  })
}

// 修改维护模型
export function updateMaintainModel(data) {
  return request({
    url: '/device/maintain_model/update',
    method: 'post',
    data
  })
}

// 删除维护模型
export function delMaintainModel(data) {
  return request({
    url: '/device/maintain_model/delete',
    method: 'post',
    data
  })
}

// 查看维护模型详情
export function viewMaintainModel(data) {
  return request({
    url: '/device/maintain_model/view',
    method: 'post',
    data
  })
}

// 模型-确认方式
export function modelComfirmType(data) {
  return request({
    url: '/device/maintain_model/list_confirm_type',
    method: 'post',
    data
  })
}

// 模型-周期单位
export function modelCycleUnit(data) {
  return request({
    url: '/device/maintain_model/list_cycle_unit',
    method: 'post',
    data
  })
}

// 模型-维护类型
export function modelType(data) {
  return request({
    url: '/device/maintain_model/list_type',
    method: 'post',
    data
  })
}

// 查询维护记录列表
export function getMaintainRecordList(data) {
  return request({
    url: '/device/maintain_record/list',
    method: 'post',
    data
  })
}

// 审核维护记录
export function auditRecord(data) {
  return request({
    url: '/device/maintain_record/audit_record',
    method: 'post',
    data
  })
}

// 查看维护记录详情
export function viewRecord(data) {
  return request({
    url: '/device/maintain_record/view',
    method: 'post',
    data
  })
}

// 查询设备维修列表
export function getDeviceRepairList(data) {
  return request({
    url: '/device/repair/list_repair',
    method: 'post',
    data
  })
}

// 新增、编辑设备维修
export function saveDeviceRepair(data) {
  return request({
    url: '/device/repair/save_repair',
    method: 'post',
    data
  })
}

// 删除设备维修
export function delDeviceRepair(data) {
  return request({
    url: '/device/repair/remove_repair',
    method: 'post',
    data
  })
}

// 维修-查询设备
export function getRepairDeviceByNo(data) {
  return request({
    url: '/app/repair/get_device',
    method: 'post',
    data
  })
}

// 查询供应商列表-分页
export function getSupplierListByPage(data) {
  return request({
    url: '/device/supplier/page',
    method: 'post',
    data
  })
}

// 查询供应商列表
export function getSupplierList(data) {
  return request({
    url: '/device/supplier/list',
    method: 'post',
    data
  })
}

// 新增、编辑供应商
export function saveSupplier(data) {
  return request({
    url: '/device/supplier/save',
    method: 'post',
    data
  })
}

// 删除供应商
export function delSupplier(data) {
  return request({
    url: '/device/supplier/remove',
    method: 'post',
    data
  })
}

// 查询供应商详情
export function viewSupplier(data) {
  return request({
    url: '/device/supplier/view',
    method: 'post',
    data
  })
}
