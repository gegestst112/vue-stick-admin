<script setup>

const props = defineProps({
  menus:{
    type: Array,
    default: () => []
  }
})

//判断是否显示多个子菜单
const hasOneShowingChild = (children = [], parent) => {
  const showingChildren = children.filter(item => {
    if (item.meta.hidden) {
      return false
    } else {
      return true
    }
  })

  return showingChildren.length <= 1;
}


</script>

<template>
  <template v-for="menu in menus" :key="menu.name">
    <el-menu-item
      v-if="!menu.meta.hidden && hasOneShowingChild(menu.children,menu)"
      :index="menu.path">
      <i class="iconfont" :class="'icon-'+menu.meta.icon"></i>
      <span class="menu_title">{{ menu.meta.title }}</span>
    </el-menu-item>
    <!-- 当前使用的 element-plus（^1.0.2-beta.48）子菜单标签是 el-submenu，官方api文档中演示的是 el-sub-menu -->
    <el-submenu v-else-if="!menu.meta.hidden" :index="menu.path" :router="true">
      <template #title>
        <i class="iconfont" :class="'icon-'+menu.meta.icon"></i>
        <span class="menu_title">{{ menu.meta.title }}</span>
      </template>
      <item :menus="menu.children"></item>
    </el-submenu>
  </template>
</template>

<style lang="scss" scoped>
.menu_title{
  margin-left:10px;
}
.iconfont{
  color:#fff;
}
</style>