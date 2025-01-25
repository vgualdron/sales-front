export default {
  PATH: '@module/report',
  actions: {
    LIST_REPORTS: '@actions/listReports',
    EXECUTE_REPORT: '@actions/executeReport',
  },
  getters: {
  },
  mutations: {
    SET_REPORTS: '@mutations/setReports',
    SET_DATA: '@mutations/setData',
    SET_STATUS: '@mutations/setStatus',
    SET_RESPONSE_MESSAGES: '@mutations/setResponseMessages',
  },
};
