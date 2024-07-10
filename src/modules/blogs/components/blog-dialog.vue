<template>
<div class="text-center">
    <v-dialog v-model="props.dialog" max-width="700" class="dialog">
        <v-card class="pa-5 font-dark-blue">
            <div class="px-6">
                <v-icon icon="mdi-format-align-left" class="mr-2" /><span class="size-35">{{title}}</span>
            </div>
            <v-card-text :v-if="props.eventType!=='delete'" class="pb-0">
                <v-row dense>
                    <v-col cols="12" md="12" sm="12" class="input-field">
                        <v-text-field variant="outlined" class="pa-0" label="Blog Title*" v-model="form.title" :rules="rules.title" required></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" sm="6" class="input-field">
                        <v-text-field variant="outlined" label="Author Name*" :rules="rules.writer" required v-model="form.writer"></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" sm="6" class="input-field">
                        <v-text-field variant="outlined" class="input-field date" label="date*" :rules="rules.date" required type="date" max_width="100%" persistent-placeholder v-model="form.date"></v-text-field>
                    </v-col>

                    <v-col cols="6" md="8" sm="8" class="input-field">
                        <v-select variant="outlined" label="categories*" multiple :items="categories" v-model="form.categories" :rules="rules.categories" item-title="text" item-value="value" required>
                        </v-select>
                    </v-col>

                    <v-col cols="6" md="4" sm="4" class="input-field">
                        <v-select variant="outlined" label="language*" :items="langItem" v-model="form.lang" :rules="rules.lang" required></v-select>
                    </v-col>

                    <v-col cols="12" md="12" sm="12" class="input-field">
                        <v-textarea variant="outlined" label="contet*" v-model="form.content" rows="5" :rules="rules.content" required></v-textarea>
                    </v-col>

                    <v-col cols="12" md="12" sm="12" class="input-field mb-5">
                        <div :class="'img-container'" @click="clickInputFile">
                            <p class="size-22 overflow-hidden w-25 mb-0 pt-3 pl-3 position-absolute v-label v-field-label">Author photo*</p>
                            <div class="w-mc ma-auto h-100 d-flex justify-center align-center pa-2">
                                <img v-if="form.cover_image" width="70" height="70" ref="imgRef" :src="props.selectedBlog.cover_image ? baseUrl + form.cover_image : form.cover_image" class="my-auto" />
                                <img v-else width="30" height="30" src="@/assets/icons/img-upload.svg" class="my-auto" />
                                <v-file-input accept="image/png, image/jpeg, image/bmp" class="mx-auto w-mc pa-0" id="hidenFileInput" hide-input v-model="form.cover_image" truncate-length="15" :prepend-icon="null" append-outer="mdi-close" required @change="printFiles(form.cover_image, 'image')">
                                </v-file-input>
                                <p class="size-22 overflow-hidden font-deep-grey bold text-start">{{ form.cover_image ? form.cover_image.name :  ''}}</p>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-row dense class="justify-end px-6">
                <v-col cols="12" md="3" sm="3">
                    <v-btn class="text-none text-white font-weight-regular close-btn" type="reset" text="Cancel" color="grey" block @click="Object.keys(props.selectedBlog).length !== 0 ? $emit('closeEditDialog', 'edit'): $emit('closeAddDialog', 'add')"></v-btn>
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
import { defineComponent, onUpdated, reactive, computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex';

export default defineComponent({
    props: ['dialog', 'selectedBlog', 'eventType', 'loading'],
    data: () => ({
        rules: {
            title: [
                v => !!v || 'title is required',
            ],
            writer: [
                v => !!v || 'writer is required',
            ],
            date: [
                v => !!v || 'date is required',
            ],
            lang: [
                v => !!v || 'language is required',
            ],
            categories: [
                v => !!v || 'categories is required',
            ],
            content: [
                v => !!v || 'content required',
            ]

        },
        langItem: ['English', 'Arabic']
    }),
    setup(props, { emit }) {
        const store = useStore();
        let form = reactive({
            title: null,
            writer: null,
            date: null,
            categories: null,
            lang: null,
            content: null,
            cover_image: null
        })
        const formv = ref(null);
        onUpdated(() => {
            if (props.selectedBlog) {
                form.title = props.selectedBlog.title
                form.writer = props.selectedBlog.writer
                form.date = props.selectedBlog.date
                form.categories = props.selectedBlog.categories
                form.lang = props.selectedBlog.lang
                form.content = props.selectedBlog.content
                form.cover_image = props.selectedBlog.cover_image
            } else {
                form.title = null
                form.writer = null
                form.date = null
                form.categories = null
                form.lang = null
                form.content = null
                form.cover_image = null
            }
        })
        async function getCategories() {
            await store.dispatch('BlogCategories/fetchCategories')
                .then(response => {
                    console.log('Add response:', response);
                });
        }
        const categories = computed(() => store.getters['BlogCategories/categories'].map(category => ({
            text: category.title.en,
            value: category.id
        })))
        onMounted(() => {
            getCategories()
        })
        const title = computed(() => {
            return Object.keys(props.selectedBlog).length !== 0 ? `Edit Blog` : `Add Blog`;
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
            console.log('object file', form.cover_image);
        }

        function checkValidation() {
            if (form.title && form.writer && form.date && form.categories && form.lang && form.content) {
                return true
            } else {
                return false
            }
        }

        function handleSubmit() {
            if (checkValidation()) {
                if (Object.keys(props.selectedBlog).length !== 0) {
                    if (props.selectedBlog.cover_image === form.cover_image) {
                        let data = {
                            title: form.title,
                            writer: form.writer,
                            date: form.date,
                            categories: form.categories,
                            lang: form.lang,
                            content: form.content,
                            cover_image: form.cover_image
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
            categories,
            clickInputFile,
            printFiles,
            handleSubmit
        }
    },
})
</script>

<style>
.img-container {
    height: 14.5vh !important;
    border: 1px solid rgba(118, 118, 118) !important;
}

.dialog {
    height: 1000px;
}

.input-field .v-field__input {
    min-height: 45px !important;
    padding-top: unset !important;
    padding-bottom: unset !important
}
</style>
