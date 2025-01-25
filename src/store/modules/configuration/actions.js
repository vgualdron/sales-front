import types from './types';
import configurationApi from '../../../api/configuration/configurationApi';

export default {
  async [types.actions.FETCH_CONFIGURATIONS]({ commit }, payload) {
    try {
      const response = await configurationApi.fetchConfigurations(payload);
      commit(types.mutations.SET_CONFIGURATIONS, response.data.data);
    } catch (error) {
      console.error(error);
      commit(types.mutations.SET_CONFIGURATIONS, error.response.data);
    }
  },
  async [types.actions.ADD_CONFIGURATION]({ commit }, payload) {
    try {
      const response = await configurationApi.addConfiguration(payload);
      commit(types.mutations.SET_STATUS_ADD_CONFIGURATION, response.data);
    } catch (error) {
      console.error(error);
      commit(types.mutations.SET_STATUS_ADD_CONFIGURATION, error.response.data);
    }
  },
  async [types.actions.UPDATE_CONFIGURATION](context, payload) {
    try {
      await configurationApi.updateConfiguration(payload);
    } catch (error) {
      console.error(error);
    }
  },
  async [types.actions.DELETE_CONFIGURATION](context, id) {
    try {
      await configurationApi.deleteConfiguration(id);
    } catch (error) {
      console.error(error);
    }
  },
};
