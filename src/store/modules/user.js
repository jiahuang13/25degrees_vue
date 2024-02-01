import request from '@/utils/request'

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async registerAPI (data) {
      await request({
        url: '/user',
        method: 'POST',
        data
      })
    }
  }
}
