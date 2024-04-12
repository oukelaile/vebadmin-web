import service from "@/request/index";
// import {LoginFormInt} from "@/type/login";
//
// export function login(data:LoginFormInt) {
//     return service({
//         url: "/login",
//         method: "post",
//         data
//     })
// }

// 登录接口
export function login(data){
    return service({
        url: "/login",
        method: "post",
        data
    });
}
// 获取菜单
export function getMenu(){
    return service({
        url: "menu/getMenu",
        method: "post"
    });
}


//根据id查询
export function getMenuById(data){
    return service({
        url: "menu/selectById",
        method: "post",
        data
    });
}