const state = {
  active: false,
  message: '',
  action: undefined
};

const getters = {};

const actions = {};

const mutations = {
  setNotification(state, notification) {
    state.active = notification.active;
    state.message = notification.message;
    state.action = notification.action;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
