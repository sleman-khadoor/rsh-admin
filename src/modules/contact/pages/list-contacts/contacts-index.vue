<template>
<div id="contacts" class="h-100 mt-6">
    <div class="row ma-5 bg-white">
        <div class="d-flex flex-row-reverse pa-4">
            <ContactDialog :dialog="dialog" :selectedContact="selectedContact" :eventType="eventType" @edit="submit($event, 'edit')" @add="submit($event, 'add')" @closeEditDialog="closeDialog($event, 'edit')" @closeAddDialog="closeDialog($event, 'add')" />
        </div>
        <DataTable :headers="headers" itemKey="slug" :actionsTable="actionsTable" :data="data" :meta="meta" :loading="loading" @OpenDialog="openDialog($event)" @openDeleteDialog="openDeleteDialog($event)" @newPage="fetchData($event)" />
    </div>
</div>
</template>

<script>
import { computed, defineComponent, onMounted, watch, ref } from 'vue'
import DataTable from '@/components/data-table.vue'
import ContactDialog from '../../components/contact-dialog.vue'

import { useStore } from 'vuex'
export default defineComponent({
    components: {
        DataTable,
        ContactDialog,
    },
    setup() {
        const store = useStore();
        let dialog = ref(false);
        let deleteDialog = ref(false);
        let message = ref("");
        let selectedContact = ref('');
        let eventType = "";
        let currentPage = ref(1);

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
            if (eventType === 'edit') {
                store.dispatch('Contacts/editContact', { 'payload': e, 'slug': selectedContact.value.slug })
                    .then(response => {
                        console.log('Edit response:', response);
                        dialog.value = false;
                        fetchData(1)
                })
            }
        }

        function fetchData(page, search = {}) {
            page ? currentPage.value = page : null
            store.dispatch('Contacts/fetchContacts', {
                params: {
                    page: page ? page : currentPage.value,
                    perPage: 7,
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
            actionsTable
        }
    }
})
</script>
