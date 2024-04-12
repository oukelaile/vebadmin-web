/**
 * 侧边栏导航路由
 * @type {[{redirect: string, path: string, component: (function(): Promise<*>), children: *[], name: string}]}
 */
export const menuRouter = [
    {
        path: '/',
        name: 'home',
        redirect: "main", //重定向到main
        component: () => import('@/views/Home.vue'),
        children: [
            {
                path: '/main',
                name: 'main',
                component: () => import('@/views/Main.vue'),
                meta: {
                    title: '首页'
                }
            },
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
        component: () => import('@/views/Login.vue'),
        meta: {
            title: '登录界面'
        }
    },
    // 找不到path将跳转404页面
    {
        path: "/:pathMatch(.*)*",
        component: () => import("@/views/error/404.vue")
    }
];

