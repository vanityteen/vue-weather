import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { statusCode } from './codeStatus'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from "element-plus/lib/components/index.js";

interface ResponseData {
    code: number;
    data: any;
    message: string;
  }

const service = axios.create({
    baseURL: '',
    timeout: 5000,
})

service.interceptors.request.use((res: AxiosRequestConfig): any => {
    return res
}, (error): object => {
    return Promise.reject(error);
});

service.interceptors.response.use((response: AxiosResponse): any => {
    const res = response.data as ResponseData
    if (response.status !== 200) {
        // 统一处理错误
        return ElMessage.error(res.message || '请求失败')
      } else {
        return res || {}
      }
}, (error): any => {
    const response = Object.assign({}, error.response) as ResponseData
    response && ElMessage.error(statusCode[response.code] || '系统异常, 请检查网络或联系管理员！')
    return Promise.reject(error)
});

// 封装get请求
export const get = (url: string, params?: any) => {
    return service.get(url, {params})
}

// 封装post请求
export const post = (url: string, data?: any) => {
    return service.post(url, data)
}