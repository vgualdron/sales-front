import types from './types';

export default {
  [types.mutations.SET_STATUS_ADD_IMAGE](state, payload) {
    state.statusAddImage = payload;
  },
};
