import request from '@/utils/request'
import { getRefreshToken } from '@/utils/token'

// 用户验证
export const LoginUser = (data) =>
  request({
    method: 'post',
    url: '/authorizations',
    data,
  })

// 获取用户信息
export const getUserInfo = () =>
  request({
    method: 'get',
    url: 'user/profile',
  })

// refresh_token续签
export const putRefreshToken = () =>
  request({
    method: 'put',
    url: '/authorizations',
    headers: { Authorization: `Bearer ${getRefreshToken()}` },
  })
