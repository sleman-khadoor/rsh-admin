<template>
<div id="users">
    <div class="row ma-5 bg-white">
        <div class="d-flex flex-row-reverse pa-4">
            <v-row class="py-2 px-16 justify-center">
                <v-col lg="9" md="9" sm="9">
                    <SearchByFilters :items="filterBy" @fetchData="fetchData(1,$event)" />
                </v-col>
                <v-col lg="3" md="3" sm="3" class="px-0">
                    <v-btn class="text-none text-white font-weight-regular" height="47" width="180" :text="`Add User`" size="large" color="dark-blue" @click="openDialog()"></v-btn>
                </v-col>
            </v-row>
            <UserDialog :dialog="dialog" :loading="loading" :selectedUser="selectedUser" :eventType="eventType" @edit="submit($event, 'edit')" @add="submit($event, 'add')" @closeEditDialog="closeDialog($event, 'edit')" @closeAddDialog="closeDialog($event, 'add')" />
            <ResetPasswordDialog :resetDialog="resetDialog" :loading="loading" :selectedUser="selectedUser" @reset="submit($event, 'reset')" @closeDialog="closeDialog($event, 'reset')" />
            <DeleteUserDialog :deleteDialog="deleteDialog" :loading="loading" :selectedUser="selectedUser" @delete="submit($event, 'delete')" @closeDialog="closeDialog($event, 'delete')" />
        </div>
        <DataTable :headers="headers" itemKey="slug" :actionsTable="actionsTable" :data="data" :meta="meta" :loading="loading" @OpenDialog="openDialog($event)" @OpenResetDialog="openResetDialog($event)" @openDeleteDialog="openDeleteDialog($event)" @newPage="fetchData($event)" />
    </div>
</div>
</template>

<script>
import { computed, defineComponent, onMounted, watch, ref } from 'vue'
import DataTable from '@/components/data-table.vue'
import UserDialog from '../../components/user-dialog.vue'
import DeleteUserDialog from '@/components/delete-dialog.vue'
import ResetPasswordDialog from '../../components/reset-dialog.vue'
import SearchByFilters from '@/components/search-by-filters.vue'

import { useStore } from 'vuex'
export default defineComponent({
    components: {
        DataTable,
        UserDialog,
        DeleteUserDialog,
        ResetPasswordDialog,
        SearchByFilters
    },
    setup() {
        const store = useStore();
        let dialog = ref(false);
        let deleteDialog = ref(false);
        let resetDialog = ref(false);
        let message = ref("");
        let selectedUser = ref('');
        let eventType = "";

        const headers = [{
                title: "User Name",
                align: "start",
                sortable: false,
                key: "username",
            },
            {
                title: "First Name",
                key: "first_name",
            },
            {
                title: "Last Name",
                key: "last_name",
            },
            { title: "Actions", key: "actions", sortable: false },
        ]

        const actionsTable = [
            { 'edit': true },
            { 'delete': true },
            { 'view': false },
            { 'reset': true },
        ];

        const filterBy = [{value: 'first_name', title: 'first name'}, {value: 'last_name', title: 'last name'}, {value: 'username', title: 'user name'}];

        function openDialog(e) {
            dialog.value = true;
            if (e) {
                selectedUser.value = e
            } else {
                selectedUser.value = ''
            }
        }

        function openDeleteDialog(e) {
            deleteDialog.value = true;
            selectedUser.value = e
            eventType = "delete"
        }

        function openResetDialog(e) {
            resetDialog.value = true;
            selectedUser.value = e
            eventType = "reset"
        }

        function submit(e, eventType) {
            console.log(e);
            if (eventType === 'add') {
                store.dispatch('Users/createUser', e)
                    .then(response => {
                        console.log('Add response:', response);
                        fetchData();
                        dialog.value = false;
                    });
            } else if (eventType === 'edit') {
                store.dispatch('Users/editUser', { 'payload': e, 'slug': selectedUser.value.slug })
                    .then(response => {
                        console.log('Edit response:', response);
                        fetchData();
                        dialog.value = false;
                    });
            } else if (eventType === 'delete') {
                store.dispatch('Users/deleteUser', selectedUser.value.slug)
                    .then(response => {
                        console.log('Delete response:', response);
                        fetchData();
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
            } else if(eventType === 'reset') {
                store.dispatch('Users/resetPassword', e )
                     .then(response => {
                        console.log('Reset Password response:', response);
                        fetchData();
                        resetDialog.value = false;
                }).catch(error => {
                        if (error.response) {
                            if (error.response.status == 409) {
                                closeDialog(e, 'reset');
                                message.value = "Old password doesn't match."
                            }
                        }
                    });
            }
        }

        function fetchData(currentPage, search = {}) {
            console.log('currentPage', currentPage);
            store.dispatch('Users/fetchUsers', {
                params: {
                    page: currentPage ? currentPage : 1,
                    perPage: 6,
                    [`filter[${search.value?.key}]`]: search.value?.value,
                    [`include[]`]: 'roles',
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
                resetDialog.value = false;
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
        watch(resetDialog, (newV) => {
            console.log(newV);
        }, { deep: true });
        watch(message, (newV) => {
            console.log(newV);
        }, { deep: true });
        watch(selectedUser, (newV) => {
            console.log(newV);
        }, { deep: true });
        const data = computed(() => store.getters['Users/users'])
        const meta = computed(() => store.getters['Users/meta'])
        const loading = computed(() => store.getters['Users/loading'])
        const roles = computed(() => store.getters['Users/roles'])
        return {
            headers,
            dialog,
            deleteDialog,
            resetDialog,
            selectedUser,
            openDialog,
            openDeleteDialog,
            openResetDialog,
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
            roles
        }
    }
})
</script>
