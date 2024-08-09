<template>
<div id="reviews">
    <div class="py-2 d-flex justify-space-between header">
        <div>
            <v-col lg="3" md="3" sm="3" class="px-1 d-flex pt-6">
                <img @click="redirectBack" width="33px" src="@/assets/icons/back.svg" class="px-1 cursor-pointer" />
                <p class="font-dark-blue size-30 font-weight-bold">Book Reviews</p>
            </v-col>
        </div>
        <v-col lg="3" md="3" sm="3">
            <v-btn class="text-none text-white font-weight-regular" height="47" width="180" :text="`Add Review`" size="large" color="dark-blue" @click="openDialog()"></v-btn>
        </v-col>   
    </div>
     <div class="row bg-white">
        <ReviewDialog :book_id="book_id" :dialog="dialog" :selectedReview="selectedReview" :eventType="eventType" @edit="submit($event, 'edit')" @add="submit($event, 'add')" @closeEditDialog="closeDialog($event, 'edit')" @closeAddDialog="closeDialog($event, 'add')" />
        <ReviewViewDialog cardType="reviews" :viewDialog="viewDialog" :viewLang="viewLang" :loading="loading" :selectedItem="selectedReview" :eventType="eventType" @edit="submit($event, 'edit')" @add="submit($event, 'add')" @closeEditDialog="closeDialog($event, 'view')" @closeAddDialog="closeDialog($event, 'view')" />
        <DeleteReviewDialog :deleteDialog="deleteDialog" :loading="loading" :selectedReview="selectedReview" @delete="submit($event, 'delete')" @closeDialog="closeDialog($event, 'delete')" />
        <VCard cardType="reviews" itemKey="slugTranslation" :actionsTable="actionsTable" :data="data" :loading="loading" @OpenDialog="openDialog($event)" @OpenViewEnDialog="openViewDialog($event, 'en')" @OpenViewArDialog="openViewDialog($event, 'ar')" @openDeleteDialog="openDeleteDialog($event)" @newPage="fetchData($event)"></VCard>
    </div>
 </div>
</template>

<script>
import { computed, defineComponent, onMounted, watch, ref } from 'vue'
import VCard from '@/components/v-card.vue'
import ReviewDialog from '../../components/review-dialog.vue'
import ReviewViewDialog from '@/components/view-dialog.vue'
import DeleteReviewDialog from '@/components/delete-dialog.vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
    components: {
        VCard,
        ReviewDialog,
        DeleteReviewDialog,
        ReviewViewDialog,
    },
    setup() {
        const store = useStore();
        const route = useRoute();
        let dialog = ref(false);
        let deleteDialog = ref(false);
        let viewDialog = ref(false);
        let message = ref("");
        let selectedReview = ref('');
        let eventType = "";
        let viewLang = ref('');
        const slug = ref(route.params.slug);

        const actionsTable = [
            { 'edit': true },
            { 'delete': true },
            { 'view': true },
        ];

        const filterBy = ['content']

        function redirectBack(e) {
            console.log(e);
            this.$router.push({ name: 'books' });
        }

        function openDialog(e) {
            dialog.value = true;
            if (e) {
                selectedReview.value = e
            } else {
                selectedReview.value = ''
            }
        }

        function openDeleteDialog(e) {
            deleteDialog.value = true;
            selectedReview.value = e
            eventType = "delete"
        }

        function openViewDialog(e, lang) {
            viewDialog.value = true;
            selectedReview.value = e
            eventType = "view"
            viewLang.value = lang;
        }

        function submit(e, eventType) {
            if (eventType === 'add') {
                store.dispatch('Books/createReview', e)
                    .then(response => {
                        console.log('Add response:', response);
                        fetchData()
                        dialog.value = false;
                    });
            } else if (eventType === 'edit') {
                console.log('slug is',selectedReview.value.slug.en);
                store.dispatch('Books/editReview', { 'payload': e, 'slug': selectedReview.value.slug.en })
                    .then(response => {
                        console.log('Edit response:', response);
                        dialog.value = false;
                        fetchData()
                    })
            } else if (eventType === 'delete') {
                store.dispatch('Books/deleteReview', selectedReview.value.slug.en)
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

        function fetchData() {
            store.dispatch('Books/getBook', slug.value);
        }

        function closeDialog(e, eventType) {
            console.log(e);
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
        watch(selectedReview, (newV) => {
            console.log(newV);
        }, { deep: true });
        watch(slug, (newV) => {
            console.log(newV);
        }, { deep: true });
        const book_id = computed(() => store.getters['Books/selectedBook']?.id);
        const data = computed(() => store.getters['Books/selectedBook']?.book_reviews.map(item => ({
            ...item,
            lang: 'en'
        })));
        return {
            dialog,
            deleteDialog,
            viewDialog,
            selectedReview,
            openDialog,
            openDeleteDialog,
            openViewDialog,
            message,
            fetchData,
            closeDialog,
            eventType,
            submit,
            data,
            filterBy,
            actionsTable,
            viewLang,
            slug,
            redirectBack,
            book_id,
        }
    }
})
</script>
