<template>
<div id="contactRequests">
    <div class="row ma-5">
        <v-col lg="3" md="3" sm="3" class="px-1 d-flex pt-7">
            <img @click="redirectBack" width="33px" src="@/assets/icons/back.svg" class="px-1 cursor-pointer" />
            <p class="font-dark-blue size-30 font-weight-bold">Message Content</p>
        </v-col>
        <viewItem :headers="headers" :data="data" :loading="loading" itemType='contact'/>
    </div>
</div>
</template>

<script>
import { defineComponent, onMounted, watch, ref, computed } from 'vue'
import viewItem from '@/components/view-item.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default defineComponent({
    components: {
        viewItem,
    },
    setup() {
        const store = useStore();
        const route = useRoute()
        let message = ref("");
        const slug = ref(route.params.slug);

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
            {
                title: "Date",
                key: "date",
            },
        ]

        function redirectBack(e) {
            console.log(e);
            this.$router.push({ name: 'contact-requests' });
        }

        function getContactRequest() {
            store.dispatch('ContactRequests/getContactRequest', slug.value);
        }

        onMounted(() => {
            getContactRequest()
        })

        watch(message, (newV) => {
            console.log(newV);
        }, { deep: true });
        watch(slug, (newV) => {
            console.log(newV);
        }, { deep: true });

        const data = computed(() => store.getters['ContactRequests/selectedContactRequest'])
        const loading = computed(() => store.getters['ContactRequests/loading'])
        return {
            headers,
            data,
            loading,
            message,
            getContactRequest,
            viewItem,
            redirectBack,
            slug
        }
    }
})
</script>
