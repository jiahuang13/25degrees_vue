import axios from 'axios'
import { getToken, delToken } from '@/utils/storage'
import router from '@/router/index'
import Toast from 'element-ui'

// 創建實例
const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
})

// 自定義配置（請求和響應攔截器）
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  // console.log(error)

  // 若token失效
  if (error.response.status === 401) {
    delToken()
    // 只有組件實例可以用this
    router.push('/login')
  } else {
    Toast.fail(error.response.data.message)
    return Promise.reject(error)
  }
})

// 導出實例
export default instance
