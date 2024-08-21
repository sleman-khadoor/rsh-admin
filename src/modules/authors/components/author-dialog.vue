<template>
<div class="text-center">
    <v-dialog v-model="props.dialog" max-width="700" class="dialog" persistent>
        <v-card class="pa-5 font-dark-blue">
            <div class="px-6">
                <v-icon icon="mdi-account" class="mr-2" /><span class="size-35">{{title}}</span>
            </div>
            <v-card-text :v-if="props.eventType!=='delete'" class="pb-0">
                <v-row dense>
                    <v-col cols="12" md="6" sm="6" class="input-field">
                        <v-text-field variant="outlined" class="pb-1" label="Author Name In English*" :rules="rules.enName" required v-model="form.name.en"></v-text-field>
                        <v-text-field variant="outlined" class="pb-1"  label="Author Name In Arabic*" v-model="form.name.ar" :rules="rules.arName" required dir="rtl"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" sm="6" class=" mb-0">
                        <div :class="'img-container'" @click="clickInputFile" style="position: relative; height: 200px;">
                          <p v-if="!form.avatar" class="size-22 w-100 mb-0 pt-3 pl-3 position-absolute v-label v-field-label z-index-1" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Author avatar*</p>
                          <div class="w-mc ma-auto h-100 d-flex justify-center align-center pa-2" style="height: 100%; width: 100%;">
                            <img v-if="form.avatar" ref="imgRef" :src="props.selectedAuthor.avatar ? baseUrl + form.avatar : form.avatar" class="my-auto" style="width: 100%; height: 100%; object-fit: contain;" />
                            <img v-else width="30" height="30" src="@/assets/icons/img-upload.svg" class="my-auto" />
                            <v-file-input variant="outlined" accept="image/png, image/jpeg, image/bmp" class="mx-auto w-mc pa-0" id="hidenFileInput" hide-input v-model="form.avatar" truncate-length="15" :prepend-icon="null" append-outer="mdi-close" required @change="printFiles(form.avatar, 'image')" style="position: absolute; width: 100%; height: 100%; opacity: 0;">
                            </v-file-input>
                          </div>
                        </div>
                      </v-col>
                
                    <v-col cols="6" md="6" sm="6">
                        <v-textarea variant="outlined" label="About Author In English*" v-model="form.about.en" rows="8" :rules="rules.enAbout" required></v-textarea>
                    </v-col>
                    <v-col cols="6" md="6" sm="6">
                        <v-textarea variant="outlined" label="About Author In Arabic*" v-model="form.about.ar" rows="8" persistent-hint :rules="rules.arAbout" required dir="rtl"></v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-row dense class="justify-end px-6">
                <v-col cols="12" md="3" sm="3">
                    <v-btn class="text-none text-white font-weight-regular close-btn" text="Cancel" color="grey" type="reset" block @click="Object.keys(props.selectedAuthor).length !== 0 ? $emit('closeEditDialog', 'edit'): $emit('closeAddDialog', 'add')"></v-btn>
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
import { defineComponent, reactive, computed, ref, watch } from 'vue'
import { useStore } from 'vuex';

export default defineComponent({
    props: ['dialog', 'selectedAuthor', 'eventType'],
    data: () => ({
        rules: {
            arName: [
                v => !!v || 'author name in arabic is required',
            ],
            enName: [
                v => !!v || 'author name in english is required',
            ],
            arAbout: [
                v => !!v || 'about author in arabic is required',
            ],
            enAbout: [
                v => !!v || 'about author in english is required',
            ]
        },
        baseUrl
    }),
    setup(props, { emit }) {
        const store = useStore();
        const getInitialForm = () => ({
            name: {
                ar: null,
                en: null
            },
            about: {
                ar: null,
                en: null
            },
            avatar: null
        })
        let form = reactive({
            name: {
                ar: null,
                en: null
            },
            about: {
                ar: null,
                en: null
            },
            avatar: null
        })
        const formv = ref({
            name: {
                ar: null,
                en: null
            },
            about: {
                ar: null,
                en: null
            },
            avatar: null
        });

        const loading = computed(() => store.getters['Authors/loading'])
        watch(() => props.dialog, () => {
            if(props.dialog) {
                if (props.selectedAuthor) {
                    form.name.ar = props.selectedAuthor.name?.ar
                    form.name.en = props.selectedAuthor.name?.en
                    form.about.ar = props.selectedAuthor.about?.ar
                    form.about.en = props.selectedAuthor.about?.en
                    form.avatar = props.selectedAuthor.avatar
                } else {
                        Object.assign(form, getInitialForm())
                    }
                } else {
                    Object.assign(form, getInitialForm())
                }
        });
        const title = computed(() => {
            return Object.keys(props.selectedAuthor).length !== 0 ? `Edit Author` : `Add Author`;
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
            if (form.name.en && form.name.ar && form.about.en && form.about.ar) {
                return true
            } else {
                return false
            }
        }

        function handleSubmit() {
            if (checkValidation()) {
                if (Object.keys(props.selectedAuthor).length !== 0) {
                    if (props.selectedAuthor.avatar === form.avatar) {
                        let data = {
                            name: {
                                en: form.name.en,
                                ar: form.name.ar,
                            },
                            about: {
                                en: form.about.en,
                                ar: form.about.ar,
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
    min-height: 107px!important;
    max-height: 107px!important;
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
