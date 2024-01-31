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
