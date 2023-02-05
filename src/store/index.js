import thunk from 'redux-thunk'
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
// import { composeWithDevTools } from '@redux-devtools/extension'
import reducer from './reducers'

let middlewares

if (process.env.NODE_ENV === 'production') {
  // 在生产环境中，只启用thunk中间件
  middlewares = applyMiddleware(thunk)
} else {
  // 在开发环境中
  const { composeWithDevTools } = require('@redux-devtools/extension')
  middlewares = composeWithDevTools(applyMiddleware(thunk))
}

const store = createStore(reducer, middlewares)

export default store
