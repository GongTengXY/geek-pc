import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000,
})

instance.interceptors.request.use(
  (res) => {
    return res?.data?.data || res
  },
  (error) => {
    // 请求出错进行的处理
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // 请求出错进行的处理
    return Promise.reject(error)
  }
)

export default instance
