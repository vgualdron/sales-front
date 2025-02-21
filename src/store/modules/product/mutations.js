import types from './types';

export default {
  [types.mutations.SET_PRODUCTS](state, payload) {
    state.products = payload;
  },
  [types.mutations.SET_STATUS_ADD_PRODUCT](state, payload) {
    state.statusAddProduct = payload;
  },
};
