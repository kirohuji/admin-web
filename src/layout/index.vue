<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <div :class="{ 'fixed-header': fixedHeader }">
      <navbar />
    </div>

    <!-- main -->
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <sidebar class="sidebar-container" />
      <app-main style="padding-left:8px">
        <tags-view v-if="needTagsView" />
        <card
          style="border-bottom: 1px solid #DCDFE6;display: flex;align-items: center;  justify-content: space-between;padding: 0px 16px"
        >
          <div
            style="
              display: flex;
              justify-content: center;
              align-items: center;"
          >
            <span>当前位置:</span>
            <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
          </div>
          <RightTabWithApi />
        </card>
      </app-main>
      <!-- <right-panel v-if="showSettings">
        <settings />
      </right-panel> -->
    </div>
  </div>
</template>

<script>
import Card from '@/components/atoms/Card'
// import RightPanel from '@/components/RightPanel'
import Breadcrumb from '@/components/Breadcrumb'
import { AppMain, Navbar, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'
// import Thenable from '@/components/atoms/Thenable'
import { service } from './service'

const RightTab = {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleClick(item) {
      localStorage.setItem('selectedTab', item.name)
      this.selectedTab = String(item.name)
      this.$store.dispatch('user/changeTabs', item.name)
    }
  },
  data() {
    return {
      selectedTab: ''
    }
  },
  mounted() {
    if (localStorage.getItem('token')) {
      service.getrbacnode().then(({ data }) => {
        this.$store.dispatch('permission/generateRoutes', data.list)
      })
    }
    this.selectedTab = localStorage.getItem('selectedTab')
    if (!this.selectedTab) {
      this.handleClick({
        label: this.list[0].name,
        name: this.list[0].type
      })
    } else {
      this.$store.dispatch('user/changeTabs', this.selectedTab)
    }
  },
  render() {
    return (
      <div style='display: flex;justify-content: center;align-items: center;'>
        <div style='margin: 0 20px;'>选择视角</div>
        <el-tabs
          vModel={this.selectedTab}
          class='app-main-tabs'
          {...{
            on: {
              'tab-click': (item) => this.handleClick(item)
            }
          }}
        >
          {this.list.map((item) => (
            <el-tab-pane label={item.name} name={String(item.type)} />
          ))}
        </el-tabs>
      </div>
    )
  }
}

const RightTabWithApi = {
  computed: {
    admin_role_arr() {
      return JSON.parse(localStorage.getItem('user')).admin_role_arr
    }
  },
  render() {
    return <RightTab list={this.admin_role_arr} />
  }
}
export default {
  name: 'Layout',
  provide() {
    return {
      layout: this
    }
  },
  components: {
    Card,
    Breadcrumb,
    AppMain,
    Navbar,
    // RightPanel,
    // Settings,
    Sidebar,
    TagsView,
    RightTabWithApi
    // RightTab
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar,
      device: (state) => state.app.device,
      showSettings: (state) => state.settings.showSettings,
      needTagsView: (state) => state.settings.tagsView,
      fixedHeader: (state) => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },

  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';
.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
        position: fixed;
        top: 0;
    }
}
::v-deep .app-main-tabs {
    .el-tabs__header {
        // padding: 4px;
        margin: 0;
    }
}

.drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
}

.fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
}

.hideSidebar .fixed-header {
    width: calc(100% - 54px);
}

.mobile .fixed-header {
    width: 100%;
}
</style>
