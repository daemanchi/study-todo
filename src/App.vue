<template>
  <v-app :dark="dark">

    <v-navigation-drawer
      v-model="primaryDrawer.model"
      :clipped="primaryDrawer.clipped"
      :floating="primaryDrawer.floating"
      :mini-variant="primaryDrawer.mini"
      absolute
      overflow
      app
    >
      <Drawer />
      <v-divider></v-divider>
      <v-list>
        <v-list-tile>
          <v-switch v-model="dark" primary label="Dark"></v-switch>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar :clipped-left="primaryDrawer.clipped" app absolute>
      <v-toolbar-side-icon
        v-if="primaryDrawer.type !== 'permanent'"
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      ></v-toolbar-side-icon>
      <v-toolbar-title>Study: Todo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>Search</v-btn>
        <LoginDialog />
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-content>

    <v-footer :inset="footer.inset" app>
      <span class="px-3">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>

  </v-app>
</template>

<script>
import Drawer from "@/components/Drawer";
import LoginDialog from '@/components/LoginDialog';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { mapActions } from 'vuex';

export default {
  name: 'App',
  components: {Drawer, LoginDialog},
  data() {
    return {
      dark: true,
      drawers: ['Default (no property)', 'Permanent', 'Temporary'],
      primaryDrawer: {
        model: null,
        type: 'default (no property)',
        clipped: true,
        floating: true,
        mini: false
      },
      footer: {
        inset: false
      }
    }
  },
  created() {
    // 익명 사용자 로그인
    // TODO: 이메일 사용자 가입 및 로그인
    // TODO: 익명 사용자 -> 이메일 사용자 전환
    // TODO: 로그아웃
    firebase.auth().signInAnonymously().catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      // const errorMessage = error.message;
      if (errorCode === 'auth/operation-not-allowed') {
        alert('You must enable Anonymous auth in the Firebase Console.');
      } else {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    });
    // 로그인 이후 state 에 상태 저장
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        const isAnonymous = user.isAnonymous;
        const name = isAnonymous ? '익명' : user.displayName;
        const uid = user.uid;
        this.insertUser(uid, name, isAnonymous);
        this.updateUid(uid);
        this.updateName(name);
        // ...
      } else {
        // User is signed out.
        // ...
      }
    });
  },
  methods: {
    ...mapActions([ 'updateUid', 'updateName' ]),
    insertUser (uid, name, isAnonymous) {
      // Add a new document in collection 'users'
      firebase.firestore().collection('users').doc(uid).set({
        name,
        isAnonymous
      }, { merge: true }).then(function() {
      /* eslint-disable no-console */
        console.log('user database successfully inserted');
      }).catch(function(error) {
        console.error("Error writing document: ", error);
      });
    },
  }
}
</script>
