import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, removeToken, getAuthor, removeAuthor } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { getAuthMenus } from '@/api/user'
import Layout from '@/layout'
import { mockData } from '@/router/mockRouter' // get token from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login','/register', '/auth-redirect','/audit'] // no redirect whitelist
var getRouter

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 */
function filterAsyncRouter(routes) {
  const accessedRouters = routes.filter(route => {
    if (route.component) {
      if (route.component === 'Layout') { //Layout组件特殊处理
        route.component = Layout
      } else {
        const component = route.component
        route.component = resolve => require(['@/views'+ component], resolve)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
  return accessedRouters
}

function routerGo(to, next) {
  getRouter = filterAsyncRouter(getRouter) //过滤路由
  router.addRoutes(getRouter) //动态添加路由
  global.antRouter = getRouter //将路由数据传递给全局变量，做侧边栏菜单渲染工作
  next({ ...to, replace: true })
}

function saveObjArr(name, data) { //localStorage 存储数组对象的方法
  window.localStorage.setItem(name, JSON.stringify(data))
}

function getObjArr(name) { //localStorage 获取数组对象的方法
  return JSON.parse(window.localStorage.getItem(name));
}

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)
  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      // next({ path: '/' })
      removeToken()
      removeAuthor()

      next()
      NProgress.done()
    } else {
      const authorStatus = getAuthor()
      if(authorStatus == 0){
        // 解决登录后需刷新才会重新加载路由

        await store.dispatch('user/getInfo')

        if (!getObjArr('router')) {
          getRouter = undefined;
        }
        if(!getRouter){
          if (!getObjArr('router')) {
            getAuthMenus().then(res => {
              getRouter = res.data//后台拿到路由
              let notFound = { path: '*', redirect: '/404', hidden: true }
              getRouter.push(notFound)
              // console.log(res)
              // getRouter = mockData
              saveObjArr('router', getRouter) //存储路由到localStorage

              routerGo(to, next)//执行路由跳转方法
            })
          } else {//从localStorage拿到了路由
            getRouter = getObjArr('router')//拿到路由
            // getRouter = mockData
            routerGo(to, next)
          }
        }else{
          next()
        }
      }else{
        if(to.path == '/audit'){
          next()
        }else{
          next({ path: '/audit' ,query:{status:authorStatus}})
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
