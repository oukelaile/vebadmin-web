import service from "@/request/index";

// 获取菜单列表
export function getMenuList(data){
    return service({
        url: "menu/getMenuList",
        method: "post",
        data
    });
}


//添加
export function addMenu(data){
    return service({
        url: "/menu/addMenu",
        method: "post",
        data
    });
}

//根据id删除   需要把id放在数组里
export function logicalDelete(data){
    return service({
        url: "/menu/logicalDelete",
        method: "post",
        data
    });
}

//根据id更改
export function updateMenu(data){
    return service({
        url: "/menu/updateById",
        method: "post",
        data
    });
}
//根据id查询
export function getMenuById(menuId){
    return service({
        url: "/menu/selectById",
        method: "post",
        data: {menuId},
    });
}