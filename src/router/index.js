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
    const token = localStorage.getItem("token");
    //没有token并且不是登录页面就跳转到登录页面
    if (!token && to.path.toLocaleLowerCase() !== '/login') {
        next({path: "/login", replace: true});
    }

    //有token才执行这里
    if (token) {
        const store = mainStore();
        // // 请求菜单
        // store.requestMenuList()
        console.log("store.getMenuList",store.getMenuList);
        console.log("store.getMenuList",store.getMenuList.length);
        if (store.getMenuList.length === 0) {
            await loadDynamicRouter();
            return next({...to, replace: true});
        }
    }

    next();
});


export default router