import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Input,
  Space,
  Radio,
  Upload,
  message,
} from 'antd'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import styles from './index.module.scss'
import { PlusOutlined } from '@ant-design/icons'
import Channel from '@/components/Channel'
import {
  thunkArticleDetails,
  thunkEditArticle,
  thunkPubArticle,
} from '@/store/actions/articles'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

const Publish = () => {
  const location = useLocation()
  const id = new URLSearchParams(location.search).get('id')
  // console.log(params)
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [type, setType] = useState(1)
  const [fileList, setFileList] = useState([])

  useEffect(() => {
    // 表单回显
    const setFormData = async () => {
      // console.log(params.id)
      const { channel_id, content, cover, title } = await dispatch(
        thunkArticleDetails(id)
      )
      // console.log(cover)
      form.setFieldsValue({ title, content, channel_id })
      setType(cover.type)
      setFileList(cover.images.map((item) => ({ url: item })))
    }
    if (id) {
      setFormData()
    }
  }, [dispatch, form, id])
  // 图片类型切换
  const onTypeChange = (e) => {
    setType(e.target.value)
    setFileList()
  }
  // 上传图片
  const onUploadChange = ({ fileList }) => {
    setFileList(fileList)
  }
  // 提交
  const onFinish = async (value, draft = false) => {
    if (type !== fileList.length) {
      return message.warning('请按照选择的封面类型上传图片')
    }
    const param = {
      ...value,
      cover: {
        type,
        images: fileList.map((item) => item?.response?.data?.url || item.url),
      },
    }
    if (id) {
      param.id = id
      await dispatch(thunkEditArticle(param, draft))
      message.success('文章修改成功')
    } else {
      await dispatch(thunkPubArticle(param, draft))
      message.success('文章发表成功')
    }
    setType(1)
    setFileList([])
    form.resetFields()
    navigate('/home/article')
  }
  // 保存草稿
  const saveDraft = async () => {
    const values = await form.validateFields()
    onFinish(values, true)
  }
  return (
    <div className={styles.root}>
      <Card
        title={
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/home/dashboard">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/home/article">内容管理</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{id ? '修改文章' : '发布文章'}</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form labelCol={{ offset: 2 }} onFinish={onFinish} form={form}>
          <Form.Item
            label="文章标题："
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }}></Input>
          </Form.Item>
          <Form.Item
            label="所属频道："
            name="channel_id"
            rules={[{ required: true, message: '请选择所属频道' }]}
          >
            <Channel width={400}></Channel>
          </Form.Item>
          <Form.Item label="文章封面：">
            <Radio.Group value={type} onChange={onTypeChange}>
              <Radio value={1}>单图</Radio>
              <Radio value={3}>三图</Radio>
              <Radio value={0}>无图</Radio>
            </Radio.Group>
            {type > 0 ? (
              <div style={{ marginTop: 16 }}>
                <Upload
                  name="image"
                  listType="picture-card"
                  action="http://geek.itheima.net/v1_0/upload"
                  fileList={fileList}
                  onChange={onUploadChange}
                >
                  {/* 当上传的图片超过type总章数的时候，才显示上传 */}
                  {fileList.length < type ? (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  ) : null}
                </Upload>
              </div>
            ) : null}
          </Form.Item>
          <Form.Item
            label="文章内容："
            name="content"
            initialValue=""
            wrapperCol={{ span: 18 }}
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill placeholder="请输入文章内容" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 10 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                {id ? '修改文章' : '发布文章'}
              </Button>
              <Button onClick={saveDraft}>存入草稿</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish
