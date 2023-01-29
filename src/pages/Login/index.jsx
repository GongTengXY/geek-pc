import { Card, Button, Checkbox, Form, Input, message } from 'antd'
import logo from '@/assets/images/logo.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { thunkLogin } from '@/store/actions/login'
import './index.scss'
import { useState } from 'react'

export default function Login(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setloadings] = useState(false)
  const onFinish = async ({ mobile, code }) => {
    setloadings(true)
    // 使用trycatch配合message组件对登陆成功再跳转做一下处理
    try {
      await dispatch(thunkLogin({ mobile, code }))
      message.success('登陆成功', 1, () => navigate('/home'))
    } catch (error) {
      console.log()
      message.error(`${error.response.data.message}`, 1)
    }
  }
  return (
    <div className="login">
      <Card className="login-container" bordered={false}>
        {/* 图片 */}
        <img src={logo} className="login-logo" />
        {/* 表单 */}
        <Form
          validateTrigger={'onBlur'}
          size="middle"
          onFinish={onFinish}
          initialValues={{
            mobile: '13911111111',
            code: '246810',
          }}
        >
          <Form.Item
            label="手机号"
            name="mobile"
            rules={[
              {
                required: true,
                message: '请输入您的手机号!',
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '您输入的手机号格式不正确！',
                validateTrigger: 'onBlur',
              },
            ]}
          >
            <Input placeholder="请输入您的手机号" />
          </Form.Item>

          <Form.Item
            label="验证码"
            name="code"
            rules={[
              {
                required: true,
                message: '请输入验证码!',
              },
              {
                len: 6,
                message: '验证码为6个字符',
                validateTrigger: 'onBlur',
              },
            ]}
          >
            <Input placeholder="清输入您的验证码" />
          </Form.Item>

          <Form.Item
            name="agree"
            valuePropName="checked"
            wrapperCol={{
              flex: 1,
            }}
            rules={[
              {
                validator: (rule, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error('请阅读并同意条款和协议')),
              },
            ]}
          >
            <Checkbox>我已阅读并同意[隐私条款]和[用户协议]</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
