import { login, logout, getUserInfo, getCompanyList } from '@/api/user'
import { getToken, setToken, removeToken, getAuthor, setAuthor, removeAuthor } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  comName: '',
  avatar: '',
  introduction: '',
  roles: [],
  authorStatus:0,
  menu:[],
  comlist:[],
  isAdmin:false
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_COMNAME: (state, comName) => {
    state.comName = comName
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_AUTHORSTATUS:(state, authorStatus) => {
    state.authorStauts = authorStatus
  },
  SET_MENU: (state, menu) => {
    state.menu = menu
  },
  SET_COMLIST: (state, comlist) => {
    state.comlist = comlist
  },
  SET_ISADMIN: (state, isAdmin) => {
    state.isAdmin = isAdmin
  },
}

const actions = {
  // user login
  login({ commit, dispatch }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        localStorage.clear()
        const { data } = response
        commit('SET_TOKEN', data.authorization)
        commit('SET_AUTHORSTATUS', data.jumpRegisterCompany)
        setToken(data.authorization)
        setAuthor(data.jumpRegisterCompany)
        commit('SET_ISADMIN',data.superAdmin)
        sessionStorage.setItem('remark',data.remark)
        sessionStorage.setItem('isAdmin',data.superAdmin)

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get company info
  getCompanyInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getCompanyList().then(response => {
        const { data } = response.data
        commit('SET_COMLIST', response.data)
        sessionStorage.setItem('comlist',JSON.stringify(response.data))
        if(response.data.length>0){
          sessionStorage.setItem('companyId',response.data[0].id)
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(response => {
        const { data } = response
        commit('SET_NAME', data.realName)
        sessionStorage.setItem('username',data.realName)
        if(data.company){
          commit('SET_COMNAME', data.company.name)
          sessionStorage.setItem('comName',data.company.name)
        }

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        removeAuthor()
        localStorage.clear()
        sessionStorage.clear()
        resetRouter()
        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_AUTHORSTATUS', '')
      commit('SET_ROLES', [])
      removeToken()
      removeAuthor()
      localStorage.clear()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
