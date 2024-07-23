<template>
    <v-row dense class="justify-center align-center main" style="height: 100vh;">
        <!-- <v-col cols="3" md="4" sm="6" class="text-center"> -->
        <div style="width: 40%; text-align: center">
            <img src="@/assets/white-logo.svg" class="pb-7">
            <v-text-field color="white" v-model="form.username" variant="outlined" class="input-field pb-2" label="User Name*" required>
                <template v-slot:prepend-inner>
                    <img width="23" height="23" src="@/assets/icons/user.svg" class="my-auto" />
                </template>
            </v-text-field>
            <v-text-field color="white" v-model="form.password" variant="outlined" type="password" class="input-field pb-4" label="Password*" required>
                <template v-slot:prepend-inner>
                    <img width="23" height="23" src="@/assets/icons/login-password.svg" class="my-auto" />
                </template>
            </v-text-field>
            <v-btn color="white" @click="submitHandler" height="43px" class="font-dark-blue font-weight-bold" block>LOGIN</v-btn>
            <p class="font-white-grey pt-2 forget-password">Forget password?</p>
        </div>
        <!-- </v-col> -->
    </v-row>
</template>
<script>
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
export default defineComponent({
    setup() {
        const store = useStore();
        const router = useRouter();
        let form = reactive({
            username: null,
            password: null
        })
        function submitHandler() {
            store.dispatch('Auth/Login/login', form)
                    .then(response => {
                        router.push({path:'/'});
                        console.log('Add response:', response);
                    });
        }
        return {
            submitHandler,
            form
        }
    },
})
</script>

<style>
.main{
    background-color: #0C2748;
    background-image: url("@/assets/images/background.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
.input-field .v-field__input {
    min-height: 46px !important;
    padding-top: unset !important;
    padding-bottom: unset !important
}
.forget-password{
    text-align: right;
}
.v-field{
    border-color:white !important;
    color: white;
}
</style>