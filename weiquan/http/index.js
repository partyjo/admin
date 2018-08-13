import axios from 'axios'
import { Toast } from 'antd-mobile'

// 创建实例
const ajax = axios.create({
  baseURL: process.env.NODE_ENV === 'develop' ? '/api/' : 'http://partyjo.nextdog.cc/server/weiquan/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

// 请求拦截器
ajax.interceptors.request.use(
  config => {
    const token = '123456'
    token && (config.headers.Authorization = token)
    return config
  },
  error => {
    return Promise.error(error)
  }
)

// 响应拦截器
ajax.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
    // 否则的话抛出错误
    console.log(response)
    if (response.status === 200) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response.data)
    }
  },
  // 根据返回的状态码进行一些操作
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录             
        case 401:
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
          break;

        // 403 token过期            
        case 403:
          Toast.info('登录过期，请重新登录');
          localStorage.removeItem('token');
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }, 1000);
          break;

        // 404请求不存在
        case 404:
          Toast.info('网络请求不存在');
          break;
        // 其他错误，直接抛出错误提示
        default:
          Toast.info(error.response.data.message);
      }
      return Promise.reject(error.response);
    }
  }
)

export default ajax
