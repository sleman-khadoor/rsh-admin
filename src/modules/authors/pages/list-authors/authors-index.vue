<template>
<div id="authors">
    <div class="row ma-5 bg-white">
        <v-row class="py-2 px-16 justify-center">
            <v-col lg="9" md="9" sm="9">
                <SearchByFilters :items="filterBy" @fetchData="fetchData(1,$event)"/>
            </v-col>
            <v-col lg="3" md="3" sm="3" class="px-0">
                <v-btn class="text-none text-white font-weight-regular" height="47" width="180" :text="`Add Author`" size="large" color="dark-blue" @click="openDialog()"></v-btn>
            </v-col>
        </v-row>
        <AuthorDialog :dialog="dialog" :loading="loading" :selectedAuthor="selectedAuthor" :eventType="eventType" @edit="submit($event, 'edit')" @add="submit($event, 'add')" @closeEditDialog="closeDialog($event, 'edit')" @closeAddDialog="closeDialog($event, 'add')" />
        <DeleteAuthorDialog :deleteDialog="deleteDialog" :loading="loading" :selectedAuthor="selectedAuthor" @delete="submit($event, 'delete')" @closeDialog="closeDialog($event, 'delete')" />
        <DataTable :headers="headers" itemKey="slugTranslation" :actionsTable="actionsTable" :data="data" :meta="meta" :loading="loading" @OpenDialog="openDialog($event)" @openDeleteDialog="openDeleteDialog($event)" @newPage="fetchData($event)" />
    </div>
</div>
</template>

<script>
import { computed, defineComponent, onMounted, watch, ref } from 'vue'
import DataTable from '@/components/data-table.vue'
import SearchByFilters from '@/components/search-by-filters.vue'
import AuthorDialog from '../../components/author-dialog.vue'
import DeleteAuthorDialog from '@/components/delete-dialog.vue'

import { useStore } from 'vuex'
export default defineComponent({
    components: {
        DataTable,
        AuthorDialog,
        DeleteAuthorDialog,
        SearchByFilters
    },
    setup() {
        const store = useStore();
        let dialog = ref(false);
        let deleteDialog = ref(false);
        let message = ref("");
        let selectedAuthor = ref('');
        let eventType = "";

        const headers = [{
            title: "Author Name In English",
            align: "start",
            sortable: false,
            key: "name",
            subKey: "en"
            },
            {
                title: "Author Name In Arabic",
                key: "name",
                subKey: "ar"
            },
            { title: "Actions", key: "actions", sortable: false },
        ]

        const actionsTable = [
            { 'edit': true },
            { 'delete': true },
            { 'view': false },
        ];

        const filterBy = ['name']

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
                        fetchData()
                        dialog.value = false;
                    });
            } else if (eventType === 'edit') {
                store.dispatch('Authors/editAuthor', { 'payload': e, 'slug': selectedAuthor.value.slug.en })
                    .then(response => {
                        console.log('Edit response:', response);
                        fetchData()
                        dialog.value = false;
                    })
            } else if (eventType === 'delete') {
                store.dispatch('Authors/deleteAuthor', selectedAuthor.value.slug.en)
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
        }

        function fetchData(currentPage, search = {}) {
            console.log('currentPage', currentPage);
            store.dispatch('Authors/fetchAuthors', {
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
            message,
            fetchData,
            closeDialog,
            eventType,
            submit,
            data,
            meta,
            loading,
            filterBy,
            actionsTable
        }
    }
})
</script>
