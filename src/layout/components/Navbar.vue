<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <tags-view v-if="needTagsView" />

    <div class="right-menu">
      <choose-company v-if="isAdmin == 'true'" />

      <span class="right-menu-item name">{{showName}}</span>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <svg-icon icon-class="user" class="user-avatar"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.dashboard') }}
            </el-dropdown-item>
          </router-link>
          <router-link to="/permission/change-pwd">
            <el-dropdown-item divided>
              {{ $t('navbar.updatePwd') }}
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="logout">
            <span style="display:block;">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <template v-if="device!=='mobile'">
        <lang-select class="right-menu-item hover-effect" />
        <screenfull id="screenfull" class="right-menu-item hover-effect" />
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapState } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import LangSelect from '@/components/LangSelect'
import ChooseCompany from './chooseCompany'
import TagsView from './TagsView'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    LangSelect,
    TagsView,
    ChooseCompany
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ]),
    ...mapState({
      needTagsView: state => state.settings.tagsView,
    }),
    showName(){
      // debugger
      // this.isAdmin = sessionStorage.getItem('isAdmin')
      let name = sessionStorage.getItem('username')
      let comName = sessionStorage.getItem('comName')
      if(this.isAdmin === 'true'){
        return name
      }else {
        return comName+'，'+name
      }
    }
  },
  data(){
    return {
      comVisible:true,
      isAdmin:false
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
    }
  },
  created(){
    this.isAdmin = sessionStorage.getItem('isAdmin')
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  position: relative;
  background: #fff;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,.1);
  z-index: 999;

  .hamburger-container {
    line-height: 56px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    margin-right: 15px;
    float: right;
    height: 100%;
    line-height: 60px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      float: left;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {

      .avatar-wrapper {
        position: relative;
        margin-top: 14px;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: #9ecbff;
        .user-avatar {
          cursor: pointer;
          margin-left: 8px;
          width: 16px;
          fill: white;
          vertical-align: 13px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }

    .name {
      font-size: 12px;
    }
  }
}
</style>
