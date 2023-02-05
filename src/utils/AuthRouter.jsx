// 路由鉴权组件
import { Navigate, useLocation } from 'react-router-dom'
import { getToken } from './token'
import { setPath } from './routerPath'
export default function AuthRouter(props) {
  const token = getToken()
  const location = useLocation()
  if (token) {
    setPath(location.pathname)
    return <>{props.component}</>
  } else {
    return <Navigate to={{ pathname: '/login' }} />
  }
}
