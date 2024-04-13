import service from "@/api/index.js";

// 获取用户信息
export function getInfo(){
    return service({
        url: "/user/getInfo",
        method: "post",
    });
}

//修改用户信息
export function updateById(data){
    return service({
        url: "/user/updateById",
        method: "post",
        data
    });
}


//修改密码
export function updatePassword(data){
    return service({
        url: "/user/updatePassword",
        method: "post",
        data
    });
}

//修改头像
export function updateAvatar(data){
    return service({
        url: "/user/updateAvatar",
        method: "post",
        data
    });
}