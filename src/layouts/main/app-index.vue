<template>
  <v-layout class="rounded rounded-md">
    

    <side-bar/>
    <top-bar/>
    <v-main class="d-flex align-center justify-center bg-white-grey" style="min-height: 100vh;">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script>
import SideBar from './side-bar.vue';
// import SideBar from './main/side-bar.vue';
import TopBar from './top-bar.vue';

export default {
  components: {
    SideBar,
    // SideBar,
    TopBar
  }
};
</script>
