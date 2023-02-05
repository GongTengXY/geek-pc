import * as types from '../actionTypes'
import { getUserInfo } from '@/api/user'
import { removeToken, removeRefreshToken } from '@/utils/token'
import { removePath } from '@/utils/routerPath'

export const getUserContext = (payload) => ({ type: types.USERINFO, payload }) // 获取用户信息

export const quitLogin = (payload) => ({ type: types.QUITLOGIN, payload })

export const thunkUserInfo = () => {
  return async (dispatch) => {
    const { data } = await getUserInfo()
    // 分发action给store
    dispatch(getUserContext(data.name))
  }
}

export const thunkQuit = () => {
  return (dispatch) => {
    removeToken()
    removePath()
    removeRefreshToken()
    dispatch(quitLogin(''))
  }
}
