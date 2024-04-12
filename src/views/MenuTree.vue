<template>
  <div>
    <template v-for="menu in this.menuData">

      <el-sub-menu :key="menu.routerPath" :index="menu.routerPath" v-if="menu.children.length > 0 ">
        <template #title>
          <span>{{ menu.menuName }}</span>
        </template>
        <menu-tree :menuData="menu.children"></menu-tree>
      </el-sub-menu>

      <el-menu-item  :index="menu.routerPath"  v-else>
        {{menu.menuName}}
      </el-menu-item>

    </template>
  </div>
</template>

<script>
export default {
  props: ['menuData'],
  name: 'MenuTree'
}
</script>