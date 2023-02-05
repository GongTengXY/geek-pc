import request from '@/utils/request'

// 获取频道列表
export const getChannels = () =>
  request({
    method: 'get',
    url: '/channels',
  })

// 获取文章列表
export const getArticles = (params) =>
  request({
    method: 'get',
    url: '/mp/articles',
    params,
  })

// 删除文章
export const delArticle = (id) =>
  request({
    method: 'delete',
    url: `/mp/articles/${id}`,
  })

// 发布文章
export const addArticle = (data, draft) =>
  request({
    method: 'post',
    url: `/mp/articles?draft=${draft}`,
    data,
  })

// 更新文章
export const editArticle = (data, draft) =>
  request({
    method: 'put',
    url: `/mp/articles/${data.id}?draft=${draft}`,
    data,
  })

// 获取文章详情
export const getArticleDetails = (id) =>
  request({
    method: 'get',
    url: `/mp/articles/${id}`,
  })
