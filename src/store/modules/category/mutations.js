import types from './types';

export default {
  [types.mutations.SET_CATEGORIES](state, payload) {
    state.categories = payload;
  },
  [types.mutations.SET_STATUS_ADD_CATEGORY](state, payload) {
    state.statusAddCategory = payload;
  },
};
