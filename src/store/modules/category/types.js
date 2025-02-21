export default {
  PATH: '@module/category',
  actions: {
    FETCH_CATEGORIES: '@actions/fetchCategories',
    ADD_CATEGORY: '@actions/addCategory',
    UPDATE_CATEGORY: '@actions/updateCategory',
    DELETE_CATEGORY: '@actions/deleteCategory',
  },
  getters: {
  },
  mutations: {
    SET_CATEGORIES: '@mutations/setCategories',
    SET_STATUS_ADD_CATEGORY: '@mutations/setStatusAddCategory',
  },
};
