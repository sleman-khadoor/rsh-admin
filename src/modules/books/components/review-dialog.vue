<template>
    <div class="text-center">
        <v-dialog v-model="props.dialog" max-width="650" class="dialog">
            <v-card class="pa-5 font-dark-blue">
                <div class="px-6">
                    <v-icon icon="mdi-comment-text-outline" class="mr-2" /><span class="size-35">{{title}}</span>
                </div>
                <v-card-text :v-if="props.eventType!=='delete'" class="pb-0">
                    <v-row dense>
                        <v-col cols="6" md="6" sm="6" class="input-field">
                            <v-text-field variant="outlined" class="pa-1" label="Writer Name In English*" v-model="form.username.en" :rules="rules.enUsername" required></v-text-field>
                        </v-col>
                        <v-col cols="6" md="6" sm="6" class="input-field">
                            <v-text-field variant="outlined" class="pa-1" label="Writer Name In Arabic*" v-model="form.username.ar" :rules="rules.arUsername" required></v-text-field>
                        </v-col>
                        <v-col cols="6" md="6" sm="6">
                            <v-textarea variant="outlined" class="pa-1" label="Review Text In English*" v-model="form.review.en" rows="6" persistent-hint :rules="rules.enReview" required></v-textarea>
                        </v-col>
                        <v-col cols="6" md="6" sm="6">
                            <v-textarea variant="outlined" class="pa-1" label="Review Text In Arabic*" v-model="form.review.ar" rows="6" persistent-hint :rules="rules.arReview" required></v-textarea>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-row dense class="justify-end px-6">
                    <v-col cols="12" md="3" sm="3">
                        <v-btn class="text-none text-white font-weight-regular close-btn" type="reset" text="Cancel" color="grey" block @click="Object.keys(props.selectedReview).length !== 0 ? $emit('closeEditDialog', 'edit'): $emit('closeAddDialog', 'add')"></v-btn>
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
    import { defineComponent, reactive, computed, ref, watch } from 'vue'
import { useStore } from 'vuex';
    
    export default defineComponent({
        props: ['dialog', 'selectedReview', 'eventType', 'book_id'],
        data: () => ({
            rules: {
                enUsername: [
                    v => !!v || 'writer name in english is required',
                ],
                arUsername: [
                    v => !!v || 'writer name in arabic is required',
                ],
                enReview: [
                    v => !!v || 'review text in english is required',
                ],
                arReview: [
                    v => !!v || 'review text in arabic is required',
                ],
    
            },
        }),
        setup(props, { emit }) {
            const store = useStore();
            const getInitialForm = () => ({
                username: {
                    en: null,
                    ar: null
                },
                review: {
                    en: null,
                    ar: null
                }
            })
            let form = reactive({
                username: {
                    en: null,
                    ar: null
                },
                review: {
                    en: null,
                    ar: null
                }
            })
            const formv = ref(null);
            const loading = computed(() => store.getters['Blogs/loading'])
            watch(() => props.dialog, () => {
                if(props.dialog) {
                if (props.selectedReview) {
                    form.username.en = props.selectedReview.username?.en
                    form.username.ar = props.selectedReview.username?.ar
                    form.review.en = props.selectedReview.review?.en
                    form.review.ar = props.selectedReview.review?.ar
                } else {
                        Object.assign(form, getInitialForm())
                    }
                } else {
                    Object.assign(form, getInitialForm())
                }
            });
    
            const title = computed(() => {
                return Object.keys(props.selectedReview).length !== 0 ? `Edit Review` : `Add Review`;
            })
    
            function checkValidation() {
                if (form.username.en && form.username.ar && form.review.en && form.review.ar ) {
                    return true
                } else {
                    return false
                }
            }
    
            function handleSubmit() {
                form.book_id = props.book_id;
                if (checkValidation()) {
                    if (Object.keys(props.selectedReview).length !== 0) {
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
    