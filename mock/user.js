
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports = [
  // user login
  {
    url: '/auth/login',
    type: 'post',
    response: config => {
      return {
        code: 200,
        data: {
          authorization:'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwZXJmZWN0Y2hlZXJAMTY0LmNvbSIsImV4cCI6MTYxNzQzNTQ0NH0.us-MIcaVYO14R-GtxRVAf4r98z2kf91HOE54vQLWyd7bolnn4dZQJMg2otI8VvPiFL6fNgtCWGeXIN6N0Ab8zg',//登录认证，写入到cookies中，下次请求带入header中，key=Authorization, value=xxxxx
          jumpRegisterCompany:0//是否跳转到认证页面 0不需要跳转 1未申请，调用申请注册公司接口 2已申请未通过，调用查看申请注册详情接口
        }
      }
    }
  },
  // auth menu
  {
    url: '/auth/menu',
    type: 'post',
    response: config => {
      return {
        code:200,
        data:[
          {
            path: '/permission',
            component: 'Layout',
            redirect: '/permission/page',
            alwaysShow: true, // will always show the root menu
            name: 'Permission',
            meta: {
              title: 'permission',
              icon: 'user',
            },
            children: [
              {
                path: 'userbase',
                component: '/userbase/index',
                name: 'BasicData',
                meta: {
                  title: 'basicData',
                  name:'用户基本资料维护',
                }
              }
            ]
          }
        ]
      }
    }
  },
  // get user info
  {
    url: '/vue-element-admin/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 200,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-element-admin/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },

  // get code
  {
    url: '/register/send_code',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: {},
        errorMsg:''
      }
    }
  },

  // register
  {
    url: '/register/register',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: {

        },
        errorMsg:''
      }
    }
  }
]
