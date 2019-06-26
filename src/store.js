import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    uid: '',
    name: '사용자 없음',
    todoList: [],
    loading: true,
  },
  getters: {
    uid: state => state.uid,
    name: state => state.name,
    todoList: state => state.todoList,
    loading: state => state.loading
  },
  actions: {
    setLoading ({ commit }, flag) {
      commit('global/SET_LOADING', flag);
    },
    updateUid ({ commit }, uid) {
      commit('user/UPDATE_UID', uid);
    },
    updateName ({ commit }, name) {
      commit('user/UPDATE_NAME', name);
    },
    selectTodos ({ commit }, uid) {
      let todos = [];
      Vue.prototype.$db.collection('users').doc(uid)
        .collection('todos').get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            todos.push(doc.data());
          });
          commit('todo/SELECT_TODO', todos);
        }).catch(err => {
          // eslint-disable-next-line
          console.error(err);
      });
    },
    insertTodo ({ commit, getters }, item) {
      Vue.prototype.$db.collection('users').doc(getters.uid)
        .collection('todos').doc(`${item.time}`).set(item)
        .then(() => {
          commit('todo/INSERT_TODO', item);
        }).catch(error => {
          // eslint-disable-next-line
          console.error(error);
      });
    },
    deleteTodo ({ commit, getters }, item) {
      Vue.prototype.$db.collection('users').doc(getters.uid)
        .collection('todos').doc(`${item.time}`).delete()
        .then(() => {
          commit('todo/DELETE_TODO', item);
        }).catch(err => {
          // eslint-disable-next-line
          console.error(err);
      });
    },
    updateTodo ({ commit, getters }, item) {
      Vue.prototype.$db.collection('users').doc(getters.uid)
        .collection('todos').doc(`${item.time}`).set(item, { merge: true })
        .then(() => {
          commit('todo/UPDATE_TODO', item);
        }).catch(err => {
          // eslint-disable-next-line
          console.error(err);
      });
    }
  },
  mutations: {
    ['global/SET_LOADING'] (state, flag) {
      state.loading = flag;
    },
    ['user/UPDATE_UID'] (state, uid) {
      state.uid = uid;
    },
    ['user/UPDATE_NAME'] (state, name) {
      state.name = name;
    },
    ['todo/SELECT_TODO'] (state, todos) {
      state.todoList = todos;
    },
    ['todo/INSERT_TODO'] (state, item) {
      state.todoList.push(item);
    },
    ['todo/DELETE_TODO'] (state, item) {
      const targetIdx = state.todoList.findIndex(el => {
        return el.time === item.time;
      });
      if (targetIdx > -1) state.todoList.splice(targetIdx, 1);
    },
    ['todo/UPDATE_TODO'] (state, item) {
      let target = state.todoList.find(el => {
        return el.time === item.time;
      });
      if (target) Object.assign(target, item);
    },
  },
})
