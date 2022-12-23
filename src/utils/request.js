import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000,
})

instance.interceptors.request.use(
  (config) => {
    console.log(config)
  },
  (error) => {}
)

instance.interceptors.response.use(
  (response) => {
    console.log(response.data)
  },
  (error) => {}
)

export default instance
