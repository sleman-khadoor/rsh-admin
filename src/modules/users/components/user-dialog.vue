<template>
<div class="text-center">
    <v-dialog v-model="props.dialog" max-width="650" class="dialog">
        <v-card class="pa-5 font-dark-blue">
            <div class="px-6">
                <v-icon icon="mdi-account" class="mr-2" /><span class="size-35">{{title}}</span>
            </div>
            <v-card-text :v-if="props.eventType!=='delete'" class="pb-0">
                <v-row dense>
                    <v-col cols="4" md="4" sm="4" class="input-field">
                        <v-text-field variant="outlined" class="pb-0" label="User Name*" v-model="form.username" :rules="rules.username" required></v-text-field>
                    </v-col>
                    <v-col cols="4" md="4" sm="4" class="input-field">
                        <v-text-field variant="outlined" class="pb-0" label="First Name*" :rules="rules.first_name" required v-model="form.first_name"></v-text-field>
                    </v-col>
                    <v-col cols="4" md="4" sm="4" class="input-field">
                        <v-text-field variant="outlined" class="pb-0" label="Last Name*" :rules="rules.last_name" required v-model="form.last_name"></v-text-field>
                    </v-col>
                    <v-col v-if="Object.keys(props.selectedUser).length === 0" cols="6" md="6" sm="6" class="input-field">
                        <v-text-field variant="outlined" type="password" class="pb-0" label="Password*" :rules="rules.password" required v-model="form.password"></v-text-field>
                    </v-col>
                    <v-col v-if="Object.keys(props.selectedUser).length === 0" cols="6" md="6" sm="6" class="input-field">
                        <v-text-field variant="outlined" type="password" class="pb-0" label="Confirm Password*" :rules="rules.password_confirmation" required v-model="form.password_confirmation"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" sm="12" class="input-field">
                        <v-select class="roles" chips :menu-props="{ offsetY: true, maxHeight: '200px' }" variant="outlined" label="User Roles*" multiple :items="roles" v-model="form.roles" :rules="rules.roles" item-title="text" item-value="value" required></v-select>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-row dense class="justify-end px-6">
                <v-col cols="12" md="3" sm="3">
                    <v-btn class="text-none text-white font-weight-regular close-btn" type="reset" text="Cancel" color="grey" block @click="Object.keys(props.selectedUser).length !== 0 ? $emit('closeEditDialog', 'edit'): $emit('closeAddDialog', 'add')"></v-btn>
                </v-col>
                <v-col cols="12" md="3" sm="3">
                    <v-btn type="submit" class="text-none text-white font-weight-regular" @click="handleSubmit()" text="Save" color="dark-blue" :loading="loading" block></v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import { watch } from 'vue';
import { defineComponent, reactive, computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex';

export default defineComponent({
    props: ['dialog', 'selectedUser', 'eventType'],
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
            ],
            roles: [
                v => !!v.length >= 1 || 'roles required',
            ]
        },
    }),
    setup(props, { emit }) {
        const store = useStore();
        const getInitialForm = () => ({
            username: null,
            first_name: null,
            last_name: null,
            roles: [],
            password: null,
            password_confirmation: null,
        })
        let form = reactive({
            username: null,
            first_name: null,
            last_name: null,
            roles: [],
            password: null,
            password_confirmation: null,
        })

        const formv = ref(null);

        const loading = computed(() => store.getters['Blogs/loading'])
        watch(() => props.dialog, () => {
            if (props.dialog) {
                if (props.selectedUser) {
                    form.username = props.selectedUser.username
                    form.first_name = props.selectedUser.first_name
                    form.last_name = props.selectedUser.last_name
                    form.roles = formatRoles();
                    form.password = null
                    form.password_confirmation = null
                } else {
                    Object.assign(form, getInitialForm())
                }
            } else {
                Object.assign(form, getInitialForm())
            }
        });

        function formatRoles() {
            let selectedRoles = []
            let roles = []
            selectedRoles = props.selectedUser.roles
            selectedRoles.forEach(element => {
                roles.push({ text: element.name, value: element.id })
            });
            return roles;
        }

        async function getRoles() {
            await store.dispatch('Users/fetchRoles', {
                    params: {
                        perPage: 1000
                    }
                })
                .then(response => {
                    console.log('Add response:', response);
                });
        }
        const roles = computed(() => store.getters['Users/roles'].map((role) => ({
            text: role.name,
            value: role.id
        })))

        onMounted(() => {
            getRoles()
        })

        const title = computed(() => {
            return Object.keys(props.selectedUser).length !== 0 ? `Edit User` : `Add User`;
        })

        function checkValidation() {
            if (props.selectedUser) {
                return form.username && form.first_name && form.last_name && form.roles.length > 0;
            } else {
                return form.username && form.first_name && form.last_name && form.password && form.password_confirmation && form.roles.length > 0;
            }
        }

        function handleSubmit() {            
            if (checkValidation()) {
                let roles = [];
                if (Object.keys(props.selectedUser).length !== 0) {
                    let oldRoles = formatRoles();
                    if (JSON.stringify(form.roles) !== JSON.stringify(oldRoles)) {
                        roles = form.roles;
                    }
                    if (roles.length === 0)
                        delete form.roles;
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
            roles,
            loading,
            handleSubmit,
        }
    },
})
</script>

<style>
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

.v-checkbox .v-selection-control {
    min-height: 49px !important;
    max-height: 49px !important;
}
</style>
