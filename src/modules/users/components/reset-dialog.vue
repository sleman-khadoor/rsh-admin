<template>
<div class="text-center">
    <v-dialog v-model="props.resetDialog" max-width="450" class="dialog">
        <v-card class="pa-5 font-dark-blue">
            <div class="px-6">
                <v-icon icon="mdi-key" class="mr-2" /><span class="size-35">Reset Password</span>
            </div>
            <v-card-text :v-if="props.eventType!=='delete'" class="pb-0">
                <v-row dense>
                    <v-col cols="12" md="12" sm="12" class="input-field">
                        <v-text-field variant="outlined" type="password" class="pb-0" label="New Password*" :rules="rules.password" required v-model="form.password"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" sm="12" class="input-field">
                        <v-text-field variant="outlined" type="password" class="pb-0" label="Confirm New Password*" :rules="rules.password_confirmation" required v-model="form.password_confirmation"></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-row dense class="justify-end px-6">
                <v-col cols="12" md="3" sm="3">
                    <v-btn class="text-none text-white font-weight-regular close-btn" type="reset" text="Cancel" color="grey" block @click="$emit('closeDialog', 'reset')"></v-btn>
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
import { defineComponent, onUpdated, reactive, ref} from 'vue'

export default defineComponent({
    props: ['resetDialog', 'selectedUser', 'eventType', 'loading'],
    data: () => ({
        rules: {
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
        },
    }),
    setup(props, { emit }) {
        let form = reactive({
            password: null,
            password_confirmation: null,
        })

        const formv = ref(null);

        onUpdated(() => {
            form.password = null
            form.password_confirmation = null
        })

        function checkValidation() {
            return form.password && form.password_confirmation > 0;
        }

        function handleSubmit() {
            if (checkValidation()) {
                emit('reset', form, 'reset');
            }
        }

        return {
            props,
            form,
            formv,
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
