export const mockData = [
  {
    path: '/home',
    component: 'Layout',
    redirect: '/home/index',
    alwaysShow: true, // will always show the root menu
    name: 'home',
    meta: {
      title: 'home',
      icon: 'home',
      name:'首页'
    },
    children:[
      {
        path: '/home/overview',
        component: '/home/overview/index',
        name: 'overview',
        meta: {
          title: 'overview',
          name:'总体监控',
        }
      },
      {
        path: '/home/detail',
        component: '/home/overview/detail',
        name: 'detail',
        meta: {
          title: 'detail',
          name:'监控详情',
        }
      },
      {
        path: '/home/compare',
        component: '/home/compare/index',
        name: 'compare',
        meta: {
          title: 'compare',
          name:'运转对比图',
        }
      }
    ]
  },
  {
    path: '/permission',
    component: 'Layout',
    redirect: '/permission/index',
    alwaysShow: true, // will always show the root menu
    name: 'permission',
    meta: {
      title: 'permission',
      icon: 'users',
    },
    children: [
      {
        path: '/permission/index',
        component: '/permission/usergroup/index',
        name: 'usergroup',
        meta: {
          title: 'usergroup',
          name:'用户组管理',
        }
      },
      {
        path: '/permission/userbase',
        component: '/permission/userbase/index',
        name: 'basicData',
        meta: {
          title: 'basicData',
          name:'用户基本资料维护',
        }
      },
      {
        path: '/permission/change-pwd',
        component: '/permission/userbase/change-pwd',
        name: 'changePwd',
        meta: {
          title: 'changePwd',
          name:'修改密码'
        },
        hidden:true
      },
      {
        path: '/permission/audit',
        component: '/permission/audit/index',
        name: 'accountAudit',
        meta: {
          title: 'accountAudit',
          name:'账号审核'
        }
      },
      {
        path: '/permission/audit-detail',
        component: '/permission/audit/audit-detail',
        name: 'auditDetail',
        meta: {
          title: 'auditDetail',
          name:'审核详情'
        },
        hidden:true
      },
      {
        path: '/permission/menu',
        component: '/permission/menu/index',
        name: 'menuManage',
        meta: {
          title: 'menuManage',
          name:'菜单管理',
        }
      }
    ]
  },
  {
    path: '/device',
    component: 'Layout',
    redirect: '/device/index',
    alwaysShow: true, // will always show the root menu
    name: 'device',
    meta: {
      title: 'device',
      icon: 'tool',
    },
    children: [
      {
        path: '/device/index',
        component: '/device/manage/index',
        name: 'deviceManage',
        meta: {
          title: 'deviceManage',
          name:'设备信息管理',
        }
      },
      {
        path: '/device/maintain',
        component: '/device/maintain/index',
        name: 'maintainManage',
        meta: {
          title: 'maintainManage',
          name:'维护计划管理',
        }
      },
      {
        path: '/device/model',
        component: '/device/model/index',
        name: 'MaintainModel',
        meta: {
          title: 'maintainModel',
          name:'维护模型设定',
        }
      },
      {
        path: '/device/record',
        component: '/device/record/index',
        name: 'maintainRecord',
        meta: {
          title: 'maintainRecord',
          name:'维护记录',
        }
      },
      {
        path: '/device/repair',
        component: '/device/repair/index',
        name: 'deviceRepair',
        meta: {
          title: 'deviceRepair',
          name:'设备维修',
        }
      }
    ]
  },
  {
    path: '/supplier',
    component: 'Layout',
    redirect: '/supplier/index',
    alwaysShow: true, // will always show the root menu
    name: 'supplier',
    meta: {
      title: 'supplier',
      icon: 'supplier',
    },
    children:[
      {
        path: '/supplier/index',
        component: '/supplier/index',
        name: 'supplierManage',
        meta: {
          title: 'supplierManage',
          name:'供应商管理',
        }
      }
    ]
  },
  {
    path: '/factory',
    component: 'Layout',
    redirect: '/factory/index',
    alwaysShow: true, // will always show the root menu
    name: 'factorySetting',
    meta: {
      title: 'factorySetting',
      icon: 'factory',
      name:'工厂设定'
    },
    children:[
      {
        path: '/factory/line',
        component: '/factory/line/index',
        name: 'productLine',
        meta: {
          title: 'productLine',
          name:'产线定义',
        }
      },
      {
        path: '/factory/light',
        component: '/factory/light/index',
        name: 'tricolorLight',
        meta: {
          title: 'tricolorLight',
          name:'三色灯定义',
        }
      },
      {
        path: '/factory/rail',
        component: '/factory/rail/index',
        name: 'railSetting',
        meta: {
          title: 'railSetting',
          name:'轨道定义',
        }
      },
      {
        path: '/factory/io',
        component: '/factory/io/index',
        name: 'ioSetting',
        meta: {
          title: 'ioSetting',
          name:'控制器定义',
        }
      },
      {
        path: '/factory/lightParam',
        component: '/factory/lightParam/index',
        name: 'lightParam',
        meta: {
          title: 'lightParam',
          name:'系统运转参数',
        }
      },
    ]
  },
  {
    path: '/dataSetting',
    component: 'Layout',
    redirect: '/dataSetting/measure',
    alwaysShow: true, // will always show the root menu
    name: 'dataSetting',
    meta: {
      title: 'dataSetting',
      icon: 'list',
      name:'数据配置管理'
    },
    children:[
      {
        path: '/dataSetting/measure',
        component: '/dataSetting/measure/index',
        name: 'measure',
        meta: {
          title: 'measure',
          name:'计量单位',
        }
      },
      {
        path: '/dataSetting/category',
        component: '/dataSetting/category/index',
        name: 'category',
        meta: {
          title: 'category',
          name:'商品类别',
        }
      },
      {
        path: '/dataSetting/warehouseManage',
        component: '/dataSetting/warehouseManage/index',
        name: 'warehouseManage',
        meta: {
          title: 'warehouseManage',
          name:'仓库管理',
        }
      },
      {
        path: '/dataSetting/productManage',
        component: '/dataSetting/productManage/index',
        name: 'productManage',
        meta: {
          title: 'productManage',
          name:'商品管理',
        }
      },
      {
        path: '/dataSetting/bomManage',
        component: '/dataSetting/bomManage/index',
        name: 'bomManage',
        meta: {
          title: 'bomManage',
          name:'BOM管理',
        }
      }
    ]
  },
  {
    path: '/purchase',
    component: 'Layout',
    redirect: '/purchase/order',
    alwaysShow: true, // will always show the root menu
    name: 'purchaseManage',
    meta: {
      title: 'purchaseManage',
      icon: 'form',
      name:'采购管理'
    },
    children:[
      {
        path: '/purchase/order',
        component: '/purchase/order/index',
        name: 'purchaseOrder',
        meta: {
          title: 'purchaseOrder',
          name:'采购订单',
        }
      },
      {
        path: '/purchase/order/add',
        component: '/purchase/order/add',
        name: 'addPurchase',
        meta: {
          title: 'addPurchase',
          name:'新增采购订单',
        }
      },
      {
        path: '/purchase/order/edit',
        component: '/purchase/order/add',
        name: 'editPurchase',
        meta: {
          title: 'editPurchase',
          name:'编辑采购订单',
        }
      },
      {
        path: '/purchase/inWh',
        component: '/purchase/inWh/index',
        name: 'purchaseIn',
        meta: {
          title: 'purchaseIn',
          name:'采购入库'
        }
      },
      {
        path: '/purchase/inWh/add',
        component: '/purchase/inWh/add',
        name: 'addPurchaseIn',
        meta: {
          title: 'addPurchaseIn',
          name:'新增采购入库'
        }
      },
      {
        path: '/purchase/inWh/edit',
        component: '/purchase/inWh/add',
        name: 'editPurchaseIn',
        meta: {
          title: 'editPurchaseIn',
          name:'编辑采购入库'
        }
      }
    ]
  },
  {
    path: '/sale',
    component: 'Layout',
    redirect: '/sale/order',
    alwaysShow: true, // will always show the root menu
    name: 'saleManage',
    meta: {
      title: 'saleManage',
      icon: 'excel',
      name:'销售管理'
    },
    children:[
      {
        path: '/sale/order',
        component: '/sale/order/index',
        name: 'saleOrder',
        meta: {
          title: 'saleOrder',
          name:'销售订单',
        }
      },
      {
        path: '/sale/outWh',
        component: '/sale/outWh/index',
        name: 'saleOut',
        meta: {
          title: 'saleOut',
          name:'销售出库',
        }
      },
      {
        path: '/sale/order/add',
        component: '/sale/order/add',
        name: 'addSaleOrder',
        meta: {
          title: 'addSaleOrder',
          name:'新增销售订单',
        }
      },
      {
        path: '/sale/order/edit',
        component: '/sale/order/add',
        name: 'editSaleOrder',
        meta: {
          title: 'editSaleOrder',
          name:'编辑销售订单',
        }
      },
      {
        path: '/sale/outWh/add',
        component: '/sale/outWh/add',
        name: 'addSaleOut',
        meta: {
          title: 'addSaleOut',
          name:'新增销售出库单',
        }
      },
      {
        path: '/sale/outWh/edit',
        component: '/sale/outWh/add',
        name: 'editSaleOut',
        meta: {
          title: 'editSaleOut',
          name:'编辑销售出库单',
        }
      },
    ]
  },
	{
	  path: '/stock',
	  component: 'Layout',
	  redirect: '/stock/index',
	  alwaysShow: true, // will always show the root menu
	  name: 'stockManage',
	  meta: {
	    title: 'stockManage',
	    icon: 'wh',
	    name:'库存管理'
	  },
	  children:[
	    {
	      path: '/stock/stockin',
	      component: '/stock/inWh/index',
	      name: 'stockIn',
	      meta: {
	        title: 'stockIn',
	        name:'其他入库',
	      }
	    },
	    {
	      path: '/stock/stockout',
	      component: '/stock/outWh/index',
	      name: 'stockOut',
	      meta: {
	        title: 'stockOut',
	        name:'其他出库',
	      }
	    },
	    {
	      path: '/stock/inWh/add',
	      component: '/stock/inWh/add',
	      name: 'addStockIn',
	      meta: {
	        title: 'addStockIn',
	        name:'新增入库单',
	      }
	    },
	    {
	      path: '/stock/inWh/edit',
	      component: '/stock/inWh/add',
	      name: 'editStockIn',
	      meta: {
	        title: 'editStockIn',
	        name:'编辑入库单',
	      }
	    },
	    {
	      path: '/stock/stockOut/add',
	      component: '/stock/outWh/add',
	      name: 'addStockOut',
	      meta: {
	        title: 'addStockOut',
	        name:'新增出库单',
	      }
	    },
	    {
	      path: '/stockout/outWh/edit',
	      component: '/stockout/outWh/add',
	      name: 'editStockOut',
	      meta: {
	        title: 'editStockOut',
	        name:'编辑出库单',
	      }
	    },
      {
        path: '/stock/stockinfo',
        component: '/stock/stockinfo/index',
        name: 'stockinfo',
        meta: {
          title: 'stockinfo',
          name:'库存信息',
        }
      },
	  ]
	},
  { path: '*', redirect: '/404', hidden: true }
]
