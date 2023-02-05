import * as types from '../actionTypes'
import { LoginUser } from '@/api/user.js'
import { setToken, setRefreshToken } from '@/utils/token'

export const getUserToken = (payload) => ({ type: types.LOGIN, payload })

export const thunkLogin = (payload) => {
  return async (dispatch) => {
    const { data } = await LoginUser(payload)
    // 同时存到本地
    setToken(data.token)
    setRefreshToken(data.refresh_token)
    // 派发action到store更改token
    dispatch(getUserToken(data.token))
  }
}
