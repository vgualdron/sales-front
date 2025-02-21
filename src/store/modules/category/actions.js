import types from './types';
import categoryApi from '../../../api/category/categoryApi';

export default {
  async [types.actions.FETCH_CATEGORIES]({ commit }, payload) {
    try {
      const response = await categoryApi.fetchCategories(payload);
      commit(types.mutations.SET_CATEGORIES, response.data.data);
    } catch (error) {
      console.error(error);
      commit(types.mutations.SET_CATEGORIES, error.response.data);
    }
  },
  async [types.actions.ADD_CATEGORY]({ commit }, payload) {
    try {
      const response = await categoryApi.addCategory(payload);
      commit(types.mutations.SET_STATUS_ADD_CATEGORY, response.data);
    } catch (error) {
      console.error(error);
      commit(types.mutations.SET_STATUS_ADD_CATEGORY, error.response.data);
    }
  },
  async [types.actions.UPDATE_CATEGORY](context, payload) {
    try {
      await categoryApi.updateCategory(payload);
    } catch (error) {
      console.error(error);
    }
  },
  async [types.actions.DELETE_CATEGORY](context, id) {
    try {
      await categoryApi.deleteCategory(id);
    } catch (error) {
      console.error(error);
    }
  },
};
