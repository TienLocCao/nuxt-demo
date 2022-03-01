import { getAll } from '@/api/products'

const getDefaultState = () => {
  return {
    products: [],
  }
}

const state = getDefaultState()

const getters = {
  products: (state) => state.products,
}

const actions = {
  async fetchProducts({ commit }, data) {
    await getAll(data)
      .then((response) => {
        commit('setListProducts', response.data)
      })
      .catch((error) => {
        commit('fetDataFail', error.response.data)
      })
  },
}

const mutations = {
  setListProducts(state, products) {
    const productsArr = []
    for (const key in products) {
      productsArr.push({ ...products[key], id: key })
    }
    state.products = productsArr
  },
  fetDataFail(state, error) {
    // eslint-disable-next-line no-console
    console.error(error)
  },

  resetState(state) {
    Object.assign(state, getDefaultState())
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
