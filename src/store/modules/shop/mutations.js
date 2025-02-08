import types from './types';

export default {
  [types.mutations.SET_SHOPS](state, payload) {
    state.shops = payload;
  },
};
