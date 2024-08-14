<template>
<div id="achievements" class="h-100 mt-9">
    <div class="row ma-5 bg-white">          
        <v-col lg="2" md="2" sm="12" class="d-flex jusctify_end ml-auto pb-0">
            <v-btn class="text-none text-white font-weight-regular" height="47" width="180" :text="`Add Achievement`" size="large" color="dark-blue" @click="openDialog()"></v-btn>
        </v-col>
        <AchievementDialog :dialog="dialog" :selectedAchievement="selectedAchievement" :eventType="eventType" @edit="submit($event, 'edit')" @add="submit($event, 'add')" @closeEditDialog="closeDialog($event, 'edit')" @closeAddDialog="closeDialog($event, 'add')" />
        <AchievementViewDialog cardType="achievements" :viewDialog="viewDialog" :viewLang="viewLang" :loading="loading" :selectedItem="selectedAchievement" :eventType="eventType" @edit="submit($event, 'edit')" @add="submit($event, 'add')" @closeEditDialog="closeDialog($event, 'view')" @closeAddDialog="closeDialog($event, 'view')" />
        <DeleteAchievementDialog :deleteDialog="deleteDialog" :loading="loading" :selectedAchievement="selectedAchievement" @delete="submit($event, 'delete')" @closeDialog="closeDialog($event, 'delete')" />
        <VCard cardType="achievements" itemKey="slugTranslation" :actionsTable="actionsTable" :data="data" :meta="meta" :loading="loading" @OpenDialog="openDialog($event)" @OpenViewEnDialog="openViewDialog($event, 'en')" @OpenViewArDialog="openViewDialog($event, 'ar')" @openDeleteDialog="openDeleteDialog($event)" @newPage="fetchData($event)"></VCard>
    </div>
</div>
</template>

<script>
import { computed, defineComponent, onMounted, watch, ref } from 'vue'
import VCard from '@/components/v-card.vue'
import AchievementDialog from '../../components/achievements-dialog.vue'
import AchievementViewDialog from '@/components/view-dialog.vue'
import DeleteAchievementDialog from '@/components/delete-dialog.vue'

import { useStore } from 'vuex'
export default defineComponent({
    components: {
        VCard,
        AchievementDialog,
        DeleteAchievementDialog,
        AchievementViewDialog,
    },
    setup() {
        const store = useStore();
        let dialog = ref(false);
        let deleteDialog = ref(false);
        let viewDialog = ref(false);
        let message = ref("");
        let selectedAchievement = ref('');
        let eventType = "";
        let viewLang = ref('');
        let currentPage = ref(1);
        
        const actionsTable = [
            { 'edit': true },
            { 'delete': true },
            { 'view': true },
        ];

        function openDialog(e) {
            dialog.value = true;
            if (e) {
                selectedAchievement.value = e
            } else {
                selectedAchievement.value = ''
            }
        }

        function openDeleteDialog(e) {
            deleteDialog.value = true;
            selectedAchievement.value = e
            eventType = "delete"
        }

        function openViewDialog(e, lang) {
            viewDialog.value = true;
            selectedAchievement.value = e
            eventType = "view"
            viewLang.value = lang;
        }

        function submit(e, eventType) {
            if (eventType === 'add') {
                store.dispatch('Achievements/createAchievement', e)
                    .then(response => {
                        console.log('Add response:', response);
                        fetchData(1);
                        dialog.value = false;
                    });
            } else if (eventType === 'edit') {
                store.dispatch('Achievements/editAchievement', { 'payload': e, 'slug': selectedAchievement.value.slug.en })
                    .then(response => {
                        console.log('Edit response:', response);
                        dialog.value = false;
                        fetchData()
                    })
            } else if (eventType === 'delete') {
                store.dispatch('Achievements/deleteAchievement', selectedAchievement.value.slug.en)
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
            store.dispatch('Achievements/fetchAchievements', {
                params: {
                    page: page ? page : currentPage.value,
                    perPage: 4,
                    [`filter[${search.value?.key}]`]: search.value?.value
                }
            });
        }
        
        function closeDialog(e, eventType) {
            if (eventType == 'add' || eventType == 'edit') {
                dialog.value = false;
            } else if (eventType == 'delete') {
                deleteDialog.value = false;
            } else {
                viewDialog.value = false;
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
        watch(viewDialog, (newV) => {
            console.log(newV);
        }, { deep: true });
        watch(viewLang, (newV) => {
            console.log(newV);
        }, { deep: true });
        watch(message, (newV) => {
            console.log(newV);
        }, { deep: true });
        watch(selectedAchievement, (newV) => {
            console.log(newV);
        }, { deep: true });
        const data = computed(() => store.getters['Achievements/achievements'].map(item => ({
            ...item,
            lang: 'en'
        })));
        const meta = computed(() => store.getters['Achievements/meta'])
        const loading = computed(() => store.getters['Achievements/loading'])
        return {
            dialog,
            deleteDialog,
            viewDialog,
            selectedAchievement,
            openDialog,
            openDeleteDialog,
            openViewDialog,
            message,
            fetchData,
            closeDialog,
            eventType,
            submit,
            data,
            meta,
            loading,
            actionsTable,
            viewLang
        }
    }
})
</script>
