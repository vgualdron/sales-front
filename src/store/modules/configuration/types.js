export default {
  PATH: '@module/configuration',
  actions: {
    FETCH_CONFIGURATIONS: '@actions/fetchConfigurations',
    ADD_CONFIGURATION: '@actions/addConfiguration',
    UPDATE_CONFIGURATION: '@actions/updateConfiguration',
    DELETE_CONFIGURATION: '@actions/deleteConfiguration',
  },
  getters: {
  },
  mutations: {
    SET_CONFIGURATIONS: '@mutations/setConfigurations',
    SET_STATUS_ADD_CONFIGURATION: '@mutations/setStatusAddConfiguration',
  },
};
