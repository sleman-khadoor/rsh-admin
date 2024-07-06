<template>
<div id="categories">
    <div class="row ma-5 bg-white">
        <div class="d-flex flex-row-reverse pa-4">
            <v-btn class="text-none text-white font-weight-regular" prepend-icon="mdi-plus" :text="`Add Category`" size="large" color="dark-blue" @click="openDialog()"></v-btn>
            <CategoryDialog :dialog="dialog" :selectedCategory="selectedCategory" :eventType="eventType" @edit="submit($event, 'edit')" @add="submit($event, 'add')" @closeEditDialog="closeDialog($event, 'edit')" @closeAddDialog="closeDialog($event, 'add')" />
            <DeleteCategoryDialog :deleteDialog="deleteDialog" :selectedCategory="selectedCategory" @delete="submit($event, 'delete')" @closeDialog="closeDialog($event, 'delete')" />
            <WarningDialog :warningDialog="warningDialog" :message="message" @closeDialog="closeDialog($event, 'warning')" />
        </div>
        <DataTable :headers="headers" :data="data" :meta="meta" @OpenDialog="openDialog($event)" @openDeleteDialog="openDeleteDialog($event)" @newPage="fetchData($event)" />
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
                title: "Slug",
                align: "start",
                sortable: false,
                key: "slug",
                subKey: "en"
            },
            {
                title: "Category name in Arabic",
                key: "title",
                subKey: "ar"
            },
            {
                title: "Category name in English",
                key: "title",
                subKey: "en"
            },
            { title: "Actions", key: "actions", sortable: false },
        ]

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
                store.dispatch('BookCategories/createCategory', JSON.parse(e));
            } else if (eventType === 'edit') {
                store.dispatch('BookCategories/editCategory', { 'payload': JSON.parse(e), 'slug': selectedCategory.value.slug.en });
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
        }
    }
})
</script>
