<template>
    <div id="authors">
        <div class="row ma-5 bg-white">
            <div class="d-flex flex-row-reverse pa-4">
                <v-btn
                    class="text-none text-white font-weight-regular"
                    prepend-icon="mdi-plus"
                    :text="`Add Author`"
                    size="large"
                    color="dark-blue"
                    @click="openDialog()"
                    ></v-btn>
                <AuthorDialog :dialog="dialog" :selectedAuthor="selectedAuthor" :eventType="eventType"  @edit="submit($event, 'edit')" @add="submit($event, 'add')"/>
                <DeleteAuthorDialog :deleteDialog="deleteDialog" :selectedAuthor="selectedAuthor" :eventType="eventType"  @delete="submit($event, 'delete')"/>
            </div>
            <DataTable 
                :headers="headers" 
                :data="data" 
                :meta="meta"
                @OpenDialog="openDialog($event)"
                @openDeleteDialog="openDeleteDialog($event)"
                @newPage="fetchData($event)"
                />
        </div>
    </div>
</template>
<script>
import { computed, defineComponent, onMounted, watch, ref } from 'vue'
import DataTable from '@/components/data-table.vue'
import AuthorDialog from '../../components/author-dialog.vue'
import DeleteAuthorDialog from '../../components/delete-author-dialog.vue'
import { useStore } from 'vuex'
export default defineComponent({
    components: {
        DataTable,
        AuthorDialog,
        DeleteAuthorDialog
    },
    setup() {
        const store = useStore();
        let dialog = ref(false);
        let deleteDialog = ref(false);
        let selectedAuthor = ref('');
        let eventType = "";

        const headers =  [
        {
            title: "Slug",
            align: "start",
            sortable: false,
            key: "slug",
            subKey: "en"
        },
        {
            title: "Author Name In Arabic",key: "name",
            subKey: "ar"
        },
        { title: "Author Name In English", key: "name",
            subKey: "en"
        },
        { title: "Actions", key: "actions", sortable: false },
        ]        
        function openDialog(e) {
            dialog.value = true;
            if(e) {
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
        function submit(e, eventType) 
        {
            console.log(e);
            if (eventType === 'add') {
                store.dispatch('Authors/createAuthor', JSON.parse(e));
            } else if (eventType === 'edit') {
                store.dispatch('Authors/editAuthor', { 'payload': JSON.parse(e), 'slug': selectedAuthor.value.slug.en });
            } else if (eventType === 'delete') {
                store.dispatch('Authors/deleteAuthor', selectedAuthor.value.slug.en);
            }
            dialog.value = false;
        }
        function fetchData(currentPage) {
            console.log('currentPage', currentPage);
             store.dispatch('Authors/fetchAuthors',
                { 
                    params : {
                        page: currentPage ? currentPage : 1,
                        perPage: 6,
                    }
                }
            );
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
        watch(selectedAuthor, (newV) => {
            console.log(newV);
        }, { deep: true });
        const data = computed(() => store.getters['Authors/authors'])
        const meta = computed(() => store.getters['Authors/meta'])
        return {
            headers,
            dialog,
            deleteDialog,
            selectedAuthor,
            openDialog,
            openDeleteDialog,
            fetchData,
            eventType,
            submit,
            data,
            meta
        }
    },
})
</script>


