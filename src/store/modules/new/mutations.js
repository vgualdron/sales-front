import types from './types';

export default {
  [types.mutations.SET_NEWS](state, payload) {
    state.news = payload;
  },
  [types.mutations.SET_NEWS_REDS](state, payload) {
    state.newsReds = payload;
  },
  [types.mutations.SET_NEW](state, payload) {
    state.new = payload;
  },
  [types.mutations.SET_STATUS](state, payload) {
    state.status = payload;
  },
  [types.mutations.SET_RESPONSE_MESSAGES](state, payload) {
    state.responseMessages = payload;
  },
  [types.mutations.SET_USER_SELECTED_REVIEW](state, payload) {
    localStorage.setItem('userSelectedReview', JSON.stringify(payload));
    state.userSelectedReview = payload;
  },
  [types.mutations.SET_SECTOR_SELECTED_REVIEW](state, payload) {
    localStorage.setItem('sectorSelectedReview', JSON.stringify(payload));
    state.sectorSelectedReview = payload;
  },
  [types.mutations.SET_USER_SELECTED_REDS](state, payload) {
    localStorage.setItem('userSelectedReds', JSON.stringify(payload));
    state.userSelectedReds = payload;
  },
  [types.mutations.SET_SECTOR_SELECTED_REDS](state, payload) {
    localStorage.setItem('sectorSelectedReds', JSON.stringify(payload));
    state.sectorSelectedReds = payload;
  },
};
