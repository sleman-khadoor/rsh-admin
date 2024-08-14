<template>
    <div class="text-center">
        <v-dialog v-model="props.dialog" max-width="500" class="dialog">
            <v-card class="pa-5 font-dark-blue">
                <div class="px-6">
                    <v-icon icon="mdi-trophy-outline" class="mr-2" /><span class="size-35">{{title}}</span>
                </div>
                <v-card-text :v-if="props.eventType!=='delete'" class="pb-0">
                    <v-row dense>
                        <v-col cols="12" md="12" sm="12" class="input-field">
                            <v-text-field variant="outlined" class="pb-1" label="Award Name In English*" v-model="form.title.en" :rules="rules.entitle" required></v-text-field>
                            <v-text-field variant="outlined" class="pa-0" label="Award Name In Arabic*" v-model="form.title.ar" :rules="rules.artitle" required dir='rtl'></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-row dense class="justify-end px-6">
                    <v-col cols="12" md="3" sm="3">
                        <v-btn class="text-none text-white font-weight-regular close-btn" type="reset" text="Cancel" color="grey" block @click="Object.keys(props.selectedAward).length !== 0 ? $emit('closeEditDialog', 'edit'): $emit('closeAddDialog', 'add')"></v-btn>
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
    import { watch } from 'vue';
import { defineComponent, reactive, computed, ref } from 'vue'
import { useStore } from 'vuex';
    
    export default defineComponent({
        props: ['dialog', 'selectedAward', 'eventType','book_id'],
        data: () => ({
            rules: {
                entitle: [
                    v => !!v || 'award name in english is required',
                ],
                artitle: [
                    v => !!v || 'award name in arabic is required',
                ],
            },
        }),
        setup(props, { emit }) {
            const store = useStore();
            const getInitialForm = () => ({
                title: {
                    ar: null,
                    en: null
                },
            })
            let form = reactive({
                title: {
                    en: null,
                    ar: null
                },
            })
            const formv = ref(null);
            const loading = computed(() => store.getters['Blogs/loading'])
            watch(() => props.dialog, () => {
                if(props.dialog) {
                    if (props.selectedAward) {
                        form.title.en = props.selectedAward.title?.en
                        form.title.ar = props.selectedAward.title?.ar
                } else {
                        Object.assign(form, getInitialForm())
                    }
                } else {
                    Object.assign(form, getInitialForm())
                }
            });
    
            const title = computed(() => {
                return Object.keys(props.selectedAward).length !== 0 ? `Edit Award` : `Add Award`;
            })
    
            function checkValidation() {
                if (form.title.en && form.title.ar ) {
                    return true
                } else {
                    return false
                }
            }
    
            function handleSubmit() {
                form.book_id = props.book_id;
                if (checkValidation()) {
                    if (Object.keys(props.selectedAward).length !== 0) {
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
                handleSubmit
            }
        },
    })
    </script>
    
    <style>
    .img-container {
        border: 1px solid #a5a5a5 !important;
        min-height: 102px !important;
        max-height: 102px !important;
    }
    
    .img-container:hover {
        border: 1px solid #0C2748 !important;
    }
    
    .v-select__selections {
        padding-left: 16px !important;
    
    }
    
    .dialog {
        height: 1000px;
    }
    
    .input-field .v-field__input {
        min-height: 40px !important;
        max-height: 40px !important;
        padding-top: 0% !important;
        padding-bottom: 0% !important
    }
    
    .date .v-field__input {
        display: block !important;
    }
    
    .v-row--dense>.v-col,
    .v-row--dense>[class*=v-col-] {
        padding: 2px;
    }
    </style>
    