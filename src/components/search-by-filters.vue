<template>
<v-row class="justify-center">
    <v-col lg="8" md="7" sm="12" class="px-lg-0 p-md-0">
        <v-text-field class="remove-shadow" label="Search.." :hide-details="true" v-model="search.value" density="comfortable" variant="solo-filled">
            <template v-slot:prepend-inner>
                <img width="27" height="27" src="@/assets/icons/search-normal.svg" class="my-auto" />
            </template>
        </v-text-field>
    </v-col>
    <v-col lg="4" md="5" sm="12">
        <v-select label="Search by" class="remove-shadow" :hide-details="true" :items="props.items" v-model="search.key" variant="solo-filled" density="comfortable" clearable>
            <template v-slot:prepend-inner>
                <img width="27" height="27" src="@/assets/icons/filter.svg" class="my-auto" />
            </template>
            <template v-slot:append-inner>
                <img width="27" height="27" src="@/assets/icons/arrow-circle-down.svg" class="my-auto" />
            </template>
        </v-select>
    </v-col>
</v-row>
</template>

  
<script>
import { defineComponent, ref, watch, onMounted } from 'vue';

export default defineComponent({
    props: ['items'],

    setup(props, { emit }) {
        let search = ref({
            key: null,
            value: null
        });

        onMounted(() => {
            if (props.items.length > 0) {
                search.value.key = props.items[0];
            }
        });

        watch(
            () => search.value.key,
            (newKey) => {
                if (newKey === null && props.items.length > 0) {
                    search.value.key = props.items[0];
                }
            }
        );

        watch(
            search,
            (newV) => {
                const value = JSON.stringify(newV);
                emit('fetchData', JSON.parse(value));
            }, { deep: true }
        );

        return {
            props,
            search
        };
    }
});
</script>

  
<style>
.remove-shadow .v-field--variant-solo-filled {
    background: #f8f8f8 !important;
    border-color: transparent;
    box-shadow: unset !important;
}

.remove-shadow .v-field__append-inner>.v-icon {
    display: none !important;
}
</style>
