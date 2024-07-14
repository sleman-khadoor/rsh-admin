<template>
<div class="text-center">
    <v-dialog v-model="props.dialog" max-width="800" class="dialog">
        <v-card class="pa-5 font-dark-blue">
            <div class="px-6">
                <v-icon icon="mdi-account" class="mr-2" /><span class="size-35">{{title}}</span>
            </div>
            <v-card-text :v-if="props.eventType!=='delete'" class="pb-0">
                <v-row dense>
                    <v-col cols="12" md="5" sm="5" class="input-field">
                        <v-text-field variant="outlined" class="pb-1" label="User Name*" v-model="form.username" :rules="rules.username" required></v-text-field>
                        <v-text-field variant="outlined" class="pb-1" label="First Name*" :rules="rules.first_name" required v-model="form.first_name"></v-text-field>
                        <v-text-field variant="outlined" class="pb-1" label="Last Name*" :rules="rules.last_name" required v-model="form.last_name"></v-text-field>
                        <v-text-field variant="outlined" type="password" class="pb-1" label="Password*" :rules="rules.password" required v-model="form.password"></v-text-field>
                        <v-text-field variant="outlined" type="password" class="pb-0" label="Confirm Password*" :rules="rules.password_confirmation" required v-model="form.password_confirmation"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="7" sm="7" class="pb-3">
                        <div>
                            <v-sheet class="d-flex permissions-border" height="305" width="100%" rounded>
                                <div>
                                    <p class="ml-2 mt-2 size-30 font-dark-blue">User Roles</p>
                                    <v-row dense>
                                        <v-col cols="6" md="6" sm="6">
                                            <v-checkbox class="no-wrap" v-for="(role) in props.roles.slice(0, 5)" :key="role.id" v-model="form.roles" color="#0C2748" :label="role.name" :value="{ id: role.id }" hide-details></v-checkbox>
                                        </v-col>
                                        <v-col cols="6" md="6" sm="6">
                                            <v-checkbox class="no-wrap" v-for="(role) in props.roles.slice(5)" :key="role.id" v-model="form.roles" color="#0C2748" :label="role.name" :value="{ id: role.id }" hide-details></v-checkbox>
                                        </v-col>
                                    </v-row>
                                </div>
                            </v-sheet>
                        </div>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-row dense class="justify-end px-6">
                <v-col cols="12" md="3" sm="3">
                    <v-btn class="text-none text-white font-weight-regular close-btn" type="reset" text="Cancel" color="grey" block @click="Object.keys(props.selectedUser).length !== 0 ? $emit('closeEditDialog', 'edit'): $emit('closeAddDialog', 'add')"></v-btn>
                </v-col>
                <v-col cols="12" md="3" sm="3">
                    <v-btn type="submit" class="text-none text-white font-weight-regular" @click="handleSubmit()" text="Save" color="dark-blue" :loading="props.loading" block></v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
</div>
</template>

    
<script>
import { defineComponent, onUpdated, reactive, computed, ref } from 'vue'

export default defineComponent({
    props: ['dialog', 'selectedUser', 'eventType', 'loading', 'roles'],
    data: () => ({
        rules: {
            username: [
                v => !!v || 'username is required',
            ],
            first_name: [
                v => !!v || 'first name is required',
            ],
            last_name: [
                v => !!v || 'last_name is required',
            ],
            password: [
                v => !!v || 'password is required',
                v => v.length >= 8 || 'password must be at least 8 characters long',
                v => /[A-Za-z]/.test(v) || 'password must contain at least one letter',
                v => /[0-9]/.test(v) || 'password must contain at least one number',
               
            ],
            password_confirmation: [
                v => !!v || 'password confirmation is required',
                v => v === this.form.password || 'password confirmation does not match password',
            ],
            roles: [
                v => !!v || 'roles required',
            ]
        },
    }),
    setup(props, { emit }) {
        let form = reactive({
            username: null,
            first_name: null,
            last_name: null,
            roles: [],
            password: null,
            password_confirmation: null,
        })

        const formv = ref(null);

        onUpdated(() => {
            if (props.selectedUser) {
                form.username = props.selectedUser.username
                form.first_name = props.selectedUser.first_name
                form.last_name = props.selectedUser.last_name
                // form.roles = []
                form.roles = props.selectedUser.roles ? props.selectedUser.roles.map(role => ({ id: role.id })) : [];
                form.password = null
                form.password_confirmation = null
            } else {
                form.username = null
                form.first_name = null
                form.last_name = null
                form.roles = []
                form.password = null
                form.password_confirmation = null
            }
        })

        const languages = computed(() => ['English', 'Arabic'].map(item => ({
            text: item,
            value: item == 'English' ? 'en' : 'ar'
        })))

        const title = computed(() => {
            return Object.keys(props.selectedUser).length !== 0 ? `Edit User` : `Add User`;
        })

        function checkValidation() {
            return form.username && form.first_name && form.last_name && form.password && form.password_confirmation && form.roles.length > 0;
        }
        function handleSubmit() {
            if (checkValidation()) {
                if (Object.keys(props.selectedUser).length !== 0) {
                    emit('edit', form, 'edit');
                } else {
                    emit('add', form, 'add');
                }
            }
        }


        return {
            props,
            form,
            formv,
            title,
            languages,
            handleSubmit,
        }
    },
})
</script>

    
<style>
.img-container {
    border: 1px solid #a5a5a5 !important;
    min-height: 85px !important;
    max-height: 85px !important;
}

.img-container:hover {
    border: 1px solid #0C2748 !important;
}

.dialog {
    height: 1000px;
}

.input-field .v-field__input {
    min-height: 40px !important;
    max-height: 40px !important;
    padding-top: unset !important;
    padding-bottom: unset !important
}

.date .v-field__input {
    display: block !important;
}

.permissions-border {
    border: 1px solid #a5a5a5;
}

.v-checkbox .v-selection-control {
    min-height: 49px !important;
    max-height: 49px !important;
}
</style>
