import request from '@/utils/request'

// 用户验证
export const LoginUser = (data) =>
  request({
    method: 'post',
    url: '/authorizations',
    data,
  })
