import {createRouter, createWebHashHistory} from "vue-router"
import {baseRouter, menuRouter} from "@/router/modules/staticRouter.js";

import {mainStore} from '@/storm/modules/main';
import {loadDynamicRouter} from "@/router/modules/dynamicRouter.js";


export const router = createRouter({
    history: createWebHashHistory(),
    routes: baseRouter.concat(menuRouter),
    strict: false,
});

// 前置路由 token为空 和不是/login页面就会跳转到/login页面
router.beforeEach(async (to, from, next) => {
    console.log("执行了前置路由")
    const store = mainStore()
    // // 请求菜单
    // store.requestMenuList()
    console.log("store.getMenuList",store.getMenuList);


    const token = localStorage.getItem("token");
    if (!token && to.path !== '/login') {
        return next('/login');
    }

    console.log("store.getMenuList",store.getMenuList.length)
    if (store.getMenuList.length === 0) {
        await loadDynamicRouter();
        return next({...to, replace: true});
    }

    next();
});


export default router