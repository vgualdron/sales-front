import types from './types';
import shopApi from '../../../api/shop/shopApi';

export default {
  async [types.actions.FETCH_SHOPS]({ commit }, payload) {
    try {
      const response = await shopApi.fetchShops(payload);
      commit(types.mutations.SET_SHOPS, response.data.data);
    } catch (error) {
      console.error(error);
      commit(types.mutations.SET_SHOPS, error.response.data);
    }
  },
};
