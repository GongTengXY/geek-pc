import * as types from '../actionTypes'
import { LoginUser } from '@/api/user.js'
import { setToken } from '@/utils/token'

const getUserToken = (payload) => ({ type: types.LOGIN, payload })

export const thunkLogin = (payload) => {
  return async (dispatch) => {
    const { data } = await LoginUser(payload)
    // 同时存到本地
    setToken(data.token)
    // 派发action到store更改token
    dispatch(getUserToken(data))
  }
}
