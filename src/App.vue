<template>
 <v-app>
    <notifications position="top right" group="all" :duration="4000" closeOnClick/>
    <notification
    position="top right"
    group="notification"
    :duration="10000"/>
  <router-view/>
 </v-app>
</template>

<style lang="scss">
  @import "assets/style/_shared.scss";
  @import "assets/style/_notify.scss";
  @import "assets/style/_mixin.scss";
  @import "assets/style/_function.scss";
  @import "assets/style/_class.scss";
</style>
