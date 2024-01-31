const KEY = 'vue-25degrees-token'

// 設置token
export const setToken = (newToken) => {
  localStorage.setItem(KEY, newToken)
}

// 獲取token
export const getToken = () => {
  return localStorage.getItem(KEY)
}

// 刪除token
export const delToken = () => {
  localStorage.removeItem(KEY)
}
