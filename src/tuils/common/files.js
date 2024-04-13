import {getImage} from "@/api/common/file/index.js";

/**
 * 发送请求获取图片
 * @param url
 * @param data
 */
// utils/common/files.js
export async function reqImg(url) {
    console.log("imgurl", url);
    try {
        const res = await getImage(url);
        return binaryDataToImageUrl(res.data);
    } catch (error) {
        console.error('Error in reqImg:', error);
        throw error; // 重新抛出错误，以便在调用处可以处理
    }
}
/**
 * 二进制数据转图片
 * @param data
 * @returns {string}
 */
function binaryDataToImageUrl(data) {
    let urlCreator = window.URL || window.webkitURL;
    return urlCreator.createObjectURL(new Blob([data]));
}

export function getFileAddress() {
    return "http://localhost:8080";
}