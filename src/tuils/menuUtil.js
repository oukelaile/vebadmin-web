/**
 * vue3动态路由添加component方式
 */
let routerAddComponent = import.meta.glob("@/views/**/*.vue");

/**
 * 将左侧菜单转换为路由
 * @param data
 * @returns {any}
 */
export function transformMenuToRouters(data) {
    if (Array.isArray(data)) {
        return data.map(item => transformMenuToRouters(item));
    } else if (typeof data === 'object' && data !== null) {
        return {
            path: data['routerPath'],
            name: data['routerName'],
            component: routerAddComponent[`/src/views/${data['routerComponent']}.vue`],
            meta: {
                icon: data['menuIcon']
            },
            children: transformMenuToRouters(data.children)
        };
    }
    return data;
}


/**
 * 中移除meta.hide为1的菜单及其所有子项
 */
export function removeHiddenMenus(menuList) {

    return menuList.filter(menu => {
        // 如果hide为1，移除该菜单及其所有子项
        if (menu.hide === 1) {
            return false;
        }
        // 如果有子菜单，递归过滤子菜单
        if (menu.children) {
            menu.children = removeHiddenMenus(menu.children);
        }
        return true;
    });
}

export function getBreadcrumbByRouterPath(menuData, currentPath) {
    console.log("生成面包屑使用的路由集合", menuData);
    console.log("当前路径", currentPath);
    //把静态路由数据添加进集合中
    return buildBreadcrumbs(menuData, currentPath);
}

function buildBreadcrumbs(menus, targetPath) {
    //递归动态路由数据返回
    for (const menu of menus) {
        if (menu.routerPath === targetPath || targetPath.startsWith(menu.routerPath + '/')) {
            if (menu.children && menu.children.length > 0) {
                const childBreadcrumbs = buildBreadcrumbs(menu.children, targetPath);
                if (childBreadcrumbs.length > 0) {
                    return [{label: menu.menuName, path: menu.routerPath}].concat(childBreadcrumbs);
                }
            } else {
                return [{label: menu.menuName, path: menu.routerPath}];
            }
        }
    }
    return [];
}