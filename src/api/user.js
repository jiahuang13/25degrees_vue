import request from '@/utils/request'

// 新增會員
export const registerAPI = (data) => {
  return request({
    url: '/user',
    method: 'POST',
    data
  })
}

// 獲取所有會員資料
export const getAllUserAPI = () => {
  return request({
    url: '/user'
  })
}

// 獲取單筆會員資料
export const getUserAPI = (id) => {
  return request({
    url: `/user/${id}`
  })
}

// 刪除會員
export const deleteUserAPI = (id) => {
  return request({
    url: `/user/${id}`,
    method: 'DELETE'
  })
}

// 更新文章
export const updateUserAPI = (id, data) => {
  return request({
    url: `/user/${id}`,
    method: 'PATCH',
    data
  })
}

// 獲取管理員資料
export const getAdminUserAPI = () => {
  return request({
    url: '/admin'
  })
}
