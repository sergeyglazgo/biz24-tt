import { createStore } from 'vuex'
import axios from 'axios'


export const store = createStore({
  state: {
    products: null,
    product: null
  },
  mutations: {
    setProducts (state, products) {
      state.products = products
    },
    setProduct (state, product) {
      state.product = product
    }
  },
  actions: {
    async loadProducts ({ commit }) {
      const { data } = await axios.get(`https://63e50270c04baebbcdb16344.mockapi.io/products`)
      commit('setProducts', data)
    },
    async loadProduct ({ commit }, payload) {
      const { data } = await axios.get(`https://63e50270c04baebbcdb16344.mockapi.io/products/${payload}`)
      commit('setProduct', data)
    }
  },
  getters: {
    getProducts (state) {
      return state.products
    },
    getProduct (state) {
      return state.product
    }
  }
})
