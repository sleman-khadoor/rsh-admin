<template>
    <div id="serviceRequests">
        <div class="row ma-5 bg-white">
            <div class="d-flex flex-row-reverse pa-4">
                <v-row class="py-2 px-lg-7 px-md-5 px-sm-3 justify-center">
                    <v-col lg="12" md="10" sm="12">
                        <SearchByFilters :items="filterBy" @fetchData="fetchData(1,$event)" />
                    </v-col>
                </v-row>
                <DeleteServiceRequestDialog :deleteDialog="deleteDialog" :loading="loading" :selectedServiceRequest="selectedServiceRequest" @delete="submit($event, 'delete')" @closeDialog="closeDialog($event, 'delete')" />
            </div>
            <DataTable :headers="headers" itemKey="slug" :actionsTable="actionsTable" :data="data" :meta="meta" :loading="loading" @OpenDialog="openDialog($event)" @openDeleteDialog="openDeleteDialog($event)" @newPage="fetchData($event)" @viewItem="viewItem($event)" />
        </div>
    </div>
    </template>
    
    <script>
    import { computed, defineComponent, onMounted, watch, ref } from 'vue'
    import DataTable from '@/components/data-table.vue'
    import DeleteServiceRequestDialog from '@/components/delete-dialog.vue'
    import SearchByFilters from '@/components/search-by-filters.vue'
    
    import { useStore } from 'vuex'
    
    export default defineComponent({
        components: {
            DataTable,
            DeleteServiceRequestDialog,
            SearchByFilters
        },
        setup() {
            const store = useStore();
            let dialog = ref(false);
            let deleteDialog = ref(false);
            let message = ref("");
            let selectedServiceRequest = ref('');
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
                    selectedServiceRequest.value = e
                } else {
                    selectedServiceRequest.value = ''
                }
            }
    
            function viewItem(e) {
                console.log(e);
                this.$router.push({ name: 'service-request', params: { slug: e.slug, serviceType:"marketing" }});
            }
    
            function openDeleteDialog(e) {
                deleteDialog.value = true;
                selectedServiceRequest.value = e
                eventType = "delete"
            }
    
            function submit(e, eventType) {
                console.log(e);
                if (eventType === 'delete') {
                    store.dispatch('ServiceRequests/deleteServiceRequest', selectedServiceRequest.value.slug)
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
                page ? currentPage.value = page : null
                store.dispatch('ServiceRequests/fetchServiceRequests', {
                    params: {
                        page: page ? page : currentPage.value,
                        perPage: 6,
                        [`filter[${search.value?.key}]`]: search.value?.value,
                        [`filter[service_name]`]: 'marketing_service',
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
            watch(selectedServiceRequest, (newV) => {
                console.log(newV);
            }, { deep: true });
            const data = computed(() => store.getters['ServiceRequests/serviceRequests'])
            const meta = computed(() => store.getters['ServiceRequests/meta'])
            const loading = computed(() => store.getters['ServiceRequests/loading'])
            return {
                headers,
                dialog,
                deleteDialog,
                selectedServiceRequest,
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
                viewItem,
            }
        }
    })
    </script>
    