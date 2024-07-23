<template>
    <v-row dense class="justify-center align-center main">
        <v-col cols="3" md="3" sm="3" class="text-center">
            <img src="@/assets/white-logo.svg" class="pb-7">
            <v-text-field color="white" variant="outlined" class="input-field pb-2" label="User Name*" required>
                <template v-slot:prepend-inner>
                    <img width="23" height="23" src="@/assets/icons/user.svg" class="my-auto" />
                </template>
            </v-text-field>
            <v-text-field color="white" variant="outlined" type="password" class="input-field pb-4" label="Password*" required>
                <template v-slot:prepend-inner>
                    <img width="23" height="23" src="@/assets/icons/login-password.svg" class="my-auto" />
                </template>
            </v-text-field>
            <v-btn color="white" width="350px" height="43px" class="font-dark-blue font-weight-bold">LOGIN</v-btn>
            <p class="font-white-grey pt-2 forget-password">Forget password?</p>
        </v-col>
    </v-row>
</template>

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