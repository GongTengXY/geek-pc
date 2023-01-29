import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound'

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" replace={true} /> },
  { path: '/login', element: <Login /> },
  { path: '/home', element: <Layout /> },
  { path: '*', element: <NotFound /> },
])

export default router
