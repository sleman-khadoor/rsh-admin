<template>
<div id="categories">
    <div class="row ma-5 bg-white">
        <div class="d-flex flex-row-reverse pa-4">
            <v-row class="py-2 px-16 justify-center">
                <v-col lg="9" md="9" sm="9">
                    <SearchByFilters :items="filterBy" @fetchData="fetchData(1,$event)"/>
                </v-col>
                <v-col lg="3" md="3" sm="3" class="px-0">
                    <v-btn class="text-none text-white font-weight-regular" height="47" width="180" :text="`Add Category`" size="large" color="dark-blue" @click="openDialog()"></v-btn>
                </v-col>
            </v-row>
            <CategoryDialog :dialog="dialog" :selectedCategory="selectedCategory" :loading="loading" :eventType="eventType" @edit="submit($event, 'edit')" @add="submit($event, 'add')" @closeEditDialog="closeDialog($event, 'edit')" @closeAddDialog="closeDialog($event, 'add')" />
            <DeleteCategoryDialog :deleteDialog="deleteDialog" :loading="loading" @delete="submit($event, 'delete')" @closeDialog="closeDialog($event, 'delete')" />
        </div>
        <DataTable :headers="headers" itemKey="slugTranslation" :actionsTable="actionsTable" :data="data" :meta="meta" :loading="loading" @OpenDialog="openDialog($event)" @openDeleteDialog="openDeleteDialog($event)" @newPage="fetchData($event)" />
    </div>
</div>
</template>

<script>
import { computed, defineComponent, onMounted, watch, ref } from 'vue'
import DataTable from '@/components/data-table.vue'
import CategoryDialog from '../../components/category-dialog.vue'
import DeleteCategoryDialog from '@/components/delete-dialog.vue'
import SearchByFilters from '@/components/search-by-filters.vue'

import { useStore } from 'vuex'
export default defineComponent({
    components: {
        DataTable,
        CategoryDialog,
        DeleteCategoryDialog,
        SearchByFilters
    },
    setup() {
        const store = useStore();
        let dialog = ref(false);
        let deleteDialog = ref(false);
        let message = ref("");
        let selectedCategory = ref('');
        let eventType = "";

        const headers = [{
                title: "Category Name In English",
                align: "start",
                sortable: false,
                key: "title",
                subKey: "en"
            },
            {
                title: "Category Name in Arabic",
                key: "title",
                subKey: "ar"
            },
            { title: "Actions", key: "actions", sortable: false },
        ]

        const actionsTable = [
            { 'edit': true },
            { 'delete': true },
            { 'view': false },
        ];

        const filterBy = ['title']

        function openDialog(e) {
            dialog.value = true;
            if (e) {
                selectedCategory.value = e
            } else {
                selectedCategory.value = {}
            }
        }

        function openDeleteDialog(e) {
            deleteDialog.value = true;
            selectedCategory.value = e
            eventType = "delete"
        }

        function submit(e, eventType) {
            console.log(e);
            if (eventType === 'add') {
                store.dispatch('BookCategories/createCategory', e)
                .then(response => {
                        console.log('Add response:', response);
                        fetchData()
                        deleteDialog.value = false;
                    });
            } else if (eventType === 'edit') {
                store.dispatch('BookCategories/editCategory', { 'payload': e, 'slug': selectedCategory.value.slug.en })
                .then(response => {
                        console.log('Edit response:', response);
                        fetchData()
                        deleteDialog.value = false;
                    });
            } else if (eventType === 'delete') {
                console.log('event type is', selectedCategory.value.slug.en);
                store.dispatch('BookCategories/deleteCategory', selectedCategory.value.slug.en)
                    .then(response => {
                        console.log('Delete response:', response);
                        fetchData()
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
            dialog.value = false;

        }

        function fetchData(currentPage, search = {}) {
            console.log('currentPage', currentPage);
            store.dispatch('BookCategories/fetchCategories', {
                params: {
                    page: currentPage ? currentPage : 1,
                    perPage: 6,
                    [`filter[${search.key}]`]: search.value
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
        watch(selectedCategory, (newV) => {
            console.log(newV);
        }, { deep: true });
        const data = computed(() => store.getters['BookCategories/categories'])
        const meta = computed(() => store.getters['BookCategories/meta'])
        const loading = computed(() => store.getters['BookCategories/loading'])
        return {
            headers,
            dialog,
            deleteDialog,
            selectedCategory,
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
            filterBy
        }
    }
})
</script>
