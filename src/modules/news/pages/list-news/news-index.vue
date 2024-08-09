<template>
<div id="news">
    <div class="row ma-5 bg-white">
        <div class="d-flex flex-row-reverse pa-4">
            <v-row class="py-2 px-lg-7 px-md-5 px-sm-3 justify-center">
                <v-col lg="10" md="10" sm="12">
                    <SearchByFilters :items="filterBy" @fetchData="fetchData(1,$event)" />
                </v-col>
                <v-col lg="2" md="2" sm="12" class="d-flex flex-end">
                    <v-btn class="text-none text-white font-weight-regular" height="47" width="180" :text="`Add News`" size="large" color="dark-blue" @click="openDialog()"></v-btn>
                </v-col>
            </v-row>
            <NewsDialog :dialog="dialog" :loading="loading" :selectedNews="selectedNews" :eventType="eventType" @edit="submit($event, 'edit')" @add="submit($event, 'add')" @closeEditDialog="closeDialog($event, 'edit')" @closeAddDialog="closeDialog($event, 'add')" />
            <DeleteNewsDialog :deleteDialog="deleteDialog" :loading="loading" :selectedNews="selectedNews" @delete="submit($event, 'delete')" @closeDialog="closeDialog($event, 'delete')" />
        </div>
        <DataTable :headers="headers" itemKey="slugTranslation" :actionsTable="actionsTable" :data="data" :meta="meta" :loading="loading" @OpenDialog="openDialog($event)" @openDeleteDialog="openDeleteDialog($event)" @newPage="fetchData($event)" />
    </div>
</div>
</template>

<script>
import { computed, defineComponent, onMounted, watch, ref } from 'vue'
import DataTable from '@/components/data-table.vue'
import SearchByFilters from '@/components/search-by-filters.vue'
import NewsDialog from '../../components/news-dialog.vue'
import DeleteNewsDialog from '@/components/delete-dialog.vue'

import { useStore } from 'vuex'
export default defineComponent({
    components: {
        DataTable,
        NewsDialog,
        DeleteNewsDialog,
        SearchByFilters
    },
    setup() {
        const store = useStore();
        let dialog = ref(false);
        let deleteDialog = ref(false);
        let message = ref("");
        let selectedNews = ref('');
        let eventType = "";
        let currentPage = ref(1);

        const headers = [{
                title: "News Title In English",
                align: "start",
                sortable: false,
                key: "title",
                subKey: "en"
            },
            {
                title: "News Title In Arabic",
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
                selectedNews.value = e
            } else {
                selectedNews.value = ''
            }
        }

        function openDeleteDialog(e) {
            deleteDialog.value = true;
            selectedNews.value = e
            eventType = "delete"
        }

        function submit(e, eventType) {
            if (eventType === 'add') {
                store.dispatch('News/createNews', e)
                    .then(response => {
                        console.log('Add response:', response);
                        fetchData(1)
                        dialog.value = false;
                    });
            } else if (eventType === 'edit') {
                store.dispatch('News/editNews', { 'payload': e, 'slug': selectedNews.value.slug.en })
                    .then(response => {
                        console.log('Edit response:', response);
                        fetchData()
                        dialog.value = false;
                    })
            } else if (eventType === 'delete') {
                store.dispatch('News/deleteNews', selectedNews.value.slug.en)
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

        function fetchData(page, search = {}) {
            page ? currentPage.value = page : null
            store.dispatch('News/fetchNews', {
                params: {
                    page: page ? page : currentPage.value,
                    perPage: 6,
                    [`filter[${search.value?.key}]`]: search.value?.value
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
        watch(selectedNews, (newV) => {
            console.log(newV);
        }, { deep: true });
        const data = computed(() => store.getters['News/news'])
        const meta = computed(() => store.getters['News/meta'])
        const loading = computed(() => store.getters['News/loading'])
        return {
            headers,
            dialog,
            deleteDialog,
            selectedNews,
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
