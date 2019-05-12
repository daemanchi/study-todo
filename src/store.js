import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    uid: '',
    name: '사용자 없음',
  },
  getters: {
    uid: state => state.uid,
    name: state => state.name,
  },
  actions: {
    updateUid ({ commit }, uid) {
      commit('user/UPDATE_UID', uid);
    },
    updateName ({ commit }, name) {
      commit('user/UPDATE_NAME', name);
    }
  },
  mutations: {
    ['user/UPDATE_UID'] (state, uid) {
      state.uid = uid;
    },
    ['user/UPDATE_NAME'] (state, name) {
      state.name = name;
    }
  },
})
