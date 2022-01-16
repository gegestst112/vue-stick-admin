import axios from 'axios'
import { ElMessage } from 'element-plus'

axios.defaults.headers.post["Content-Type"] = 'application/json'
axios.defaults.timeout = 10000

// 设置请求拦截器
axios.interceptors.request.use(
  config => {
    // 请求头设置 token
    config.headers['token'] = '123456';
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 设置响应拦截器
axios.interceptors.response.use(
  response => {
    // 获取主体数据
    const res = response.data;
    //统一处理数据问题
    if(res.code == 200){
      return res
    }else{
      ElMessage.warning( res.message || '未知错误！');
      return Promise.reject(new Error(res.message || 'Error'));
    }
  },
  error => {
    //统一错误处理
    if(error.response.status == 404){
      ElMessage.error('系统请求地址不存在！')
    }else if(error.response.status >= 400){
      ElMessage.error('禁止访问或没有权限！')
    }else if(error.response.status >= 500){
      ElMessage.error('服务器错误！')
    }
    return Promise.reject(error)
  }
)

export default axios