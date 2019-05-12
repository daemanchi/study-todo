<template>
  <v-list>
    <v-subheader>현재 사용자</v-subheader>
    <v-list-tile avatar>
      <v-list-tile-avatar color="black">
        <v-icon dark>account_circle</v-icon>
<!--        <img :src="avatar">-->
      </v-list-tile-avatar>

      <v-list-tile-content>
        <v-list-tile-title v-html="name"></v-list-tile-title>
        <v-list-tile-sub-title v-html="uid"></v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>

    <v-divider></v-divider>

    <v-list-tile>
      categories
    </v-list-tile>

    <v-divider></v-divider>

    <v-subheader>Views</v-subheader>
    <v-list-tile>
      list view
    </v-list-tile>
    <v-list-tile>
      calendar view
    </v-list-tile>
  </v-list>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'Drawer',
    computed: {
      ...mapGetters([ 'uid', 'name' ]),
    },
  }
</script>

<style scoped>

</style>
