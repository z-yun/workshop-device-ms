import request from '@/utils/request'
import qs from 'qs'

// 查询产线列表
export function getLineList(data) {
  return request({
    url: '/factory/line/list',
    method: 'post',
    data
  })
}

// 新增、编辑产线
export function saveLine(data) {
  return request({
    url: '/factory/line/save',
    method: 'post',
    data
  })
}

// 删除产线
export function delLine(data) {
  return request({
    url: '/factory/line/remove',
    method: 'post',
    data
  })
}

// 查询产线详情
export function viewLine(data) {
  return request({
    url: '/factory/line/view',
    method: 'post',
    data
  })
}

// 排序-排序列表
export function listSort(data) {
  return request({
    url: '/factory/line/list_sort',
    method: 'post',
    data
  })
}

// 排序-保存列表
export function saveSort(data) {
  return request({
    url: '/factory/line/save_sort',
    method: 'post',
    data
  })
}

// 查询三色灯列表
export function getLightList(data) {
  return request({
    url: '/factory/light/list',
    method: 'post',
    data
  })
}

// 新增、编辑三色灯
export function saveLight(data) {
  return request({
    url: '/factory/light/save',
    method: 'post',
    data
  })
}

// 删除三色灯
export function delLight(data) {
  return request({
    url: '/factory/light/remove',
    method: 'post',
    data
  })
}

// 查询三色灯详情
export function viewLight(data) {
  return request({
    url: '/factory/light/view',
    method: 'post',
    data
  })
}

// 查询三色灯类型
export function getLightType(data) {
  return request({
    url: '/factory/light/list_type',
    method: 'post',
    data
  })
}

// 查询三色灯设置列表
export function getLightSetting(data) {
  return request({
    url: '/factory/light_color_setting/list',
    method: 'post',
    data
  })
}

// 保存三色灯设置
export function saveLightSetting(data) {
  return request({
    url: '/factory/light_color_setting/save',
    method: 'post',
    data
  })
}

// 删除三色灯设置
export function delLightSetting(data) {
  return request({
    url: '/factory/light_color_setting/remove',
    method: 'post',
    data
  })
}

// 查询三色灯颜色列表
export function getLightColorList() {
  return request({
    url: '/factory/light_color_setting/list_color_set',
    method: 'post'
  })
}

// 查询监视显示类型列表
export function getLightWatchTypeList() {
  return request({
    url: '/factory/light_show/list_type',
    method: 'post'
  })
}

// 查询监视显示设置列表
export function getLightWatchList(data) {
  return request({
    url: '/factory/light_show/list_show_setting',
    method: 'post',
    data
  })
}

// 保存监视显示设置
export function saveLightWatchList(data) {
  return request({
    url: '/factory/light_show/save_show_setting',
    method: 'post',
    data
  })
}

// 查询轨道列表
export function getRailList(data) {
  return request({
    url: '/factory/rail/list',
    method: 'post',
    data
  })
}

// 新增、编辑轨道
export function saveRail(data) {
  return request({
    url: '/factory/rail/save',
    method: 'post',
    data
  })
}

// 删除轨道
export function delRail(data) {
  return request({
    url: '/factory/rail/remove',
    method: 'post',
    data
  })
}

// 查询轨道详情
export function viewRail(data) {
  return request({
    url: '/factory/rail/view',
    method: 'post',
    data
  })
}

// 查询io控制器列表
export function getIoList(data) {
  return request({
    url: '/factory/io_config/list',
    method: 'post',
    data
  })
}

// 新增、编辑io控制器
export function saveIo(data) {
  return request({
    url: '/factory/io_config/save',
    method: 'post',
    data
  })
}

// 删除io控制器
export function delIo(data) {
  return request({
    url: '/factory/io_config/remove',
    method: 'post',
    data
  })
}

// 查询io控制器详情
export function viewIo(data) {
  return request({
    url: '/factory/io_config/view',
    method: 'post',
    data
  })
}

// 查询机台运行参数列表
export function getLightParamList(data) {
  return request({
    url: '/factory/light_param/list',
    method: 'post',
    data
  })
}

// 新增、编辑机台运行参数
export function saveLightParam(data) {
  return request({
    url: '/factory/light_param/save',
    method: 'post',
    data
  })
}

// 删除机台运行参数
export function delLightParam(data) {
  return request({
    url: '/factory/light_param/remove',
    method: 'post',
    data
  })
}

// 查询机台运行参数详情
export function viewLightParam(data) {
  return request({
    url: '/factory/light_param/view',
    method: 'post',
    data
  })
}

// 总体监控
export function getOverview(data) {
  return request({
    url: '/factory/statistics/overview',
    method: 'post',
    data
  })
}

// 新总体监控
export function getOverviewByLine(data) {
  return request({
    url: '/factory/statistics/overview_group_by_line',
    method: 'post',
    data
  })
}

// 总体监控 - 详情
export function getOverviewDetail(data) {
  return request({
    url: '/factory/statistics/detail',
    method: 'post',
    data
  })
}

// 运转对比图
export function getCompareChart(data) {
  return request({
    url: '/factory/statistics/list_light_chart',
    method: 'post',
    data
  })
}