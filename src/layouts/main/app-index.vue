<template>
  <v-layout class="rounded rounded-md">
    <top-bar/>

    <side-bar/>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <div>
        <router-view></router-view>
      </div>
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
