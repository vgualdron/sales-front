export default {
  PATH: '@module/product',
  actions: {
    FETCH_PRODUCTS: '@actions/fetchProducts',
    ADD_PRODUCT: '@actions/addProduct',
    UPDATE_PRODUCT: '@actions/updateProduct',
    DELETE_PRODUCT: '@actions/deleteProduct',
  },
  getters: {
  },
  mutations: {
    SET_PRODUCTS: '@mutations/setProducts',
    SET_STATUS_ADD_PRODUCT: '@mutations/setStatusAddProduct',
  },
};
