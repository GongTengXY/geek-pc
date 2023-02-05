import { LOGIN, USERINFO, QUITLOGIN } from '../actionTypes'
import { getToken } from '@/utils/token'
const initValue = {
  token: getToken(),
  userName: '',
}

export default function user(state = initValue, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, token: action.payload }
    case USERINFO:
      return { ...state, userName: action.payload }
    case QUITLOGIN:
      return { ...state, token: action.payload, userName: action.payload }
    default:
      return state
  }
}
