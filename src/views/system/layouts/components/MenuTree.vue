<template>

    <template v-for="menu in this.menuData">

      <el-sub-menu :key="menu.routerPath" :index="menu.routerPath" v-if="menu.children && menu.children.length > 0">

        <template #title>
          <el-icon>
            <component :is="menu.menuIcon" />
          </el-icon>
          <span>{{ menu.menuName }}</span>
        </template>
        <menu-tree :menuData="menu.children"></menu-tree>
      </el-sub-menu>

      <el-menu-item  :index="menu.routerPath"  v-else>
        <el-icon>
          <component :is="menu.menuIcon" />
        </el-icon>
        <template #title>{{ menu.menuName }}</template>
      </el-menu-item>

    </template>
</template>

<script>
export default {
  props: ['menuData'],
  name: 'MenuTree'
}
</script>