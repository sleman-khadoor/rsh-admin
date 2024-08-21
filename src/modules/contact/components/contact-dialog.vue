<template>
<div class="text-center">
    <v-dialog v-model="props.dialog" max-width="500" class="dialog" persistent>
        <v-card class="pa-5 font-dark-blue">
            <div class="px-6">
                <v-icon icon="mdi-phone-in-talk" class="mr-2" /><span class="size-35">{{title}}</span>
            </div>
            <v-card-text :v-if="props.eventType!=='delete'" class="pb-0">
                <v-row dense>
                    <v-col cols="12" md="12" sm="12" class="input-field">
                        <v-text-field variant="outlined" class="pb-2" label="Information Value*" :rules="rules.value" required v-model="form.value"></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-row dense class="justify-end px-6">
                <v-col cols="12" md="3" sm="3">
                    <v-btn class="text-none text-white font-weight-regular close-btn" text="Cancel" color="grey" type="reset" block @click="Object.keys(props.selectedContact).length !== 0 ? $emit('closeEditDialog', 'edit'): $emit('closeAddDialog', 'add')"></v-btn>
                </v-col>
                <v-col cols="12" md="3" sm="3">
                    <v-btn type="submit" class="text-none text-white font-weight-regular" text="Save" @click="handleSubmit()" color="dark-blue" :loading="props.loading" block></v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import { watch } from 'vue';
import { defineComponent, reactive, computed, ref } from 'vue'
import { useStore } from 'vuex';

export default defineComponent({
    props: ['dialog', 'selectedContact', 'eventType'],
    data: () => ({
        rules: {
            value: [
                v => !!v || 'information value is required',
            ],
        },
    }),
    setup(props, { emit }) {
        const store = useStore();
        const getInitialForm = () => ({
            value: null,
        })
        let form = reactive({
            value: null,
        })
        const formv = ref({
            value: null,
        });
        const loading = computed(() => store.getters['Contacts/loading'])
        watch(() => props.dialog, () => {
            if (props.dialog) {
                if (props.selectedContact) {
                    form.value = props.selectedContact.value
                }
            } else {
                Object.assign(form, getInitialForm())
            }
        });
        const title = computed(() => {
            return Object.keys(props.selectedContact).length !== 0 ? `Edit Contact` : `Add Contact`;
        })

        function checkValidation() {
            if (form.value) {
                return true
            } else {
                return false
            }
        }

        function handleSubmit() {
            if (checkValidation()) {
                if (Object.keys(props.selectedContact).length !== 0) {
                    emit('edit', form, 'edit')
                } else {
                    emit('add', form, 'add')
                }
            }
        }
        return {
            props,
            form,
            formv,
            title,
            loading,
            handleSubmit,
        }
    },
})
</script>

<style>
.img-container {
    border: 1px solid #a5a5a5 !important;
    min-height: 123px !important;
    max-height: 123px !important;
}

.img-container:hover {
    border: 1px solid #0C2748 !important;
}

.close-icon::before {
    content: "\F0156";
    padding-block-end: 86px;
    padding-left: 1095px !important;
    margin-bottom: 0px !important;
}

.dialog {
    height: 1000px;
}

.input-field .v-field__input {
    min-height: 40px !important;
    padding-top: unset !important;
    padding-bottom: unset !important
}
</style>
