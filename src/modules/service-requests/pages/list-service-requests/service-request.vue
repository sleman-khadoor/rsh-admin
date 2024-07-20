<template>
<div id="serviceRequests">
    <div class="row ma-5">
        <v-col lg="3" md="3" sm="3" class="px-1 d-flex pt-2">
            <img @click="redirectBack" width="33px" src="@/assets/icons/back.svg" class="px-1 cursor-pointer" />
            <p class="font-dark-blue size-30 font-weight-bold">Message Content</p>
        </v-col>
        <viewItem :headers="headers" :data="data" :loading="loading" itemType='service'/>
    </div>
</div>
</template>

<script>
import { defineComponent, onMounted, watch, ref, computed } from 'vue'
import viewItem from '@/components/view-item.vue'
import { useStore } from 'vuex'
import router from '@/router/routes.js';
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
        const serviceType = ref(route.params.serviceType);

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
            console.log(e, router);
            console.log('props is ', serviceType.value);
            this.$router.push({ name: serviceType.value+'-requests' });
        }

        function getServiceRequest() {
            console.log('slug is', slug.value);
            store.dispatch('ServiceRequests/getServiceRequest', slug.value);
        }

        onMounted(() => {
            getServiceRequest()
        })

        watch(message, (newV) => {
            console.log(newV);
        }, { deep: true });
        watch(slug, (newV) => {
            console.log(newV);
        }, { deep: true });

        const data = computed(() => store.getters['ServiceRequests/selectedServiceRequest'])
        const loading = computed(() => store.getters['ServiceRequests/loading'])
        return {
            headers,
            data,
            loading,
            message,
            getServiceRequest,
            viewItem,
            redirectBack,
            slug,
            serviceType
        }
    }
})
</script>
