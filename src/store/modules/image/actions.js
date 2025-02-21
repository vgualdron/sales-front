import types from './types';
import imageApi from '../../../api/image/imageApi';

export default {
  async [types.actions.ADD_IMAGE]({ commit }, payload) {
    try {
      const response = await imageApi.addImage(payload);
      commit(types.mutations.SET_STATUS_ADD_IMAGE, response.data);
    } catch (error) {
      console.error(error);
      commit(types.mutations.SET_STATUS_ADD_IMAGE, error.response.data);
    }
  },
  async [types.actions.UPDATE_IMAGE](context, payload) {
    try {
      await imageApi.updateImage(payload);
    } catch (error) {
      console.error(error);
    }
  },
  async [types.actions.DELETE_IMAGE](context, id) {
    try {
      await imageApi.deleteImage(id);
    } catch (error) {
      console.error(error);
    }
  },
};
