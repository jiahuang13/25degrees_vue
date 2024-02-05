import request from '@/utils/request'

// 獲取文章詳情
export const getDetailAPI = (id) => {
  return request({
    url: `/article/${id}`
  })
}

// 獲取所有文章
export const getAllArticlesAPI = () => {
  return request({
    url: '/article'
  })
}

// 新增文章
export const addNewArticleAPI = (data) => {
  return request({
    url: '/article',
    method: 'POST',
    data
  })
}

// 刪除文章
export const deleteArticleAPI = (id) => {
  return request({
    url: `/article/${id}`,
    method: 'DELETE'
  })
}

// 更新文章
export const updateArticleAPI = (id, data) => {
  return request({
    url: `/article/${id}`,
    method: 'PATCH',
    data
  })
}
