<template>
<v-row class="justify-center">
    <v-col lg="8" md="7" sm="12" class="px-lg-0 p-md-0">
        <v-select v-if="search.key === 'category'" class="remove-shadow" chips :menu-props="{ offsetY: true, maxHeight: '200px' }" label="Search.." multiple :items="props.selectItems" item-value="value" item-title="text" :hide-details="true" v-model="search.value" density="comfortable" variant="solo-filled">
            <template v-slot:prepend-inner>
                <img width="27" height="27" src="@/assets/icons/search-normal.svg" class="my-auto" />
            </template>
        </v-select>
        <v-text-field v-else class="remove-shadow" label="Search.." :hide-details="true" v-model="search.value" density="comfortable" variant="solo-filled">
            <template v-slot:prepend-inner>
                <img width="27" height="27" src="@/assets/icons/search-normal.svg" class="my-auto" />
            </template>
        </v-text-field>
    </v-col>
    <v-col lg="4" md="5" sm="12">
        <v-select label="Search by" class="remove-shadow" :hide-details="true" :items="props.items" item-value="value" item-title="title" v-model="search.key" variant="solo-filled" density="comfortable" clearable>
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
    props: ['items', 'selectType', 'selectItems'],

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
                search.value.value = null;
                if (newKey === null && props.items.length > 0) {
                    search.value.key = props.items[0];
                }
            }
        );

        watch(
            search,
            (newV) => {
                let value = {};
                if (search.value.key == 'category') {
                    let selected = newV.value;
                    if (Array.isArray(selected)) {
                        selected.forEach((item, index) => {
                            value[`filter[${props.selectType}][${index}]`] = item
                        });
                    }
                    emit('fetchData', { value: {}, selectSearch: value });
                } else {
                    value = JSON.stringify(newV);
                    value = JSON.parse(value)
                    console.log('value is ', value);
                    if(value.key.value){
                        value.key = value.key.value
                    }
                    emit('fetchData', { value: value, selectSearch: {} });
                }
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
