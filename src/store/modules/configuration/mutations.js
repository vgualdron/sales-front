import types from './types';

export default {
  [types.mutations.SET_CONFIGURATIONS](state, payload) {
    localStorage.setItem('configurations', JSON.stringify(payload));
    state.configurations = payload;
  },
  [types.mutations.SET_STATUS_ADD_CONFIGURATION](state, payload) {
    state.statusAddConfiguration = payload;
  },
};
