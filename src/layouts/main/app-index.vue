<template>
  <v-layout class="rounded rounded-md"/>
    <side-bar/>
    <top-bar/>
    <v-main class="d-flex align-center justify-center bg-white-grey" style="min-height: 100vh;">
      <v-container class="h-100 mt-0" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
</template>

<script>
import SideBar from './side-bar.vue';
import { mapActions } from 'vuex'
import TopBar from './top-bar.vue';

export default {
  components: {
    SideBar,
    TopBar
  },
  data() {
    return {
      unreadNotificationInterval: null,
    }
  },
  methods: {
    ...mapActions('Core', ['showNotification']),
  },
  async created() {
    this.showNotification();
		this.unreadNotificationInterval = setInterval(() => {
			this.showNotification();
		}, 30000);
  },
  unmounted() {
		clearInterval(this.unreadNotificationInterval);
	},
};
</script>
