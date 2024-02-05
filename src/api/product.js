import request from '@/utils/request'

// 獲取商品詳情
export const getDetailAPI = (id) => {
  return request({
    url: `/product/${id}`
  })
}

// 獲取所有商品
export const getAllProductAPI = () => {
  return request({
    url: '/product'
  })
}

// 新增商品
export const addNewProductAPI = (data) => {
  return request({
    url: '/product',
    method: 'POST',
    data
  })
}

// 刪除商品
export const deleteProductAPI = (id) => {
  return request({
    url: `/product/${id}`,
    method: 'DELETE'
  })
}

// 更新商品
export const updateProductAPI = (id, data) => {
  return request({
    url: `/product/${id}`,
    method: 'PATCH',
    data
  })
}

// 新增商品到購物車
export const addToCartAPI = (data) => {
  return request({
    url: '/cart',
    method: 'POST',
    data
  })
}

// 刪除購物車內商品
export const deleteCartProductAPI = (id) => {
  return request({
    url: `/cart/${id}`,
    method: 'DELETE'
  })
}
