import {defineStore} from 'pinia'
import {getMenu} from "@/request/api.js";

export const mainStore = defineStore('main', {
    state: () => ({
        menuList: [],
    }),
    getters: {
        getMenuList() {
            return this.menuList;
        }
    },
    actions: {
        async requestMenuList() {
            try {
                const res = await getMenu();

                if (res.data != null) {
                    console.log("请求后端获取Menu侧边栏菜单充能", res.data.data);
                    this.menuList = res.data.data;
                    return res.data.data;
                } else {
                    console.log("获取菜单失败");
                    throw new Error("Failed to fetch menu");
                }
            } catch (error) {
                console.error("Error fetching menu:", error);
                throw error;
            }
        }
    }
})

export default mainStore;