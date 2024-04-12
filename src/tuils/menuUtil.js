/**
 * 初始化菜单
 * @param data
 */
export function transformMenuToRouters(data) {
    if (Array.isArray(data)) {
        return data.map(item => transformMenuToRouters(item));
    } else if (typeof data === 'object' && data !== null) {
        return {
            path: data['routerPath'],
            name: data['routerName'],
            // component: async () => {
            //     const {default: dynamicComponent} = await import(`@/views${data['routerComponent']}.vue`);
            //     return dynamicComponent;
            // },
            // component: () => import(`@/views${data['routerComponent']}.vue`),
            component: () => import(`@/views/Main.vue`),
            // component: () => import('@/views/Main.vue'),
            meta: {
                icon: data['menuIcon']
            },
            children: transformMenuToRouters(data.children)
        };
    }
    return data;
}