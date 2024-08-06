<template>
<div id="blogs">
    <div class="row ma-5 bg-white">
        <div class="d-flex flex-row-reverse pa-4">
            <v-row class="py-2 px-lg-16 px-md-7 px-sm-3 justify-center">
                <v-col lg="9" md="10" sm="12">
                    <SearchByFilters :selectItems="categories" selectType="blog_category" :items="filterBy" @fetchData="fetchData(1,$event)"/>
                </v-col>
                <v-col lg="3" md="2" sm="12" class="px-lg-0 px-md-0">
                    <v-btn class="text-none text-white font-weight-regular" height="47" width="180" :text="`Add Blog`" size="large" color="dark-blue" @click="openDialog()"></v-btn>
                </v-col>
            </v-row>
            <BlogDialog :categories="categories" :dialog="dialog" :loading="loading" :selectedBlog="selectedBlog" :eventType="eventType" @edit="submit($event, 'edit')" @add="submit($event, 'add')" @closeEditDialog="closeDialog($event, 'edit')" @closeAddDialog="closeDialog($event, 'add')" />
            <DeleteBlogDialog :deleteDialog="deleteDialog" :loading="loading" :selectedBlog="selectedBlog" @delete="submit($event, 'delete')" @closeDialog="closeDialog($event, 'delete')" />
        </div>
        <DataTable :headers="headers" itemKey="slug" :actionsTable="actionsTable" :data="data" :meta="meta" :loading="loading" @OpenDialog="openDialog($event)" @openDeleteDialog="openDeleteDialog($event)" @newPage="fetchData($event)" />
    </div>
</div>
</template>

<script>
import { computed, defineComponent, onMounted, watch, ref } from 'vue'
import DataTable from '@/components/data-table.vue'
import BlogDialog from '../../components/blog-dialog.vue'
import DeleteBlogDialog from '@/components/delete-dialog.vue'
import SearchByFilters from '@/components/search-by-filters.vue'

import { useStore } from 'vuex'
export default defineComponent({
    components: {
        DataTable,
        BlogDialog,
        DeleteBlogDialog,
        SearchByFilters
    },
    setup() {
        const store = useStore();
        let dialog = ref(false);
        let deleteDialog = ref(false);
        let message = ref("");
        let selectedBlog = ref('');
        let eventType = "";
        let currentPage = ref(1);

        const headers = [{
                title: "Blog Title",
                align: "start",
                sortable: false,
                key: "title",
            },
            {
                title: "Author Name",
                key: "writer",
            },
            { title: "Actions", key: "actions", sortable: false },
        ]

        const actionsTable = [
            { 'edit': true },
            { 'delete': true },
            { 'view': false },
        ];
        
        const filterBy = ['title', 'writer', 'category'];

        function openDialog(e) {
            dialog.value = true;
            if (e) {
                selectedBlog.value = e
            } else {
                selectedBlog.value = ''
            }
        }

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

        function openDeleteDialog(e) {
            deleteDialog.value = true;
            selectedBlog.value = e
            eventType = "delete"
        }

        function submit(e, eventType) {
            console.log(e);
            if (eventType === 'add') {
                store.dispatch('Blogs/createBlog', e)
                    .then(response => {
                            console.log('Add response:', response);
                            fetchData(1);
                            dialog.value = false;
                    });
            } else if (eventType === 'edit') {
                console.log('payload', e);
                store.dispatch('Blogs/editBlog', { 'payload': e, 'slug': selectedBlog.value.slug })
                    .then(response => {
                            console.log('Edit response:', response);
                            fetchData();
                            dialog.value = false;
                    });
            } else if (eventType === 'delete') {
                store.dispatch('Blogs/deleteBlog', selectedBlog.value.slug)
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

        function fetchData(page, search = {} ) {
            console.log('currentPage', page);
            page ? currentPage.value = page : null
            store.dispatch('Blogs/fetchBlogs', {
                params: {
                    page: page ? page : currentPage.value,
                    perPage: 6,
                    [`filter[${search.value?.key}]`]: search.value?.value,
                    ...search.selectSearch,
                    [`include[]`]: 'blogCategories',
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
        watch(selectedBlog, (newV) => {
            console.log(newV);
        }, { deep: true });
        const data = computed(() => store.getters['Blogs/blogs'])
        const meta = computed(() => store.getters['Blogs/meta'])
        const loading = computed(() => store.getters['Blogs/loading'])
        return {
            headers,
            dialog,
            deleteDialog,
            selectedBlog,
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
            categories
        }
    }
})
</script>
