<template>
<div id="contacts">
    <div class="row ma-5 bg-white">
        <div class="d-flex flex-row-reverse pa-4">
            <v-row class="py-2 px-16 justify-center">
                <v-col lg="9" md="9" sm="9">
                    <SearchByFilters :items="filterBy" @fetchData="fetchData(1,$event)" />
                </v-col>
            </v-row>
            <ContactDialog :dialog="dialog" :loading="loading" :selectedContact="selectedContact" :eventType="eventType" @edit="submit($event, 'edit')" @add="submit($event, 'add')" @closeEditDialog="closeDialog($event, 'edit')" @closeAddDialog="closeDialog($event, 'add')" />
        </div>
        <DataTable :headers="headers" itemKey="slug" :actionsTable="actionsTable" :data="data" :meta="meta" :loading="loading" @OpenDialog="openDialog($event)" @openDeleteDialog="openDeleteDialog($event)" @newPage="fetchData($event)" />
    </div>
</div>
</template>

<script>
import { computed, defineComponent, onMounted, watch, ref } from 'vue'
import DataTable from '@/components/data-table.vue'
import SearchByFilters from '@/components/search-by-filters.vue'
import ContactDialog from '../../components/contact-dialog.vue'

import { useStore } from 'vuex'
export default defineComponent({
    components: {
        DataTable,
        ContactDialog,
        SearchByFilters
    },
    setup() {
        const store = useStore();
        let dialog = ref(false);
        let deleteDialog = ref(false);
        let message = ref("");
        let selectedContact = ref('');
        let eventType = "";

        const headers = [{
                title: "Information Type",
                align: "start",
                sortable: false,
                key: "type",
            },
            {
                title: "Information Value",
                key: "value",
            },
            { title: "Actions", key: "actions", sortable: false },
        ]

        const actionsTable = [
            { 'edit': true },
            { 'delete': false },
            { 'view': false },
        ];

        const filterBy = ['value']

        function openDialog(e) {
            dialog.value = true;
            if (e) {
                selectedContact.value = e
            } else {
                selectedContact.value = ''
            }
        }

        function openDeleteDialog(e) {
            deleteDialog.value = true;
            selectedContact.value = e
            eventType = "delete"
        }

        function submit(e, eventType) {
            console.log(e);
            if (eventType === 'edit') {
                store.dispatch('Contacts/editContact', { 'payload': e, 'slug': selectedContact.value.slug })
                    .then(response => {
                        console.log('Edit response:', response);
                        fetchData()
                        dialog.value = false;
                })
            }
        }

        function fetchData(currentPage, search = {}) {
            console.log('currentPage', currentPage);
            store.dispatch('Contacts/fetchContacts', {
                params: {
                    page: currentPage ? currentPage : 1,
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
        watch(selectedContact, (newV) => {
            console.log(newV);
        }, { deep: true });
        const data = computed(() => store.getters['Contacts/contacts'])
        const meta = computed(() => store.getters['Contacts/meta'])
        const loading = computed(() => store.getters['Contacts/loading'])
        return {
            headers,
            dialog,
            deleteDialog,
            selectedContact,
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
