import types from './types';
import reportApi from '../../../api/report/reportApi';

export default {
  async [types.actions.LIST_REPORTS]({ commit }, payload) {
    try {
      const response = await reportApi.list(payload);
      commit(types.mutations.SET_STATUS, true);
      commit(types.mutations.SET_REPORTS, response.data.data);
    } catch (error) {
      commit(types.mutations.SET_STATUS, false);
      if (error.message !== 'Network Error') {
        commit(types.mutations.SET_RESPONSE_MESSAGES, error.response.data.message);
      } else {
        commit(types.mutations.SET_RESPONSE_MESSAGES, [
          {
            text: 'Error de red',
            detail: 'Intente conectarse a otra red de internet',
          },
        ]);
      }
    }
  },
  async [types.actions.EXECUTE_REPORT]({ commit }, id) {
    try {
      const response = await reportApi.executeReport(id);
      commit(types.mutations.SET_STATUS, true);
      commit(types.mutations.SET_DATA, response.data.data);
    } catch (error) {
      commit(types.mutations.SET_STATUS, false);
      if (error.message !== 'Network Error') {
        commit(types.mutations.SET_RESPONSE_MESSAGES, error.response.data.message);
      } else {
        commit(types.mutations.SET_RESPONSE_MESSAGES, [
          {
            text: 'Error de red',
            detail: 'Intente conectarse a otra red de internet',
          },
        ]);
      }
    }
  },
};
