<template>
<div id="authors">
    <div class="row ma-5 bg-white">
        <div class="d-flex flex-row-reverse pa-4">
            <v-btn class="text-none text-white font-weight-regular" :text="`Add Author`" size="large" color="dark-blue" @click="openDialog()"></v-btn>
            <AuthorDialog :dialog="dialog" :loading="loading" :selectedAuthor="selectedAuthor" :eventType="eventType" @edit="submit($event, 'edit')" @add="submit($event, 'add')" @closeEditDialog="closeDialog($event, 'edit')" @closeAddDialog="closeDialog($event, 'add')" />
            <DeleteAuthorDialog :deleteDialog="deleteDialog" :loading="loading" :selectedAuthor="selectedAuthor" @delete="submit($event, 'delete')" @closeDialog="closeDialog($event, 'delete')" />
            <WarningDialog :warningDialog="warningDialog" :message="message" @closeDialog="closeDialog($event, 'warning')" />
        </div>
        <DataTable :headers="headers" :actionsTable="actionsTable" :data="data" :meta="meta" :loading="loading" @OpenDialog="openDialog($event)" @openDeleteDialog="openDeleteDialog($event)" @newPage="fetchData($event)" />
    </div>
</div>
</template>

<script>
import { computed, defineComponent, onMounted, watch, ref } from 'vue'
import DataTable from '@/components/data-table.vue'
import AuthorDialog from '../../components/author-dialog.vue'
import DeleteAuthorDialog from '@/components/delete-dialog.vue'
import WarningDialog from '@/components/warning-dialog.vue'
import { useStore } from 'vuex'
export default defineComponent({
    components: {
        DataTable,
        AuthorDialog,
        DeleteAuthorDialog,
        WarningDialog
    },
    setup() {
        const store = useStore();
        let dialog = ref(false);
        let deleteDialog = ref(false);
        let warningDialog = ref(false);
        let message = ref("");
        let selectedAuthor = ref('');
        let eventType = "";

        const headers = [{
                title: "Slug",
                align: "start",
                sortable: false,
                key: "slug",
                subKey: "en"
            },
            {
                title: "Author Name In Arabic",
                key: "name",
                subKey: "ar"
            },
            {
                title: "Author Name In English",
                key: "name",
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
                selectedAuthor.value = e
            } else {
                selectedAuthor.value = {}
            }
        }

        function openDeleteDialog(e) {
            deleteDialog.value = true;
            selectedAuthor.value = e
            eventType = "delete"
        }

        function submit(e, eventType) {
            console.log(e);
            if (eventType === 'add') {
                store.dispatch('Authors/createAuthor', e)
                    .then(response => {
                            console.log('Add response:', response);
                            dialog.value = false;
                    });
            } else if (eventType === 'edit') {
                store.dispatch('Authors/editAuthor', { 'payload': JSON.parse(e), 'slug': selectedAuthor.value.slug.en })
                    .then(response => {
                            console.log('Edit response:', response);
                            dialog.value = false;
                    });
            } else if (eventType === 'delete') {
                store.dispatch('Authors/deleteAuthor', selectedAuthor.value.slug.en)
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
        }

        function fetchData(currentPage) {
            console.log('currentPage', currentPage);
            store.dispatch('Authors/fetchAuthors', {
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
        watch(selectedAuthor, (newV) => {
            console.log(newV);
        }, { deep: true });
        const data = computed(() => store.getters['Authors/authors'])
        const meta = computed(() => store.getters['Authors/meta'])
        const loading = computed(() => store.getters['Authors/loading'])
        return {
            headers,
            dialog,
            deleteDialog,
            selectedAuthor,
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
