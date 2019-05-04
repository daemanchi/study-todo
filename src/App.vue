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
        <v-btn flat>Login</v-btn>
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

export default {
  name: 'App',
  components: {Drawer},
  data () {
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
  }
}
</script>
