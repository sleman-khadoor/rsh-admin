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
                <AuthorDialog :dialog="dialog" :selectedAuthor="selectedAuthor" @edit="submit($event)" @add="submit($event)"/>
            </div>
            <DataTable :headers="headers" :data="data" @OpenDialog="openDialog($event)"/>
        </div>
    </div>
</template>
<script>
import { computed, defineComponent, onMounted, watch, ref } from 'vue'
import DataTable from '@/components/data-table.vue'
import AuthorDialog from '../../components/author-dialog.vue'
import { useStore } from 'vuex'
export default defineComponent({
    components: {
        DataTable,
        AuthorDialog
    },
    setup() {
        const store = useStore();
        let dialog = ref(false);
        let selectedAuthor = ref('');
        const headers =  [
        {
            title: "slug",
            align: "start",
            sortable: false,
            key: "slug",
            subKey: "en"
        },
        {
            title: "Author name (arabic)",key: "name",
            subKey: "ar"
        },
        { title: "Author name (english)", key: "name",
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
        function submit(e) {
            dialog.value = false;
            console.log(e);
        }
        onMounted(() => {
            store.dispatch('Authors/fetchAuthors');
        })
        watch(dialog, (newV) => {
            console.log(newV);
        }, { deep: true });
        watch(selectedAuthor, (newV) => {
            console.log(newV);
            // Your code
        }, { deep: true });
        const data = computed(() => store.getters['Authors/authors'])
        return {
            headers,
            dialog,
            selectedAuthor,
            openDialog,
            submit,
            data
        }
    },
})
</script>


