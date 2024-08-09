<template>
<div id="categories">
    <div class="row ma-5 bg-white">
        <div class="d-flex flex-row-reverse pa-4">
            <v-row class="py-2 px-lg-7 px-md-5 px-sm-3 justify-center">
                <v-col lg="10" md="10" sm="12">
                    <SearchByFilters :items="filterBy" @fetchData="fetchData(1,$event)"/>
                </v-col>
                <v-col lg="2" md="2" sm="12" class="d-flex flex-end">
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
        let currentPage = ref(1);

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

        const filterBy = [{value: 'title', title: 'name'}];

        function openDialog(e) {
            dialog.value = true;
            if (e) {
                selectedCategory.value = e
            } else {
                selectedCategory.value = ''
            }
        }

        function openDeleteDialog(e) {
            deleteDialog.value = true;
            selectedCategory.value = e
            eventType = "delete"
        }

        function submit(e, eventType) {
            if (eventType === 'add') {
                store.dispatch('BookCategories/createCategory', e)
                .then(response => {
                        console.log('Add response:', response);
                        fetchData(1)
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

        function fetchData(page, search = {}) {
            page ? currentPage.value = page : null
            store.dispatch('BookCategories/fetchCategories', {
                params: {
                    page: page ? page : currentPage.value,
                    perPage: 6,
                    [`filter[${search.value?.key}]`]: search.value?.value
                }
            });
        }

        function closeDialog(e, eventType) {
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
