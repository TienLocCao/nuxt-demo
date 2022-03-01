// import Vue from "vue";
import Vuex from 'vuex'
import products from './modules/products'

// export const bus = new Vue();
// Vue.use(Vuex);
const createStore = () => {
  return new Vuex.Store({
    modules: {
      products,
    },
  })
}
export const strict = false
export default createStore
