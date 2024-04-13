import {defineStore} from 'pinia'
import {getBreadcrumbByRouterPath, removeHiddenMenus} from "@/tuils/menuUtil.js";
import {getInfo} from "@/api/system/userCentre/index.js";
import {reqImg} from "@/tuils/common/files.js";
import {menuRouter} from "@/router/modules/staticRouter.js";
import {getMenu} from "@/api/system/menu/index.js";


export const mainStore = defineStore('main', {
    state: () => ({
        menuList: [],
        loginUser: {
        }
    }),
    getters: {
        getMenuList() {
            return this.menuList;
        },
        getShowMenuList(state) {
            return removeHiddenMenus(state.menuList)
        },
        getMB(state) {
            return getBreadcrumbByRouterPath(state.menuList);
        },
        getLoginUser() {
            return this.loginUser;
        },
        getLoginUserAvatar() {
            return reqImg(this.loginUser.avatar)
        }
    },
    actions: {
        async requestMenuList() {
            try {
                const res = await getMenu();

                if (res.data != null) {
                    console.log("请求后端获取Menu侧边栏菜单", res.data.data);
                    for (let i = 0; i < menuRouter[0].children.length; i++) {
                        res.data.data.unshift({
                            menuName: menuRouter[0].children[i].meta.title,
                            routerPath: menuRouter[0].children[i].path,
                            hide: menuRouter[0].children[i].meta.hide,
                            menuIcon: menuRouter[0].children[i].meta.icon,
                        })
                            // return [{label: menuRouter[0].children[i].meta.title, path: menuRouter[0].children[i].path}]

                    }

                    console.log("请求后端获取Menu侧边栏菜单 ==添加后的", res.data.data);

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
        },
        async requestLoginUser() {
            console.log("storm请求info")
            const res = await getInfo();
            this.loginUser = res.data.data;
        }
    }
})

export default mainStore;