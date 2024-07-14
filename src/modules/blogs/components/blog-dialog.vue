<template>
<div class="text-center">
    <v-dialog v-model="props.dialog" max-width="900" class="dialog">
        <v-card class="pa-5 font-dark-blue">
            <div class="px-6">
                <v-icon icon="mdi-format-align-left" class="mr-2" /><span class="size-35">{{title}}</span>
            </div>
            <v-card-text :v-if="props.eventType!=='delete'" class="pb-0">
                <v-row dense>
                    <v-col cols="8" md="8" sm="8" class="input-field">
                        <v-text-field variant="outlined" class="pa-0" label="Blog Title*" v-model="form.title" :rules="rules.title" required></v-text-field>
                    </v-col>
                    <v-col cols="4" md="4" sm="4" class="input-field">
                        <v-text-field variant="outlined" class="pb-0" label="Author Name*" :rules="rules.writer" required v-model="form.writer"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" sm="12" class="input-field">
                        <v-select class="categories" chips :menu-props="{ offsetY: true, maxHeight: '200px' }" variant="outlined" label="categories*" multiple :items="categories" v-model="form.categories" :rules="rules.categories" item-title="text" item-value="value" required></v-select>
                    </v-col>
                    <v-col cols="12" md="5" sm="5" class="input-field">
                        <v-text-field variant="outlined" class="pb-3 date" label="date*" :rules="rules.date" required type="date" max_width="100%" persistent-placeholder v-model="form.date"></v-text-field>
                        
                        <v-select class="pb-3" variant="outlined" label="language*" :items="languages" item-title="text" item-value="value" v-model="form.lang" :rules="rules.lang" required></v-select>
                        <div :class="'img-container'" @click="clickInputFile" style="position: relative; height: 200px;">
                            <p v-if="!form.cover_image" class="size-22 w-100 mb-0 pt-3 pl-3 position-absolute v-label v-field-label z-index-1" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Cover Image</p>
                            <div class="w-mc ma-auto h-100 d-flex justify-center align-center pa-2" style="height: 100%; width: 100%;">
                              <img v-if="form.cover_image" ref="imgRef" :src="props.selectedBlog.cover_image ? baseUrl + form.cover_image : form.cover_image" class="my-auto" style="width: 100%; height: 100%; object-fit: contain;" />
                              <img v-else width="30" height="30" src="@/assets/icons/img-upload.svg" class="my-auto" />
                              <v-file-input variant="outlined" accept="image/png, image/jpeg, image/bmp" class="mx-auto w-mc pa-0" id="hidenFileInput" hide-input v-model="form.cover_image" truncate-length="15" :prepend-icon="null" append-outer="mdi-close" required @change="printFiles(form.cover_image, 'image')" style="position: absolute; width: 100%; height: 100%; opacity: 0;">
                              </v-file-input>
                            </div>
                          </div>
                    </v-col>
                    <v-col cols="12" md="7" sm="7" class="pb-3">
                        <v-textarea  variant="outlined" label="contet*" v-model="form.content" rows="9" persistent-hint :rules="rules.content" required></v-textarea>
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
import { baseUrl } from '@/utils/axios';
import { defineComponent, onUpdated, reactive, computed, ref, onMounted, toRaw } from 'vue'
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
        baseUrl
    }),
    setup(props, { emit }) {
        const store = useStore();
        let form = reactive({
            title: null,
            writer: null,
            date: null,
            categories: [],
            languages: null,
            lang: null,
            content: null,
            cover_image: null
        })
        const formv = ref(null);
        onUpdated(() => {
            if (props.selectedBlog) {
                console.log('props selected blog is', toRaw(props.selectedBlog));
                console.log('props selected blog is', typeof(props.selectedBlog));
                form.title = props.selectedBlog.title
                form.writer = props.selectedBlog.writer
                form.date = props.selectedBlog.date
                let test = []
                form.categories = []
                test = props.selectedBlog.blog_categories
                console.log('test array', form.categories);
                test.forEach(element => {
                    // form.categories.push({element?.id})
                    form.categories.push({text: element.title.en, value: element.id})
                });
                console.log('test array', test);
                // form.categories = test
                form.lang = props.selectedBlog.lang
                form.content = props.selectedBlog.content
                form.cover_image = props.selectedBlog.cover_image
            } else {
                form.title = null
                form.writer = null
                form.date = null
                form.categories = []
                form.lang = null
                form.content = null
                form.cover_image = null
            }
        })
        async function getCategories() {
            await store.dispatch('BlogCategories/fetchCategories',{
                params: {
                    perPage: 1000
                }
            })
                .then(response => {
                    console.log('Add response:', response);
            });
        }
        const categories = computed(() => store.getters['BlogCategories/categories'].map((category) => ({
            text: category.title.en,
            value: category.id
        })))

        const languages = computed(() => ['English', 'Arabic'].map(item => ({
            text: item,
            value: item == 'English'? 'en':'ar'
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
            console.log('object file', form.cpver_image);
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
                        console.log('form.categories', form.categories);
                        let data = {
                            title: form.title,
                            writer: form.writer,
                            date: form.date,
                            categories: form.categories,
                            lang: form.lang,
                            content: form.content
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
            languages,
            clickInputFile,
            printFiles,
            handleSubmit
        }
    },
})
</script>

<style>
.img-container {
    border: 1px solid #a5a5a5 !important;
    min-height: 90px!important;
    max-height: 90px!important;
}

.img-container:hover {
    border: 1px solid #0C2748 !important;
}


.v-select__selections{
    padding-left: 16px !important;

}
.dialog {
    height: 1000px;
}

.input-field .v-field__input {
    min-height: 45px !important;
    padding-top: 1% !important;
    padding-bottom: 1% !important
}

.date .v-field__input{
    display: block !important;
}
</style>
