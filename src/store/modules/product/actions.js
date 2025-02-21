import types from './types';
import productApi from '../../../api/product/productApi';

export default {
  async [types.actions.FETCH_PRODUCTS]({ commit }, payload) {
    try {
      const response = await productApi.fetchProducts(payload);
      commit(types.mutations.SET_PRODUCTS, response.data.data);
    } catch (error) {
      console.error(error);
      commit(types.mutations.SET_PRODUCTS, error.response.data);
    }
  },
  async [types.actions.ADD_PRODUCT]({ commit }, payload) {
    try {
      const response = await productApi.addProduct(payload);
      commit(types.mutations.SET_STATUS_ADD_PRODUCT, response.data);
    } catch (error) {
      console.error(error);
      commit(types.mutations.SET_STATUS_ADD_PRODUCT, error.response.data);
    }
  },
  async [types.actions.UPDATE_PRODUCT](context, payload) {
    try {
      await productApi.updateProduct(payload);
    } catch (error) {
      console.error(error);
    }
  },
  async [types.actions.DELETE_PRODUCT](context, id) {
    try {
      await productApi.deleteProduct(id);
    } catch (error) {
      console.error(error);
    }
  },
};
