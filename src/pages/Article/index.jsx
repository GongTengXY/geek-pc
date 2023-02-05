import styles from './index.module.scss'
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Space,
  DatePicker,
  Table,
  Image,
  Tag,
  Modal,
  message,
} from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Channel from '@/components/Channel'
import {
  thunkArticles,
  thunkChannels,
  thunkDelArticle,
} from '@/store/actions/articles'
import { useEffect, useRef } from 'react'
import defaultPic from '@/assets/images/error.png'

const { RangePicker } = DatePicker // 日期选择框
const { confirm } = Modal // 对话框
const statusLabel = [
  { text: '草稿', color: 'default' },
  { text: '待审核', color: 'blue' },
  { text: '审核通过', color: 'green' },
  { text: '审核拒绝', color: 'red' },
]

const Article = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useRef({
    page: 1,
    per_page: 10,
    channel_id: undefined,
    status: undefined,
    begin_pubdate: undefined,
    end_pubdate: undefined,
  })
  const { total_count, results, page } = useSelector((state) => state.article)

  // 删除文章
  const delArticleFn = (id) => {
    confirm({
      title: '您是否确认删除该文章？',
      cancelText: '取消',
      okText: '确认',
      onOk: async () => {
        await dispatch(thunkDelArticle(id))
        dispatch(thunkArticles(params.current))
        message.success('删除成功')
      },
    })
  }
  // 筛选表单提交
  const onFinish = (props) => {
    console.log(props)
    params.current.status = props.status
    params.current.channel_id = props.channel_id
    if (props.dateArr) {
      params.current.begin_pubdate = props.dateArr[0].format(
        'YYYY-MM-DD HH:mm:ss'
      )
      params.current.end_pubdate = props.dateArr[1].format(
        'YYYY-MM-DD HH:mm:ss'
      )
    } else {
      params.current.begin_pubdate = undefined
      params.current.end_pubdate = undefined
    }
    dispatch(thunkArticles(params.current))
  }
  // 分页
  const pageChange = (page, pageSize) => {
    console.log(page, pageSize)
    params.current.page = page
    params.current.per_page = pageSize
    dispatch(thunkArticles(params.current))
  }
  // 编辑文章
  const editArticles = (id) => {
    navigate(`/home/publish?id=${id}`)
  }

  // table数据
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      key: 'cover',
      render: (e) => (
        <Image
          src={e?.images?.[0] || defaultPic}
          width={200}
          height={120}
        ></Image>
      ),
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (e) => {
        const status = statusLabel[e]
        return <Tag color={status.color}>{status.text}</Tag>
      },
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate',
      key: 'pubdate',
    },
    {
      title: '阅读数',
      dataIndex: 'read_count',
      key: 'read_count',
    },
    {
      title: '评论数',
      dataIndex: 'comment_count',
      key: 'comment_count',
    },
    {
      title: '点赞数',
      dataIndex: 'like_count',
      key: 'like_count',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button
            onClick={() => editArticles(record.id)}
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
          />
          <Button
            onClick={() => delArticleFn(record.id)}
            type="primary"
            shape="circle"
            icon={<DeleteOutlined />}
          />
        </Space>
      ),
    },
  ]

  useEffect(() => {
    dispatch(thunkChannels())
    dispatch(thunkArticles(params.current))
  }, [dispatch])
  return (
    <div className={styles.root}>
      <Card
        title={
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={'/home/dashboard'}>首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        bordered={false}
        style={{
          width: '100%',
        }}
      >
        <Form onFinish={onFinish}>
          <Form.Item label="状态:" name="status">
            <Radio.Group>
              <Radio value={undefined}> 全部 </Radio>
              <Radio value={0}> 草稿 </Radio>
              <Radio value={1}> 待审核 </Radio>
              <Radio value={2}> 已通过 </Radio>
              <Radio value={3}> 已拒绝 </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="频道:" name="channel_id">
            <Channel width={288}></Channel>
          </Form.Item>
          <Form.Item label="日期:" name="dateArr">
            <RangePicker style={{ width: 288 }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card
        title={`根据筛选条件共查询到 ${total_count} 条结果：`}
        style={{ marginTop: 24 }}
      >
        <Table
          columns={columns}
          dataSource={results}
          rowKey="id"
          pagination={{
            current: page,
            total: total_count,
            onChange: pageChange,
          }}
        ></Table>
      </Card>
    </div>
  )
}

export default Article
