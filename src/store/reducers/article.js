import { ARTICLES, CHANNELS } from '../actionTypes/index'

const initValue = {
  // 频道
  channels: [],
  // 文章
  results: [],
  page: 1,
  per_page: 10,
  total_count: 0,
}

export default function article(state = initValue, action) {
  switch (action.type) {
    case ARTICLES:
      return { ...state, ...action.payload }
    case CHANNELS:
      return { ...state, channels: action.payload }
    default:
      return state
  }
}
