import { combineReducers } from 'redux'
import user from './user'
import article from './article'

const rootReduer = combineReducers({
  user,
  article,
})

export default rootReduer
