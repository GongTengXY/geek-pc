import { Layout, Menu, Popconfirm, Button } from 'antd'
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import {
  PieChartOutlined,
  SolutionOutlined,
  FileWordOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkUserInfo, thunkQuit } from '@/store/actions/user'

const { Header, Sider, Content } = Layout

const GeekLayout = () => {
  const location = useLocation()
  let defaultKey = location.pathname
  if (defaultKey.startsWith('/home/publish')) {
    defaultKey = '/home/publish'
  }
  const items = [
    {
      label: <Link to="/home/dashboard">数据面板</Link>,
      key: '/home/dashboard',
      icon: <PieChartOutlined />,
    },
    {
      label: <Link to="/home/article">内容管理</Link>,
      key: '/home/article',
      icon: <SolutionOutlined />,
    },
    {
      label: <Link to="/home/publish">发布文章</Link>,
      key: '/home/publish',
      icon: <FileWordOutlined />,
    },
  ]
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userName } = useSelector((state) => state.user)
  useEffect(() => {
    dispatch(thunkUserInfo())
  }, [dispatch])
  return (
    <Layout className={styles['geek-layout']}>
      <Sider width={148}>
        <div className="logo">GEEK</div>
        <Menu
          selectedKeys={[defaultKey]}
          mode="inline"
          theme="dark"
          items={items}
        ></Menu>
      </Sider>
      <Layout>
        <Header>
          <span style={{ fontSize: 16 }}>极客园自媒体端</span>
          <div>
            <span>{userName}</span>
            <Popconfirm
              placement="bottomRight"
              title="您确认退出极客园自媒体端吗？"
              okText="确认"
              cancelText="取消"
              onConfirm={() => {
                dispatch(thunkQuit())
                navigate('/login', { replace: true })
              }}
            >
              <Button type="link" icon={<LogoutOutlined />}>
                退出
              </Button>
            </Popconfirm>
          </div>
        </Header>
        <Content>
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  )
}

export default GeekLayout
