<template>
<div class="text-center">
    <v-dialog v-model="props.dialog" max-width="600" class="dialog">
        <v-card class="pa-5 font-dark-blue">
            <div class="px-6">
                <v-icon icon="mdi-trophy" class="mr-2" /><span class="size-35">{{title}}</span>
            </div>
            <v-card-text :v-if="props.eventType!=='delete'" class="pb-3">
                <v-row dense>
                    <v-col cols="6" md="6" sm="6">
                        <v-textarea variant="outlined" label="Content of the achievment in English*" v-model="form.content.en" rows="7" :rules="rules.enContent" required></v-textarea>
                    </v-col>
                    <v-col cols="6" md="6" sm="6">
                        <v-textarea variant="outlined" label="Content of the achievment in Arabic*" v-model="form.content.ar" rows="7" :rules="rules.arContent" required></v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-row dense class="justify-end px-6">
                <v-col cols="12" md="3" sm="3">
                    <v-btn class="text-none text-white font-weight-regular close-btn" text="Cancel" color="grey" type="reset" block @click="Object.keys(props.selectedAchievement).length !== 0 ? $emit('closeEditDialog', 'edit'): $emit('closeAddDialog', 'add')"></v-btn>
                </v-col>
                <v-col cols="12" md="3" sm="3">
                    <v-btn type="submit" class="text-none text-white font-weight-regular" text="Save" @click="handleSubmit()" color="dark-blue" :loading="loading" block></v-btn>
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
    props: ['dialog', 'selectedAchievement', 'eventType'],
    data: () => ({
        rules: {
            arContent: [
                v => !!v || 'content achievement in arabic is required',
            ],
            enContent: [
                v => !!v || 'content chievement in english is required',
            ]
        },
    }),
    setup(props, { emit }) {
        const store = useStore();
        const getInitialForm = () => ({
            content: {
                ar: null,
                en: null
            },
        })
        let form = reactive({
            content: {
                ar: null,
                en: null
            },
        })
        const formv = ref({
            content: {
                ar: null,
                en: null
            },
        });
        const loading = computed(() => store.getters['Blogs/loading'])
        watch(() => props.dialog, () => {
            if (props.dialog) {
                if (props.selectedAchievement) {
                    form.content.ar = props.selectedAchievement.content?.ar
                    form.content.en = props.selectedAchievement.content?.en
                } else {
                    Object.assign(form, getInitialForm())
                }
            } else {
                Object.assign(form, getInitialForm())
            }
        });
        const title = computed(() => {
            return Object.keys(props.selectedAchievement).length !== 0 ? `Edit Achievement` : `Add Achievement`;
        })

        function checkValidation() {
            if (form.content.en && form.content.ar) {
                return true
            } else {
                return false
            }
        }

        function handleSubmit() {
            if (checkValidation()) {
                if (Object.keys(props.selectedAchievement).length !== 0) {
                    if (props.selectedAchievement.avatar === form.avatar) {
                        let data = {
                            content: {
                                en: form.content.en,
                                ar: form.content.ar,
                            },
                        }
                        emit('edit', data, 'edit')
                    } else {
                        emit('edit', form, 'edit')
                    }
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
    height: 14.5vh !important;
    border: 1px solid rgba(118, 118, 118) !important;
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
    min-height: 46px !important;
    padding-top: unset !important;
    padding-bottom: unset !important
}
</style>
