import * as types from '../actionTypes'
import {
  getArticles,
  getChannels,
  delArticle,
  editArticle,
  getArticleDetails,
  addArticle,
} from '@/api/article'

export const getChannelList = (payload) => ({ type: types.CHANNELS, payload }) // 频道列表
export const getArticleList = (payload) => ({ type: types.ARTICLES, payload }) // 文章列表
// export const addArticleList = (payload) => ({ type: types.PUBARTICLE, payload }) // 发布文章

// 获取文章列表
export const thunkArticles = (payload) => {
  return async (dispatch) => {
    // 获取数据
    const { data } = await getArticles(payload)
    dispatch(getArticleList(data))
  }
}

// 获取频道列表
export const thunkChannels = (payload) => {
  return async (dispatch) => {
    // 获取数据
    const { data } = await getChannels()
    dispatch(getChannelList(data.channels))
  }
}

// 删除文章
export const thunkDelArticle = (payload) => {
  return async (dispatch) => {
    await delArticle(payload)
  }
}

// 发布文章
export const thunkPubArticle = (res, draft) => {
  return async () => {
    await addArticle(res, draft)
  }
}

// 编辑文章
export const thunkEditArticle = (res, draft) => {
  return async () => {
    await editArticle(res, draft)
  }
}

// 文章详情
export const thunkArticleDetails = (payload) => {
  return async () => {
    const { data } = await getArticleDetails(payload)
    return data
  }
}
