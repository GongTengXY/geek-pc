import axios from 'axios'
import { getToken } from './token'
import store from '@/store'
import { getUserToken } from '@/store/actions/login'
import { quitLogin } from '@/store/actions/user'
import { putRefreshToken } from '@/api/user'
import { setToken, removeRefreshToken, removeToken } from './token'

const instance = axios.create({
  baseURL: process.env.REACT_APP_URL,
  timeout: 5000,
})

instance.interceptors.request.use(
  (config) => {
    if (
      store.getState().user.token &&
      config.headers.Authorization === undefined
    ) {
      config.headers.Authorization = `Bearer ${getToken()}`
    }
    return config
  },
  (error) => {
    // 请求出错进行的处理
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    // console.log(response)
    return response.data
  },
  async (error) => {
    // 请求出错进行的处理
    console.log(error)
    if (error.response.status === 401) {
      // 重新发起请求
      const res = await putRefreshToken()
      console.log(res)
      store.dispatch(getUserToken(res.data.token))
      setToken(res.data.token)
      error.config.headers.Authorization = `Bearer ${res.data.token}`
      return instance(error.config)
    } else if (error.response.status === 500 && error.config.method === 'put') {
      // 此时refresh_token已经失效
      // 清除 token和refresh_token还有redux存储的值
      removeRefreshToken()
      removeToken()
      store.dispatch(quitLogin(''))
      window.location.replace('/login')
    }
    return Promise.reject(error)
  }
)

export default instance
