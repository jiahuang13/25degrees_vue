import request from '@/utils/request'

export default {
  namespaced: true,
  state () {
    return {
      list: []
    }
  },
  mutations: {
    updateList (state, newList) {
      state.list = newList
    },
    updateCount (state, obj) {
      // obj: { id, newcount}
      const goods = state.list.find(item => item.id === obj.id)
      goods.count = obj.count
    }
  },
  actions: {
    async getListAPI (context) {
      const res = await request.get('/cart')
      // console.log(res)
      context.commit('updateList', res)
    },
    async updateCountAPI (context, obj) {
      await request.patch(`/cart/${obj.id}`, { count: obj.count })
      // 將更新同步到vuex
      context.commit('updateCount', obj)
    }
  }
}
