<template>
<div id="books" class="h-100 mt-6">
    <div class="row ma-5 bg-white">
        <div class="d-flex flex-row-reverse pa-4">
            <v-row class="py-2 px-lg-7 px-md-5 px-sm-3 justify-center">
                <v-col lg="10" md="10" sm="12">
                    <SearchByFilters :selectItems="categories" selectType="book_category" :items="filterBy" @fetchData="fetchData(1,$event)" />
                </v-col>
                <v-col lg="2" md="2" sm="12" class="d-flex flex-end">
                    <v-btn class="text-none text-white font-weight-regular ml-auto" height="47" width="180" :text="`Add Book`" size="large" color="dark-blue" @click="openDialog()"></v-btn>
                </v-col>
            </v-row>
            <BookDialog :categories="categories" :dialog="dialog" :selectedBook="selectedBook" :eventType="eventType" @edit="submit($event, 'edit')" @add="submit($event, 'add')" @closeEditDialog="closeDialog($event, 'edit')" @closeAddDialog="closeDialog($event, 'add')" />
            <DeleteBookDialog :deleteDialog="deleteDialog" :loading="loading" :selectedBook="selectedBook" @delete="submit($event, 'delete')" @closeDialog="closeDialog($event, 'delete')" />
        </div>
        <DataTable :headers="headers" itemKey="slug" :actionsTable="actionsTable" :data="data" :meta="meta" :loading="loading" @OpenDialog="openDialog($event)" @openDeleteDialog="openDeleteDialog($event)" @newPage="fetchData($event)" @ViewReviews="viewReviews($event)" @ViewAwards="viewAwards($event)" />
    </div>
</div>
</template>

<script>
import { computed, defineComponent, onMounted, watch, ref } from 'vue'
import DataTable from '@/components/data-table.vue'
import BookDialog from '../../components/book-dialog.vue'
import DeleteBookDialog from '@/components/delete-dialog.vue'
import SearchByFilters from '@/components/search-by-filters.vue'

import { useStore } from 'vuex'
export default defineComponent({
    components: {
        DataTable,
        BookDialog,
        DeleteBookDialog,
        SearchByFilters
    },
    setup() {
        const store = useStore();
        let dialog = ref(false);
        let currentPage = ref(1);
        let deleteDialog = ref(false);
        let message = ref("");
        let selectedBook = ref('');
        let eventType = "";

        const headers = [{
                title: "Book Title",
                align: "start",
                sortable: false,
                key: "book_title",
            },
            {
                title: "Author Name",
                key: "author",
            },
            {
                title: "ISBN",
                key: "ISBN",
            },
            {
                title: "EISBN",
                key: "EISBN",
            },
            {
                title: "Reviews",
                key: "reviews",
            },
            {
                title: "Awards",
                key: "awards",
            },
            { title: "Actions", key: "actions", sortable: false },
        ]

        const actionsTable = [
            { 'edit': true },
            { 'delete': true },
            { 'view': false },
        ];

        const filterBy = ['title', 'author', 'category', 'ISBN', 'EISBN'];

        async function getCategories() {
            await store.dispatch('BookCategories/fetchCategories', {
                    params: {
                        perPage: 1000
                    }
                })
                .then(response => {
                    console.log('Add response:', response);
                });
        }

        const categories = computed(() => store.getters['BookCategories/categories'].map((category) => ({
            text: category.title.en,
            value: category.id
        })))

        function openDialog(e) {
            dialog.value = true;
            if (e) {
                selectedBook.value = e
            } else {
                selectedBook.value = ''
            }
        }

        function openDeleteDialog(e) {
            deleteDialog.value = true;
            selectedBook.value = e
            eventType = "delete"
        }

        function submit(e, eventType) {
            if (eventType === 'add') {
                store.dispatch('Books/createBook', e)
                    .then(response => {
                        console.log('Add response:', response);
                        fetchData(1);
                        dialog.value = false;
                    });
            } else if (eventType === 'edit') {
                store.dispatch('Books/editBook', { 'payload': e, 'slug': selectedBook.value.slug.en })
                    .then(response => {
                        console.log('Edit response:', response);
                        dialog.value = false;
                        fetchData();
                    });
            } else if (eventType === 'delete') {
                store.dispatch('Books/deleteBook', selectedBook.value.slug.en)
                    .then(response => {
                        console.log('Delete response:', response);
                        fetchData();
                        deleteDialog.value = false;
                    })
                    .catch(error => {
                        if (error.response) {
                            if (error.response.status == 409) {
                                closeDialog(e, 'delete');
                                message.value = "You can't delete this record, it has related data."
                            }
                        }
                    });
            }
        }

        function fetchData(page, search = {}) {
            page ? currentPage.value = page : null
            store.dispatch('Books/fetchBooks', {
                params: {
                    page: page ? page : currentPage.value,
                    perPage: 7,
                    [`filter[${search.value?.key}]`]: search.value?.value,
                    ...search.selectSearch,
                    [`include[0]`]: 'bookCategories',
                    [`include[1]`]: 'author',
                    [`include[2]`]: 'formats',
                }
            });
        }
        
        function closeDialog(e, eventType) {
            console.log(e);
            if (eventType == 'add' || eventType == 'edit') {
                dialog.value = false;
            } else if (eventType == 'delete') {
                deleteDialog.value = false;
            }
        }

        function viewReviews(e) {
            console.log(e);
            this.$router.push({ name: 'book-reviews', params: { slug: e.slug.en } });
        }

        function viewAwards(e) {
            console.log(e);
            this.$router.push({ name: 'book-awards', params: { slug: e.slug.en } });
        }

        onMounted(() => {
            fetchData()
            getCategories()
        })
        watch(dialog, (newV) => {
            console.log(newV);
        }, { deep: true });
        watch(deleteDialog, (newV) => {
            console.log(newV);
        }, { deep: true });
        watch(message, (newV) => {
            console.log(newV);
        }, { deep: true });
        watch(selectedBook, (newV) => {
            console.log(newV);
        }, { deep: true });
        const data = computed(() => store.getters['Books/books'])
        const meta = computed(() => store.getters['Books/meta'])
        const loading = computed(() => store.getters['Books/loading'])
        return {
            headers,
            dialog,
            deleteDialog,
            selectedBook,
            openDialog,
            openDeleteDialog,
            message,
            fetchData,
            closeDialog,
            eventType,
            submit,
            data,
            meta,
            loading,
            actionsTable,
            filterBy,
            viewReviews,
            viewAwards,
            categories,
        }
    }
})
</script>
