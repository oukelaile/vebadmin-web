import axios from 'axios';
import router from '@/router';
import {ElMessage} from 'element-plus'



const service = axios.create({
    // api
    // baseURL: "https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api",
    baseURL: "http://127.0.0.1:8080",
    // 超时时间
    // timeout: 5000,
    // 设置utf-8 json格式
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    }
});



// 请求拦截  发送请求时候携带token
service.interceptors.request.use((config) => {
    if (localStorage.getItem('token')) {
        config.headers.token = localStorage.getItem('token') || "";
    }
    return config;
});


// 响应拦截
// 获取res返回值的code
//返回值的res.code不为200  返回错误信息
// 正常放行
// 错误 打印错误信息
// service.interceptors.response.use((res) => {
//     console.log("拦截" + res)
//     const code: number = res.data.data.code
//     console.log('response的code' + code);
//
//     if (code == undefined) {
//         if (res.data.code == 200) {
//             return res.data
//         }
//     }
//
//     if(code!=200){
//         return Promise.reject("密码错误");
//     }
//     return res.data
// }, (err) => {
//     console.log("错了");
//     console.log(err);
// });


// 响应拦截
service.interceptors.response.use(
    // 成功响应的处理函数
    (response) => {
        // 根据 response.data.code 进行不同的操作
        if (response.data.code === 200) {
            // 通常代表请求成功，可以进一步处理数据
            return response || {};
        } else if (response.data.code === 401) {
            // 例如，如果code为401，可能是未授权，可以做相应的处理，如跳转到登录页
            localStorage.removeItem('token');
            router.push("/login");
        } else {
            // 其他错误码，可以根据实际情况抛出错误或提示信息
            throw new Error(response.data.message || 'Error Occurred');
        }
    },
    // 错误响应的处理函数
    (error) => {
        console.error('Error网络异常:', error);
        console.log("tf",error && error.code === 'ECONNABORTED' && error.message.includes('timeout'))
        // if (error.response) {
        //     // 请求已发出但服务器响应的状态码不在2xx范围内
        //     console.error('Response Error:', error.response.data);
        //     // 这里也可以根据error.response.status做额外处理
        // } else if (error.request) {
        //     // 请求已发出，但无响应（如网络故障）
        //     console.error('Network Error:', error.request);
        // }else

        if (error){
            console.log('网络异常');
            ElMessage({
                showClose: true,
                message: '网络异常',
                type: 'error',
            });
        } else {
            // 发生了其他错误（如配置错误或取消请求等）
            console.error('Error', error.message);
        }
        return Promise.reject(error);
    }
);

export default service
