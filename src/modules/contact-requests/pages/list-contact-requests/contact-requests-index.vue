<template>
<div id="contactRequests">
    <div class="row ma-5 bg-white">
        <div class="d-flex flex-row-reverse pa-4">
            <v-row class="py-2 px-lg-7 px-md-5 px-sm-3 justify-center">
                <v-col lg="12" md="10" sm="12">
                    <SearchByFilters :items="filterBy" @fetchData="fetchData(1,$event)" />
                </v-col>
            </v-row>
            <DeleteContactRequestDialog :deleteDialog="deleteDialog" :loading="loading" :selectedContactRequest="selectedContactRequest" @delete="submit($event, 'delete')" @closeDialog="closeDialog($event, 'delete')" />
        </div>
        <DataTable :headers="headers" itemKey="slug" :actionsTable="actionsTable" :data="data" :meta="meta" :loading="loading" @OpenDialog="openDialog($event)" @openDeleteDialog="openDeleteDialog($event)" @newPage="fetchData($event)" @viewItem="viewItem($event)" />
    </div>
</div>
</template>

<script>
import { computed, defineComponent, onMounted, watch, ref } from 'vue'
import DataTable from '@/components/data-table.vue'
import DeleteContactRequestDialog from '@/components/delete-dialog.vue'
import SearchByFilters from '@/components/search-by-filters.vue'

import { useStore } from 'vuex'
import router from '@/router/routes.js';
export default defineComponent({
    components: {
        DataTable,
        DeleteContactRequestDialog,
        SearchByFilters
    },
    setup() {
        const store = useStore();
        let dialog = ref(false);
        let deleteDialog = ref(false);
        let message = ref("");
        let selectedContactRequest = ref('');
        let eventType = "";
        let currentPage = ref(1);

        const headers = [{
                title: "Full Name",
                align: "start",
                sortable: false,
                key: "fullname",
            },
            {
                title: "Mobile Number",
                key: "mobile",
            },
            {
                title: "Email",
                key: "email",
            },
            { title: "Actions", key: "actions", sortable: false },
        ]

        const actionsTable = [
            { 'edit': false },
            { 'delete': true },
            { 'view': true },
        ];

        const filterBy = [{ value: 'fullname', title: 'full name' }, { value: 'mobile', title: 'mobile' }, { value: 'email', title: 'email' }];

        function openDialog(e) {
            dialog.value = true;
            if (e) {
                selectedContactRequest.value = e
            } else {
                selectedContactRequest.value = ''
            }
        }

        function viewItem(e) {
            console.log(e, router);
            this.$router.push({ name: 'contact-request', params: { slug: e.slug } });
        }

        function openDeleteDialog(e) {
            deleteDialog.value = true;
            selectedContactRequest.value = e
            eventType = "delete"
        }

        function submit(e, eventType) {
            console.log(e);
            if (eventType === 'delete') {
                store.dispatch('ContactRequests/deleteContactRequest', selectedContactRequest.value.slug)
                    .then(response => {
                        console.log('Delete response:', response);
                        fetchData(1);
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
            store.dispatch('ContactRequests/fetchContactRequests', {
                params: {
                    page: page ? page : currentPage.value,
                    perPage: 6,
                    [`filter[${search.value?.key}]`]: search.value?.value
                }
            });
            store.dispatch('Core/showNotification');
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
        watch(selectedContactRequest, (newV) => {
            console.log(newV);
        }, { deep: true });
        const data = computed(() => store.getters['ContactRequests/contactRequests'])
        const meta = computed(() => store.getters['ContactRequests/meta'])
        const loading = computed(() => store.getters['ContactRequests/loading'])
        return {
            headers,
            dialog,
            deleteDialog,
            selectedContactRequest,
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
            viewItem
        }
    }
})
</script>
