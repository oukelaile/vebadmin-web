import service from "@/api/index.js";

// 文件上传函数
export async function fileUpload(file, fileType) {

    console.log('上传函数接收到的文件：', file)
    // 创建FormData实例
    const formData = new FormData();

    // 添加文件到formData
    formData.append('file', file);
    formData.append('fileType', fileType);

    // 使用service发送POST请求，注意这里假设service已经封装了axios或其他HTTP库
    try {
        const response =  await service.post('/file/upload', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        // 如果请求成功，返回成功的提示或数据
        return Promise.resolve(response.data);
    } catch (error) {
        // 如果请求过程中发生错误，返回拒绝状态的Promise并附带错误信息
        return Promise.reject(`文件上传失败: ${error.message}`);
    }
}

// 获取图片函数
export function getImage(filePath) {
    return service({
        url: filePath,
        method: 'get',
        responseType: 'blob', // 如果你希望直接处理二进制数据
    })
}
