<template>
  <div class="home">
    <el-container>

      <!-- Header -->
      <el-header height="50px"  style="overflow: hidden; margin-left: 0; margin-right: 10px;" >
        <el-row :gutter="20">
          <el-col :span="4"><img src="../assets/logo.png" class="logo" ></el-col>
          <el-col :span="16" style=" margin-top: 10px;">
<!--          <el-col :span="16" style="text-align: center;  margin-top: 10px;">-->
<!--            <h2 class="h2">vebasic后台管理系统</h2>-->

            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/system/menuManage' }">homepage</el-breadcrumb-item>
              <el-breadcrumb-item><a href="./page-header.html">route 1</a></el-breadcrumb-item>
              <el-breadcrumb-item>route 2</el-breadcrumb-item>
            </el-breadcrumb>

          </el-col>
          <el-col :span="4"   class="align-right">

            <el-dropdown :hide-on-click="false"  style="text-align: center; margin-top:6px;">
               <span class="el-dropdown-link" style="display: flex; align-items: center;  gap: 5px;">
                 <el-avatar shape="circle" :src="squareUrl" />
                 <span style="display: inline;  color: black; font-size: 20px;">admin</span>
                 <el-icon size="35px" style="margin-top:0px;"><ArrowDownBold /></el-icon>
               </span>
<!--              <el-icon size="35px" style="margin-top: 6px;"><ArrowDownBold /></el-icon>-->

              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="personalCenter">个人中心</el-dropdown-item>
                  <el-dropdown-item @click="personalOutLog" >退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

          </el-col>
        </el-row>
      </el-header>

      <!--分割线-->
      <el-divider style="margin: 0px 0;" />

      <el-container >

        <!-- Aside -->
        <el-aside  width="200px"  style="background-color:#ffffff">
              <!-- 实现菜单多级分类   router开启路由-->
              <el-menu
                  style="font-weight: bold; height: calc(100vh - 62px);"
                  router
              >
                <el-scrollbar >
                <!-- 引入组件 -->
                <menu-tree :menuData="store.menuList"></menu-tree>
                </el-scrollbar>
              </el-menu>
        </el-aside>

        <!-- Main -->
        <el-main  style="background-color:#f1f1f1;   --el-main-padding: 6px">
          <!-- Main空白 -->
          <div style="  background-color: #ffffff;" >
            <!-- Main内容 -->
            <router-view/>
          </div>
        </el-main>

      </el-container>

    </el-container>
  </div>
</template>

<script setup>

import MenuTree from './MenuTree.vue';
import {onMounted, reactive, ref, toRefs} from 'vue';
import lgoimg from '../assets/login.png';


import {useRouter} from "vue-router";
import {ArrowDownBold} from '@element-plus/icons-vue'

const router = useRouter()

// 删除token并跳转到登录页面
const delToken = () => {
  localStorage.removeItem('token');
  router.push("/login");
};


/**
 * 调用获取当前页面的菜单接口重新渲染菜单
 */
const getLatestMenu = () => {
  getAppMenu();
};


// //使用getMenuList方法 获取菜单数据
// const menuList = ref([]);
//
// onMounted(() => {
//   getAppMenu();
// });
//
// const getAppMenu = () => {
//   getMenu().then(res => {
//     console.log("res:", res.data);
//     if (res.data != null) {
//       console.log("Menus:", res.data.data);
//       menuList.value = res.data.data;
//     }
//   })
// };

import {mainStore} from '../storm/modules/main.js';
const store = mainStore()

// onMounted(() => {
//   console.log("HomeVUE 获取路由菜单")
//   //调用store获取路由放到store
//   loadDynamicRouter();
// });



const state = reactive({
  squareUrl: lgoimg,
})
const {  squareUrl } = toRefs(state)



const personalCenter = () => {
  console.log("跳转个人中心")
};
const personalOutLog = () => {
  delToken();
  console.log("跳转退出登录")
};

//------------
import { ElNotification as notify } from 'element-plus'
import {loadDynamicRouter} from "@/router/modules/dynamicRouter.js";

const onBack = () => {
  notify('Back')
}



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

//.block {
//  height: 50px;
//  line-height: 50px;
//}
.custom-avatar {
  width: 45px;
  height: 45px;
  vertical-align: middle;
}

.el-aside {
  .el-menu {
    height:calc(100vh - 50px)
  }
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

.mainStyle {
  background-color: #ffffff;
}
.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

</style>