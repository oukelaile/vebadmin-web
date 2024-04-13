import maniStore from '@/storm/modules/main.js';
import {router} from "@/router/index.js";
import {transformMenuToRouters} from "@/tuils/menuUtil.js";


export const loadDynamicRouter = async () => {
    const mainStore = maniStore();

    try {
        await mainStore.requestMenuList();
        // 添加router前的mainStore
        console.log("添加router前的mainStore.menuList", mainStore.menuList);
        transformMenuToRouters(mainStore.menuList).forEach(item => {
            router.addRoute("main", item);
        });
        console.log("设置完router了", router.options.routes);
        console.log("设置完router了");
    } catch (error) {
        console.error("Error fetching menu list:", error);
        // 可能需要处理错误或向用户显示错误信息
    }
};


