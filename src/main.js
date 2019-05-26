import Vue from 'vue'
import './plugins/vuetify'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import App from './App.vue'
import router from './router'
import store from './store'

const firebaseConfig = {
  apiKey: "AIzaSyDuVamEWv0fUeTV8-SA26MJ1T0-qSIge9Q",
  authDomain: "study-todo-1648e.firebaseapp.com",
  databaseURL: "https://study-todo-1648e.firebaseio.com",
  projectId: "study-todo-1648e",
  storageBucket: "study-todo-1648e.appspot.com",
  messagingSenderId: "700002073804",
  appId: "1:700002073804:web:e171c2d88dd0d208"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
Vue.prototype.$db = firebase.firestore();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
