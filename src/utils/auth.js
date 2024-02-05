// 前台登入權限
export const getToken = () => {
  return localStorage.getItem('25degrees_token')
}

export const setToken = () => {
  return localStorage.setItem('25degrees_token', 'imtokennnnnn')
}

export const removeToken = () => {
  return localStorage.removeItem('25degrees_token')
}

// 後台權限
export const getAdminToken = () => {
  return localStorage.getItem('25degrees_admin_token')
}

export const setAdminToken = () => {
  return localStorage.setItem('25degrees_admin_token', 'admintokennnnn')
}

export const removeAdminToken = () => {
  return localStorage.removeItem('25degrees_admin_token')
}
