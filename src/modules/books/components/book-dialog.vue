<template>
<div class="text-center">
    <v-dialog v-model="props.dialog" max-width="900" class="dialog">
        <v-card class="pa-5 font-dark-blue">
            <div class="px-6">
                <v-icon icon="mdi-format-align-left" class="mr-2" /><span class="size-35">{{title}}</span>
            </div>
            <v-card-text :v-if="props.eventType!=='delete'" class="pb-0">
                <v-row dense>
                    <v-col cols="12" md="7" sm="7" class="input-field">
                        <v-text-field variant="outlined" class="pa-0" label="Book Title In English*" v-model="form.title.en" :rules="rules.enTitle" required></v-text-field>
                        <v-text-field variant="outlined" class="pa-0" label="Book Title In Arabic*" v-model="form.title.ar" :rules="rules.arTitle" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="5" sm="5" class="input-field">
                        <div :class="'img-container'" @click="clickInputFile" style="position: relative; height: 200px;">
                            <p v-if="!form.cover_image" class="size-22 w-100 mb-0 pt-3 pl-3 position-absolute v-label v-field-label z-index-1" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Cover Image</p>
                            <div class="w-mc ma-auto h-100 d-flex justify-center align-center pa-2" style="height: 100%; width: 100%;">
                                <img v-if="form.cover_image" ref="imgRef" :src="props.selectedBook.cover_image ? baseUrl + form.cover_image : form.cover_image" class="my-auto" style="width: 100%; height: 100%; object-fit: contain;" />
                                <img v-else width="30" height="30" src="@/assets/icons/img-upload.svg" class="my-auto" />
                                <v-file-input variant="outlined" accept="image/png, image/jpeg, image/bmp" class="mx-auto w-mc pa-0" id="hidenFileInput" hide-input v-model="form.cover_image" truncate-length="15" :prepend-icon="null" append-outer="mdi-close" required @change="printFiles(form.cover_image, 'image')" style="position: absolute; width: 100%; height: 100%; opacity: 0;">
                                </v-file-input>
                            </div>
                        </div>
                    </v-col>

                    <v-col cols="4" md="4" sm="4" class="input-field">
                        <v-select :menu-props="{ offsetY: true, maxHeight: '200px' }" variant="outlined" label="author*" :items="authors" v-model="form.author_id" :rules="rules.author" item-title="text" item-value="value" required></v-select>
                    </v-col>
                    <v-col cols="8" md="8" sm="8" class="input-field">
                        <v-select class="categories" chips :menu-props="{ offsetY: true, maxHeight: '200px' }" variant="outlined" label="categories*" multiple :items="props.categories" v-model="form.categories" :rules="rules.categories" item-title="text" item-value="value" required></v-select>
                    </v-col>
                    <v-col cols="4" md="4" sm="4" class="input-field">
                        <v-select class="categories" chips :menu-props="{ offsetY: true, maxHeight: '200px' }" variant="outlined" label="Book format*" multiple :items="formats" v-model="form.formats" :rules="rules.formats" item-title="text" item-value="value" required></v-select>
                    </v-col>
                    <v-col cols="3" md="3" sm="3" class="input-field">
                        <v-text-field variant="outlined" class="pa-0" label="ISBN*" type="number" v-model="form.ISBN" :rules="rules.ISBN" required></v-text-field>
                    </v-col>
                    <v-col cols="3" md="3" sm="3" class="input-field">
                        <v-text-field variant="outlined" class="pa-0" label="EISBN*" type="number" v-model="form.EISBN" :rules="rules.EISBN" required></v-text-field>
                    </v-col>
                    <v-col cols="2" md="2" sm="2" class="input-field">
                        <v-text-field variant="outlined" class="pb-0 date" label="Printing Year*" :rules="rules.printingYear" required type="number"  max_width="100%"  v-model="form.printing_year"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" sm="6">
                        <v-textarea variant="outlined" label="Abstract In English*" v-model="form.abstract.en" rows="5" persistent-hint :rules="rules.enAbstract" required></v-textarea>
                    </v-col>
                    <v-col cols="12" md="6" sm="6">
                        <v-textarea variant="outlined" label="Abstract In Arabic*" v-model="form.abstract.ar" rows="5" persistent-hint :rules="rules.arAbstract" required></v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-row dense class="justify-end px-6 pa-1">
                <v-col cols="12" md="3" sm="3">
                    <v-btn class="text-none text-white font-weight-regular close-btn" type="reset" text="Cancel" color="grey" block @click="Object.keys(props.selectedBook).length !== 0 ? $emit('closeEditDialog', 'edit'): $emit('closeAddDialog', 'add')"></v-btn>
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
import { defineComponent, onUpdated, reactive, computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex';

export default defineComponent({
    props: ['dialog', 'selectedBook', 'eventType', 'loading', 'categories'],
    data: () => ({
        rules: {
            enTitle: [
                v => !!v || 'title in english is required',
            ],
            arTitle: [
                v => !!v || 'title in arabic is required',
            ],
            author: [
                v => !!v || 'author is required',
            ],
            categories: [
                v => !!v || 'categories is required',
            ],
            formats: [
                v => !!v || 'book formats is required',
            ],
            ISBN: [
                v => !!v || 'ISBN is required',
            ],
            EISBN: [
                v => !!v || 'EISBN is required',
            ],
            printingYear: [
                v => !!v || 'printing year required',
            ],
            enAbstract: [
                v => !!v || 'abstract in english is required',
            ],
            arAbstract: [
                v => !!v || 'abstract in arabic is required',
            ],

        },
        baseUrl
    }),
    setup(props, { emit }) {
        const store = useStore();
        let form = reactive({
            title: {
                en: null,
                ar: null
            },
            author_id: null,
            categories: [],
            formats: [],
            ISBN: null,
            EISBN: null,
            printing_year: null,
            abstract: {
                en: null,
                ar: null
            },
            cover_image: null
        })
        const formv = ref(null);
        onUpdated(() => {
            if (props.selectedBook) {
                form.title.en = props.selectedBook.title?.en
                form.title.ar = props.selectedBook.title?.ar
                form.author_id = props.selectedBook.author.id
                form.categories = formatCategories();
                form.formats = formatBookFormats();
                form.ISBN = props.selectedBook.ISBN
                form.EISBN = props.selectedBook.EISBN
                form.printing_year = props.selectedBook.printing_year
                form.abstract.en = props.selectedBook.abstract?.en
                form.abstract.ar = props.selectedBook.abstract?.ar
                form.cover_image = props.selectedBook.cover_image
            } else {
                form.title.en = null
                form.title.ar = null
                form.author_id = null
                form.categories = []
                form.formats = []
                form.ISBN = null
                form.EISBN = null
                form.printing_year = null
                form.abstract.en = null
                form.abstract.ar = null
            }
        })

        function formatCategories(){
            let selectedCategories = []
            let categories = []
            selectedCategories = props.selectedBook.book_categories
            selectedCategories.forEach(element => {
                categories.push({text: element.title.en, value: element.id})
            });
            return categories;
        }

        function formatBookFormats(){
            let selectedFormats = []
            let formats = []
            selectedFormats = props.selectedBook.book_formats
            selectedFormats.forEach(element => {
                formats.push({ text: element.title, value: element.id })
            });
            return formats;
        }

        async function getAuthors() {
            await store.dispatch('Authors/fetchAuthors', {
                    params: {
                        perPage: 1000
                    }
                })
                .then(response => {
                    console.log('Add response:', response);
                });
        }
        async function getFormats() {
            await store.dispatch('Books/fetchFormats', {
                    params: {
                        perPage: 1000
                    }
                })
                .then(response => {
                    console.log('Add response:', response);
                });
        }
        const authors = computed(() => store.getters['Authors/authors'].map((author) => ({
            text: author.name.en,
            value: author.id
        })))

        const formats = computed(() => store.getters['Books/formats'].map((format) => ({
            text: format.title,
            value: format.id
        })))

        const languages = computed(() => ['English', 'Arabic'].map(item => ({
            text: item,
            value: item == 'English' ? 'en' : 'ar'
        })))

        onMounted(() => {
            getAuthors()
            getFormats()
        })

        const title = computed(() => {
            return Object.keys(props.selectedBook).length !== 0 ? `Edit Book` : `Add Book`;
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
            if (form.title.en && form.title.ar && form.author_id && form.categories && form.formats && form.EISBN && form.printing_year && form.abstract.en && form.abstract.ar ) {
                return true
            } else {
                return false
            }
        }

        function handleSubmit() {
            if (checkValidation()) {
                if (Object.keys(props.selectedBook).length !== 0) {
                    let categories = [];
                    let oldCategories = formatCategories();
                    if(JSON.stringify(form.categories) !== JSON.stringify(oldCategories)){
                        categories = form.categories;
                    }
                    let formats = [];
                    let oldFormats = formatBookFormats();
                    if(JSON.stringify(form.formats) !== JSON.stringify(oldFormats)){
                        formats = form.formats;
                    }
                    if (props.selectedBook.cover_image === form.cover_image) {
                        let data = {
                            title: {
                                en: form.title.en,
                                ar: form.title.ar,
                            },
                            author_id: form.author_id,
                            ISBN: form.ISBN,
                            EISBN: form.EISBN,
                            printing_year: form.printing_year,
                            abstract: {
                                en: form.abstract.en,
                                ar: form.abstract.ar,
                            },
                        }
                        if(categories.length !== 0)
                            data.categories = categories
                        if(formats.length !== 0)
                            data.formats = formats
                        emit('edit', data, 'edit')
                    } else {
                        if(categories.length === 0)
                            delete form.categories;
                        if(formats.length === 0)
                            delete form.formats;
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
            authors,
            formats,
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
