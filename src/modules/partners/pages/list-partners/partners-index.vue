<template>
<div id="partners">
    <div class="row ma-5 bg-white">
        <div class="d-flex flex-row-reverse pa-4">
            <v-row class="py-2 px-lg-7 px-md-5 px-sm-3 justify-center">
                <v-col lg="10" md="10" sm="12">
                    <SearchByFilters :items="filterBy" @fetchData="fetchData(1,$event)" />
                </v-col>
                <v-col lg="2" md="2" sm="12" class="d-flex flex-end">
                    <v-btn class="text-none text-white font-weight-regular" height="47" width="180" :text="`Add Partner`" size="large" color="dark-blue" @click="openDialog()"></v-btn>
                </v-col>
            </v-row>
            <PartnerDialog :dialog="dialog" :loading="loading" :selectedPartner="selectedPartner" :eventType="eventType" @edit="submit($event, 'edit')" @add="submit($event, 'add')" @closeEditDialog="closeDialog($event, 'edit')" @closeAddDialog="closeDialog($event, 'add')" />
            <DeletePartnerDialog :deleteDialog="deleteDialog" :loading="loading" :selectedPartner="selectedPartner" @delete="submit($event, 'delete')" @closeDialog="closeDialog($event, 'delete')" />
        </div>
        <DataTable :headers="headers" itemKey="slugTranslation" :actionsTable="actionsTable" :data="data" :meta="meta" :loading="loading" @OpenDialog="openDialog($event)" @openDeleteDialog="openDeleteDialog($event)" @newPage="fetchData($event)" />
    </div>
</div>
</template>

<script>
import { computed, defineComponent, onMounted, watch, ref } from 'vue'
import DataTable from '@/components/data-table.vue'
import SearchByFilters from '@/components/search-by-filters.vue'
import PartnerDialog from '../../components/partner-dialog.vue'
import DeletePartnerDialog from '@/components/delete-dialog.vue'

import { useStore } from 'vuex'
export default defineComponent({
    components: {
        DataTable,
        PartnerDialog,
        DeletePartnerDialog,
        SearchByFilters
    },
    setup() {
        const store = useStore();
        let dialog = ref(false);
        let deleteDialog = ref(false);
        let message = ref("");
        let selectedPartner = ref('');
        let eventType = "";
        let currentPage = ref(1);

        const headers = [{
                title: "Partner Name In English",
                align: "start",
                sortable: false,
                key: "name",
                subKey: "en"
            },
            {
                title: "Partner Name In Arabic",
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

        const filterBy = [{value: 'name', title: 'name'}, {value: 'website_link', title: 'website link'}];

        function openDialog(e) {
            dialog.value = true;
            if (e) {
                selectedPartner.value = e
            } else {
                selectedPartner.value = ''
            }
        }

        function openDeleteDialog(e) {
            deleteDialog.value = true;
            selectedPartner.value = e
            eventType = "delete"
        }

        function submit(e, eventType) {
            console.log(e);
            if (eventType === 'add') {
                store.dispatch('Partners/createPartner', e)
                    .then(response => {
                        console.log('Add response:', response);
                        fetchData(1)
                        dialog.value = false;
                    });
            } else if (eventType === 'edit') {
                store.dispatch('Partners/editPartner', { 'payload': e, 'slug': selectedPartner.value.slug.en })
                    .then(response => {
                        console.log('Edit response:', response);
                        fetchData()
                        dialog.value = false;
                    })
            } else if (eventType === 'delete') {
                store.dispatch('Partners/deletePartner', selectedPartner.value.slug.en)
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
            console.log('currentPage', page);
            page ? currentPage.value = page : null
            store.dispatch('Partners/fetchPartners', {
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
        watch(selectedPartner, (newV) => {
            console.log(newV);
        }, { deep: true });
        const data = computed(() => store.getters['Partners/partners'])
        const meta = computed(() => store.getters['Partners/meta'])
        const loading = computed(() => store.getters['Partners/loading'])
        return {
            headers,
            dialog,
            deleteDialog,
            selectedPartner,
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
