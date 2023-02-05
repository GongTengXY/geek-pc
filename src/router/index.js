import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Empty } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound'
import AuthRouter from '../utils/AuthRouter'
// import Article from '@/pages/Article'
// import Dashboard from '@/pages/Dashboard'
// import Publish from '@/pages/Publish'
import { lazy, Suspense } from 'react'
const Article = lazy(() => import('@/pages/Article'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Publish = lazy(() => import('@/pages/Publish'))

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" replace={true} /> },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/home',
    element: <AuthRouter component={<Layout />} />,
    children: [
      {
        path: 'dashboard',
        element: (
          <AuthRouter
            component={
              <Suspense
                fallback={
                  <Empty>
                    <LoadingOutlined style={{ fontSize: '12px' }} />
                    '正在加载中'
                  </Empty>
                }
              >
                <Dashboard />
              </Suspense>
            }
          />
        ),
      },
      {
        path: 'article',
        element: (
          <AuthRouter
            component={
              <Suspense
                fallback={
                  <Empty>
                    <LoadingOutlined style={{ fontSize: '12px' }} />
                    '正在加载中'
                  </Empty>
                }
              >
                <Article />
              </Suspense>
            }
          />
        ),
      },
      {
        path: 'publish',
        element: (
          <AuthRouter
            component={
              <Suspense
                fallback={
                  <Empty>
                    <LoadingOutlined style={{ fontSize: '12px' }} />
                    '正在加载中'
                  </Empty>
                }
              >
                <Publish />
              </Suspense>
            }
          />
        ),
      },
    ],
  },
  // {
  //   element: <Layout />,
  //   children: [
  //     {
  //       path: '/home/dashboard',
  //       element: <AuthRouter component={<Dashboard />} />,
  //     },
  //     {
  //       path: '/home/article',
  //       element: <AuthRouter component={<Article />} />,
  //     },
  //     {
  //       path: '/home/publish/:id',
  //       element: <AuthRouter component={<Publish />} />,
  //     },
  //   ],
  // },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default router
