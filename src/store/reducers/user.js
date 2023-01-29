import { LOGIN } from '../actionTypes'
import { getToken } from '@/utils/token'
const initValue = {
  token: getToken(),
}

export default function user(state = initValue, action) {
  if (action.type === LOGIN) {
    return {
      ...action.payload,
    }
  }
  return state
}
