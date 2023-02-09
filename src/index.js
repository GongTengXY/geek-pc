import React from 'react'
import ReactDOM from 'react-dom/client'
import 'antd/dist/antd.min.css'
import './index.scss'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import router from '@/router'
import store from './store'
import { ConfigProvider } from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/lib/locale/zh_CN'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ConfigProvider locale={locale}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </Provider>
)
