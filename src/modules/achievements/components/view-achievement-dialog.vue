<template>
    <div class="text-center">
        <v-dialog v-model="props.viewDialog" max-width="600" class="dialog">
            <v-card class="pa-5 font-dark-blue">
                <div class="px-6">
                    <v-icon icon="mdi-trophy" class="mr-2" /><span class="size-35">View Achievement</span>
                </div>
                <v-card-text :v-if="props.eventType!=='delete'" class="pb-3">
                    <v-row dense>
                        <v-col cols="12" md="12" sm="12">
                            <v-textarea v-if="props.viewLang =='en' " readonly variant="outlined" label="Content of the achievment"  v-model="form.content.en" rows="7"></v-textarea>
                            <v-textarea v-else readonly variant="outlined" label="Content of the achievment" v-model="form.content.ar" rows="7"></v-textarea>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-row dense class="justify-end px-6">
                    <v-col cols="12" md="3" sm="3">
                        <v-btn class="text-none text-white font-weight-regular close-btn" text="Cancel" color="grey" type="reset" block @click="Object.keys(props.selectedAchievement).length !== 0 ? $emit('closeEditDialog', 'edit'): $emit('closeAddDialog', 'add')"></v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
    </div>
    </template>
    
    <script>
import { ref } from 'vue';
import { onUpdated } from 'vue';
import { reactive } from 'vue';
import { defineComponent } from 'vue'
    
    export default defineComponent({
        props: ['viewDialog', 'selectedAchievement', 'eventType', 'loading', 'viewLang'],
     
        setup(props) {
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
            onUpdated(() => {
                if (props.selectedAchievement) {
                    form.content.ar = props.selectedAchievement.content?.ar
                    form.content.en = props.selectedAchievement.content?.en
                } else {
                    form.content.ar = null
                    form.content.en = null
                }
            })
            return {
                props,
                form,
                formv
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
    