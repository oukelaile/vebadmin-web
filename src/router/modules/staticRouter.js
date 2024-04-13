/**
 * 侧边栏导航路由
 * @type {[{redirect: string, path: string, component: (function(): Promise<*>), children: *[], name: string}]}
 */
export const menuRouter = [
    {
        path: '/',
        name: 'main',
        redirect: "home", //重定向到main
        component: () => import('@/views/system/layouts/index.vue'),
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/system/home/index.vue'),
                meta: {
                    title: '主页',
                    icon: "House",
                    hide: 0, //是否隐藏 0为显示 1为隐藏
                }
            },
            {
                path: "/userCentre",
                component: () => import("@/views/system/userCentre/index.vue"),
                meta: {
                    title: "用户中心",
                    hide: 1, //是否隐藏 0为显示 1为隐藏
                }
            }
        ]
    },
];

/**
 * 基本路由
 * @type {[{redirect: string, path: string, component: (function(): Promise<*>), children: *[], name: string}]}
 */
export const baseRouter = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/system/login/Login.vue'),
        meta: {
            title: '登录界面'
        }
    },
    // 找不到path将跳转 404页面
    // 没有设置这个跳转动态添加的路由时控制台会有报错信息
    {
        path: "/:pathMatch(.*)*",
        component: () => import("@/views/system/error/404.vue")
    }
];

