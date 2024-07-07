<template>
  <v-app-bar color="white" class="d-flex justify-space-between px-5" :elevation="2">
    <template v-slot:prepend>
        <img src="@/assets/icons/logo.svg" class="my-auto"/>
    </template>
    <template v-slot:append>
        <img
            class="rounded-img"
            alt="Avatar"
            src="@/assets/images/auther-photo.jpg"
        />
        <div class="font-weight-bold size-22 mx-2 ">
          User Name
        </div>
    </template>
  </v-app-bar>
</template>
<style scoped>
.rounded-img{
  border-radius: 50%;
  height: 55px;
  width: 55px;
}
</style>