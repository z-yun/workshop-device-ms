export default {
  route: {
    dashboard: '首页',
    permission: '用户权限管理',
    rolePermission: '角色权限',
    pagePermission: '页面权限',
    directivePermission: '指令权限',
    basicData:'基本资料维护',
    accountAudit:'账号审核',
    changePwd:'修改密码',
    auditDetail:'审核详情',
    usergroup:'用户组管理',
    menuManage:'菜单管理',
    device:'设备维护',
    deviceManage:'设备信息管理',
    maintainManage:'维护计划管理',
    maintainModel:'维护模型设定',
    maintainRecord:'维护记录',
    deviceRepair:'设备维修',
    supplier:'客户关系',
    supplierManage:'客户关系管理',
    factorySetting:'工厂设定',
    productLine:'产线定义',
    tricolorLight:'三色灯定义',
    railSetting:'轨道定义',
    ioSetting:'控制器定义',
    lightParam:'系统运转参数',
    dataSetting:'数据配置管理',
    measure:'计量单位',
    category:'商品类别',
    productManage:'商品管理',
    bomManage:'BOM管理',
    warehouseManage:'仓库管理',
    purchaseManage:'采购管理',
    purchaseOrder:'采购订单',
    addPurchase:'新增采购订单',
    editPurchase:'编辑采购订单',
    addPurchaseIn:'新增采购入库单',
    editPurchaseIn:'编辑采购入库单',
    purchaseIn:'采购入库',
    saleManage:'销售管理',
    saleOrder:'销售订单',
    saleOut:'销售出库',
    addSaleOrder:'新增销售订单',
    editSaleOrder:'编辑销售订单',
    addSaleOut:'新增销售出库单',
    editSaleOut:'编辑销售出库单',
    stockManage:'库存管理',
    stockIn:'其他入库',
    stockOut:'其他出库',
    addStockIn:'新增入库单',
    editStockIn:'编辑入库单',
    addStockOut:'新增出库单',
    editStockOut:'编辑出库单',
    stockinfo:'库存信息',
    home:'首页',
    overview:'总体监控',
    detail:'监控详情',
    compare:'运转对比图',
    errorPages: '错误页面',
    page401: '401',
    page404: '404',
    errorLog: '错误日志',
    i18n: '国际化',
  },
  navbar: {
    dashboard: '首页',
    updatePwd:'修改密码',
    github: '项目地址',
    logOut: '退出登录',
    profile: '个人中心',
    size: '布局大小'
  },
  validate:{
    username:'请输入正确的用户名',
    password:'请输入不少于6位的数字',
    confirmPwd:'两次输入的密码不一致',
    code:'请输入验证码',
    phone:'请输入正确的手机号',
    telNumber:'请输入正确的电话号',
    email:'请输入正确的邮箱',
    required:'该项为必填项',
    success:'成功',
    error:'错误',
    connect:'请求失败，请检查服务器连接后重试',
    uploadSuccess:'上传成功',
    langSwitchSuccess:'语言切换成功',
    ip:'请输入正确的ip地址',
    atleastOne:'请至少选一个后重试',
    floatNumber:'请输入小数点后保留2位的数字',
  },
  login: {
    title: '车间设备管理系统',
    logIn: '登录',
    username: '账号',
    password: '密码',
    register: '注册'
  },
  register: {
    title: '欢迎注册车间设备管理系统',
    logIn: '注册',
    username: '大陆手机号，或邮箱',
    code:'输入验证码',
    getCode:'获取验证码',
    codeCount:' 秒后重试',
    password: '设置密码',
    confirmPwd: '再次输入密码',
    toLogin: '去登录'
  },
  permission: {
    addUser:'新增用户',
    editUser:'编辑用户',
    batchDelUser:'批量删除',
    addRole: '新增角色',
    editPermission: '编辑权限',
    roles: '你的权限',
    switchRoles: '切换权限',
    tips: '在某些情况下，不适合使用 v-permission。例如：Element-UI 的 el-tab 或 el-table-column 以及其它动态渲染 dom 的场景。你只能通过手动设置 v-if 来实现。',
    delete: '删除',
    confirm: '确定',
    cancel: '取消',
    confirmChage:'确认修改',
    edit:'编辑',
    reset:'重置密码',
    leader:'指定领导',
    auditBtn:'审核',
    auditDetailBtn:'详情',
    pass:'通过',
    reject:'驳回',
    rejectReason:'驳回原因',
    addUserGroup:'新增用户组',
    editUserGroup:'编辑用户组',
    assignUser:'分配用户',
    addMenu:'新增菜单',
    editMenu:'编辑菜单',
    assignMenu:'分配权限',
    sendMsg:'发送通知'
  },
  errorLog: {
    tips: '请点击右上角bug小图标',
    description: '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
    documentation: '文档介绍'
  },
  tagsView: {
    refresh: '刷新',
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  },
  settings: {
    title: '系统布局配置',
    theme: '主题色',
    tagsView: '开启 Tags-View',
    fixedHeader: '固定 Header',
    sidebarLogo: '侧边栏 Logo'
  },
  search: {
    query:'查询',
    reset:'重置'
  },
  btn:{
    look:'查看',
    add:'新增',
    batchDelete:'批量删除',
    edit:'编辑',
    confirm:'确认',
    cancel:'取消',
    save:'保存',
    update:'修改',
    remove:'删除',
    pass:'通过',
    reject:'驳回',
    audit:'审核',
    detail:'详情',
    close:'关闭',
    tbAdd:'添加',
    saveAndAdd:'保存并继续添加'
  },
  device:{
    addDevice:'新增设备',
    updateDevice:'编辑设备',
    addTodayTask:'生成今日维护任务',
    addPlan:'新增计划',
    updatePlan:'编辑计划',
    addModel:'新增模型',
    updateModel:'修改模型',
    applyModel:'套用模型',
    maintainDetail:'维护明细',
    addMaintain:'新增维护项',
    updateMaintain:'修改维护项',
    addRepair:'新增设备维修',
    updateRepair:'修改设备维修',
    maintainModel:'维护模型',
    apply:'套用',
    recordDetail:'维护记录详情'
  },
  supplier:{
    add:'新增客户',
    edit:'编辑客户',
    addUser:'新增人员',
    editUser:'编辑人员',
    userInfo:'人员信息',
    voteInfo:'开票信息'
  },
  factory:{
    addLine:'新增产线',
    editLine:'编辑产线',
    sort:'轨道机台排序',
    addLight:'新增三色灯',
    editLight:'编辑三色灯',
    addRail:'新增轨道',
    editRail:'编辑轨道',
    addIo:'新增控制器',
    editIo:'编辑控制器',
    addParam:'新增参数',
    editParam:'编辑参数',
    excode:'异常编码定义',
    watchDetail:'监视显示项目'
  },
  psi:{
    addMeasure:'新增单位',
    editMeasure:'编辑单位',
    addCategory:'新增类别',
    editCategory:'编辑类别',
    addProduct:'新增商品',
    editProduct:'编辑商品',
    addWarehouse:'新增仓库',
    editWarehouse:'编辑仓库',
    addBom:'新增BOM',
    editBom:'编辑BOM',
    addPurchase:'新增采购订单',
    editPurchase:'编辑采购订单',
    purchaseInfo:'采购信息',
    purchaseDetail:'采购明细',
    addProducts:'添加商品',
    selectGoods:'选择商品',
    busiInfo:'业务信息',
    payInfo:'付款信息',
    addPurchaseIn:'新增采购入库单',
    editPurchaseIn:'编辑采购入库单',
    stockInInfo:'入库信息',
    stockInDetail:'入库明细',
    selectPurchasesOrder:'选择采购订单',
    stockIn:'入库',
    cancelStockIn:'取消入库',
    stockOut:'出库',
    cancelStockOut:'取消出库',
    childDetail:'子件明细',
    addSaleOrder:'新增销售订单',
    editSaleOrder:'编辑销售订单',
    addSaleOut:'新增销售出库单',
    editSaleOut:'编辑销售出库单',
    saleInfo:'销售信息',
    saleDetail:'销售明细',
    receiveInfo:'收款信息',
    stockOutInfo:'出库信息',
    stockOutDetail:'出库明细',
    selectSaleOrder:'选择销售订单',
    addStockIn:'新增入库单',
    editStockIn:'编辑入库单',
    addStockOut:'新增出库单',
    editStockOut:'编辑出库单',
    stockInQuatity:'本次入库数量不可大于剩余可入库数量！',
    stockOutQuatity:'本次出库数量不可大于剩余可出库数量！',
  },
  system:{
    name:'车间设备管理系统'
  },
  notFound:{
    title:'页面找不到了',
    noAuthor:'你没有进入该页面权限，请联系管理员后重试',
    back:'返回登录页'
  }
}
