<template>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        color="dark-blue"
        class="text-white"
        permanent
        @click="rail = false"
      >
        <v-list-item
          nav
        >
          <template v-slot:append>
            <v-btn
              icon="mdi-chevron-left"
              variant="text"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-account-group-outline" title="Authors" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="Books" value="account"></v-list-item>
          <v-list-item prepend-icon="mdi-home-city" title="Services" value="users"></v-list-item>
        </v-list>
      </v-navigation-drawer>
</template>
<script>
  export default {
    data () {
      return {
        drawer: true,
        rail: true,
      }
    },
  }
</script>