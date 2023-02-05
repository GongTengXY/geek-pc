import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { thunkChannels } from '@/store/actions/articles'
import { Select } from 'antd'

const Channel = ({ width, value, onChange }) => {
  // 频道相关逻辑
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(thunkChannels())
  }, [dispatch])
  const { channels } = useSelector((state) => state.article)
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e)}
      placeholder="请选择所属频道"
      style={width ? { width } : null}
    >
      {channels.map((item) => (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  )
}

export default Channel
