<template>
<div class="text-center">
    <v-dialog v-model="props.dialog" max-width="800" class="dialog">
        <v-card class="pa-5 font-dark-blue">
            <div class="px-6">
                <v-icon icon="mdi-newspaper" class="mr-2" /><span class="size-35">{{title}}</span>
            </div>
            <v-card-text :v-if="props.eventType!=='delete'" class="pb-0">
                <v-row dense>
                    <v-col cols="12" md="6" sm="6" class="input-field">
                        <v-text-field variant="outlined" class="pb-1" label="News Title In English*" :rules="rules.enTitle" required v-model="form.title.en"></v-text-field>
                        <v-text-field variant="outlined" class="pb-1" label="News Title In Arabic*" v-model="form.title.ar" :rules="rules.arTitle" required dir='rtl'></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" sm="6" class=" mb-0">
                        <div :class="'img-container'" @click="clickInputFile" style="position: relative; height: 200px;">
                            <p v-if="!form.cover_image" class="size-22 w-100 mb-0 pt-3 pl-3 position-absolute v-label v-field-label z-index-1" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Cover Image*</p>
                            <div class="w-mc ma-auto h-100 d-flex justify-center align-center pa-2" style="height: 100%; width: 100%;">
                                <img v-if="form.cover_image" ref="imgRef" :src="props.selectedNews.cover_image ? baseUrl + form.cover_image : form.cover_image" class="my-auto" style="width: 100%; height: 100%; object-fit: contain;" />
                                <img v-else width="30" height="30" src="@/assets/icons/img-upload.svg" class="my-auto" />
                                <v-file-input variant="outlined" accept="image/png, image/jpeg, image/bmp" class="mx-auto w-mc pa-0" id="hidenFileInput" hide-input v-model="form.cover_image" truncate-length="15" :prepend-icon="null" append-outer="mdi-close" required @change="printFiles(form.cover_image, 'image')" style="position: absolute; width: 100%; height: 100%; opacity: 0;">
                                </v-file-input>
                            </div>
                        </div>
                    </v-col>

                    <v-col cols="6" md="6" sm="6">
                        <v-textarea variant="outlined" label="Content News In English*" v-model="form.content.en" rows="8" :rules="rules.enContent" required></v-textarea>
                    </v-col>
                    <v-col cols="6" md="6" sm="6">
                        <v-textarea variant="outlined" label="Content News In Arabic*" v-model="form.content.ar" rows="8" persistent-hint :rules="rules.arContent" required dir='rtl'></v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-row dense class="justify-end px-6">
                <v-col cols="12" md="3" sm="3">
                    <v-btn class="text-none text-white font-weight-regular close-btn" text="Cancel" color="grey" type="reset" block @click="Object.keys(props.selectedNews).length !== 0 ? $emit('closeEditDialog', 'edit'): $emit('closeAddDialog', 'add')"></v-btn>
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
import { baseUrl } from '@/utils/axios';
import { watch } from 'vue';
import { defineComponent, reactive, computed, ref } from 'vue'
import { useStore } from 'vuex';

export default defineComponent({
    props: ['dialog', 'selectedNews', 'eventType'],
    data: () => ({
        rules: {
            arTitle: [
                v => !!v || 'title in arabic is required',
            ],
            enTitle: [
                v => !!v || 'title in english is required',
            ],
            arContent: [
                v => !!v || 'content in arabic is required',
            ],
            enContent: [
                v => !!v || 'content in english is required',
            ]
        },
        baseUrl
    }),
    setup(props, { emit }) {
        const store = useStore();
        const getInitialForm = () => ({
            title: {
                ar: null,
                en: null
            },
            content: {
                ar: null,
                en: null
            },
            cover_image: null
        })
        let form = reactive({
            title: {
                ar: null,
                en: null
            },
            content: {
                ar: null,
                en: null
            },
            cover_image: null
        })
        const formv = ref({
            title: {
                ar: null,
                en: null
            },
            content: {
                ar: null,
                en: null
            },
            cover_image: null
        });
        const loading = computed(() => store.getters['News/loading'])
        watch(() => props.dialog, () => {
            if (props.dialog) {
                if (props.selectedNews) {
                    form.title.ar = props.selectedNews.title?.ar
                    form.title.en = props.selectedNews.title?.en
                    form.content.ar = props.selectedNews.content?.ar
                    form.content.en = props.selectedNews.content?.en
                    form.cover_image = props.selectedNews.cover_image
                } else {
                    Object.assign(form, getInitialForm())
                }
            } else {
                Object.assign(form, getInitialForm())
            }
        });
        const title = computed(() => {
            return Object.keys(props.selectedNews).length !== 0 ? `Edit News` : `Add News`;
        })

        function clickInputFile() {
            document.getElementById('hidenFileInput').click()
        }

        function printFiles(file) {
            const img = this.$refs.imgRef;

            if (file) {
                let reader = new FileReader();

                reader.onload = function (e) {
                    img.src = e.target.result;
                };

                reader.readAsDataURL(file);
            }
        }

        function checkValidation() {
            if (form.title.en && form.title.ar && form.content.en && form.content.ar) {
                return true
            } else {
                return false
            }
        }

        function handleSubmit() {
            if (checkValidation()) {
                if (Object.keys(props.selectedNews).length !== 0) {
                    if (props.selectedNews.cover_image === form.cover_image) {
                        let data = {
                            title: {
                                en: form.title.en,
                                ar: form.title.ar,
                            },
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
            clickInputFile,
            printFiles,
            handleSubmit,
        }
    },
})
</script>

<style>
.img-container {
    border: 1px solid #a5a5a5 !important;
    min-height: 107px !important;
    max-height: 107px !important;
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
