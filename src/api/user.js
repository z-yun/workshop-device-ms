import request from '@/utils/request'
import qs from 'qs'

// 登录
export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data:qs.stringify(data),
    headers: {
    	'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 获取个人信息
export function getUserInfo() {
  return request({
    url: '/auth/my_info',
    method: 'post'
  })
}

// 查看公司列表
export function getCompanyList() {
  return request({
    url: '/list',
    method: 'post'
  })
}

// 我的菜单
export function getAuthMenus() {
  return request({
    url: '/auth/menu',
    method: 'post'
  })
}

// 修改密码
export function updatePassword(data) {
  return request({
    url: '/auth/update_password',
    method: 'post',
    data
  })
}

// 注册
export function registerUser(data) {
  return request({
    url: '/register/register',
    method: 'post',
    data
  })
}

// 发送验证码
export function sendRegisterCode(data) {
  return request({
    url: '/register/send_code',
    method: 'post',
    data
  })
}

// 注册公司
export function registerCompany(data) {
  return request({
    url: '/register_company/register',
    method: 'post',
    data
  })
}

// 查看注册公司列表
export function registerCompanyList(data) {
  return request({
    url: '/register_company/list',
    method: 'post',
    data
  })
}

// 查看申请注册详情
export function registerViewDetail(data) {
  return request({
    url: '/register_company/view',
    method: 'post',
    data
  })
}

// 申请注册通过
export function registerComPass(data) {
  return request({
    url: '/register_company/pass',
    method: 'post',
    data
  })
}

// 申请注册驳回
export function registerComReject(data) {
  return request({
    url: '/register_company/reject',
    method: 'post',
    data
  })
}

// 保存公司菜单权限
export function saveCompanyMenu(data) {
  return request({
    url: '/register_company/save_company_menu',
    method: 'post',
    data
  })
}

// 公司审核通过发送通知
export function sendSuccessMsg(data) {
  return request({
    url: '/register_company/send_success_msg',
    method: 'post',
    data
  })
}

// 用户列表
export function getUserList(data) {
  return request({
    url: '/user/list',
    method: 'post',
    data
  })
}

// 新增用户
export function addUser(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

// 修改用户
export function updateUser(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}


// 删除用户
export function delUsers(data) {
  return request({
    url: '/user/remove',
    method: 'post',
    data
  })
}

// 查看用户
export function viewUser(data) {
  return request({
    url: '/user/view',
    method: 'post',
    data
  })
}

// 重置密码
export function resetPassword(data) {
  return request({
    url: '/user/reset_password',
    method: 'post',
    data
  })
}

// 查看全公司用户
export function getAllComUser(data) {
  return request({
    url: '/user/list_company_user',
    method: 'post',
    data
  })
}

// 查询领导列表
export function getLeaderList(data) {
  return request({
    url: '/user/list_leaders',
    method: 'post',
    data
  })
}

// 保存领导
export function saveLeaderIds(data) {
  return request({
    url: '/user/save_leaders',
    method: 'post',
    data
  })
}

// 查询用户组列表
export function getRoleList(data) {
  return request({
    url: '/role/list',
    method: 'post',
    data
  })
}

// 新增用户组
export function addRole(data) {
  return request({
    url: '/role/add',
    method: 'post',
    data
  })
}

// 修改用户组
export function updateRole(data) {
  return request({
    url: '/role/update',
    method: 'post',
    data
  })
}

// 查看用户组的权限id列表
export function roleIdList(data) {
  return request({
    url: '/role/list_menu_ids_by_role',
    method: 'post',
    data
  })
}

// 删除用户组
export function delRoles(data) {
  return request({
    url: '/role/remove',
    method: 'post',
    data
  })
}

// 查看用户组下的用户id列表
export function rolesUserId(data) {
  return request({
    url: '/role/list_user_ids_by_role',
    method: 'post',
    data
  })
}

// 查询用户组下的用户
export function getRolesUser(data) {
  return request({
    url: '/user/list_user_by_role',
    method: 'post',
    data
  })
}

// 保存用户组下的用户id列表
export function saveRoleUserIds(data) {
  return request({
    url: '/role/save_user_role',
    method: 'post',
    data
  })
}

// 菜单管理列表
export function getMenus(data) {
  return request({
    url: '/menu/list',
    method: 'post',
    data
  })
}

// 新增菜单
export function addMenus(data) {
  return request({
    url: '/menu/save',
    method: 'post',
    data
  })
}

// 删除菜单
export function delMenus(data) {
  return request({
    url: '/menu/remove',
    method: 'post',
    data
  })
}

// 查看菜单详情
export function viewMenu(data) {
  return request({
    url: '/menu/view',
    method: 'post',
    data
  })
}
