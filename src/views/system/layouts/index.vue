<template>

    <div class="home" style="background-color:#f1f1f1">

        <el-container>
          <!-- 实现菜单多级分类   router开启路由-->
          <el-menu
              style="font-weight: bold; border-right: none !important;"
              width="200px"
              router
              :collapse="isCollapse"
              class="el-menu-vertical-demo"
          >
            <el-menu-item index="/home" style="height: 50px;">
              <img src="/src/assets/vebLogo.png" alt="vbeAdmin" style="width: 30px; height: 30px;"/>
              <span>veb-Admin</span>
            </el-menu-item>
            <!--分割线-->
            <el-divider style="margin: 0px 0;"/>

            <!-- 引入组件 -->
            <menu-tree :menuData="menuList"></menu-tree>
          </el-menu>


          <!--header 和 main -->
          <el-container>

            <!-- Header -->
            <el-header height="50px" style="overflow: hidden; margin-left: 0; ;">
              <el-row :gutter="21">
                <el-col :span="17" style="margin-top: 30px; display: flex; align-items: center; gap: 8px;">

                  <el-icon @click="toggleMenu">
                    <Fold v-if="!isCollapse"/>
                    <Expand v-else/>
                  </el-icon>
                  <!-- 面包屑 -->
                  <el-breadcrumb separator="/">
                    <el-breadcrumb-item v-for="item in breadcrumbItems" :key="item.path">
                      <router-link :to="{ path: item.path }">{{ item.label }}</router-link>
                    </el-breadcrumb-item>
                  </el-breadcrumb>

                </el-col>

                <el-col :span="7" class="align-right">
                  <el-dropdown :hide-on-click="false" style="text-align: center; margin-top:6px;">
                    <span class="el-dropdown-link" style="display: flex; align-items: center;  gap: 5px;">
                    <el-avatar shape="circle" :src=" getFileAddress()+store.getLoginUser.avatar"/>
                    <span style="display: inline;  color: black; font-size: 20px;">{{ store.getLoginUser.nickName }}</span>
                    <el-icon size="35px" style="margin-top:0px;"><ArrowDownBold/></el-icon>
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item @click="personalCenter">个人中心</el-dropdown-item>
                        <el-dropdown-item @click="personalOutLog">退出登录</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </el-col>
              </el-row>
            </el-header>

            <!--分割线-->
            <el-divider style="margin: 0px 0;"/>


            <!-- Main -->
            <el-scrollbar height="calc(100vh - (55px))">
              <el-main style="padding-top: 5px; padding-right: 12px; padding-bottom: 6px; padding-left: 6px;">
                <!-- Main空白 -->

                <div class="main-content">

                  <!-- Main内容 -->
                  <router-view/>
                </div>


              </el-main>
            </el-scrollbar>


          </el-container>
        </el-container>

    </div>


</template>
<script setup>

import {ArrowDownBold,} from '@element-plus/icons-vue'

import MenuTree from './components/MenuTree.vue';
import {computed, onMounted, ref} from 'vue';

import {useRoute, useRouter} from "vue-router";
import {mainStore} from '@/storm/modules/main.js';
import {ElNotification as notify} from 'element-plus'
import {getFileAddress} from "@/tuils/common/files.js";
import {getBreadcrumbByRouterPath} from "@/tuils/menuUtil.js";


const router = useRouter()

// 删除token并跳转到登录页面
const delToken = () => {
  localStorage.removeItem('token');
  router.push("/login");
};

const route = useRoute();
const store = mainStore()

const menuList = computed(() => {
  return store.getShowMenuList
});
console.log('TEST  左侧菜单', menuList.value);



const breadcrumbItems = computed(() =>
      getBreadcrumbByRouterPath(store.getMenuList, route.matched[route.matched.length - 1].path)
);
console.log('TEST  面包屑', breadcrumbItems.value);

const personalCenter = () => {
  router.push("/userCentre");
  console.log("跳转个人中心")
};
const personalOutLog = () => {
  delToken();
  console.log("跳转退出登录")
};

const onBack = () => {
  notify('Back')
}


//是否展开
const isCollapse = ref(false)

const iconClass = computed(() => {
  return isCollapse.value ? 'icon-fold' : 'icon-expand';
});

/**
 * 切换menu导航折叠状态
 */
function toggleMenu() {
  isCollapse.value = !isCollapse.value;
}

onMounted(
    async () => { // 注意这里，`onMounted` 需要接收一个 async 函数
      await store.requestLoginUser();
    }
);

//头像
// const userAvatar = computed(() => {
//       console.log("home头像",getFileAddress() + store.getLoginUserAvatar)
//       return getFileAddress() + store.getLoginUserAvatar
//     }
// );


// async function getUserAvatar() {
//   console.log("home头像",store.getLoginUser);
//   userAvatar.value = await reqImg(store.getLoginUser.avatar, userAvatar);
// }

</script>

<style lang="scss" scoped>

.el-header {
  --el-header-padding: 0px;
  height: 50px;
  background-color: #ffffff;
  .logo {
    margin-left: 50px;
    height: 50px;
  }
  .col-btn {
    height: 50px;
    line-height: 50px;
  }
}

.custom-avatar {
  width: 45px;
  height: 45px;
  vertical-align: middle;
}






.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.custom-right-align {
  display: flex;
  justify-content: flex-end; /* 将内容右对齐 */
}

/* 如果需要的话，可以增加额外的父容器以确保正确对齐 */
.block {
  margin-left: auto; /* 这里也可以添加此样式来辅助对齐 */
}

.align-right {
  text-align: right; /* 将文字内容及子元素右对齐 */
}

.custom-align-right {
  display: inline-block; /* 确保该块可被右对齐 */
  margin-left: auto; /* 将该块推到父容器的最右侧 */
}

::v-deep .el-dropdown__popper {
  box-shadow: none !important;
}

//.mainStyle {
//  background-color: #ffffff;
//}

.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 15px;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.menu-icon {
  width: 20px; /* 调整图标大小 */
  height: auto;
  margin-right: 10px; /* 添加间距 */
}

.custom-icon {
  display: inline-block;
  width: 24px; /* 调整图标大小 */
  height: 24px; /* 调整图标大小 */
  background-size: contain; /* 确保图片适应宽度 */
  background-repeat: no-repeat; /* 防止图片重复 */
  background-position: center; /* 图片居中 */
}

.main-content{
  background-color: #ffffff;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  border-radius: 5px; /* 添加这一行来设置元素的圆角 */
}



</style>