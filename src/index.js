import React from 'react'
import ReactDOM from 'react-dom/client'
import 'antd/dist/antd.min.css'
import './index.css'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import router from '@/router'
import store from './store'
// import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
