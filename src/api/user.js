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
