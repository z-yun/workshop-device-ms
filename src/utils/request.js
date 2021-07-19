import axios from 'axios'
import qs from 'qs'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = getToken()
    }

    // 只有超级管理员需要传companyId
    const isAdmin = sessionStorage.getItem('isAdmin')
    if(isAdmin === 'true'){
      const com_id = Number(sessionStorage.getItem('companyId'))
      if(com_id){
        if(config.headers['Content-Type'] == 'multipart/form-data'){
          config.data.set('companyId',com_id);
          return config;
        }
        if(config.method==='post'){
          config.data={
            companyId:com_id,
            ...config.data
          }
        }else if(config.method==='get'){
          config.params={
            companyId:com_id,
            ...config.params
          }
        }
      }
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    if (res.code == undefined) {
      return res;
    }

    // 认证失败返回登录页
    if(res.code == 'Full authentication is required to access this resource' || res.code == 'jwt expired'){
      store.dispatch('user/logout')
    }

    // if the custom code is not 20000, it is judged as an error.
    if (res.code != 200) {

      Message({
        message: res.errorMsg || 'Error',
        type: 'error',
        duration: 8 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(res)
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error.errorMsg || '请求失败，请检查服务器连接后重试',
      type: 'error',
      duration: 8 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
