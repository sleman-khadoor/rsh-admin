<template>
<div id="categories">
    <div class="row ma-5 bg-white">
        <div class="d-flex flex-row-reverse pa-4">
            <v-btn class="text-none text-white font-weight-regular" :text="`Add Category`" size="large" color="dark-blue" @click="openDialog()"></v-btn>
            <CategoryDialog :dialog="dialog" :selectedCategory="selectedCategory" :loading="loading" :eventType="eventType" @edit="submit($event, 'edit')" @add="submit($event, 'add')" @closeEditDialog="closeDialog($event, 'edit')" @closeAddDialog="closeDialog($event, 'add')" />
            <DeleteCategoryDialog :deleteDialog="deleteDialog" :loading="loading" @delete="submit($event, 'delete')" @closeDialog="closeDialog($event, 'delete')" />
            <WarningDialog :warningDialog="warningDialog" :message="message" @closeDialog="closeDialog($event, 'warning')" />
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
import WarningDialog from '@/components/warning-dialog.vue'
import { useStore } from 'vuex'
export default defineComponent({
    components: {
        DataTable,
        CategoryDialog,
        DeleteCategoryDialog,
        WarningDialog
    },
    setup() {
        const store = useStore();
        let dialog = ref(false);
        let deleteDialog = ref(false);
        let warningDialog = ref(false);
        let message = ref("");
        let selectedCategory = ref('');
        let eventType = "";

        const headers = [{
                title: "Category Name In Arabic",
                align: "start",
                sortable: false,
                key: "title",
                subKey: "ar"
            },
            {
                title: "Category Name in English",
                key: "title",
                subKey: "en"
            },
            { title: "Actions", key: "actions", sortable: false },
        ]

        const actionsTable = [
            { 'edit': true },
            { 'delete': true },
            { 'view': false },
        ];

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
                        deleteDialog.value = false;
                    });
            } else if (eventType === 'edit') {
                store.dispatch('BookCategories/editCategory', { 'payload': JSON.parse(e), 'slug': selectedCategory.value.slug.en })
                .then(response => {
                        console.log('Edit response:', response);
                        deleteDialog.value = false;
                    });
            } else if (eventType === 'delete') {
                console.log('event type is', selectedCategory.value.slug.en);
                store.dispatch('BookCategories/deleteCategory', selectedCategory.value.slug.en)
                    .then(response => {
                        console.log('Delete response:', response);
                        deleteDialog.value = false;
                    })
                    .catch(error => {
                        if (error.response) {
                            if (error.response.status == 409) {
                                closeDialog(e, 'delete');
                                message.value = "You can't delete this record, it has related data."
                                warningDialog.value = true;
                            }
                        }
                    });
            }
            dialog.value = false;

        }

        function fetchData(currentPage) {
            console.log('currentPage', currentPage);
            store.dispatch('BookCategories/fetchCategories', {
                params: {
                    page: currentPage ? currentPage : 1,
                    perPage: 6,
                }
            });
        }

        function closeDialog(e, eventType) {
            console.log(e);
            if (eventType == 'add' || eventType == 'edit') {
                dialog.value = false;
            } else if (eventType == 'delete') {
                deleteDialog.value = false;
            } else {
                warningDialog.value = false;
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
        watch(warningDialog, (newV) => {
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
            warningDialog,
            message,
            fetchData,
            closeDialog,
            eventType,
            submit,
            data,
            meta,
            loading,
            actionsTable
        }
    }
})
</script>
