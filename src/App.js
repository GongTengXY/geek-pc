import { BrowserRouter, Route, Routes, Navigate, Link } from 'react-router-dom'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/login" replace={true} />}
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Layout />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}
