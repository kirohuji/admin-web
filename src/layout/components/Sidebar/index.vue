<template>
  <div :class="{ 'has-logo': showLogo }" style="display: flex;flex-direction: column;">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import Hamburger from '@/components/Hamburger'
import variables from '@/styles/variables.scss'
// import { constantRoutes } from '@/router'
export default {
  components: { SidebarItem, Logo, Hamburger },
  computed: {
    ...mapGetters(['sidebar', 'permission_routes']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/variables.scss';

.hamburger-container {
    line-height: 46px;
    // height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    text-align: center;
    border-bottom: 1px solid #EBEEF5;
    &:hover {
        background: rgba(0, 0, 0, 0.025);
    }
}
</style>
