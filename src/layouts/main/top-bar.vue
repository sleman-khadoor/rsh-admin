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
        <img @click="submitLogoutHandler" src="@/assets/icons/manage.svg" class="my-auto"/>
    </template>
  </v-app-bar>
</template>
<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
import authHelper from '@/utils/auth-helper';
export default defineComponent({
    setup() {
        const store = useStore();
        const router = useRouter();
        function submitLogoutHandler() {
            store.dispatch('Auth/logout')
                    .then(response => {
                        authHelper.reset();
                        router.go(0);
                        console.log('Add response:', response);
                    });
        }
        return {
            submitLogoutHandler
        }
    },
})
</script>
<style scoped>
.rounded-img{
  border-radius: 50%;
  height: 55px;
  width: 55px;
}
</style>